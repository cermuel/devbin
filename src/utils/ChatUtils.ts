export const FontSizes = [10, 12, 14, 16, 18, 20];
export const monacoEditorThemes = [
  "vs", // Visual Studio
  "vs-dark", // Visual Studio Dark
  "hc-black", // High Contrast Black
];

export const isAuth = (navigate: any) => {
  const token = localStorage.getItem("devbin_token");
  if (!token) {
    navigate("/auth/login");
    window.location.reload();
  }
};
