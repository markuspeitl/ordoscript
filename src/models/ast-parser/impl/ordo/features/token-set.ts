import { Uti } from './../../../common/util/util';
export class TokenSet {
	public delimiterTokens: string[] = [';', '\n'];
	public typeDefinitionStartToken: string = ':';
	public blockScopeTokenPair: TokenPair = new TokenPair('{', '}');
	public foreignScopeTokenPair: TokenPair = new TokenPair('{', '}');
	public functionParamTokenPair: TokenPair = new TokenPair('(', ')');
	public functionCallParamTokenPair: TokenPair = new TokenPair('(', ')');
	public groupingTokenPair: TokenPair = new TokenPair('(', ')');
	public arrayLiteralTokenPair: TokenPair = new TokenPair('[', ']');
	public functionKeywordToken: string = 'function';
	public ifKeywordToken: string = 'if';
	public ifParamTokenPair: TokenPair = new TokenPair('(', ')');
	public elseKeywordToken: string = 'else';
	public forKeywordToken: string = 'for';
	public constructorKeywordToken: string = 'constructor';
	public declareTypeTokens: string[] = ['const', 'var', 'let'];
	public stringEscapeTokens: TokenPair[] = [new TokenPair("'", "'"), new TokenPair('"', '"')];
	public publicAccessToken: string = 'public';
	public privateAccessToken: string = 'private';
	public protectedAccessToken: string = 'protected';
	public linkExtToken: string = 'import';
	public linkExtLocationToken: string = 'from';
	public assignMentToken: string = '=';
	public binaryExpressionTokens: string[] = [
		'+',
		'-',
		'+=',
		'-=',
		'*',
		'/',
		'^',
		'&',
		'|',
		'&&',
		'||',
		'<',
		'>',
		'<<',
		'>>',
		'<=',
		'>=',
		'==',
		'==='
	];
	public unaryExpressionTokens: string[] = ['++', '--'];
}

export class MatchSet {
	public validIdentifierLabel: string = '[a-zA-Z_]+[a-zA-Z0-9_]*';
	public validIdentifierList: RegExp = new RegExp('[a-zA-Z_]+[a-zA-Z0-9_, ]+');
	public validParamList: RegExp = new RegExp('[a-zA-Z_]+[a-zA-Z0-9_, :]+');
	public weakValidParam: RegExp = new RegExp('[a-zA-Z0-9_, :]+');
	public numberLiteral: string = '[0-9\\.]+';
	//Valuelist does not have much rules
	public validValueList: string = '.*,?';
	private white: string = '[ ]+';
	private opwhite: string = '[ ]*';
	private anyThing: string = '.+';
	private anyThingAll: string = '[\\s\\S]*';

	public functionDefDetector: RegExp;
	public arrayLiteralDetector: RegExp;
	public assignmentDetector: RegExp;
	public blockScopeDetector: RegExp;
	public compositionDetector: RegExp;
	public unaryCompositionDetector: RegExp;
	public ifDetector: RegExp;
	public elseDetector: RegExp;
	public functionCallDetector: RegExp;
	public propertyCallDetector: RegExp;
	public identifierDetector: RegExp;
	public stringLiteralDetector: RegExp;
	public numberLiteralDetector: RegExp;
	public propertyAccessDetector: RegExp;
	public variableDeclarationDetector: RegExp;

	public reconstructDetectors(tokens: TokenSet): void {
		const functionParts: string[] = [
			'^',
			tokens.functionKeywordToken,
			this.white,
			this.validIdentifierLabel,
			this.opwhite,
			this.escapeChar(tokens.functionParamTokenPair.open),
			this.weakValidParam.source,
			this.escapeChar(tokens.functionParamTokenPair.close)
		];
		this.applyPartsToRegex(this.functionDefDetector, functionParts, 'functionDefDetector');

		const arrayParts: string[] = [
			'^',
			this.escapeChar(tokens.arrayLiteralTokenPair.open),
			this.validValueList,
			this.escapeChar(tokens.arrayLiteralTokenPair.close)
		];
		this.applyPartsToRegex(this.arrayLiteralDetector, arrayParts, 'arrayLiteralDetector');

		const assignParts: string[] = [this.anyThing, this.white, tokenSet.assignMentToken, this.white, this.anyThing];
		this.applyPartsToRegex(this.assignmentDetector, assignParts, 'assignmentDetector');

		const blockScopeParts: string[] = [
			'^',
			this.escapeChar(tokens.blockScopeTokenPair.open),
			this.anyThingAll,
			this.escapeChar(tokens.blockScopeTokenPair.close)
		];
		this.applyPartsToRegex(this.blockScopeDetector, blockScopeParts, 'blockScopeDetector');

		const compositionParts: string[] = [
			this.anyThing,
			this.opwhite,
			this.createOptionGroup(tokenSet.binaryExpressionTokens, false),
			this.opwhite,
			this.anyThing
		];
		this.applyPartsToRegex(this.compositionDetector, compositionParts, 'compositionDetector');

		const unaryCompositionParts: string[] = [this.createOptionGroup(tokenSet.unaryExpressionTokens, false)];
		this.applyPartsToRegex(this.unaryCompositionDetector, unaryCompositionParts, 'unaryCompositionDetector');

		const ifParts: string[] = [
			'^',
			tokens.ifKeywordToken,
			this.opwhite,
			this.escapeChar(tokens.ifParamTokenPair.open),
			this.anyThing,
			this.escapeChar(tokens.ifParamTokenPair.close)
		];
		this.applyPartsToRegex(this.ifDetector, ifParts, 'ifDetector');

		const elseParts: string[] = ['^', tokens.elseKeywordToken, this.opwhite, this.escapeChar(tokens.blockScopeTokenPair.open)];
		this.applyPartsToRegex(this.elseDetector, elseParts, 'elseDetector');

		const functionCallParts: string[] = [
			'^',
			this.validIdentifierLabel,
			this.escapeChar(tokens.functionCallParamTokenPair.open),
			this.anyThing,
			this.escapeChar(tokens.functionCallParamTokenPair.close)
		];
		this.applyPartsToRegex(this.functionCallDetector, functionCallParts, 'functionCallDetector');

		const propertyCallParts: string[] = [
			'^',
			this.validIdentifierLabel,
			'\\.',
			this.validIdentifierLabel,
			this.escapeChar(tokens.functionCallParamTokenPair.open),
			this.anyThing,
			this.escapeChar(tokens.functionCallParamTokenPair.close)
		];
		this.applyPartsToRegex(this.propertyCallDetector, propertyCallParts, 'propertyCallDetector');

		const propertyAccessParts: string[] = ['^', this.validIdentifierLabel, '\\.', this.validIdentifierLabel];
		this.applyPartsToRegex(this.propertyAccessDetector, propertyAccessParts, 'propertyAccessDetector');

		//const declareTypes: string[] = JSON.parse(JSON.stringify(tokenSet.declareTypeTokens));
		//declareTypes.map((dectype: string) => dectype + ' ');
		const variableDeclarationParts: string[] = ['^', '(', tokenSet.declareTypeTokens.join('|'), ')', this.white, this.validIdentifierLabel];
		this.applyPartsToRegex(this.variableDeclarationDetector, variableDeclarationParts, 'variableDeclarationDetector');

		this.applyToRegex(this.identifierDetector, this.validIdentifierLabel, 'identifierDetector');
		this.applyToRegex(this.numberLiteralDetector, this.numberLiteral, 'numberLiteralDetector');

		const openTokens: string[] = tokenSet.stringEscapeTokens.map((tokenPair: TokenPair) => tokenPair.open);
		//const closeTokens: string[] = tokenSet.stringEscapeTokens.map((tokenPair: TokenPair) => tokenPair.close);
		const stringLiteralParts: string[] = ['^', '(', openTokens.join('|'), ')', this.anyThing, '\\1'];
		this.applyPartsToRegex(this.stringLiteralDetector, stringLiteralParts, 'stringLiteralParts');
	}

	public applyPartsToRegex(regEx: RegExp, parts: string[], name: string): void {
		const regexString: string = parts.join('');
		this.applyToRegex(regEx, regexString, name);
	}

	public applyToRegex(regEx: RegExp, regexString: string, name: string): void {
		console.log('Loading: ' + regexString);
		regEx = new RegExp(regexString);
		console.log(name + ': ' + regEx.source);
	}

	private escapeChar(char: string): string {
		return '\\' + char;
	}

	private createOptionGroup(parts: string[], anySelect: boolean = true): string {
		let clonedParts: string[] = Uti.clone(parts);
		clonedParts = clonedParts.map((part: string) => {
			//console.log('Mapping ' + part);
			let chars: string[] = part.split('');
			//console.log('Mapping ' + String(chars));
			chars = chars.map((char: string) => this.escapeChar(char));
			//console.log('Mapping ' + String(chars));
			return chars.join('');
		});

		let prefix: string = '';
		let postfix: string = '';
		if (anySelect) {
			prefix = '[';
			postfix = ']+';
		}

		return prefix + clonedParts.join('|') + postfix;
	}
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
const matchSet: MatchSet = new MatchSet();
matchSet.reconstructDetectors(tokenSet);

function applyNewTokenSet(obj: Record<string, unknown>): void {
	Object.apply(tokenSet, obj);
}
function applyNewMatchSet(obj: Record<string, string>): void {
	for (const key of Object.keys(obj)) {
		if (matchSet.hasOwnProperty(key)) {
			(matchSet as any)[key] = new RegExp(obj[key]);
		}
	}
}

export { tokenSet, applyNewTokenSet, matchSet };
