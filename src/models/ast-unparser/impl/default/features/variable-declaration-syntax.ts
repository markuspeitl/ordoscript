import { VariableDeclarationNode } from './../../../../ast-node/variable-declaration-node';

import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class VariableDeclarationSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof VariableDeclarationNode)) {
			return null;
		}

		let code: string = '';
		code += node.modifier.label + ' ';
		code += node.id.label;
		if (node.valuetype && node.valuetype.label) {
			code += this.tokenSet.typeDefinitionStartToken + node.valuetype.label;
		}

		return code;
	}
}
