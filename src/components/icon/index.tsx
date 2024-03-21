import { JSX, Component, mergeProps } from "solid-js";
import style from "./iconfont.module.less";

interface IconProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  type: string;
}

const Icon: Component<IconProps> = (props) => {
  const finalProps = mergeProps({}, props);
  return (
    <i class={style.iconfont} {...finalProps}>
      {finalProps.type}
    </i>
  );
};

export default Icon;
