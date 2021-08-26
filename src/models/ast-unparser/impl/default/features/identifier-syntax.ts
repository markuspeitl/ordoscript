import { Identifier } from './../../../../ast-node/identifier';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class IdentifierSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof Identifier)) {
			return null;
		}

		return node.label;
	}
}
