import { TokenSet, MatchSet } from './../impl/ordo/features/token-set';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from './base-ast-parser';
import { ISyntaxFeature } from '../interfaces/i-syntax-feature';
import { ConsoleUtil } from '../common/util/console-util';
import { ISyntaxCurator } from '../interfaces/i-syntax-curator';

export abstract class BaseSyntaxFeature implements ISyntaxFeature {
	private printOutPut: boolean = true;
	protected syntaxCurator: ISyntaxCurator;
	public constructor(syntaxCurator: ISyntaxCurator) {
		this.syntaxCurator = syntaxCurator;
	}

	//public abstract getTargetNodeType(): string;
	public abstract isFeatureDetected(code: string): boolean;
	public parseFeature(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const curatedCode: string | null = this.syntaxCurator.getCuratedCode(code);
		if (!curatedCode) {
			return null;
		}

		ConsoleUtil.printNamedBody('Parsing Syntax feature ' + String(this.constructor.name), code, this.printOutPut);
		const node: BaseAstNode | null = this.parseFeatureInternal(curatedCode, astParser);
		if (node) {
			ConsoleUtil.printNamedBody(String(this.constructor.name) + ' AST: ', JSON.stringify(node, null, 2), this.printOutPut);
			node.type = String(node.constructor.name);
			node.original = code;
		}
		return node;
	}
	protected abstract parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null;
	public tryParseFeature(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}
		if (!this.isFeatureDetected(code)) {
			return null;
		}
		return this.parseFeature(code, astParser);
	}

	protected tokenSet: TokenSet;
	public loadTokenSet(tokenSet: TokenSet): void {
		this.tokenSet = tokenSet;
	}
	protected matchSet: MatchSet;
	public loadMatchSet(matchSet: MatchSet): void {
		this.matchSet = matchSet;
	}
}
