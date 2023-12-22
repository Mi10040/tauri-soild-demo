import Layout from "./layout";
import PageCounter, { CounterContext } from "./components/PageCounter";
import { For, lazy, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { invoke } from "@tauri-apps/api";

const App = () => {
  const [state] = useContext<any>(CounterContext);

  return (
    <PageCounter store={state}>
      <Layout>
        {/* <For  /> */}
        <button
          onclick={async () => {
            await invoke("greet", { name: "111" }).then((data)=>{
              console.log(data)
            })
          }}
        >
          TEST
        </button>
      </Layout>
    </PageCounter>
  );
};

export default App;
