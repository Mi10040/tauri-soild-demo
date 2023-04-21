import { getCurrent } from "@tauri-apps/api/window";
// SolidJs
type HeaderProps = {};

const Header = (props: HeaderProps) => {
  // tauri SolidJs window close
  const windowClose = () => {
    getCurrent().close();
  };
  
  // tauri SolidJs window maximize and unmaximize
  const windowMaximize = async () => {
    (await getCurrent().isMaximized())
      ? getCurrent().unmaximize()
      : getCurrent().maximize();
  };
  // tauri SolidJs window minimize
  const windowMinimize = () => {
    getCurrent().minimize();
  };

  return (
    <div
      data-tauri-drag-region
      style={{ width: "100vw", background: "yellow" }}
    >
      <div
        onClick={windowClose}
        class="container"
        style={{ display: "inline-block", background: "goldenrod" }}
      >
        关闭
      </div>
      <div
        onClick={windowMaximize}
        class="container"
        style={{ display: "inline-block", background: "antiquewhite" }}
      >
        最大化
      </div>
      <div
        onClick={windowMinimize}
        class="container"
        style={{ display: "inline-block", background: "antiquewhite" }}
      >
        最小化
      </div>
    </div>
  );
};

export default Header;
