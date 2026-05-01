import { DARK_MODE, DEFAULT_THEME, LIGHT_MODE } from "@constants/constants.ts";
import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
	}

	// Set the theme for Expressive Code
	document.documentElement.setAttribute(
		"data-theme",
		expressiveCodeConfig.theme,
	);
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}

const CUSTOM_CSS_STORAGE_KEY = "custom-css";
const DISPLAY_FONT_STORAGE_KEY = "display-font-family";
const CODE_FONT_STORAGE_KEY = "code-font-family";
const CUSTOM_CSS_STYLE_ID = "custom-theme-css";
const CUSTOM_FONT_STYLE_ID = "custom-theme-font";

function getOrCreateStyleElement(id: string): HTMLStyleElement {
	let style = document.getElementById(id) as HTMLStyleElement | null;
	if (!style) {
		style = document.createElement("style");
		style.id = id;
		document.head.appendChild(style);
	}
	return style;
}

function normalizeFontFamily(fontFamily: string): string {
	return fontFamily.replace(/[{};]/g, "").trim();
}

export function getCustomCss(): string {
	return localStorage.getItem(CUSTOM_CSS_STORAGE_KEY) || "";
}

export function setCustomCss(css: string): void {
	localStorage.setItem(CUSTOM_CSS_STORAGE_KEY, css);
	applyCustomThemeStyles();
}

export function getDisplayFontFamily(): string {
	return localStorage.getItem(DISPLAY_FONT_STORAGE_KEY) || "";
}

export function setDisplayFontFamily(fontFamily: string): void {
	localStorage.setItem(
		DISPLAY_FONT_STORAGE_KEY,
		normalizeFontFamily(fontFamily),
	);
	applyCustomThemeStyles();
}

export function getCodeFontFamily(): string {
	return localStorage.getItem(CODE_FONT_STORAGE_KEY) || "";
}

export function setCodeFontFamily(fontFamily: string): void {
	localStorage.setItem(CODE_FONT_STORAGE_KEY, normalizeFontFamily(fontFamily));
	applyCustomThemeStyles();
}

export function applyCustomThemeStyles(): void {
	getOrCreateStyleElement(CUSTOM_CSS_STYLE_ID).textContent = getCustomCss();

	const displayFont = normalizeFontFamily(getDisplayFontFamily());
	const codeFont = normalizeFontFamily(getCodeFontFamily());
	const fontRules: string[] = [];

	if (displayFont) {
		fontRules.push(
			`html, body, button, input, textarea, select { font-family: ${displayFont} !important; }`,
		);
	}

	if (codeFont) {
		fontRules.push(
			`code, pre, kbd, samp, .expressive-code, .expressive-code * { font-family: ${codeFont} !important; }`,
		);
	}

	getOrCreateStyleElement(CUSTOM_FONT_STYLE_ID).textContent =
		fontRules.join("\n");
}
