import { VariableDeclarationNode } from './../../../../ast-node/variable-declaration-node';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class VariableDeclarationSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof VariableDeclarationNode)) {
			return null;
		}

		let code: string = '';
		code += node.modifier.label + ' ';
		code += node.id.label;
		if (node.valuetype && node.valuetype.label) {
			code += ':' + node.valuetype.label;
		}

		return code;
	}
}
