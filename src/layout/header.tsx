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
    <div data-tauri-drag-region class="w-full bg-indigo-600 text-white">
      <div class="flex items-center justify-between px-4 py-2">
        <div class="flex items-center gap-4">
          <div class="font-bold">tauri-solid-demo</div>
          <a href="#/" class="text-sm opacity-90">首页</a>
          <a href="#/char" class="text-sm opacity-90">人物卡</a>
        </div>

        <div class="flex items-center gap-2">
          <button onClick={windowMinimize} class="bg-indigo-500 px-2 py-1 rounded">—</button>
          <button onClick={windowMaximize} class="bg-indigo-500 px-2 py-1 rounded">▢</button>
          <button onClick={windowClose} class="bg-red-600 px-2 py-1 rounded">✕</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
