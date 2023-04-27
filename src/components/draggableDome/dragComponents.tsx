import { createContext, useContext } from "solid-js";
import "./index.less";
import { createStore } from "solid-js/store";

export const CounterContext = createContext([{ count: 0 }, {}]);

const DragComponents = (props: any) => {
  const { onMouseDown, onMouseEnter, children } = props;
  const [state, setState] = createStore({
    // ref: null as HTMLDivElement | null,
    count: props.count || 0,
  });
  const counter = [
    state,
    {
      inits(ref: any) {
        // setState("ref", ref);
      },
      tsa() {
        setState("count", (c) => c + 1);
      },
    },
  ];

  return (
    <CounterContext.Provider value={counter}>
      <div
        class="domeBox"
        ref={(ref) => {}}
        // ref={props.ref}
        // onMouseDown={() => onMouseDown(state.ref) as any}
        onMouseEnter={() => onMouseEnter() as any}
      >
        {children}
      </div>
    </CounterContext.Provider>
  );
};

export default DragComponents;
