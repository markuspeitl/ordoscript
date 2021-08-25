import { TokenSet } from '../common/token-set';

export abstract class BaseSyntaxParser {
	protected tokenSet: TokenSet;
	public loadTokenSet(tokenSet: TokenSet): void {
		this.tokenSet = tokenSet;
	}
	public getNodeName(): string {
		return String(this.constructor.name);
	}
	public prependNodeName(childName: string): string {
		return '"' + this.getNodeName() + '.' + childName + '" ';
	}
}
