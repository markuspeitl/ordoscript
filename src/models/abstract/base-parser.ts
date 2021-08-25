import { BaseAstNode } from '../ast-node';
import { Slog } from '../ast-parser/common/util/slog';
import { TokenSet } from '../common/token-set';
import { BaseSyntaxParser } from './base-syntax-parser';

export abstract class BaseParser<ParserType extends BaseSyntaxParser> {
	protected subParserDict: Record<string, ParserType> = {};
	protected subParserArray: ParserType[] = [];

	public constructor() {
		this.initializeSubParsers();
	}

	public abstract initializeSubParsers(): void;

	protected addSubParser(AstNodeConstructor: new () => BaseAstNode, subParser: ParserType): void {
		const astNode: BaseAstNode = new AstNodeConstructor();
		this.subParserDict[astNode.constructor.name] = subParser;
		this.subParserArray.push(subParser);
		Slog.log('BaseAstParser', 'Adding feature for ast: ' + astNode.constructor.name);
		Slog.log('BaseAstParser', 'is of type: ' + subParser.constructor.name);
	}

	protected getSubParser(astNodeName: string): ParserType {
		return this.subParserDict[astNodeName];
	}

	public printParserMapping(): void {
		for (const key of Object.keys(this.subParserDict)) {
			Slog.log('BaseAstParser', 'Node: ' + key + ' -> ' + this.subParserDict[key].constructor.name);
		}
	}

	public loadTokenSet(tokenSet: TokenSet): void {
		for (const key of Object.keys(this.subParserDict)) {
			this.subParserDict[key].loadTokenSet(tokenSet);
		}
		for (const feature of this.subParserArray) {
			feature.loadTokenSet(tokenSet);
		}
	}
}
