import throttle from "lodash/throttle";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const THRESHOLD = 600;

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = throttle(() => {
      const newVisible = window.pageYOffset >= THRESHOLD;
      setVisible(newVisible);
    }, 200);

    window.addEventListener("scroll", handler, { passive: true });

    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-6 inline-block">
      <button
        className="text-xl p-3 bg-gray-700 rounded-full opacity-50 hover:opacity-75"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
