import "./index.less";
import { createStore } from "solid-js/store";

const Drag = (props: any) => {
  const { onMouseDown, onMouseEnter, children } = props;
  const [state, setState] = createStore({ ref: null as HTMLDivElement | null });

  return (
    <div
      class="domeBox"
      ref={(ref) => {
        setState("ref", ref);
      }}
      onMouseDown={(e) => onMouseDown(state.ref)(e) as any}
      onMouseEnter={() => onMouseEnter(state.ref) as any}
    >
      {children}
    </div>
  );
};

export default Drag;
