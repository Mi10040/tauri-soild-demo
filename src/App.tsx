import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import style from "./viteTest.module.less";

function App() {
  const [test, setTest] = createSignal(0);
  // const [greetMsg, setGreetMsg] = createSignal("");
  // const [name, setName] = createSignal("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name: name() }));
  // }
  const add = () => {
    setTest((val) => val + 1);
  };

  const del = () => {
    setTest((val) => val - 1);
  };

  return (
    <div class={style.test}>
      <button onClick={add}>+</button>
      <button onClick={del}>-</button>
      {test}
    </div>
  );
}

export default App;
