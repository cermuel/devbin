export const FontSizes = [10, 12, 14, 16, 18, 20];
export const monacoEditorThemes = [
  "vs-dark", // Visual Studio Dark
  "vs", // Visual Studio
  "hc-black", // High Contrast Black
];

export const isAuth = (navigate: any) => {
  const token = localStorage.getItem("devbin_token");
  if (!token) {
    navigate("/auth/login");
    window.location.reload();
  }
};
export const isAuthLogin = (navigate: any) => {
  const token = localStorage.getItem("devbin_token");
  if (token) {
    navigate("/code/home");
    window.location.reload();
  }
};
