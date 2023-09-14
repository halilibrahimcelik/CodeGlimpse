import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getSelectedCode } from "../app/features/globalSlice";

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
     window.addEventListener("message", (event) => {

      try {
        eval(event.data);
      } catch (err) {
        const root = document.querySelector("#root");
        root.innerHTML = '<div style="color: red;text-align:center;"><h4>Runtime Error</h4>' + err + '</div>';
     console.error(err);
      }

     },false)
    </script>
  </body>
  </html>
`;
const PreviwCode: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const code = useSelector(getSelectedCode);
  useEffect(() => {
    if (iframeRef.current) iframeRef.current.srcdoc = html;
    iframeRef.current?.contentWindow?.postMessage(code, "*");
  }, [code]);
  return (
    <div className="iframe-preview relative  h-full after:content-[''] after:opacity-0 after:bg-transparent after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0">
      <iframe
        ref={iframeRef}
        className="dark:bg-grayLight bg-primaryBgLight w-full h-full"
        title="Code Preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default PreviwCode;
