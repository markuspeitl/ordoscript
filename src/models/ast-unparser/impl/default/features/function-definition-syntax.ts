import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node';

export class FunctionDefinitionSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof FunctionDefinition)) {
			return null;
		}

		let code: string = '';
		code += this.tokenSet.functionKeywordToken + ' ';
		code += node.id.label;
		code += this.tokenSet.functionParamTokenPair.open;
		const unparsedParam: string | null = this.astUnparser.unParseAstNode(node.parameters);
		if (unparsedParam) {
			code += unparsedParam;
		}
		code += this.tokenSet.functionParamTokenPair.close;
		if (node.returnType) {
			code += this.tokenSet.typeDefinitionStartToken + node.returnType.label;
		}

		const unparsedBody: string | null = this.astUnparser.unParseAstNode(node.body);
		if (unparsedBody) {
			code += unparsedBody; //+ '\n';
		}

		return code;
	}
}
