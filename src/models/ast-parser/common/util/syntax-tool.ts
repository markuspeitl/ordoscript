import { TokenPair } from '../../../common/token-pair';
import { Enclosing } from './../models/enclosing';
export class SyntaxTool {
	public static getEnclosing(code: string, openToken: string, closeToken: string): Enclosing | null {
		const enclosing: Enclosing = new Enclosing();
		enclosing.open = code.indexOf(openToken);
		enclosing.close = code.indexOf(closeToken);
		if (enclosing.open === -1 && enclosing.close === -1) {
			return null;
		}
		return enclosing;
	}
	public static getEnclosingOfTokens(code: string, tokenPair: TokenPair): Enclosing | null {
		return SyntaxTool.getEnclosing(code, tokenPair.open, tokenPair.close);
	}
	public static getMaxEnclosing(code: string, openToken: string, closeToken: string): Enclosing | null {
		const enclosing: Enclosing = new Enclosing();
		enclosing.open = code.indexOf(openToken);
		enclosing.close = code.lastIndexOf(closeToken);
		if (enclosing.open === -1 && enclosing.close === -1) {
			return null;
		}
		return enclosing;
	}
	public static getMaxEnclosingOfTokens(code: string, tokenPair: TokenPair): Enclosing | null {
		return SyntaxTool.getMaxEnclosing(code, tokenPair.open, tokenPair.close);
	}
	public static getTokenEnclosedContents(code: string, tokenPair: TokenPair): string | null {
		const enclosing: Enclosing | null = this.getEnclosingOfTokens(code, tokenPair);
		if (!enclosing) {
			return null;
		}

		return this.getEnclosedContents(code, enclosing);
	}
	public static getEnclosedContents(code: string, enclosing: Enclosing | null): string | null {
		if (!enclosing) {
			return null;
		}
		return code.substring(enclosing.open + 1, enclosing.close);
	}
	public static widenEnclosing(enclosing: Enclosing | null, widenSize: number): void {
		if (enclosing && widenSize) {
			enclosing.open -= widenSize;
			enclosing.close += widenSize;
		}
	}
	public static afterEnclosing(code: string, enclosing: Enclosing): string {
		return code.substring(enclosing.close);
	}
	public static beforeOpening(code: string, enclosing: Enclosing): string {
		return code.substring(0, enclosing.open);
	}
}
