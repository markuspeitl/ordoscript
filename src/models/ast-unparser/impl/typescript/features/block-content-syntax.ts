import { BlockContent } from './../../../../ast-node/block-content';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class BlockContentSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof BlockContent)) {
			return null;
		}

		let code: string = '';
		if (node.children && node.children.length > 0) {
			for (const statement of node.children) {
				const unparsed: string | null = astUnparser.unParseAstNode(statement);
				if (unparsed) {
					code += unparsed + '\n';
				}
			}
		}
		return code;
	}
}
