import { TokenPair } from './../../impl/ordo/features/token-set';
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
	public static getTokenEnclosedContents(code: string, tokenPair: TokenPair): string | null {
		const enclosing: Enclosing | null = this.getEnclosingOfTokens(code, tokenPair);
		if (!enclosing) {
			return null;
		}

		return this.getEnclosedContents(code, enclosing);
	}
	public static getEnclosedContents(code: string, enclosing: Enclosing): string {
		return code.substring(enclosing.open + 1, enclosing.close);
	}
	public static widenEnclosing(enclosing: Enclosing, widenSize: number): void {
		enclosing.open -= widenSize;
		enclosing.close += widenSize;
	}
}
