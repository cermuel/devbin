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
