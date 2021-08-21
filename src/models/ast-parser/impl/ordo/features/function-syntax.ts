import { Identifier } from './../../../../ast-node/identifier';
import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node/function-definition';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { OrdoAstParser } from '../ordo-ast-parser';
import { BlockScope } from '../../../../ast-node/block-scope';
import { SyntaxUtil } from '../../../abstract/sytax-util';

export class FunctionSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'FunctionDefinition';
	}
	private regExp: RegExp = new RegExp(/^function [a-zA-Z0-9]+()/);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
	}
	public parseFeature(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const curatedLines: string[] | null = SyntaxUtil.getStrippedLines(code);
		if (!curatedLines) {
			return null;
		}
		const curatedCode: string = curatedLines.join('\n');

		const node: FunctionDefinition = new FunctionDefinition();

		const whitespaceIndex: number = curatedLines[0].indexOf(' ');
		const parenthesisOpenIndex: number = curatedCode.indexOf(OrdoAstParser.functionParamOpenToken);
		const parenthesisCloseIndex: number = curatedCode.indexOf(OrdoAstParser.functionParamCloseToken);
		const blockOpenIndex: number = curatedCode.indexOf(OrdoAstParser.nodeEnclosureOpenToken);
		const blockCloseIndex: number = curatedCode.lastIndexOf(OrdoAstParser.nodeEnclosureCloseToken);
		const returnTypeStartIndex: number = curatedCode.indexOf(OrdoAstParser.typeDefStartToken);

		node.label = curatedCode.substring(whitespaceIndex + 1, parenthesisOpenIndex - 1);
		node.parameters = astParser.parseAstNode<ValueListingNode>(curatedCode.substring(parenthesisOpenIndex + 1, parenthesisCloseIndex - 1), ValueListingNode.name);

		if (returnTypeStartIndex > -1 && returnTypeStartIndex < parenthesisOpenIndex) {
			const returnType: string = curatedCode.substring(returnTypeStartIndex + 1, parenthesisOpenIndex - 1).trim();
			node.returnType = astParser.parseAstNode<Identifier>(returnType, Identifier.name);
		}

		node.body = astParser.parseAstNode<BlockScope>(curatedCode.substring(blockOpenIndex, blockCloseIndex), BlockScope.name);

		return node;
	}
}
