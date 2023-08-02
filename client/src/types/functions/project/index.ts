export type projectType = {
  name: string;
  files: filesType[];
};

export type filesType = {
  type: filesTypeType;
  text: string;
};

export enum filesTypeType {
  html = "html",
  css = "css",
  js = "js",
}

export type FileID = {
  HTMLID: string;
  CSSID: string;
  JSID: string;
};

const firstname = "Samuel";

const lastname: string = "Ngene";
