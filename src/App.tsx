import { For, createContext, lazy } from "solid-js";
import { createStore } from "solid-js/store";
import Layout from "./layout";

const CounterContext = createContext([{ count: 0 }, {}]);

const App = () => {
  const [state, setState] = createStore({ count: 0, url: "" });
  const [moduleList, setModuleList] = createStore([
    {
      pageName: "A",
      module: lazy(() => import("./components/draggableDome")),
    }
  ]);
  
  const counter = [state];

  return (
    <CounterContext.Provider value={counter}>
      <Layout>
        <For each={moduleList}>{(module) => <module.module />}</For>
      </Layout>
    </CounterContext.Provider>
  );
};

export default App;
