import { createSignal } from "solid-js";
import { abilityModifier, defaultChar, saveToLocal, loadFromLocal } from "../../utils/char";

type Stats = {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
};

const roll4d6_drop_lowest = () => {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  return rolls.slice(1).reduce((s, v) => s + v, 0);
};

const genStats = (): Stats => ({
  STR: roll4d6_drop_lowest(),
  DEX: roll4d6_drop_lowest(),
  CON: roll4d6_drop_lowest(),
  INT: roll4d6_drop_lowest(),
  WIS: roll4d6_drop_lowest(),
  CHA: roll4d6_drop_lowest(),
});

export default function CharPage() {
  const saved = loadFromLocal("dnd_char");
  const initial = saved || defaultChar();

  const [name, setName] = createSignal(initial.name || "");
  const [race, setRace] = createSignal(initial.race || "Human");
  const [clas, setClas] = createSignal(initial.clas || "Fighter");
  const [level, setLevel] = createSignal(initial.level || 1);
  const [stats, setStats] = createSignal<Stats>(initial.stats || genStats());

  const regenerate = () => setStats(genStats());

  const save = () => {
    const obj = { name: name(), race: race(), clas: clas(), level: level(), stats: stats() };
    const ok = saveToLocal("dnd_char", obj);
    if (ok) alert("已保存到本地");
    else alert("保存失败");
  };

  const load = () => {
    const s = loadFromLocal("dnd_char");
    if (s) {
      setName(s.name || "");
      setRace(s.race || "Human");
      setClas(s.clas || "Fighter");
      setLevel(s.level || 1);
      setStats(s.stats || genStats());
    } else alert("没有本地保存的数据");
  };

  const exportJSON = () => {
    const obj = { name: name(), race: race(), clas: clas(), level: level(), stats: stats() };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `${name() || "character"}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const printCard = () => window.print();

  return (
    <div class="min-h-screen bg-gray-50 p-6 font-sans">
      <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-semibold mb-4">DND3.5R 人物卡 — 自动生成器</h1>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700">姓名</label>
            <input value={name()} onInput={(e) => setName(e.currentTarget.value)} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">职业</label>
            <select value={clas()} onChange={(e) => setClas(e.currentTarget.value)} class="mt-1 block w-full rounded-md border-gray-300">
              <option>Fighter</option>
              <option>Wizard</option>
              <option>Rogue</option>
              <option>Cleric</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">等级</label>
            <input type="number" min={1} value={level()} onInput={(e) => setLevel(Number(e.currentTarget.value))} class="mt-1 block w-full rounded-md border-gray-300" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="col-span-2">
            <div class="text-sm text-gray-600">属性生成： 4d6 去掉最低值（自动）</div>
          </div>
          <div class="flex items-center justify-end gap-2">
            <button onClick={regenerate} class="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md">重新生成</button>
            <button onClick={save} class="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-md">保存</button>
            <button onClick={load} class="inline-flex items-center px-3 py-2 bg-gray-200 rounded-md">加载</button>
            <button onClick={exportJSON} class="inline-flex items-center px-3 py-2 bg-yellow-500 text-white rounded-md">导出 JSON</button>
            <button onClick={printCard} class="inline-flex items-center px-3 py-2 bg-gray-800 text-white rounded-md">打印</button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-6">
          <For each={["STR", "DEX", "CON", "INT", "WIS", "CHA"] as Array<keyof Stats>}>
            {(key) => (
              <div class="p-4 bg-gray-50 rounded-md text-center">
                <div class="text-sm text-gray-500">{key}</div>
                <div class="text-3xl font-bold">{stats()[key]}</div>
                <div class="text-sm text-gray-600">{(abilityModifier(stats()[key]) >= 0 ? "+" : "") + abilityModifier(stats()[key])}</div>
              </div>
            )}
          </For>
        </div>

        <div class="border-t pt-4">
          <h2 class="text-lg font-medium mb-2">人物卡预览</h2>
          <div class="flex items-start gap-6">
            <div class="w-1/3 bg-gray-100 p-4 rounded">
              <div class="text-xs text-gray-500">姓名</div>
              <div class="text-xl font-semibold">{name() || "未命名"}</div>
              <div class="text-xs text-gray-500 mt-3">职业 / 种族 / 等级</div>
              <div class="text-sm">{clas()} / {race()} / {level()}</div>
            </div>

            <div class="flex-1 bg-gray-100 p-4 rounded">
              <div class="grid grid-cols-6 gap-2 text-center">
                <div class="text-xs text-gray-500">STR</div>
                <div class="text-xs text-gray-500">DEX</div>
                <div class="text-xs text-gray-500">CON</div>
                <div class="text-xs text-gray-500">INT</div>
                <div class="text-xs text-gray-500">WIS</div>
                <div class="text-xs text-gray-500">CHA</div>

                <div class="text-lg font-bold">{stats().STR}</div>
                <div class="text-lg font-bold">{stats().DEX}</div>
                <div class="text-lg font-bold">{stats().CON}</div>
                <div class="text-lg font-bold">{stats().INT}</div>
                <div class="text-lg font-bold">{stats().WIS}</div>
                <div class="text-lg font-bold">{stats().CHA}</div>

                <div class="text-sm text-gray-600">{(abilityModifier(stats().STR) >= 0 ? "+" : "") + abilityModifier(stats().STR)}</div>
                <div class="text-sm text-gray-600">{(abilityModifier(stats().DEX) >= 0 ? "+" : "") + abilityModifier(stats().DEX)}</div>
                <div class="text-sm text-gray-600">{(abilityModifier(stats().CON) >= 0 ? "+" : "") + abilityModifier(stats().CON)}</div>
                <div class="text-sm text-gray-600">{(abilityModifier(stats().INT) >= 0 ? "+" : "") + abilityModifier(stats().INT)}</div>
                <div class="text-sm text-gray-600">{(abilityModifier(stats().WIS) >= 0 ? "+" : "") + abilityModifier(stats().WIS)}</div>
                <div class="text-sm text-gray-600">{(abilityModifier(stats().CHA) >= 0 ? "+" : "") + abilityModifier(stats().CHA)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
