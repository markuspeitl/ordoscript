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
	public forParamTokenPair: TokenPair = new TokenPair('(', ')');
	public constructorKeywordToken: string = 'constructor';
	public declareTypeTokens: string[] = ['const', 'var', 'let'];
	public stringEscapeTokens: TokenPair[] = [new TokenPair("'", "'"), new TokenPair('"', '"')];
	public publicAccessToken: string = 'public';
	public privateAccessToken: string = 'private';
	public protectedAccessToken: string = 'protected';
	public linkExtTokenKeyword: string = 'import';
	public linkExtLocationToken: string = 'from';
	public returnKeyword: string = 'return';
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

	public loadFromFile(path: string): void {
		const obj: Record<string, unknown> = Uti.readJSON(path);
		Object.assign(this, obj);
	}
}

export class MatchSet {
	private validIdentifierLabel: string = '[a-zA-Z_]+[a-zA-Z0-9_]*';
	private validIdentifierList: RegExp = new RegExp('[a-zA-Z_]+[a-zA-Z0-9_, ]+');
	private validParamList: RegExp = new RegExp('[a-zA-Z_]+[a-zA-Z0-9_, :]+');
	private weakValidParam: RegExp = new RegExp('[a-zA-Z0-9_, :]+');
	private numberLiteral: string = '[0-9\\.]+';
	//Valuelist does not have much rules
	private validValueList: string = '.*,?';
	private white: string = '[ ]+';
	private opwhite: string = '[ ]*';
	private anyThing: string = '.+';
	private anyThingOrNothing: string = '.*';
	private anyThingAll: string = '[\\s\\S]*';

	public functionDefDetector: RegExp;
	public arrayLiteralDetector: RegExp;
	public assignmentDetector: RegExp;
	public blockScopeDetector: RegExp;
	public compositionDetector: RegExp;
	public unaryCompositionDetector: RegExp;
	public ifDetector: RegExp;
	public elseDetector: RegExp;
	public forDetector: RegExp;
	public functionCallDetector: RegExp;
	public propertyCallDetector: RegExp;
	public identifierDetector: RegExp;
	public stringLiteralDetector: RegExp;
	public numberLiteralDetector: RegExp;
	public propertyAccessDetector: RegExp;
	public variableDeclarationDetector: RegExp;
	public returnDetector: RegExp;
	public importDetector: RegExp;

	private loadedTokenSet: TokenSet;

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
		this.functionDefDetector = this.applyPartsToRegex(functionParts, 'functionDefDetector');

		const arrayParts: string[] = [
			'^',
			this.escapeChar(tokens.arrayLiteralTokenPair.open),
			this.validValueList,
			this.escapeChar(tokens.arrayLiteralTokenPair.close)
		];
		this.arrayLiteralDetector = this.applyPartsToRegex(arrayParts, 'arrayLiteralDetector');

		const assignParts: string[] = [this.anyThing, this.white, tokens.assignMentToken, this.white, this.anyThing];
		this.assignmentDetector = this.applyPartsToRegex(assignParts, 'assignmentDetector');

		const blockScopeParts: string[] = [
			'^',
			this.escapeChar(tokens.blockScopeTokenPair.open),
			this.anyThingAll,
			this.escapeChar(tokens.blockScopeTokenPair.close)
		];
		this.blockScopeDetector = this.applyPartsToRegex(blockScopeParts, 'blockScopeDetector');

		const compositionParts: string[] = [
			this.anyThing,
			this.opwhite,
			this.createOptionGroup(tokens.binaryExpressionTokens, false),
			this.opwhite,
			this.anyThing
		];
		this.compositionDetector = this.applyPartsToRegex(compositionParts, 'compositionDetector');

		const unaryCompositionParts: string[] = [this.createOptionGroup(tokens.unaryExpressionTokens, false)];
		this.unaryCompositionDetector = this.applyPartsToRegex(unaryCompositionParts, 'unaryCompositionDetector');

		const ifParts: string[] = [
			'^',
			tokens.ifKeywordToken,
			this.opwhite,
			this.escapeChar(tokens.ifParamTokenPair.open),
			this.anyThing,
			this.escapeChar(tokens.ifParamTokenPair.close)
		];
		this.ifDetector = this.applyPartsToRegex(ifParts, 'ifDetector');

		const elseParts: string[] = ['^', tokens.elseKeywordToken, this.opwhite, this.escapeChar(tokens.blockScopeTokenPair.open)];
		this.elseDetector = this.applyPartsToRegex(elseParts, 'elseDetector');

		const forParts: string[] = [
			'^',
			tokens.forKeywordToken,
			this.opwhite,
			this.escapeChar(tokens.forParamTokenPair.open),
			this.anyThing,
			this.escapeChar(tokens.forParamTokenPair.close)
		];
		this.forDetector = this.applyPartsToRegex(forParts, 'forDetector');

		const functionCallParts: string[] = [
			'^',
			this.validIdentifierLabel,
			this.escapeChar(tokens.functionCallParamTokenPair.open),
			this.anyThingOrNothing,
			this.escapeChar(tokens.functionCallParamTokenPair.close)
		];
		this.functionCallDetector = this.applyPartsToRegex(functionCallParts, 'functionCallDetector');

		const propertyCallParts: string[] = [
			'^',
			this.validIdentifierLabel,
			'\\.',
			this.validIdentifierLabel,
			this.escapeChar(tokens.functionCallParamTokenPair.open),
			this.anyThingOrNothing,
			this.escapeChar(tokens.functionCallParamTokenPair.close)
		];
		this.propertyCallDetector = this.applyPartsToRegex(propertyCallParts, 'propertyCallDetector');

		const propertyAccessParts: string[] = ['^', this.validIdentifierLabel, '\\.', this.validIdentifierLabel];
		this.propertyAccessDetector = this.applyPartsToRegex(propertyAccessParts, 'propertyAccessDetector');

		//const declareTypes: string[] = JSON.parse(JSON.stringify(tokens.declareTypeTokens));
		//declareTypes.map((dectype: string) => dectype + ' ');
		const variableDeclarationParts: string[] = ['^', '(', tokens.declareTypeTokens.join('|'), ')', this.white, this.validIdentifierLabel];
		this.variableDeclarationDetector = this.applyPartsToRegex(variableDeclarationParts, 'variableDeclarationDetector');

		this.identifierDetector = this.applyToRegex(this.validIdentifierLabel, 'identifierDetector');
		this.numberLiteralDetector = this.applyToRegex(this.numberLiteral, 'numberLiteralDetector');

		const openTokens: string[] = tokens.stringEscapeTokens.map((tokenPair: TokenPair) => tokenPair.open);
		//const closeTokens: string[] = tokens.stringEscapeTokens.map((tokenPair: TokenPair) => tokenPair.close);
		const stringLiteralParts: string[] = ['^', '(', openTokens.join('|'), ')', this.anyThingOrNothing, '\\1'];
		this.stringLiteralDetector = this.applyPartsToRegex(stringLiteralParts, 'stringLiteralDetector');

		const returnParts: string[] = ['^', tokens.returnKeyword, this.opwhite];
		this.returnDetector = this.applyPartsToRegex(returnParts, 'returnDetector');

		const importParts: string[] = ['^', tokens.linkExtTokenKeyword, this.opwhite];
		this.importDetector = this.applyPartsToRegex(importParts, 'importDetector');

		this.loadedTokenSet = tokens;
	}

	public applyPartsToRegex(parts: string[], name: string): RegExp {
		const regexString: string = parts.join('');
		return this.applyToRegex(regexString, name);
	}

	public applyToRegex(regexString: string, name: string): RegExp {
		console.log('Loading: ' + regexString);
		const regEx: RegExp = new RegExp(regexString);
		console.log(name + ': ' + regEx.source);
		return regEx;
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
/*const tokenSet: TokenSet = new TokenSet();
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
export { applyNewTokenSet, matchSet };
*/
