import { lazy } from "solid-js";

export const routerList = [
  {
    path: "/",
    component: lazy(() => import("../page/a")),
  },
  {
    path: "/char",
    component: lazy(() => import("../page/char")),
  },
  {
    path: "/B",
    component: lazy(() => import("../page/b")),
  },
];
