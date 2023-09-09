import { lazy } from "solid-js";

export type RouterType = Array<{
    pageName: string
    module: any
}>

export const router: RouterType = [
    {
        pageName: "A",
        module: lazy(() => import("../page/a")),
    },
    {
        pageName: "B",
        module: lazy(() => import("../page/b")),
    }
]