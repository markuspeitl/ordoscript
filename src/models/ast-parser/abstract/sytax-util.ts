export class SyntaxUtil {
	public static getStrippedCode(code: string): string | null {
		const curatedLines: string[] | null = SyntaxUtil.getStrippedLines(code);
		if (curatedLines) {
			return curatedLines.join('\n');
		}
		return null;
	}
	public static getStrippedLines(code: string): string[] | null {
		const lines: string[] = code.split('\n');
		const nonEmptyLines: string[] = lines.filter((line: string) => line.replace(';', '').trim().length > 0);
		const curatedLines: string[] = nonEmptyLines.map((line: string) => line.replace(';', '').trim());
		if (curatedLines && curatedLines.length > 0) {
			return curatedLines;
		}
		return null;
	}
}
