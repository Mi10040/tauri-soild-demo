import { createContext, useContext } from "solid-js";
import "./index.less";
import { createStore } from "solid-js/store";
import { CounterContext } from "./dragComponents";

const dragArea = (props: any) => {
  const { children, onMouseDown } = props;
  const { ref } = useContext<any>(CounterContext);
  const [state, { tsa }] = useContext<any>(CounterContext);
  console.log(state);
  tsa()
  console.log(state);
  return (
    <div {...props} onMouseDown={() => onMouseDown(ref) as any}>
      {children}
    </div>
  );
};

export default dragArea;
