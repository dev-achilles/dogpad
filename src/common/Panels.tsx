import { Tab } from "@headlessui/react";
import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type TabConfig = {
  label: string;
  content: React.ReactNode;
};

export default function Panels({ tabs }: { tabs: TabConfig[] }) {
  const getTabClassName = ({ selected }) =>
    classNames(
      "w-full py-2.5 text-sm leading-5 rounded-lg",
      "focus:outline-none",
      selected
        ? "bg-mainDark shadow"
        : "bg-dark hover:bg-white/[0.12] hover:text-white"
    );

  return (
    <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 rounded-xl">
        {tabs.map((t) => (
          <Tab key={t.label} className={getTabClassName}>
            {t.label}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="mt-2">
        {tabs.map((t) => (
          <Tab.Panel key={t.label}>{t.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
