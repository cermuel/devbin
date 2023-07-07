import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface HTMLRendererProps {
  html: string;
  css: string;
  js: string;
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ html, css, js }) => {
  const [srcDoc, setsrcDoc] = useState<string>();

  const iframe = useRef<HTMLIFrameElement>(null);
  const [k, setk] = useState<number>(1);

  useEffect(() => {
    iframe?.current?.contentWindow?.addEventListener(
      "keydown",
      (event: any) => {
        if ((event.metaKey || event.ctrlKey) && event.key === "s") {
          event.preventDefault(); // Prevent the default "Save As" browser behavior
          alert(`ctrl + s`); // Call your save function here
        }
      }
    );
  }, []);

  useEffect(() => {
    console.log("");
    const timeout = setTimeout(() => {
      setsrcDoc(`
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script type="text/javascript">${js}</script>
        </body>
      </html>
    `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <iframe
      ref={iframe}
      srcDoc={srcDoc}
      title="Output"
      sandbox="allow-scripts allow-same-origin allow-top-navigation allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-encrypted-media allow-credentials allow-downloads-without-user-activation"
      width="100%"
      height="100%"
    />
  );
};

export default HTMLRenderer;
