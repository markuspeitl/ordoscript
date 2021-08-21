import { BlockContent } from './../../../../ast-node/block-content';
import { BlockScope } from './../../../../ast-node/block-scope';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { SyntaxUtil } from '../../../abstract/sytax-util';

export class BlockScopeSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'BlockScope';
	}
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return trimmed.startsWith('{') && trimmed.endsWith('}');
	}

	public parseFeature(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const curatedCode: string | null = SyntaxUtil.getStrippedCode(code);
		if (!curatedCode) {
			throw new Error('Failed to parse block scope -> stripped code empty');
		}

		const node: BlockScope = new BlockScope();
		const blockContent: string = curatedCode.substring(1, curatedCode.length - 1);
		node.content = astParser.parseAstNode<BlockContent>(blockContent, BlockContent.name);
		return node;
	}
}
