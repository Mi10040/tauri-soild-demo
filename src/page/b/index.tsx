import { useContext } from "solid-js";
import { CounterContext } from "../../components/PageCounter";



const Bpage = () => {
    const [state, { decrement }] = useContext<any>(CounterContext);

    return <div>
        {`B:${state.count}`}
        <button onClick={decrement}>decrement</button>
    </div>
}

export default Bpage
