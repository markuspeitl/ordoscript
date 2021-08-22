import { IfNode } from './../../../../ast-node/if-node';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { UnparseTool } from '../../../common/util/unparse-tool';

export class IfSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof IfNode)) {
			return null;
		}

		let code: string = '';
		code += 'if ';
		code += '(';
		const unparsedParam: string | null = astUnparser.unParseAstNode(node.condition);
		if (unparsedParam) {
			code += unparsedParam;
		}
		code += ')';

		code = UnparseTool.tryUnparse(code, node.thenBlock, astUnparser);

		return code;
	}
}
