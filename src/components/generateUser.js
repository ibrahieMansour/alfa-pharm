// utils/generateUser.js

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randDigit = () => Math.floor(Math.random() * 10).toString();
const randLetter = () =>
  String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z

function generatePhone() {
  const second = pick(["0", "1", "2", "5"]);
  let rest = "";
  for (let i = 0; i < 8; i++) rest += randDigit();
  return `201${second}${rest}`;
}

function randomStringLetters(length = 8) {
  let s = "";
  for (let i = 0; i < length; i++) s += randLetter();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function randomAddress(length = 12) {
  let s = "";
  for (let i = 0; i < length; i++) {
    if (i % 4 === 0 && i !== 0 && Math.random() < 0.4) s += " ";
    else s += randLetter();
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generatePassword(minLength = 12) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,.<>?/|";
  const all = upper + lower + digits + symbols;

  const required = [
    pick(upper.split("")),
    pick(lower.split("")),
    pick(digits.split("")),
    pick(symbols.split("")),
  ];

  const remainingLength = Math.max(minLength, 9) - required.length;
  let rest = "";
  for (let i = 0; i < remainingLength; i++) rest += pick(all.split(""));

  const combined = (required.join("") + rest).split("");
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined.join("");
}

export function generateUser() {
  return {
    phone: generatePhone(),
    name: randomStringLetters(6 + Math.floor(Math.random() * 5)),
    address: randomAddress(10 + Math.floor(Math.random() * 5)),
    password: generatePassword(12),
  };
}
