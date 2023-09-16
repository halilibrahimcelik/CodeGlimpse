import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getSelectedCode, getSelectedInput } from "../app/features/globalSlice";

type Props = {
  language: string;
};

const PreviwCode: React.FC<Props> = ({ language }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const inputCode = useSelector(getSelectedInput);
  const code = useSelector(getSelectedCode);
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
      const handleError=(err)=>{
        const root = document.querySelector("#root");
        root.innerHTML = '<div style="color: red;text-align:center;"><h4 >Runtime Error</h4>' + err + '</div>';
    
      };
  
       window.addEventListener("message", (event) => {
  
        try {
          eval(event.data);
   
        } catch (err) {
        ${language === "html" ? "handleError(err)" : "handleError(err)"}  ;
  
        }
  
       },false)
      </script>
      <script src="https://cdn.tailwindcss.com"></script>

    </body>
    </html>
    `;
  useEffect(() => {
    console.log(code);
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
        scrolling="yes"
        ref={iframeRef}
        className="dark:bg-grayLight  bg-primaryBgLight w-full h-full"
        title="Code Preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default PreviwCode;
