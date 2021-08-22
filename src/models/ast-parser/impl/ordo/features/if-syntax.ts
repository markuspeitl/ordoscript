import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { OrdoAstParser } from '../ordo-ast-parser';
import { BlockScope } from '../../../../ast-node/block-scope';
import { IfNode } from '../../../../ast-node/if-node';
import { CompositionNode } from '../../../../ast-node/composition-node';
import { tokenSet } from '.';

export class IfSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'IfNode';
	}
	private regExp: RegExp = new RegExp(/^if[ ]*\(/);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: IfNode = new IfNode();

		const parenthesisOpenIndex: number = code.indexOf(tokenSet.functionParamTokenPair.open);
		const parenthesisCloseIndex: number = code.indexOf(tokenSet.functionParamTokenPair.close);

		const blockOpenIndex: number = code.indexOf(tokenSet.blockScopeTokenPair.open);
		const blockCloseIndex: number = code.lastIndexOf(tokenSet.blockScopeTokenPair.close);

		node.condition = astParser.parseAstNode<CompositionNode>(code.substring(parenthesisOpenIndex + 1, parenthesisCloseIndex - 1), CompositionNode.name);
		node.thenBlock = astParser.parseAstNode<BlockScope>(code.substring(blockOpenIndex, blockCloseIndex), BlockScope.name);

		return node;
	}
}
