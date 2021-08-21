import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { OrdoAstParser } from '../ordo-ast-parser';
import { BlockScope } from '../../../../ast-node/block-scope';
import { CompositionNode } from '../../../../ast-node/composition-node';
import { ElseNode } from '../../../../ast-node/else-node';

export class ElseSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'ElseNode';
	}
	private regExp: RegExp = new RegExp(/}[ \n]*else[ ]/);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ElseNode = new ElseNode();

		const parenthesisOpenIndex: number = code.indexOf(OrdoAstParser.functionParamOpenToken);
		const parenthesisCloseIndex: number = code.indexOf(OrdoAstParser.functionParamCloseToken);

		const blockOpenIndex: number = code.indexOf(OrdoAstParser.nodeEnclosureOpenToken);
		const blockCloseIndex: number = code.lastIndexOf(OrdoAstParser.nodeEnclosureCloseToken);

		node.condition = astParser.parseAstNode<CompositionNode>(code.substring(parenthesisOpenIndex + 1, parenthesisCloseIndex - 1), CompositionNode.name);
		node.thenBlock = astParser.parseAstNode<BlockScope>(code.substring(blockOpenIndex, blockCloseIndex), BlockScope.name);

		return node;
	}
}
