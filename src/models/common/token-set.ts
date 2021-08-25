import { FunctionalTool } from 'functional-lib';
import { Slog } from '../ast-parser/common/util/slog';
import { Uti } from '../ast-parser/common/util/util';
import { TokenPair } from './token-pair';
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
	public forParamStatementSeperator: string = ';';
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
	public propertyAccessToken: string = '.';
	public listSeperator: string = ',';
	public declarationSeperatorToken: string = ' ';
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

	public static loadFromFile(path: string): TokenSet {
		const newTokenSet: TokenSet = new TokenSet();

		const obj: Record<string, unknown> = Uti.readJSON(path);
		const objKeys: string[] = Object.keys(obj);
		const tokenSetKeys: string[] = Object.keys(newTokenSet);

		for (const key of tokenSetKeys) {
			if (!obj.hasOwnProperty(key)) {
				Slog.log('TokenSet', 'loaded json is missing property ' + key + ' of tokenset and will stay the default value - is this wanted?');
			} else {
				if (Array.isArray((newTokenSet as any)[key])) {
					(newTokenSet as any)[key].forEach((element: any, index: number) => {
						this.setDetail((newTokenSet as any)[key], obj[key] as any, index);
					});
				} else {
					this.setDetail(newTokenSet as any, obj as any, key);
				}

				const keyIndex: number = objKeys.indexOf(key);
				objKeys.splice(keyIndex, 1);
			}
		}

		if (objKeys.length > 0) {
			Slog.log('TokenSet', 'The json contains keys that are not set to any value of the tokenSet - is this wanted');
			Slog.jlog('TokenSet', objKeys);
		}

		return newTokenSet;
	}

	private static setDetail(targetDict: any, sourceDict: any, key: any): void {
		if (typeof targetDict[key] === 'object' && !Array.isArray(targetDict[key])) {
			Object.assign(targetDict[key], sourceDict[key]);
		} else {
			targetDict[key] = sourceDict[key];
		}
		Slog.log('TokenSetDetail', 'Setting: ' + String(key) + ' to: ');
		Slog.jlog('TokenSetDetail', sourceDict[key]);
	}

	//Strategies:
	//Array divergent -> override left | merge both | fill only what is there
	//Prop divergent -> override left
	//Prop does not exist in left -> discard

	//left = master -> right props discarded if not in left
	/*public static copyJsonToComplex(classObj: any, jsonObj: any): void {
		if (Array.isArray(classObj) || Array.isArray(jsonObj)) {
			throw new Error('Can not apply this function on Array objects -> they need to be dicts instead');
		}

		const classPropKeys: string[] = Object.keys(classObj);
		for (const key of classPropKeys) {
			const selectedClassProp: any = classObj[key];
			const selectedJsonProp: any = jsonObj[key];
			if (Array.isArray(selectedClassProp)) {
				classObj[key] = [];
				for (const [index, jsonProp] of selectedJsonProp.entries()) {
					classObj[key].push();
					this.copyJsonToComplex(classObj[key], selectedJsonProp);
				}
			} else if (typeof selectedClassProp === 'object') {
				this.copyJsonToComplex(classObj[key], selectedJsonProp);
			} else {
				classObj[key] = selectedJsonProp;
			}
		}
	}

	public static getArrayItemTemplate(array: any[]): any {
		const arrayItemTypes: string[] = array.map((item: any) => item.constructor.name);
		const uniqueTypes: string[] = this.unique(arrayItemTypes);
		if (uniqueTypes.length > 1) {
			throw new Error('Target array contains more than 1 complex types which makes it impossible to infer');
		}
	}

	public static parseToComplex<ResultType>(samplePool: any[], jsonObj: any): ResultType {
		const result: any = {};

		const propKeys: string[] = Object.keys(jsonObj);
		for (const key in propKeys) {
		}

		return result as ResultType;
	}

	public static clone<Type>(obj: Type): Type {
		return JSON.parse(JSON.stringify(obj)) as Type;
	}

	public static keysMatch(sample: any, toCheck: any): boolean {
		const sampleKeys: string[] = Object.keys(sample).sort();
		const checkKeys: string[] = Object.keys(toCheck).sort();
		return sampleKeys === checkKeys;
	}*/
}
