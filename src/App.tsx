import { useEffect } from "react";
import DarkMode from "./components/DarkMode";
import { useAppDispatch } from "./app/store";
import { toggleDarkMode } from "./app/features/globalSlice";
import TextEditor from "./components/TextEditor";
// import CodeCell from "./components/CodeCell";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleDarkMode());
    localStorage.setItem("language", "javascript");
  }, []);

  return (
    <main className="dark:bg-primaryBg bg-white h-[100vh] ">
      <DarkMode />
      {/* <CodeCell /> */}
      <TextEditor />
    </main>
  );
}

export default App;
