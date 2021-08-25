import { ValueListingNode } from './../../../../ast-node/value-listing-node';

import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class ValueListingSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof ValueListingNode)) {
			return null;
		}

		if (!node.values) {
			return null;
		}

		let code: string = '';
		const unparsedChildren: string[] = [];
		for (const childNode of node.values) {
			const unparsed: string | null = this.astUnparser.unParseAstNode(childNode);
			if (unparsed) {
				unparsedChildren.push(unparsed);
			}
		}
		code += unparsedChildren.join(this.tokenSet.listSeperator);

		return code;
	}
}
