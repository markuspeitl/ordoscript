import { BlockContent } from './../../../../ast-node/block-content';
import { BlockScope } from './../../../../ast-node/block-scope';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class BlockScopeSyntax extends BaseSyntaxFeature {
	public priority: number = 1;

	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return false;
		//return this.matchSet.blockScopeDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: BlockScope = new BlockScope();
		const blockContent: string = code.substring(1, code.length - 1);
		node.content = this.getNodeNullable<BlockContent>(blockContent, BlockContent.name);
		return node;
	}
}
