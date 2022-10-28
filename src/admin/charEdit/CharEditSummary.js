import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CHAR_SUMMARY } from "../../queries/GET_CHAR_SUMMARY";
import Error from "../../utility/Error";
import Loading from "../../utility/Loading";
import CharEditSummaryText from "./CharEditSummaryText";

const CharEditSummary = ({ charID }) => {
  const { data, loading, error } = useQuery(GET_CHAR_SUMMARY, {
    variables: {
      where: {
        id: charID,
      },
    },
  });

  return (
    <div className="col-span-3">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : !data.characters.length ? (
        <h3>Character Not Found</h3>
      ) : (
        <CharEditSummaryText
          charID={charID}
          charSummary={data.characters[0].summary}
        />
      )}
    </div>
  );
};

export default CharEditSummary;
