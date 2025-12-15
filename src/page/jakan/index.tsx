import { AnimeSearchParameters, Jakan } from "jakan";
import { createMemo } from "solid-js";
const jakanpage = () => {
  const jakan = createMemo(() => new Jakan().withMemory().forSearch());
  return (
    <>
      <button
        onclick={() => {
          // jakan()
          //   .anime(1, "news")
          //   .then((data) => {
          //     console.log(data);
          //   });

          const myQuery: AnimeSearchParameters = {
            q: "宇宙皇子",
            page: 1,
          };

          jakan()
            .anime(myQuery)
            .then((data) => {
              console.log(data);
            });
        }}
      >
        11
      </button>
    </>
  );
};
