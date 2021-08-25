import { NumericLiteral } from '../../../../ast-node/numeric-literal';

import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class NumericLiteralSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof NumericLiteral)) {
			return null;
		}

		return String(node.value);
	}
}
