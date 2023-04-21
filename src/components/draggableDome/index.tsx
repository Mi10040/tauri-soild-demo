import { For, createEffect, createSignal } from "solid-js";
import { cloneDeepWith, isElement } from "lodash";
import "./index.less";
import { createStore } from "solid-js/store";

type eventType = DragEvent & {
  currentTarget: HTMLDivElement;
  target: Element;
};
// HTMLElement
const draggable = () => {
  const [state, setState] = createStore({ list: ["one", "tow", "soe"] });
  const onDragStarts = (e: eventType) => {
    const domClone = cloneDeepWith(e.target, (val) => {
      if (isElement(val)) return val.cloneNode(true);
    });
    domClone.style.position = "fixed";
    domClone.style.left = e.pageX + "px";
    domClone.style.top = e.pageY + "px";
    document.body.appendChild(domClone);
    document.addEventListener("mousemove", function (e) {
      domClone.style.left = e.pageX + "px";
      domClone.style.top = e.pageY + "px";
    });
    document.addEventListener("mouseup", onDragEnds(e, domClone) as any);
    e.target.classList.add("dragging");
  };
  const onDragEnds = (e: eventType, domClone: any) => () => {
    domClone.remove();
    document.removeEventListener("mousemove", () => {});
    e.target.classList.remove("dragging");
  };

  const onMouseEnters = () => {
    console.log("1")
  };

  return (
    <div>
      <For each={state.list}>
        {(item) => (
          <div
            class="domeBox"
            onMouseDown={onDragStarts as any}
            onMouseEnter={onMouseEnters}
          >
            {item}
          </div>
        )}
      </For>
      <button
        onClick={() => {
          setState("list", ["tow", "one", "soe"]);
        }}
      >
        交换
      </button>
    </div>
  );
};

export default draggable;
