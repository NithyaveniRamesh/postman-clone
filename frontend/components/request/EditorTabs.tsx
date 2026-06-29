"use client";

interface Props {
  active: string;
  setActive: (value: string) => void;
}

const tabs = [
  "Params",
  "Authorization",
  "Headers",
  "Body",
];

export default function EditorTabs({
  active,
  setActive,
}: Props) {
  return (
    <div className="flex border-b border-zinc-800 bg-[#202123]">

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-5 py-3 text-sm ${
            active === tab
              ? "border-b-2 border-orange-500 text-white"
              : "text-zinc-400"
          }`}
        >
          {tab}
        </button>
      ))}

    </div>
  );
}
