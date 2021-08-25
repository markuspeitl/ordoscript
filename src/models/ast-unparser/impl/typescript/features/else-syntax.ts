import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { UnparseTool } from '../../../common/util/unparse-tool';
import { ElseNode } from '../../../../ast-node';

export class ElseSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof ElseNode)) {
			return null;
		}

		let code: string = '';
		code += 'else ';

		code = UnparseTool.tryUnparse(code, node.thenBlock, astUnparser);

		return code;
	}
}
