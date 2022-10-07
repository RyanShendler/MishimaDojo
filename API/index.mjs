import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server";
import neo4j from "neo4j-driver";

const typeDefs = gql`
  type Character {
    charID: ID! @id
    lastModified: DateTime! @timestamp
    name: String!
    imageURL: String!
    summary: String!
    strengths: [String!]!
    weaknesses: [String!]!
    moves: [Move!]! @relationship(type: "HAS_MOVE", direction: OUT)
    stances: [Stance!]! @relationship(type: "HAS_STANCE", direction: OUT)
    combos: [Combo!]! @relationship(type: "HAS_COMBO", direction: OUT)
    tags: [CharacterTag!]!
      @relationship(type: "HAS_CHARACTER_TAG", direction: IN)
  }

  type Move {
    moveID: ID! @id
    lastModified: DateTime! @timestamp
    name: String!
    input: String!
    startup: Int!
    onHit: Int!
    onCH: Int!
    onBlock: Int!
    summary: String!
    damageHit: Int!
    damageCH: Int!
    users: [Character!]! @relationship(type: "HAS_MOVE", direction: IN)
    stances: [Stance!]! @relationship(type: "STANCE_MOVE", direction: IN)
    combos: [Combo!]! @relationship(type: "USES_LAUNCHER", direction: IN)
    tags: [MoveTag!]! @relationship(type: "HAS_MOVE_TAG", direction: IN)
  }

  type Combo {
    comboID: ID! @id
    lastModified: DateTime! @timestamp
    input: String!
    damage: Int!
    users: [Character!]! @relationship(type: "HAS_COMBO", direction: IN)
    launchers: [Move!]! @relationship(type: "USES_LAUNCHER", direction: OUT)
    tags: [ComboTag!]! @relationship(type: "HAS_COMBO_TAG", direction: IN)
  }

  type Stance {
    stanceID: ID! @id
    lastModified: DateTime! @timestamp
    name: String!
    notation: String!
    summary: String!
    transitions: [String!]!
    users: [Character!]! @relationship(type: "HAS_STANCE", direction: IN)
    moves: [Move!]! @relationship(type: "STANCE_MOVE", direction: OUT)
  }

  type CharacterTag {
    charTagID: ID! @id
    lastModified: DateTime! @timestamp
    tag: String!
    value: String!
    characters: [Character!]!
      @relationship(type: "HAS_CHARACTER_TAG", direction: OUT)
  }

  type ComboTag {
    comboTagID: ID! @id
    lastModified: DateTime! @timestamp
    tag: String!
    value: String!
    combos: [Combo!]! @relationship(type: "HAS_COMBO_TAG", direction: OUT)
  }

  type MoveTag {
    moveTagID: ID! @id
    lastModified: DateTime! @timestamp
    tag: String!
    value: String!
    moves: [Move!]! @relationship(type: "HAS_MOVE_TAG", direction: OUT)
  }

  type Mutation {
    mergeCharacter(
      name: String!
      imageURL: String!
      summary: String!
      strengths: [String!]!
      weaknesses: [String!]!
    ): Character
      @cypher(
        statement: """
        MERGE (c:Character {name:$name})
        ON CREATE SET c.name = $name, c.imageURL = $imageURL, c.summary = $summary, c.strengths = $strengths, c.weaknesses = $weaknesses
        RETURN c
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
