export class TokenSet {
	public delimiterTokens: string[] = [';', '\n'];
	public typeDefinitionStartToken: string = ':';
	public blockScopeTokenPair: TokenPair = new TokenPair('{', '}');
	public foreignScopeTokenPair: TokenPair = new TokenPair('{', '}');
	public functionParamTokenPair: TokenPair = new TokenPair('(', ')');
	public groupingTokenPair: TokenPair = new TokenPair('(', ')');
	public functionKeywordToken: string = 'function';
	public ifKeywordToken: string = 'if';
	public elseKeywordToken: string = 'else';
	public forKeywordToken: string = 'for';
	public constructorKeywordToken: string = 'constructor';
	public constantKeywordToken: string = 'const';
	public publicAccessToken: string = 'public';
	public privateAccessToken: string = 'private';
	public protectedAccessToken: string = 'protected';
	public linkExtToken: string = 'import';
	public linkExtLocationToken: string = 'from';
	public binaryExpressionTokens: string[] = ['+', '-', '++', '--', '+=', '-=', '*', '/', '^', '&', '|', '&&', '||', '<', '>', '<<', '>>', '<=', '>=', '==', '==='];
}

export class DetectorSet {
	public functionRegEx: RegExp = new RegExp(/^function [a-zA-Z0-9]+()/);
}

export class TokenPair {
	public open: string;
	public close: string;
	public constructor(open: string, close: string) {
		this.open = open;
		this.close = close;
	}
}
const tokenSet: TokenSet = new TokenSet();

function applyNewTokenSet(obj: Record<string, unknown>): void {
	Object.apply(tokenSet, obj);
}

export { tokenSet, applyNewTokenSet };
