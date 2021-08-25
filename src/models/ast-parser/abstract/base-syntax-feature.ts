import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { ISyntaxFeature } from '../interfaces/i-syntax-feature';
import { ConsoleUtil } from '../common/util/console-util';
import { ISyntaxCurator } from '../interfaces/i-syntax-curator';
import { BaseAstParser } from './base-ast-parser';
import { Slog } from '../common/util/slog';
import { MatchSet } from '../../common/match-set';
import { BaseSyntaxParser } from '../../abstract/base-syntax-parser';

export abstract class BaseSyntaxFeature extends BaseSyntaxParser implements ISyntaxFeature {
	protected syntaxCurator: ISyntaxCurator | null = null;
	public abstract priority: number = 10;
	private astParser: BaseAstParser;
	public constructor(astParser: BaseAstParser, syntaxCurator?: ISyntaxCurator) {
		super();
		this.astParser = astParser;
		if (syntaxCurator) {
			this.syntaxCurator = syntaxCurator;
		}
	}

	//public abstract getTargetNodeType(): string;
	public abstract isFeatureDetected(code: string): boolean;
	public parseFeature(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		let curatedCode: string | null = code;
		if (this.syntaxCurator) {
			curatedCode = this.syntaxCurator.getCuratedCode(code);
		}
		if (!curatedCode) {
			return null;
		}
		Slog.log('BaseSyntaxFeature', String(this.constructor.name));
		ConsoleUtil.printNamedBody('BaseSyntaxFeature', 'Parsing Syntax feature: ' + String(this.constructor.name), code);
		const node: BaseAstNode | null = this.parseFeatureInternal(curatedCode);
		if (node) {
			ConsoleUtil.printNamedBody('BaseSyntaxFeature', String(this.constructor.name) + ' AST: ', JSON.stringify(node, null, 2));
			node.type = String(node.constructor.name);
			node.original = code;
		}
		return node;
	}
	protected abstract parseFeatureInternal(code: string): BaseAstNode | null;
	public tryParseFeature(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}
		if (!this.isFeatureDetected(code)) {
			return null;
		}
		return this.parseFeature(code);
	}

	protected matchSet: MatchSet;
	public loadMatchSet(matchSet: MatchSet): void {
		this.matchSet = matchSet;
	}

	public getNodeDetect<BaseAstNode>(code: string, errorLabel: string): BaseAstNode {
		if (!code) {
			throw Error(this.prependNodeName(errorLabel) + 'Can not detect non nullable required node, if the passed code is not defined');
		}
		const node: BaseAstNode | null = this.getNodeDetectNullable(code.trim()) as BaseAstNode | null;
		if (!node) {
			throw Error(this.prependNodeName(errorLabel) + 'must detect and parse to a valid Node');
		}
		return node;
	}

	public getNode<Type extends BaseAstNode>(code: string, typeName: string, errorLabel: string): Type {
		const node: Type | null = this.getNodeNullable<Type>(code.trim(), typeName);
		if (!node) {
			throw Error(this.prependNodeName(errorLabel) + 'must parse to a valid Node');
		}
		return node;
	}

	public getNodeNullable<Type extends BaseAstNode>(code: string, typeName: string): Type | null {
		return this.astParser.parseAstNode<Type>(code, typeName);
	}
	public getNodeDetectNullable(code: string): BaseAstNode | null {
		return this.astParser.parseAstNodeDetect(code);
	}
}
