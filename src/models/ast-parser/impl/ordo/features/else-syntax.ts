import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { BlockScope } from '../../../../ast-node/block-scope';
import { CompositionNode } from '../../../../ast-node/composition-node';
import { ElseNode } from '../../../../ast-node/else-node';

export class ElseSyntax extends BaseSyntaxFeature {
	//private regExp: RegExp = new RegExp(/}[ \n]*else[ ]/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.elseDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ElseNode = new ElseNode();

		//const parenthesisOpenIndex: number = code.indexOf(this.tokenSet.functionParamTokenPair.open);
		//const parenthesisCloseIndex: number = code.indexOf(this.tokenSet.functionParamTokenPair.close);

		const blockOpenIndex: number = code.indexOf(this.tokenSet.blockScopeTokenPair.open);
		const blockCloseIndex: number = code.lastIndexOf(this.tokenSet.blockScopeTokenPair.close);

		/*node.condition = astParser.parseAstNode<CompositionNode>(
			code.substring(parenthesisOpenIndex + 1, parenthesisCloseIndex - 1),
			CompositionNode.name
		);*/
		node.thenBlock = astParser.parseAstNode<BlockScope>(code.substring(blockOpenIndex, blockCloseIndex), BlockScope.name);

		return node;
	}
}
