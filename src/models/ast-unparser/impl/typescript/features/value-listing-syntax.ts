import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class ValueListingSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof ValueListingNode)) {
			return null;
		}

		if (!node.values) {
			return null;
		}

		let code: string = '';
		const unparsedChildren: string[] = [];
		for (const childNode of node.values) {
			const unparsed: string | null = astUnparser.unParseAstNode(childNode);
			if (unparsed) {
				unparsedChildren.push(unparsed);
			}
		}
		code += unparsedChildren.join(',');

		return code;
	}
}
