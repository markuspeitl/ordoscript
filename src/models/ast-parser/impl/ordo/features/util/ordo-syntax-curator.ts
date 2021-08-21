import { ISyntaxCurator } from '../../../../interfaces/i-syntax-curator';

export class OrdoSyntaxCurator implements ISyntaxCurator {
	public getCuratedCode(code: string): string | null {
		const curatedLines: string[] | null = this.getCuratedLines(code);
		if (curatedLines) {
			return curatedLines.join('\n');
		}
		return null;
	}
	public getCuratedLines(code: string): string[] | null {
		const lines: string[] = code.split('\n');
		const nonEmptyLines: string[] = lines.filter((line: string) => line.replace(';', '').trim().length > 0);
		const curatedLines: string[] = nonEmptyLines.map((line: string) => line.replace(';', '').trim());
		if (curatedLines && curatedLines.length > 0) {
			return curatedLines;
		}
		return null;
	}
}
