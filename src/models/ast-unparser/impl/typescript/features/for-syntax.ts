import { ForNode } from './../../../../ast-node/for-node';
import { UnparseTool } from './../../../common/util/unparse-tool';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class ForSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof ForNode)) {
			return null;
		}

		let code: string = '';
		code += 'for ';
		code += '(';
		code = UnparseTool.tryUnparse(code, node.initializer, astUnparser);
		code += ';';
		code = UnparseTool.tryUnparse(code, node.endCondition, astUnparser);
		code += ';';
		code = UnparseTool.tryUnparse(code, node.incrementor, astUnparser);
		code += ')';

		code = UnparseTool.tryUnparse(code, node.body, astUnparser);

		return code;
	}
}
