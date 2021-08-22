import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node';

export class FunctionDefinitionSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof FunctionDefinition)) {
			return null;
		}

		let code: string = '';
		code += 'function ';
		code += node.label;
		code += '(';
		const unparsedParam: string | null = astUnparser.unParseAstNode(node.parameters);
		if (unparsedParam) {
			code += unparsedParam;
		}
		code += ')';
		if (node.returnType) {
			code += ':' + node.returnType.label;
		}

		const unparsedBody: string | null = astUnparser.unParseAstNode(node.body);
		if (unparsedBody) {
			code += unparsedBody + '\n';
		}

		return code;
	}
}
