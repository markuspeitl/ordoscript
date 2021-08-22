import { UnparseTool } from './../../../common/util/unparse-tool';
import { ArrayLiteral } from './../../../../ast-node/array-literal';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class ArrayLiteralSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof ArrayLiteral)) {
			return null;
		}

		let code: string = '';
		code += '[';
		if (node.value) {
			code = UnparseTool.tryUnparse(code, node.value, astUnparser);
		}
		code += ']';
		return code;
	}
}
