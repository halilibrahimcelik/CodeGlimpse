import { useEffect } from "react";
import DarkMode from "./components/DarkMode";
import { useAppDispatch } from "./app/store";
import { toggleDarkMode } from "./app/features/globalSlice";
import CellList from "./components/CellList";
import { insertCellBefore } from "./app/features/cellSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleDarkMode());
    localStorage.setItem("language", "javascript");
    dispatch(
      insertCellBefore({
        id: null,
        type: "code",
      })
    );
  }, [dispatch]);

  return (
    <main className="dark:bg-primaryBg bg-white h-[100vh] ">
      <DarkMode />
      <CellList />
    </main>
  );
}

export default App;
