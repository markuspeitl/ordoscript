import { UnaryCompositionNode } from './../../../../ast-node/unary-composition-node';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class UnaryCompositionSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof UnaryCompositionNode)) {
			return null;
		}

		let code: string = '';
		const unParsedLeft: string | null = this.astUnparser.unParseAstNode(node.target);
		if (!unParsedLeft) {
			throw Error('Composition must have left hand element');
		}

		code += unParsedLeft + node.operationToken;
		return code;
	}
}
