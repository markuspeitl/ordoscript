import { TokenPair } from './../../impl/ordo/features/token-set';
import { Enclosing } from './../models/enclosing';
export class SyntaxTool {
	public static getEnclosing(code: string, openToken: string, closeToken: string): Enclosing {
		const enclosing: Enclosing = new Enclosing();
		enclosing.open = code.indexOf(openToken);
		enclosing.close = code.indexOf(closeToken);
		return enclosing;
	}
	public static getEnclosingOfTokens(code: string, tokenPair: TokenPair): Enclosing {
		const enclosing: Enclosing = new Enclosing();
		enclosing.open = code.indexOf(tokenPair.open);
		enclosing.close = code.indexOf(tokenPair.close);
		return enclosing;
	}
	public static getTokenEnclosedContents(code: string, openToken: string, closeToken: string): string {
		const enclosing: Enclosing = this.getEnclosing(code, openToken, closeToken);
		return code.substring(enclosing.open + 1, enclosing.close);
	}
	public static getEnclosedContents(code: string, enclosing: Enclosing): string {
		return code.substring(enclosing.open + 1, enclosing.close);
	}
}
