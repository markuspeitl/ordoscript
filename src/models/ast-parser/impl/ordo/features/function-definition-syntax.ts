import { SyntaxTool } from '../../../common/util/syntax-tool';
import { Enclosing } from '../../../common/models/enclosing';
import { Identifier } from '../../../../ast-node/identifier';
import { ValueListingNode } from '../../../../ast-node/value-listing-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node/function-definition';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class FunctionDefinitionSyntax extends BaseSyntaxFeature {
	public priority: number = 0.2;
	//private regExp: RegExp = new RegExp(/^function [a-zA-Z0-9]+()/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.functionDefDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: FunctionDefinition = new FunctionDefinition();

		const whitespaceIndex: number = code.indexOf(' ');
		const parenthesisEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.functionParamTokenPair);
		if (!parenthesisEnclosing) {
			throw new Error('Could not find parameter definition of function');
		}

		const blockEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.blockScopeTokenPair);
		if (!blockEnclosing) {
			throw new Error('Could not find body block of function.');
		}

		const returnTypeStartIndex: number = code.indexOf(this.tokenSet.typeDefinitionStartToken);
		const typeEnclosing: Enclosing = new Enclosing(returnTypeStartIndex, blockEnclosing.open);

		const enclosedParam: string = SyntaxTool.getEnclosedContents(code, parenthesisEnclosing);

		node.label = code.substring(whitespaceIndex + 1, parenthesisEnclosing.open);
		node.parameters = astParser.parseAstNode<ValueListingNode>(enclosedParam, ValueListingNode.name);

		if (returnTypeStartIndex > -1 && returnTypeStartIndex < parenthesisEnclosing.open) {
			const enclosedType: string = SyntaxTool.getEnclosedContents(code, typeEnclosing);
			node.returnType = astParser.parseAstNode<Identifier>(enclosedType.trim(), Identifier.name);
		}

		node.body = SyntaxTool.parseBody(code, this.tokenSet.blockScopeTokenPair, astParser, this.constructor.name);

		return node;
	}
}