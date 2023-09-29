import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../app/features/globalSlice";
import { useAppDispatch } from "../app/store";
function DarkMode() {
  const isDarkMode = useSelector(selectDarkMode);
  const dispatch = useAppDispatch();

  const handleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark")
        ? "dark-theme"
        : "light-theme"
    );
    dispatch(toggleDarkMode());
  };

  return (
    <div className="flex flex-row p-2 items-center justify-end toggle dark:bg-primaryBg">
      <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
        <div className="relative  border-[2px] p-4   dark:border-white border-gray-900 w-16 h-8 rounded-full ">
          <input
            type="checkbox"
            name="dark-mode"
            id="dark-toggle"
            onChange={handleDarkMode}
            className="checkbox hidden "
          />
          <span
            title="Dark-Mode"
            className="absolute left-1 top-[0.35rem] w-6 h-6 text-[1.3rem]  dark:text-white block dark:hidden "
          >
            <MdDarkMode />
          </span>
          <span
            title="Light-Mode"
            className="absolute right-[0.35rem]   hidden dark:block top-[0.35rem] w-6 h-6 text-[1.3rem] text-white  text-red"
          >
            <MdLightMode />
          </span>

          <div
            className={`${
              isDarkMode ? "translate-x-[0%]" : "translate-x-[100%]"
            }  absolute left-[0.35rem] top-1 dark:bg-white z-10 bg-gray-800 w-6 h-6 rounded-full transition hover:opacity-70`}
          ></div>
        </div>
      </label>
    </div>
  );
}

export default DarkMode;
