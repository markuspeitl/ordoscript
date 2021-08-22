import { FunctionCall } from './../../../../ast-node/function-call';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class FunctionCallSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode | null, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof FunctionCall)) {
			return null;
		}
		if (!astUnparser) {
			return null;
		}

		let code: string = '';
		code += node.identifier.label;
		code += '(';
		const unparsedParam: string | null = astUnparser.unParseAstNode(node.parameters);
		if (unparsedParam) {
			code += unparsedParam;
		}
		code += ')';
		return code;
	}
}
