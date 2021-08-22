import { PropertyAccessNode } from './../../../../ast-node/property-access-node';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { UnparseTool } from '../../../common/util/unparse-tool';

export class PropertyAccessSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof PropertyAccessNode)) {
			return null;
		}

		let code: string = '';
		code = UnparseTool.tryUnparse(code, node.id, astUnparser);
		code += '.';
		code += node.property;
		code += '\n';

		return code;
	}
}
