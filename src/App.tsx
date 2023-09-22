import { useEffect } from "react";
import DarkMode from "./components/DarkMode";
import { useAppDispatch } from "./app/store";
import { toggleDarkMode } from "./app/features/globalSlice";
import CellList from "./components/CellList";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleDarkMode());
    localStorage.setItem("language", "javascript");
  }, [dispatch]);

  return (
    <main className="dark:bg-primaryBg bg-white min-h-[110vh] ">
      <DarkMode />
      <CellList />
    </main>
  );
}

export default App;
