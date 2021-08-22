import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { Identifier } from '../../../../ast-node/identifier';
import { FunctionCall } from '../../../../ast-node/function-call';
import { SyntaxTool } from '../../../common/util/syntax-tool';
import { Enclosing } from '../../../common/models/enclosing';
import { ValueListingNode } from '../../../../ast-node/value-listing-node';

export class FunctionCallSyntax extends BaseSyntaxFeature {
	public priority: number = 5;
	//private regExp: RegExp = new RegExp(/^[a-zA-Z0-9_]+\([a-zA-Z0-9_,\'\"]*\)/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmedCode);
		return this.matchSet.functionCallDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: FunctionCall = new FunctionCall();

		const parenthesisEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.functionParamTokenPair);
		if (!parenthesisEnclosing) {
			throw new Error('Could not find parameter definition of function call');
		}
		const functionName: string = code.substr(0, parenthesisEnclosing.open).trim();
		const enclosedParam: string = SyntaxTool.getEnclosedContents(code, parenthesisEnclosing);

		node.identifier = new Identifier();
		node.identifier.label = functionName;
		node.parameters = astParser.parseAstNode<ValueListingNode>(enclosedParam, ValueListingNode.name);

		return node;
	}
}
