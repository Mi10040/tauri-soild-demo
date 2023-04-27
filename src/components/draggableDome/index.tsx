import { Accessor, For, createEffect, createSignal, lazy } from "solid-js";
import { cloneDeep, cloneDeepWith, isElement } from "lodash";
import "./index.less";
import { createStore } from "solid-js/store";
import Drag from "./dragComponents";

type eventType = DragEvent & {
  currentTarget: HTMLDivElement;
  target: Element;
};
// HTMLElement
const draggable = () => {
  const [state, setState] = createStore({
    list: ["111", "222", "333"],
    beforeList: [] as string[],
    dragFlg: false,
    dragItem: null as number | null,
    toItem: null as number | null,
    isDomX: null as number | null,
    isDomY: null as number | null,
  });

  const onMouseDowns =
    (index: Accessor<number>) => (dom: HTMLDivElement) => (e: eventType) => {
      setState({
        dragFlg: true,
        beforeList: cloneDeep(state.list),
        dragItem: index(),
      });
      const domClone = cloneDeepWith(dom, (val) => {
        if (isElement(val)) return val.cloneNode(true);
      });
      domClone.style.position = "fixed";
      domClone.style.pointerEvents = "none";
      // 减去外边框的宽度
      domClone.style.left = dom.offsetLeft - 10 + "px";
      domClone.style.top = dom.offsetTop + "px";
      document.body.appendChild(domClone);
      document.onmousemove = (mousemoveEvent) => {
        if (state.isDomX === null || state.isDomY === null) {
          setState({
            isDomX: mousemoveEvent.pageX - (dom.offsetLeft - 10),
            isDomY: mousemoveEvent.pageY - dom.offsetTop,
          });
        } else {
          // 减去外边框的宽度
          domClone.style.left = mousemoveEvent.pageX - state.isDomX + "px";
          domClone.style.top = mousemoveEvent.pageY - state.isDomY + "px";
        }
      };
      document.onmouseup = onDragEnds(dom, domClone);
      dom.classList.add("dragging");
    };

  const onDragEnds = (dom: HTMLDivElement, domClone: any) => () => {
    setState({
      dragFlg: false,
      dragItem: null,
      toItem: null,
      isDomX: null,
      isDomY: null,
    });
    domClone.remove();
    dom.classList.remove("dragging");
    document.onmousemove = null;
    document.onmouseup = null;
  };

  const onMouseEnters = (index: Accessor<number>) => () => {
    const _i = index();
    if (state.dragFlg && state.dragItem !== null && state.toItem !== _i) {
      const afterSequence = cloneDeep(state.beforeList);
      afterSequence.splice(state.dragItem, 1);
      afterSequence.splice(_i, 0, state.beforeList[state.dragItem]);
      setState({ list: afterSequence, toItem: _i });
    }
  };

  return (
    <div>
      <For each={state.list}>
        {(item, index) => (
          <Drag
            class="domeBox"
            onMouseDown={onMouseDowns(index) as any}
            onMouseEnter={onMouseEnters(index)}
          >
            <div style={{ background: "red" }}>{item}</div>
            <div style={{ background: "#993300" }}>{index()}</div>
            <button
              onClick={() => {
                console.log(index());
              }}
            >
              BUT
            </button>
          </Drag>
        )}
      </For>
    </div>
  );
};

export default draggable;
