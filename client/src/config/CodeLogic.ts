import JSZip from "jszip";
//@ts-ignore
import { saveAs } from "file-saver";

export const downloadCodeAsZip = ({
  htmlCode,
  cssCode,
  jsCode,
  codeName,
}: {
  htmlCode: any;
  cssCode: any;
  jsCode: any;
  codeName: string;
}) => {
  const zip = new JSZip();
  let defaultHtmlStart = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>MY DEVBIN APP</title>
      <link rel='stylesheet' href='style.css'>
      <script src="script.js" type="text/javascript" defer></script>
  </head>
  <body>`;
  let defaultHtmlEnd = `</body>
  </html>`;
  zip.file("index.html", defaultHtmlStart + htmlCode + defaultHtmlEnd);
  zip.file("style.css", cssCode);
  zip.file("script.js", jsCode);

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `${codeName}.zip`);
  });
};
