import { For, createEffect, createSignal, lazy, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { login, query, logout, updated } from "../../ipc";

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
        onClick={async () => {
          const data = await login(name(), pass());
          console.log(data);
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
        onClick={async () => {
          const data = await query(ani());
          console.log(data);
        }}
      >
        Query
      </button>

      <button
        onClick={async () => {
          const data = await logout();
          console.log(data);
        }}
      >
        Logout
      </button>
      <button
        onClick={async () => {
          const data = await updated();
          console.log(data);
          const imgsList = `${data}`.split("|");
          setImg(imgsList[imgsList.length - 1]);
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
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};
