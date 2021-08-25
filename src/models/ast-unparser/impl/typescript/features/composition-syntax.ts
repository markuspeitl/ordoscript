import { CompositionNode } from './../../../../ast-node/composition-node';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class CompositionSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof CompositionNode)) {
			return null;
		}

		let code: string = '';
		const unParsedLeft: string | null = this.astUnparser.unParseAstNode(node.left);
		if (!unParsedLeft) {
			throw Error('Composition must have left hand element');
		}
		const unParsedRight: string | null = this.astUnparser.unParseAstNode(node.right);
		if (!unParsedRight) {
			throw Error('Composition must have right hand element');
		}
		code += unParsedLeft + node.compositorToken + unParsedRight;
		return code;
	}
}
