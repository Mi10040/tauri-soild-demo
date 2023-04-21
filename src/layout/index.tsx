import { JSX } from "solid-js/jsx-runtime";
import Header from "./header";

// SolidJs
type LayoutProps = {
  children: JSX.Element;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
