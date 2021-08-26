import { StringLiteral } from './../../../../ast-node/string-literal';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class StringLiteralSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof StringLiteral)) {
			return null;
		}

		return this.tokenSet.stringEscapeTokens[0].open + node.text + this.tokenSet.stringEscapeTokens[0].close;
	}
}
