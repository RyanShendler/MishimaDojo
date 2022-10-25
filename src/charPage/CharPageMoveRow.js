import { useQuery } from "@apollo/client";
import { GET_MOVE_PROPS } from "../queries/GET_MOVE_PROPS";
import { GET_MOVE_SUMMARY } from "../queries/GET_MOVE_SUMMARY";
import { GET_MOVE_TAGS } from "../queries/GET_MOVE_TAGS";
import Error from "../utility/Error";
import Loading from "../utility/Loading";

const CharPageMoveRow = ({ moveID, moveName, moveInput }) => {
  const {
    data: propsData,
    loading: propsLoading,
    error: propsError,
  } = useQuery(GET_MOVE_PROPS, {
    variables: {
      where: {
        id: moveID,
      },
    },
  });
  const {
    data: sumData,
    loading: sumLoading,
    error: sumError,
  } = useQuery(GET_MOVE_SUMMARY, {
    variables: {
      where: {
        id: moveID,
      },
    },
  });
  const {
    data: tagData,
    loading: tagLoading,
    error: tagError,
  } = useQuery(GET_MOVE_TAGS, {
    variables: {
      where: {
        id: moveID,
      },
    },
  });

  return (
    <tr className="border border-black">
      <td className="border border-black text-center">{moveName}</td>
      <td className="border border-black text-center">{moveInput}</td>
      <td className="border border-black text-center">
        {propsLoading ? (
          <Loading />
        ) : propsError ? (
          <Error />
        ) : !propsData.moves.length ? (
          "Move Not Found"
        ) : (
          `i${propsData.moves[0].startup}`
        )}
      </td>
      <td className="border border-black text-center">
        {propsLoading ? (
          <Loading />
        ) : propsError ? (
          <Error />
        ) : !propsData.moves.length ? (
          "Move Not Found"
        ) : (
          `${propsData.moves[0].onHit}/${propsData.moves[0].onCH}/${propsData.moves[0].onBlock}`
        )}
      </td>
      <td className="border border-black text-center">
        {propsLoading ? (
          <Loading />
        ) : propsError ? (
          <Error />
        ) : !propsData.moves.length ? (
          "Move Not Found"
        ) : (
          `${propsData.moves[0].damageHit}/${propsData.moves[0].damageCH}`
        )}
      </td>
      <td className="border border-black text-center">
        {sumLoading ? (
          <Loading />
        ) : sumError ? (
          <Error />
        ) : !sumData.moves.length ? (
          "Move Not Found"
        ) : (
          <pre className="whitespace-pre-wrap p-1 font-sans text-sm">
            {sumData.moves[0].summary}
          </pre>
        )}
      </td>
      <td className="border border-black text-center">
        {tagLoading ? (
          <Loading />
        ) : tagError ? (
          <Error />
        ) : !tagData.moves.length ? (
          <h6>Move Not Found</h6>
        ) : (
          <div className="flex flex-col">
            {tagData.moves[0].tags.map((tag) => {
              return (
                <h6
                  key={tag.id}
                  className="text-sm"
                >{`${tag.tag}(${tag.value})`}</h6>
              );
            })}
          </div>
        )}
      </td>
    </tr>
  );
};

export default CharPageMoveRow;
