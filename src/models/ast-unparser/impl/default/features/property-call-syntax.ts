import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { PropertyCallNode } from '../../../../ast-node';

export class PropertyCallSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof PropertyCallNode)) {
			return null;
		}

		let code: string = '';
		code += node.subject.label;
		code += this.tokenSet.propertyAccessToken;
		const unparsed: string | null = this.astUnparser.unParseAstNode(node.method);
		if (unparsed) {
			code += unparsed;
		}
		return code;
	}
}
