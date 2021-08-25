import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { ElseNode } from '../../../../ast-node';

export class ElseSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof ElseNode)) {
			return null;
		}

		let code: string = '';
		code += this.tokenSet.elseKeywordToken + ' ';

		code = this.tryUnparse(code, node.thenBlock);

		return code;
	}
}
