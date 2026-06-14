export const SERVER_BASE_URL =
  "https://breastguard-c58x.onrender.com/api/v1/cancer";

export const COLORS = {
  main: "#9CB080",
  primary: "#618764",
  secondary: "#2B5748",
  tertiary: "#273338",
  black: "#000000",
  white: "#ffffff",
  red: "#FF0000",
  gray: "#E8EDF2",
  transparent: "transparent",
};

export const PLOT_COLORS = [
  "#333D6D",
  "#FF6A1C",
  "#622B14",
  "#0A7C6E",
  "#3852B4",
];
export const Fonts = {
  "JosefinSans-Bold": require("@/assets/fonts/JosefinSans-Bold.ttf"),
  "JosefinSans-Regular": require("@/assets/fonts/JosefinSans-Regular.ttf"),
  "JosefinSans-Italic": require("@/assets/fonts/JosefinSans-Italic.ttf"),
  "JosefinSans-BoldItalic": require("@/assets/fonts/JosefinSans-BoldItalic.ttf"),
};
export const FONTS = {
  regular: "JosefinSans-Regular",
  bold: "JosefinSans-Bold",
  italic: "JosefinSans-Italic",
  boldItalic: "JosefinSans-BoldItalic",
};

export const IMAGES = {
  background: require("@/assets/images/background.png"),
  logo: require("@/assets/images/icon.png"),
};

export const STORAGE_NAME = {
  SETTINGS: "breastguard:settings",
  HISTORY: "breastguard:history",
};

export const AUDIOS = {
  diagnosing: require("@/assets/sounds/diagnosing.wav"),
  results: require("@/assets/sounds/results.wav"),
};

export const relativeTimeObject = {
  future: "in %s",
  past: "%s",
  s: "now",
  m: "1m",
  mm: "%dm",
  h: "1h",
  hh: "%dh",
  d: "1d",
  dd: "%dd",
  M: "1M",
  MM: "%dM",
  y: "1y",
  yy: "%dy",
};
export const APP_NAME = "BreastGuard";

export const LANDING_MESSAGES = [
  {
    id: 1,
    image: require("@/assets/images/0.png"),
    title: "Welcome to BreastGuard",
    message:
      "BreastGuard is an mHealth application that supports breast cancer screening by using lightweight deep learning models to analyze medical images and provide prediction support.",
  },
  {
    id: 2,
    image: require("@/assets/images/1.png"),
    title: "Upload Medical Images",
    message:
      "Users can upload breast cancer medical images through the mobile app and receive fast prediction results through an AI-powered backend system.",
  },
  {
    id: 3,
    image: require("@/assets/images/2.png"),
    title: "Real-Time Screening Support",
    message:
      "BreastGuard connects to a FastAPI backend to process images efficiently and return real-time results designed for accessible, mobile-based decision support.",
  },
  {
    id: 4,
    image: require("@/assets/images/3.png"),
    title: "Support, Not Replacement",
    message:
      "BreastGuard is designed to support early screening and clinical decision-making, but it does not replace professional medical diagnosis or established screening procedures.",
  },
];
