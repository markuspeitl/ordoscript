import { BlockContent } from './../../../../ast-node/block-content';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class BlockContentSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof BlockContent)) {
			return null;
		}

		let code: string = '';
		if (node.children && node.children.length > 0) {
			for (const statement of node.children) {
				const unparsed: string | null = this.astUnparser.unParseAstNode(statement);
				if (unparsed) {
					code += unparsed + this.tokenSet.delimiterTokens.join('');
				}
			}
		}
		return code;
	}
}
