import { createSignal } from "solid-js";

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
  const [name, setName] = createSignal("");
  const [race, setRace] = createSignal("Human");
  const [clas, setClas] = createSignal("Fighter");
  const [stats, setStats] = createSignal<Stats>(genStats());

  const regenerate = () => setStats(genStats());

  return (
    <div class="min-h-screen bg-gray-50 p-6 font-sans">
      <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-semibold mb-4">DND3.5R 人物卡 — 自动生成器</h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="col-span-2">
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
            <label class="block text-sm font-medium text-gray-700 mt-2">种族</label>
            <select value={race()} onChange={(e) => setRace(e.currentTarget.value)} class="mt-1 block w-full rounded-md border-gray-300">
              <option>Human</option>
              <option>Elf</option>
              <option>Dwarf</option>
              <option>Halfling</option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-between mb-4">
          <div class="text-sm text-gray-600">属性生成： 4d6 去掉最低值（自动）</div>
          <div>
            <button onClick={regenerate} class="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md mr-2">重新生成</button>
            <button onClick={() => setStats(genStats())} class="inline-flex items-center px-3 py-2 bg-gray-200 rounded-md">快速生成</button>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="p-4 bg-gray-50 rounded-md">
            <div class="text-sm text-gray-500">STR</div>
            <div class="text-3xl font-bold">{stats().STR}</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-md">
            <div class="text-sm text-gray-500">DEX</div>
            <div class="text-3xl font-bold">{stats().DEX}</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-md">
            <div class="text-sm text-gray-500">CON</div>
            <div class="text-3xl font-bold">{stats().CON}</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-md">
            <div class="text-sm text-gray-500">INT</div>
            <div class="text-3xl font-bold">{stats().INT}</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-md">
            <div class="text-sm text-gray-500">WIS</div>
            <div class="text-3xl font-bold">{stats().WIS}</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-md">
            <div class="text-sm text-gray-500">CHA</div>
            <div class="text-3xl font-bold">{stats().CHA}</div>
          </div>
        </div>

        <div class="border-t pt-4">
          <h2 class="text-lg font-medium mb-2">人物卡预览</h2>
          <div class="flex items-start gap-6">
            <div class="w-1/3 bg-gray-100 p-4 rounded">
              <div class="text-xs text-gray-500">姓名</div>
              <div class="text-xl font-semibold">{name() || "未命名"}</div>
              <div class="text-xs text-gray-500 mt-3">职业 / 种族</div>
              <div class="text-sm">{clas()} / {race()}</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
