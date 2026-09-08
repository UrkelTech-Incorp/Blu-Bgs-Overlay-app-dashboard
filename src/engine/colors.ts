import type { ColorCombo, NeonColor } from "./types";

export const NEON_COLORS: NeonColor[] = [
  { name: "Electric Cyan", hex: "#00FFFF", rgb: [0, 255, 255], family: "cyan" },
  { name: "Neon Cyan", hex: "#00F5FF", rgb: [0, 245, 255], family: "cyan" },
  { name: "Laser Blue", hex: "#008CFF", rgb: [0, 140, 255], family: "cyan" },
  { name: "Electric Blue", hex: "#0066FF", rgb: [0, 102, 255], family: "cyan" },
  { name: "Plasma Blue", hex: "#00BFFF", rgb: [0, 191, 255], family: "cyan" },
  { name: "Deep Neon Blue", hex: "#0055FF", rgb: [0, 85, 255], family: "cyan" },
  { name: "Neon Purple", hex: "#B026FF", rgb: [176, 38, 255], family: "purple" },
  { name: "Electric Violet", hex: "#8F00FF", rgb: [143, 0, 255], family: "purple" },
  { name: "Ultra Violet", hex: "#6A00FF", rgb: [106, 0, 255], family: "purple" },
  { name: "Neon Magenta", hex: "#FF00FF", rgb: [255, 0, 255], family: "purple" },
  { name: "Plasma Purple", hex: "#C000FF", rgb: [192, 0, 255], family: "purple" },
  { name: "Hot Pink", hex: "#FF1493", rgb: [255, 20, 147], family: "pink" },
  { name: "Neon Pink", hex: "#FF2D95", rgb: [255, 45, 149], family: "pink" },
  { name: "Electric Pink", hex: "#FF00AA", rgb: [255, 0, 170], family: "pink" },
  { name: "Neon Red", hex: "#FF0033", rgb: [255, 0, 51], family: "pink" },
  { name: "Laser Red", hex: "#FF1744", rgb: [255, 23, 68], family: "pink" },
  { name: "Neon Green", hex: "#39FF14", rgb: [57, 255, 20], family: "green" },
  { name: "Electric Green", hex: "#00FF66", rgb: [0, 255, 102], family: "green" },
  { name: "Laser Green", hex: "#00FF00", rgb: [0, 255, 0], family: "green" },
  { name: "Plasma Green", hex: "#00FF9D", rgb: [0, 255, 157], family: "green" },
  { name: "Toxic Green", hex: "#7FFF00", rgb: [127, 255, 0], family: "green" },
  { name: "Neon Yellow", hex: "#FFFF00", rgb: [255, 255, 0], family: "yellow" },
  { name: "Electric Yellow", hex: "#EFFF00", rgb: [239, 255, 0], family: "yellow" },
  { name: "Neon Gold", hex: "#FFD600", rgb: [255, 214, 0], family: "yellow" },
  { name: "Neon Orange", hex: "#FF6600", rgb: [255, 102, 0], family: "yellow" },
  { name: "Plasma Orange", hex: "#FF4500", rgb: [255, 69, 0], family: "yellow" },
  { name: "Cream / Ivory", hex: "#FFF4D6", rgb: [255, 244, 214], family: "special" },
  { name: "Bronze Gold", hex: "#C58B3A", rgb: [197, 139, 58], family: "special" },
  { name: "Black Structure", hex: "#050505", rgb: [5, 5, 5], family: "special" },
  { name: "Accent Cyan", hex: "#00FFFF", rgb: [0, 255, 255], family: "special" },
  { name: "Accent Pink", hex: "#FF1493", rgb: [255, 20, 147], family: "special" },
  { name: "Accent Purple", hex: "#B026FF", rgb: [176, 38, 255], family: "special" },
];

export const COLOR_FAMILIES: { id: NeonColor["family"]; label: string }[] = [
  { id: "cyan", label: "Cyan / Blue" },
  { id: "purple", label: "Purple / Violet" },
  { id: "pink", label: "Pink / Red" },
  { id: "green", label: "Green" },
  { id: "yellow", label: "Yellow / Orange" },
  { id: "special", label: "Special BLU-BGS" },
];

export const COLOR_COMBOS: ColorCombo[] = [
  { id: "cyberpunk", name: "Cyberpunk", colors: ["#00FFFF", "#FF00FF"] },
  { id: "synthwave", name: "Synthwave", colors: ["#8F00FF", "#FF1493"] },
  { id: "cyber-blue", name: "Cyber Blue", colors: ["#0066FF", "#00FFFF"] },
  { id: "toxic", name: "Toxic", colors: ["#39FF14", "#FFFF00"] },
  { id: "plasma", name: "Plasma", colors: ["#B026FF", "#008CFF"] },
  { id: "fire", name: "Fire", colors: ["#FF0033", "#FF6600", "#FFFF00"] },
  { id: "arctic", name: "Arctic", colors: ["#00FFFF", "#FFFFFF", "#0066FF"] },
  { id: "ultraviolet", name: "Ultraviolet", colors: ["#FF00FF", "#8F00FF", "#0066FF"] },
  {
    id: "street-luxury",
    name: "BLU-BGS Street Luxury",
    colors: ["#FFF4D6", "#C58B3A", "#050505", "#00FFFF"],
  },
];

export function hexToRgb(hex: string): [number, number, number] {
  const n = hex.replace("#", "").trim();
  const full = n.length === 3 ? n.split("").map((c) => c + c).join("") : n;
  const v = Number.parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(v)) return [0, 255, 255];
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function hexToRgba(hex: string, alpha = 1): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t);
}

export function adjustHex(hex: string, sat: number, bri: number): string {
  const [r, g, b] = hexToRgb(hex);
  const avg = (r + g + b) / 3;
  const sr = avg + (r - avg) * sat;
  const sg = avg + (g - avg) * sat;
  const sb = avg + (b - avg) * sat;
  return rgbToHex(sr * bri, sg * bri, sb * bri);
}

export function hslToHex(h: number, s: number, l: number): string {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return rgbToHex(f(0) * 255, f(8) * 255, f(4) * 255);
}
