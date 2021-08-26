import { ArrayLiteral } from './../../../../ast-node/array-literal';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class ArrayLiteralSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof ArrayLiteral)) {
			return null;
		}

		let code: string = '';
		code += this.tokenSet.arrayLiteralTokenPair.open;
		if (node.value) {
			code = this.tryUnparse(code, node.value);
		}
		code += this.tokenSet.arrayLiteralTokenPair.close;
		return code;
	}
}
