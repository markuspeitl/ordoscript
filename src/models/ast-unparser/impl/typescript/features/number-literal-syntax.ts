import { NumberLiteral } from './../../../../ast-node/number-literal';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class NumberLiteralSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof NumberLiteral)) {
			return null;
		}

		return String(node.value);
	}
}
