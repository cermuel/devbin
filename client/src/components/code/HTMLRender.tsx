import React, { useEffect, useRef, useState } from "react";

interface HTMLRendererProps {
  html: string;
  css: string;
  js: string;
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ html, css, js }) => {
  const [srcDoc, setsrcDoc] = useState<string>();

  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
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
    }, 300);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <iframe
      ref={iframe}
      srcDoc={srcDoc}
      title="Output"
      sandbox="allow-scripts allow-top-navigation allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-orientation-lock allow-pointer-lock allow-presentation"
      width="100%"
      height="100%"
    />
  );
};

export default HTMLRenderer;
