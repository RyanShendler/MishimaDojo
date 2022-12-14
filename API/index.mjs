import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server";
import neo4j from "neo4j-driver";

const typeDefs = gql`
  type Character {
    id: ID! @id
    lastModified: DateTime! @timestamp
    name: String!
    imageURL: String!
    summary: String!
    poke: Int!
    keepout: Int!
    mixup: Int!
    pressure: Int!
    defense: Int!
    whiffPunish: Int!
    strengths: [String!]!
    weaknesses: [String!]!
    moves: [Move!]! @relationship(type: "HAS_MOVE", direction: OUT)
    stances: [Stance!]! @relationship(type: "HAS_STANCE", direction: OUT)
    combos: [Combo!]! @relationship(type: "HAS_COMBO", direction: OUT)
    tags: [CharacterTag!]!
      @relationship(type: "HAS_CHARACTER_TAG", direction: IN)
    similar: [Character!]!
      @relationship(type: "SIMILAR", properties: "Similarity", direction: OUT)
    similarTo: [Character!]!
      @relationship(type: "SIMILAR", properties: "Similarity", direction: IN)
  }

  interface Similarity @relationshipProperties {
    similarity: Float!
  }

  type Move {
    id: ID! @id
    lastModified: DateTime! @timestamp
    name: String!
    input: String!
    startup: Int!
    onHit: String!
    onCH: String!
    onBlock: String!
    summary: String!
    damageHit: Int!
    damageCH: Int!
    users: [Character!]! @relationship(type: "HAS_MOVE", direction: IN)
    stances: [Stance!]! @relationship(type: "STANCE_MOVE", direction: IN)
    launcherFor: [Combo!]!
      @relationship(
        type: "USES_LAUNCHER"
        properties: "UsesLauncher"
        direction: IN
      )
    tags: [MoveTag!]! @relationship(type: "HAS_MOVE_TAG", direction: IN)
  }

  type ComboInput {
    id: ID! @id
    type: String!
    input: String!
    moveID: ID
    prevInput: [ComboInput!]! @relationship(type: "NEXT_MOVE", direction: IN)
    nextInput: [ComboInput!]! @relationship(type: "NEXT_MOVE", direction: OUT)
  }

  type Combo {
    id: ID! @id
    lastModified: DateTime! @timestamp
    name: String!
    inputs: [ComboInput!]! @relationship(type: "NEXT_MOVE", direction: OUT)
    users: [Character!]! @relationship(type: "HAS_COMBO", direction: IN)
    launchers: [Move!]!
      @relationship(
        type: "USES_LAUNCHER"
        properties: "UsesLauncher"
        direction: OUT
      )
    tags: [ComboTag!]! @relationship(type: "HAS_COMBO_TAG", direction: IN)
  }

  interface UsesLauncher @relationshipProperties {
    type: String!
  }

  union Tag = CharacterTag | ComboTag | MoveTag

  type Stance {
    id: ID! @id
    lastModified: DateTime! @timestamp
    name: String!
    notation: String!
    summary: String!
    transitions: [String!]!
    users: [Character!]! @relationship(type: "HAS_STANCE", direction: IN)
    moves: [Move!]! @relationship(type: "STANCE_MOVE", direction: OUT)
  }

  type CharacterTag {
    id: ID! @id
    lastModified: DateTime! @timestamp
    tag: String!
    value: String!
    characters: [Character!]!
      @relationship(type: "HAS_CHARACTER_TAG", direction: OUT)
  }

  type ComboTag {
    id: ID! @id
    lastModified: DateTime! @timestamp
    tag: String!
    value: String!
    combos: [Combo!]! @relationship(type: "HAS_COMBO_TAG", direction: OUT)
  }

  type MoveTag {
    id: ID! @id
    lastModified: DateTime! @timestamp
    tag: String!
    value: String!
    moves: [Move!]! @relationship(type: "HAS_MOVE_TAG", direction: OUT)
  }

  type Term {
    id: ID! @id
    lastModified: DateTime! @timestamp
    name: String!
    description: String!
  }

  type RecommendedCharacter {
    id: ID!
    name: String!
    image: String!
    similarity: Float!
  }

  type Mutation {
    setCharTag(charID: ID!, tagID: ID!, tag: String!): CharacterTag
      @cypher(
        statement: """
        MATCH (c:Character {id: $charID})
        MATCH (t:CharacterTag {id: $tagID})
        OPTIONAL MATCH (c)<-[r]-(:CharacterTag {tag: $tag})
        DELETE r
        CREATE (c)<-[:HAS_CHARACTER_TAG]-(t)
        RETURN t
        """
      )

    deleteChar(charID: ID!): Character
      @cypher(
        statement: """
        MATCH (n:Character {id: $charID})
        OPTIONAL MATCH (n)-->(m:Move)
        OPTIONAL MATCH (n)-->(s:Stance)
        OPTIONAL MATCH (n)-->(c:Combo)
        DETACH DELETE n,m,s,c
        RETURN null
        """
      )

    makeCombo(
      charID: ID!
      name: String!
      type: String!
      input: String!
      tagType: String!
      tagName: String!
    ): Combo
      @cypher(
        statement: """
        MATCH (c:Character {id: $charID})
        MATCH (t:ComboTag {tag: $tagName, value: $tagType})
        CREATE (c)-[:HAS_COMBO]->(n:Combo {id: randomuuid(), lastModified: datetime(), name: $name})-[:NEXT_MOVE]->(:ComboInput {id: randomuuid(), type: $type, input: $type})
        CREATE (n)<-[:HAS_COMBO_TAG]-(t)
        RETURN n
        """
      )

    removeCombo(comboID: ID!): Combo
      @cypher(
        statement: """
        MATCH p = (:Combo {id: $comboID})-[:NEXT_MOVE*]->()
        WITH collect(p) as paths, max(length(p)) as maxLength
        WITH [p IN paths WHERE length(p) = maxLength] as longestPaths
        FOREACH(n IN nodes(head(longestPaths)) | DETACH DELETE n)
        RETURN null
        """
      )

    addInput(
      comboID: ID!
      type: String!
      input: String!
      moveID: ID
    ): ComboInput
      @cypher(
        statement: """
        MATCH p = (:Combo {id: $comboID})-[:NEXT_MOVE*]->()
        WITH collect(p) as paths, max(length(p)) as maxLength
        WITH [p IN paths WHERE length(p) = maxLength] as longestPaths
        WITH last(nodes(head(longestPaths))) as lastNode
        CREATE (lastNode)-[:NEXT_MOVE]->(n:ComboInput {id: randomuuid(), type: $type, input: $input, moveID: $moveID})
        RETURN n
        """
      )

    removeInput(inputID: ID!): ComboInput
      @cypher(
        statement: """
        MATCH (n:ComboInput {id: $inputID})
        OPTIONAL MATCH (b:ComboInput)-[:NEXT_MOVE]->(n)
        OPTIONAL MATCH (n)-[:NEXT_MOVE]->(a:ComboInput)
        FOREACH(x IN CASE WHEN a IS NULL THEN [] ELSE [a] END |
          FOREACH(y IN CASE WHEN b IS NULL THEN [] ELSE [b] END |
            CREATE (y)-[:NEXT_MOVE]->(x)))
        DETACH DELETE n
        RETURN null
        """
      )

    updateSimilarities: String!
      @cypher(
        statement: """
        CALL gds.graph.project('charGraph', {Character: {properties: ['poke', 'keepout', 'mixup', 'defense', 'pressure', 'whiffPunish']}}, '*')
        YIELD graphName
        WITH count(*) as dummy
        OPTIONAL MATCH ()-[s:SIMILAR]->()
        DELETE s
        WITH count(*) as dummy
        CALL gds.knn.write('charGraph', {topK: 5, nodeProperties: ['poke', 'keepout', 'mixup', 'pressure', 'defense', 'whiffPunish'], writeRelationshipType: 'SIMILAR', writeProperty: 'similarity', concurrency: 1, randomSeed: 1738, sampleRate: 1.0, deltaThreshold: 0.0})
        YIELD relationshipsWritten
        WITH count(*) as dummy
        CALL gds.graph.drop('charGraph')
        YIELD graphName
        RETURN graphName
        """
      )
  }

  type Query {
    getInputs(comboID: ID!): [ComboInput!]!
      @cypher(
        statement: """
        MATCH (:Combo {id: $comboID})-[:NEXT_MOVE*]->(n)
        RETURN n
        """
      )

    getTagList(offset: Int!, limit: Int!): [Tag!]!
      @cypher(
        statement: """
        MATCH (n)
        WHERE n:MoveTag OR n:ComboTag OR n:CharacterTag
        RETURN n
        ORDER BY n.tag, n.value
        SKIP $offset
        LIMIT $limit
        """
      )

    getTagCount: Int!
      @cypher(
        statement: """
        MATCH (n)
        WHERE n:MoveTag OR n:ComboTag OR n:CharacterTag
        RETURN count(n)
        """
      )

    getGraphStatus: Boolean!
      @cypher(
        statement: """
        CALL gds.graph.exists('charGraph')
        YIELD exists
        RETURN exists
        """
      )

    getRecommendedChar: RecommendedCharacter!
      @cypher(
        statement: """
        CALL gds.graph.project('charGraph', {Character: {properties: ['poke', 'keepout', 'mixup', 'defense', 'pressure', 'whiffPunish']}}, '*')
        YIELD nodeCount
        WITH count(*) as dummy
        CALL gds.knn.stream('charGraph', {topK: 1, nodeProperties: ['poke', 'keepout', 'mixup', 'pressure', 'defense', 'whiffPunish'], perturbationRate: 0.5, concurrency: 1, sampleRate: 1.0, deltaThreshold: 0.0}) YIELD node1, node2, similarity
        WITH gds.util.asNode(node1) as char1, gds.util.asNode(node2) as char2, similarity
        WHERE char1.name='Test'
        WITH char2, similarity, count(*) as dummy
        CALL gds.graph.drop('charGraph') YIELD graphName
        WITH {id: char2.id, name: char2.name, image: char2.imageURL, similarity: similarity} as ReturnedChar
        RETURN ReturnedChar
        """
      )
  }
`;

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "brandy2024")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

await neoSchema.getSchema();

await neoSchema.assertIndexesAndConstraints({ options: { create: true } });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
});
