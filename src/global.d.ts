export {};

type SwupHookHandler = (...args: unknown[]) => void;

type SwupLike = {
	hooks: {
		on: (eventName: string, handler: SwupHookHandler) => void;
	};
};

type BlogPhotoSwipeState = {
	lightbox: {
		destroy: () => void;
		on: (eventName: string, handler: (...args: unknown[]) => void) => void;
		pswp?: {
			ui?: {
				registerElement: (options: Record<string, unknown>) => void;
			};
		};
	} | null;
	hookRegistered: boolean;
	pageLoadRegistered: boolean;
};

declare global {
	interface Window {
		swup?: SwupLike;
		__blogPhotoSwipe?: BlogPhotoSwipeState;
		dataLayer?: unknown[];
		pagefind: {
			search: (query: string) => Promise<{
				results: Array<{
					data: () => Promise<SearchResult>;
				}>;
			}>;
		};
	}
}

declare function gtag(...args: unknown[]): void;
declare let dataLayer: unknown[];

interface SearchResult {
	url: string;
	meta: {
		title: string;
	};
	excerpt: string;
	content?: string;
	word_count?: number;
	filters?: Record<string, unknown>;
	anchors?: Array<{
		element: string;
		id: string;
		text: string;
		location: number;
	}>;
	weighted_locations?: Array<{
		weight: number;
		balanced_score: number;
		location: number;
	}>;
	locations?: number[];
	raw_content?: string;
	raw_url?: string;
	sub_results?: SearchResult[];
}
