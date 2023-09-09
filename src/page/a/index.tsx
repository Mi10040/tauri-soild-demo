import { useContext } from "solid-js";
import { CounterContext } from "../../components/PageCounter";



const Apage = () => {
    const [state, { increment }] = useContext<any>(CounterContext);

    return <div>
        {`A:${state.count}`}
        <button onClick={() => { increment() }}>increment</button>
    </div>
}


export default Apage