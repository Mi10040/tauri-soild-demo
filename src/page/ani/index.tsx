import { For, createEffect, createSignal, lazy, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { invoke } from "@tauri-apps/api";

const doem = () => {
  const [name, setName] = createSignal("Misaka10040");
  const [pass, setPass] = createSignal("Kk18244257586");
  const [ani, setAni] = createSignal("11802");
  const [img, setImg] = createSignal("");
  return (
    <div>
      <input
        value={name()}
        onChange={(e) => {
          setName(() => e.currentTarget.value);
        }}
      />
      <input
        value={pass()}
        onChange={(e) => {
          setPass(() => e.currentTarget.value);
        }}
      />
      <button
        onclick={async () => {
          await invoke("login", {
            username: name(),
            password: pass(),
          }).then((data) => {
            console.log(data);
          });
        }}
      >
        Login
      </button>
      <input
        value={ani()}
        onChange={(e) => {
          setAni(() => e.currentTarget.value);
        }}
      />
      <button
        onclick={async () => {
          await invoke("query", { name: ani() }).then((data) => {
            console.log(data);
          });
        }}
      >
        Query
      </button>

      <button
        onclick={async () => {
          await invoke("logout", {}).then((data) => {
            console.log(data);
          });
        }}
      >
        Logout
      </button>
      <button
        onclick={async () => {
          await invoke("updated", {}).then((data) => {
            console.log(data);
            const imgsList = `${data}`.split("|");
            setImg(imgsList[imgsList.length - 1]);
          });
        }}
      >
        updated
      </button>
      <br />
      {img() === "" ? (
        ""
      ) : (
        <img
          src={`https://cdn-eu.anidb.net/images/main/${img()}`}
          referrerpolicy="no-referrer"
        />
      )}
    </div>
  );
};
