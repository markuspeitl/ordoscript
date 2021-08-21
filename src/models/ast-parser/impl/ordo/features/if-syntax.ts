import { Identifier } from './../../../../ast-node/identifier';
import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node/function-definition';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { OrdoAstParser } from '../ordo-ast-parser';
import { BlockScope } from '../../../../ast-node/block-scope';
import { SyntaxUtil } from '../../../abstract/sytax-util';
import { IfNode } from '../../../../ast-node/if-node';
import { CompositionNode } from '../../../../ast-node/composition-node';

export class IfSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'IfNode';
	}
	private regExp: RegExp = new RegExp(/^if[ ]*\(/);
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

		const node: IfNode = new IfNode();

		const parenthesisOpenIndex: number = curatedCode.indexOf(OrdoAstParser.functionParamOpenToken);
		const parenthesisCloseIndex: number = curatedCode.indexOf(OrdoAstParser.functionParamCloseToken);

		const blockOpenIndex: number = curatedCode.indexOf(OrdoAstParser.nodeEnclosureOpenToken);
		const blockCloseIndex: number = curatedCode.lastIndexOf(OrdoAstParser.nodeEnclosureCloseToken);

		node.condition = astParser.parseAstNode<CompositionNode>(curatedCode.substring(parenthesisOpenIndex + 1, parenthesisCloseIndex - 1), CompositionNode.name);
		node.thenBlock = astParser.parseAstNode<BlockScope>(curatedCode.substring(blockOpenIndex, blockCloseIndex), BlockScope.name);

		return node;
	}
}
