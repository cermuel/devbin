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

export type insertTextType = {
  cursorPosition: {
    line: number;
    column: number;
  };
  text: string;
  timestamp: Date;
  file: string;
  fileType: filesTypeType;
};

export enum RespondInvite {
  accepted = "accepted",
  rejected = "rejected",
}
