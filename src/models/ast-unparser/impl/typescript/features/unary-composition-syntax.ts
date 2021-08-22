import { UnaryCompositionNode } from './../../../../ast-node/unary-composition-node';
import { CompositionNode } from './../../../../ast-node/composition-node';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class UnaryCompositionSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof UnaryCompositionNode)) {
			return null;
		}

		let code: string = '';
		const unParsedLeft: string | null = astUnparser.unParseAstNode(node.target);
		if (!unParsedLeft) {
			throw Error('Composition must have left hand element');
		}

		code += unParsedLeft + node.operationToken;
		return code;
	}
}
