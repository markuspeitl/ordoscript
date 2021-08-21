export interface ISyntaxCurator {
	getCuratedCode(code: string): string | null;
	getCuratedLines(code: string): string[] | null;
}
