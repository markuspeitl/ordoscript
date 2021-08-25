import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { PropertyCallNode } from '../../../../ast-node';

export class PropertyCallSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof PropertyCallNode)) {
			return null;
		}

		let code: string = '';
		code += node.subject.label;
		code += '.';
		const unparsed: string | null = astUnparser.unParseAstNode(node.method);
		if (unparsed) {
			code += unparsed;
		}
		return code;
	}
}
