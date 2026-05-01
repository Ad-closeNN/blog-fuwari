<script lang="ts">
import { DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import {
	applyCustomThemeStyles,
	applyThemeToDocument,
	getCodeFontFamily,
	getCustomCss,
	getDefaultHue,
	getDisplayFontFamily,
	getHue,
	getStoredTheme,
	setCodeFontFamily,
	setCustomCss,
	setDisplayFontFamily,
	setHue,
	setTheme,
} from "@utils/setting-utils.ts";
import { onMount } from "svelte";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

export let showThemeColor = true;

let hue = getHue();
const defaultHue = getDefaultHue();
let mode: LIGHT_DARK_MODE = LIGHT_MODE;
let customCss = "";
let displayFontFamily = "";
let codeFontFamily = "";
let customThemeReady = false;

onMount(() => {
	mode = getStoredTheme();
	customCss = getCustomCss();
	displayFontFamily = getDisplayFontFamily();
	codeFontFamily = getCodeFontFamily();
	applyThemeToDocument(mode);
	applyCustomThemeStyles();
	customThemeReady = true;
});

function resetHue() {
	hue = getDefaultHue();
}

function switchScheme(newMode: LIGHT_DARK_MODE) {
	mode = newMode;
	setTheme(newMode);
}

function togglePanel() {
	document
		.getElementById("display-setting")
		?.classList.toggle("float-panel-closed");
}

function resetDisplayFontFamily() {
	displayFontFamily = "";
}

function resetCodeFontFamily() {
	codeFontFamily = "";
}

function resetCustomCss() {
	customCss = "";
}

$: if (hue || hue === 0) {
	setHue(hue);
}

$: if (customThemeReady) {
	setCustomCss(customCss);
}

$: if (customThemeReady) {
	setDisplayFontFamily(displayFontFamily);
}

$: if (customThemeReady) {
	setCodeFontFamily(codeFontFamily);
}
</script>

<div>
	<button
		aria-label="主题设置"
		class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
		id="display-settings-switch"
		onclick={togglePanel}
	>
		<svg
			aria-hidden="true"
			class="h-[1.35rem] w-[1.35rem]"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M4 7h5" class="stroke-current" stroke-width="1.8" stroke-linecap="round" />
			<path d="M15 7h5" class="stroke-current" stroke-width="1.8" stroke-linecap="round" />
			<circle cx="12" cy="7" r="2.4" class="stroke-current" stroke-width="1.8" />
			<path d="M4 17h5" class="stroke-current" stroke-width="1.8" stroke-linecap="round" />
			<path d="M15 17h5" class="stroke-current" stroke-width="1.8" stroke-linecap="round" />
			<circle cx="12" cy="17" r="2.4" class="stroke-current" stroke-width="1.8" />
			<path d="M4 12h9" class="stroke-current opacity-70" stroke-width="1.8" stroke-linecap="round" />
			<path d="M17 12h3" class="stroke-current opacity-70" stroke-width="1.8" stroke-linecap="round" />
			<circle cx="15" cy="12" r="1.8" class="fill-current" />
		</svg>
	</button>

	<div id="display-setting" class="float-panel float-panel-closed absolute transition-all z-50 w-[24rem] max-h-[calc(100vh_-_6rem)] overflow-y-auto right-4 px-4 py-4">
		<div class="grid grid-cols-2 gap-2 mb-4">
			<button
				class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95"
				class:current-theme-btn={mode === LIGHT_MODE}
				onclick={() => switchScheme(LIGHT_MODE)}
			>
				<Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem] mr-2"></Icon>
				{i18n(I18nKey.lightMode)}
			</button>
			<button
				class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95"
				class:current-theme-btn={mode === DARK_MODE}
				onclick={() => switchScheme(DARK_MODE)}
			>
				<Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem] mr-2"></Icon>
				{i18n(I18nKey.darkMode)}
			</button>
		</div>

		{#if showThemeColor}
			<div class="flex flex-row gap-2 mb-3 items-center justify-between">
				<div
					class="select-none flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)] before:absolute before:-left-3 before:top-[0.33rem]"
				>
					{i18n(I18nKey.themeColor)}
					<button
						aria-label="Reset to Default"
						class="btn-regular w-7 h-7 rounded-md active:scale-90"
						class:opacity-0={hue === defaultHue}
						class:pointer-events-none={hue === defaultHue}
						onclick={resetHue}
					>
						<div class="text-[var(--btn-content)]">
							<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
						</div>
					</button>
				</div>
				<div class="flex gap-1">
					<div
						id="hueValue"
						class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center font-bold text-sm items-center text-[var(--btn-content)]"
					>
						{hue}
					</div>
				</div>
			</div>
			<div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
				<input
					aria-label={i18n(I18nKey.themeColor)}
					type="range"
					min="0"
					max="360"
					bind:value={hue}
					class="slider"
					id="colorSlider"
					step="5"
					style="width: 100%"
				/>
			</div>
		{/if}

		<div class="mt-5 border-t border-black/10 pt-4 dark:border-white/10">
			<div
				class="pointer-events-none relative mb-3 ml-3 select-none text-lg font-bold text-neutral-900 transition before:absolute before:-left-3 before:top-[0.33rem] before:h-4 before:w-1 before:rounded-md before:bg-[var(--primary)] dark:text-neutral-100"
			>
				字体系列
			</div>
			<label class="mb-3 block">
				<span class="mb-1 block text-sm font-medium text-black/60 transition dark:text-white/60">显示字体</span>
				<div class="flex w-full gap-2">
					<input
						aria-label="显示字体"
						class="theme-setting-input min-w-0 flex-1"
						bind:value={displayFontFamily}
						placeholder='"MiSans VF", Inter, sans-serif'
					/>
					<button
						aria-label="重置显示字体"
						class="btn-regular h-9 w-9 shrink-0 rounded-md active:scale-90"
						class:opacity-0={!displayFontFamily}
						class:pointer-events-none={!displayFontFamily}
						onclick={resetDisplayFontFamily}
					>
						<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
					</button>
				</div>
			</label>
			<label class="block">
				<span class="mb-1 block text-sm font-medium text-black/60 transition dark:text-white/60">代码字体</span>
				<div class="flex w-full gap-2">
					<input
						aria-label="代码字体"
						class="theme-setting-input min-w-0 flex-1"
						bind:value={codeFontFamily}
						placeholder='"Cascadia Mono", "JetBrains Mono", monospace'
					/>
					<button
						aria-label="重置代码字体"
						class="btn-regular h-9 w-9 shrink-0 rounded-md active:scale-90"
						class:opacity-0={!codeFontFamily}
						class:pointer-events-none={!codeFontFamily}
						onclick={resetCodeFontFamily}
					>
						<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
					</button>
				</div>
			</label>
		</div>

		<div class="mt-5 border-t border-black/10 pt-4 dark:border-white/10">
			<div class="mb-2 flex items-center justify-between">
				<div
					class="pointer-events-none relative ml-3 select-none text-lg font-bold text-neutral-900 transition before:absolute before:-left-3 before:top-[0.33rem] before:h-4 before:w-1 before:rounded-md before:bg-[var(--primary)] dark:text-neutral-100"
				>
					自定义 CSS
				</div>
				<button
					aria-label="重置自定义 CSS"
					class="btn-regular h-7 w-7 rounded-md active:scale-90"
					class:opacity-0={!customCss}
					class:pointer-events-none={!customCss}
					onclick={resetCustomCss}
				>
					<Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
				</button>
			</div>
			<textarea
				aria-label="自定义 CSS"
				class="theme-setting-textarea"
				bind:value={customCss}
				spellcheck="false"
				placeholder={":root { --radius-large: 1.5rem; }"}
			></textarea>
			<div class="mt-2 text-xs text-black/40 transition dark:text-white/40">
				字体系列 会在 自定义 CSS 之后注入，所以字体设置优先级更高。
			</div>
		</div>
	</div>
</div>

<style>
	.theme-setting-input,
	.theme-setting-textarea {
		width: 100%;
		border-radius: 0.5rem;
		background: var(--btn-regular-bg);
		color: var(--btn-content);
		outline: none;
		transition: background-color 0.15s ease-in-out;
	}

	.theme-setting-input {
		height: 2.25rem;
		padding: 0 0.75rem;
		font-size: 0.875rem;
	}

	.theme-setting-textarea {
		min-height: 8rem;
		resize: vertical;
		padding: 0.75rem;
		font-family: "Cascadia Mono", "JetBrainsMono-VF", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		font-size: 0.8125rem;
		line-height: 1.5;
	}

	.theme-setting-input:hover,
	.theme-setting-textarea:hover {
		background: var(--btn-regular-bg-hover);
	}

	.theme-setting-input:focus,
	.theme-setting-textarea:focus {
		background: var(--btn-regular-bg-active);
	}

	#display-setting input[type="range"] {
		-webkit-appearance: none;
		height: 1.5rem;
		background-image: var(--color-selection-bar);
		transition: background-image 0.15s ease-in-out;
	}

	#display-setting input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 1rem;
		width: 0.5rem;
		border-radius: 0.125rem;
		background: rgba(255, 255, 255, 0.7);
		box-shadow: none;
	}

	#display-setting input[type="range"]::-webkit-slider-thumb:hover {
		background: rgba(255, 255, 255, 0.8);
	}

	#display-setting input[type="range"]::-webkit-slider-thumb:active {
		background: rgba(255, 255, 255, 0.6);
	}

	#display-setting input[type="range"]::-moz-range-thumb {
		-webkit-appearance: none;
		height: 1rem;
		width: 0.5rem;
		border-radius: 0.125rem;
		border-width: 0;
		background: rgba(255, 255, 255, 0.7);
		box-shadow: none;
	}

	#display-setting input[type="range"]::-moz-range-thumb:hover {
		background: rgba(255, 255, 255, 0.8);
	}

	#display-setting input[type="range"]::-moz-range-thumb:active {
		background: rgba(255, 255, 255, 0.6);
	}

	#display-setting input[type="range"]::-ms-thumb {
		-webkit-appearance: none;
		height: 1rem;
		width: 0.5rem;
		border-radius: 0.125rem;
		background: rgba(255, 255, 255, 0.7);
		box-shadow: none;
	}

	#display-setting input[type="range"]::-ms-thumb:hover {
		background: rgba(255, 255, 255, 0.8);
	}

	#display-setting input[type="range"]::-ms-thumb:active {
		background: rgba(255, 255, 255, 0.6);
	}
</style>
