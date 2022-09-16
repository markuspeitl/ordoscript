import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { ObjectLiteral } from '../../../../ast-node';

export class ObjectLiteralSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof ObjectLiteral)) {
			return null;
		}

		let code: string = '';
		code += this.tokenSet.objectLiteralTokenPair.open;
		if (node.value) {
			code = this.tryUnparse(code, node.value);
		}
		code += this.tokenSet.objectLiteralTokenPair.close;
		return code;
	}
}
