import { Identifier } from './../../../../ast-node/identifier';
import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node/function-definition';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { OrdoAstParser } from '../ordo-ast-parser';
import { BlockScope } from '../../../../ast-node/block-scope';

export class FunctionSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'FunctionDefinition';
	}
	private regExp: RegExp = new RegExp(/^function [a-zA-Z0-9]+()/);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: FunctionDefinition = new FunctionDefinition();

		const whitespaceIndex: number = code.indexOf(' ');
		const parenthesisOpenIndex: number = code.indexOf(OrdoAstParser.functionParamOpenToken);
		const parenthesisCloseIndex: number = code.indexOf(OrdoAstParser.functionParamCloseToken);
		const blockOpenIndex: number = code.indexOf(OrdoAstParser.nodeEnclosureOpenToken);
		const blockCloseIndex: number = code.lastIndexOf(OrdoAstParser.nodeEnclosureCloseToken);
		const returnTypeStartIndex: number = code.indexOf(OrdoAstParser.typeDefStartToken);

		node.label = code.substring(whitespaceIndex + 1, parenthesisOpenIndex);
		node.parameters = astParser.parseAstNode<ValueListingNode>(code.substring(parenthesisOpenIndex + 1, parenthesisCloseIndex), ValueListingNode.name);

		if (returnTypeStartIndex > -1 && returnTypeStartIndex < parenthesisOpenIndex) {
			const returnType: string = code.substring(returnTypeStartIndex + 1, parenthesisOpenIndex - 1).trim();
			node.returnType = astParser.parseAstNode<Identifier>(returnType, Identifier.name);
		}

		node.body = astParser.parseAstNode<BlockScope>(code.substring(blockOpenIndex, blockCloseIndex + 1), BlockScope.name);

		return node;
	}
}
