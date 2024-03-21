import Header from "./header";
import { ParentComponent, children } from "solid-js";

const Layout: ParentComponent = (props) => {
  const safeChildren = children(() => props.children);
  return (
    <div>
      <Header />
      {safeChildren()}
    </div>
  );
};

export default Layout;
