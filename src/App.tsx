import { useEffect } from "react";
import Form from "./components/Form";
import CodeEditor from "./components/CodeEditor";
import DarkMode from "./components/DarkMode";
import { useAppDispatch } from "./app/store";
import { toggleDarkMode } from "./app/features/globalSlice";
import PreviwCode from "./components/PreviwCode";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(toggleDarkMode());
  }, []);

  return (
    <main className="dark:bg-primaryBg bg-white ">
      <DarkMode />
      <CodeEditor initialValue="const a=1" />
      <Form />

      <PreviwCode />
    </main>
  );
}

export default App;
