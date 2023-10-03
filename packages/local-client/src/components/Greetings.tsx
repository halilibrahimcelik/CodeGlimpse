import { warningMessage } from "@/app/features/cellSlice";
import Container from "./Container";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/app/store";

const Greetings = () => {
  const dispatch = useAppDispatch();
  const handleCopy = () => {
    navigator.clipboard.writeText("npx codepadjs serve");
    dispatch(
      warningMessage({
        message: "Copied to clipboard",
        active: true,
      })
    );
  };
  return (
    <Container>
      <motion.article
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="dark:text-white  flex flex-col justify-center items-center gap-3"
      >
        <h1 className="text-3xl font-bold text-center my-2">
          Welcome to codepadjs
        </h1>
        <p>
          This is an online code and text editor and that lets you run at your
          local device in real time.
        </p>
        <p>
          You can use it to write and run JavaScript, TypeScript code and what
          you write is saved in your device where you can access it later.
        </p>
        <p>
          The file location is where where you run{" "}
          <code
            onClick={handleCopy}
            className="dark:bg-slate-300 cursor-pointer bg-primaryBg text-white font-bold rounded-md px-2 dark:text-black"
            title="Copy to clipboard"
          >
            {" "}
            npx codepadjs serve
          </code>{" "}
          command on your terminal.
        </p>
      </motion.article>
    </Container>
  );
};

export default Greetings;
