import { ParentComponent, createContext, } from "solid-js";
import { createStore } from "solid-js/store";
import { router } from "../../config/pageConfig";
;

export const CounterContext = createContext([{ router }, {}]);

type PageCounterContextProps = {
    store: any
}

const Page: ParentComponent<PageCounterContextProps> = (props) => {
    const [state, setState] = createStore({ ...props.store });

    const counter: any = [state, {
        push() {

        }
    }];

    return (
        <CounterContext.Provider value={counter}>
            {props.children}
        </CounterContext.Provider>
    );
};

export default Page;
