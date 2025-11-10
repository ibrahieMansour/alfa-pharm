export const reshapeArabic = (text) => {
  // Reverse text for right-to-left
  return text.split("").reverse().join("");
};