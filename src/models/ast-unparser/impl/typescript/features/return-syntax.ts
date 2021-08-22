import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { UnparseTool } from '../../../common/util/unparse-tool';
import { ReturnNode } from '../../../../ast-node';

export class ReturnSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof ReturnNode)) {
			return null;
		}

		let code: string = '';
		code += 'return ';
		code = UnparseTool.tryUnparse(code, node.returnValue, astUnparser);
		code += ';';

		return code;
	}
}
