import Layout from "./layout";
import PageCounter, { CounterContext } from "./components/PageCounter";
import { For, lazy, useContext } from "solid-js";
import { createStore } from "solid-js/store";


const App = () => {
  const [state] = useContext<any>(CounterContext);

  return (
    <PageCounter store={state}>
      <Layout>
      </Layout>
    </PageCounter>
  );
};

export default App;
