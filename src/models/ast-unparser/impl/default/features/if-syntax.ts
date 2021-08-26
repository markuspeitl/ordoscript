import { IfNode } from './../../../../ast-node/if-node';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class IfSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof IfNode)) {
			return null;
		}

		let code: string = '';
		code += this.tokenSet.ifKeywordToken + ' ';
		code += this.tokenSet.ifParamTokenPair.open;
		const unparsedParam: string | null = this.astUnparser.unParseAstNode(node.condition);
		if (unparsedParam) {
			code += unparsedParam;
		}
		code += this.tokenSet.ifParamTokenPair.close;

		code = this.tryUnparse(code, node.thenBlock);

		return code;
	}
}
