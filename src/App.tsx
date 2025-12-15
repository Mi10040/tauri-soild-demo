import Layout from "./layout";
import { For, createEffect, createMemo, useContext } from "solid-js";
import { Router } from "@solidjs/router";
import { routerList } from "./router";

const App = () => {

  return (
    <Layout>
      <Router>{routerList}</Router>
    </Layout>
  );
};

export default App;
