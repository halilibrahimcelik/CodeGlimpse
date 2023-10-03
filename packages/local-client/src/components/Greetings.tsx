import Container from "./Container";

const Greetings = () => {
  return (
    <Container>
      <article className="dark:text-white  flex flex-col justify-center gap-3">
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
          The file location is where where you run "npx codepadjs serve" command
          on your terminal.
        </p>
      </article>
    </Container>
  );
};

export default Greetings;
