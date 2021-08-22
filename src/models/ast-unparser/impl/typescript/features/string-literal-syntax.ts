import { StringLiteral } from './../../../../ast-node/string-literal';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class StringLiteralSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof StringLiteral)) {
			return null;
		}

		return '"' + node.text + '"';
	}
}
