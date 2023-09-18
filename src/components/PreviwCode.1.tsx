import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getSelectedCode, getSelectedInput } from "../app/features/globalSlice";
import { Props } from "./PreviwCode";

export const PreviwCode: React.FC<Props> = ({ language }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const inputCode = useSelector(getSelectedInput);
  const code = useSelector(getSelectedCode);
  const error = useSelector(getSelectedCode);
  console.log(error);
  const html = `
  <html>
    <head>
    <script src="https://cdn.tailwindcss.com"></script>

    </head>

    <body>
      <div id="root"></div>
      <div class="container mx-auto">
      ${language === "html" ? inputCode : ""}
      </div>
      <script>
      const handleError = (err) => {
        const root = document.querySelector("#root");
        root.innerHTML =
          '<div style="color: red;text-align:center;"><h4  class="text-3xl">Runtime Error</h4>' +
          '<p class="text-black texl-2xl">' +
          ('${error?.replace(
            /(\r\n|\n|\r)/gm,
            " "
          )}' === undefined ? err : '${error?.replace(
            /(\r\n|\n|\r)/gm,
            " "
          )}') +
          "</p>" +
          "</div>";
        console.log(err);
      };
  
      window.addEventListener("error", (event) => {
        event.preventDefault();
handleError(event.error);
      })


       window.addEventListener("message", (event) => {
  
        try {
          eval(event.data);
   
        } catch (err) {
   handleError(err);
  
        }
  
       },false)
      </script>
      <script src="https://cdn.tailwindcss.com"></script>

    </body>
    </html>
    `;
  useEffect(() => {
    if (iframeRef.current) iframeRef.current.srcdoc = html;
    const timer = setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(code, "*");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [code, html]);
  return (
    <div className="iframe-preview relative  flex-grow h-full after:content-[''] after:opacity-0 after:bg-transparent after:absolute after:top-0 after:bottom-0 after:left-0 after:right-[20px]">
      <iframe
        ref={iframeRef}
        className="dark:bg-grayLight  bg-primaryBgLight w-full h-full"
        title="Code Preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="error-msg">{error} </div>}
    </div>
  );
};
