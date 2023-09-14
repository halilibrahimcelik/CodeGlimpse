// import Form from "./Form";
import CodeEditor from "./CodeEditor";
import Container from "./Container";
import Resizeable from "./Resizeable";

const CodeCell = () => {
  return (
    <Container>
      <Resizeable
        direction="vertical"
        children={<CodeEditor initialValue="const a=1" />}
      />
    </Container>
  );
};

export default CodeCell;
