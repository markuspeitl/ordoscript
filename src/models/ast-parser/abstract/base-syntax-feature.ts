import { ISyntaxCurator } from './i-syntax-curator';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from './base-ast-parser';
import { ISyntaxFeature } from './i-syntax-feature';
import { ConsoleUtil } from './console-util';

export abstract class BaseSyntaxFeature implements ISyntaxFeature {
	protected syntaxCurator: ISyntaxCurator;
	public constructor(syntaxCurator: ISyntaxCurator) {
		this.syntaxCurator = syntaxCurator;
	}

	public abstract getTargetNodeType(): string;
	public abstract isFeatureDetected(code: string): boolean;
	public parseFeature(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const curatedCode: string | null = this.syntaxCurator.getCuratedCode(code);
		if (!curatedCode) {
			return null;
		}

		ConsoleUtil.printNamedBody('Parsing Syntax feature ' + String(this.constructor.name), code);
		const node: BaseAstNode | null = this.parseFeatureInternal(curatedCode, astParser);
		ConsoleUtil.printNamedBody(String(this.constructor.name) + ' AST: ', JSON.stringify(node, null, 2));
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
}
