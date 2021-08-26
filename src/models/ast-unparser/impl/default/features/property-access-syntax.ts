import { PropertyAccessNode } from './../../../../ast-node/property-access-node';

import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class PropertyAccessSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof PropertyAccessNode)) {
			return null;
		}

		let code: string = '';
		code = this.tryUnparse(code, node.subject);
		code += this.tokenSet.propertyAccessToken;
		code += node.property;
		code += '\n';

		return code;
	}
}
