import { Slog } from './../../../common/util/slog';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { Identifier } from '../../../../ast-node/identifier';
import { FunctionCall } from '../../../../ast-node/function-call';
import { SyntaxTool } from '../../../common/util/syntax-tool';
import { Enclosing } from '../../../common/models/enclosing';
import { ValueListingNode } from '../../../../ast-node/value-listing-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class FunctionCallSyntax extends BaseSyntaxFeature {
	public priority: number = 5;
	//private regExp: RegExp = new RegExp(/^[a-zA-Z0-9_]+\([a-zA-Z0-9_,\'\"]*\)/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmedCode);
		return this.matchSet.functionCallDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: FunctionCall = new FunctionCall();

		const parenthesisEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.functionParamTokenPair);
		Slog.jlog('default', parenthesisEnclosing);

		const enclosedParams: string | null = SyntaxTool.getEnclosedContents(code, parenthesisEnclosing);
		if (!parenthesisEnclosing) {
			throw new Error('Could not find parameter definition of function call');
		}

		const functionName: string = SyntaxTool.beforeOpening(code, parenthesisEnclosing).trim();

		node.identifier = this.getNode<Identifier>(functionName, Identifier.name, 'identifier');
		if (enclosedParams) {
			node.parameters = this.getNodeNullable<ValueListingNode>(enclosedParams, ValueListingNode.name);
		}

		return node;
	}
}
