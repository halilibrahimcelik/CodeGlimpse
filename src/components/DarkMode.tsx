import React, { useState } from "react";

import { MdDarkMode, MdLightMode } from "react-icons/md";
function DarkMode() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const handleDarkMode = () => {
    console.log("dark mode");
    document.documentElement.classList.toggle("dark");
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="flex flex-row items-center justify-end toggle dark:bg-primaryBgDark">
      <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            name="dark-mode"
            id="dark-toggle"
            onChange={handleDarkMode}
            className="checkbox hidden "
          />
          <span
            title="Light-Mode"
            className="absolute left-1 top-1 w-6 h-6 text-[1.3rem] dark:text-white  text-red"
          >
            <MdLightMode />
          </span>
          <span
            title="Dark-Mode"
            className="absolute right-1 top-1 w-6 h-6 text-[1.3rem] dark:text-white  text-red"
          >
            <MdDarkMode />
          </span>

          <div className="block border-[1px] dark:border-white border-gray-900 w-14 h-8 rounded-full"></div>
          <div className="dot absolute left-1 top-1 dark:bg-white z-10 bg-gray-800 w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
    </div>
  );
}

export default DarkMode;
