import { FunctionCall } from './../../../../ast-node/function-call';

import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class FunctionCallSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode | null): string | null {
		if (!(node instanceof FunctionCall)) {
			return null;
		}

		let code: string = '';
		code += node.identifier.label;
		code += this.tokenSet.functionCallParamTokenPair.open;
		const unparsedParam: string | null = this.astUnparser.unParseAstNode(node.parameters);
		if (unparsedParam) {
			code += unparsedParam;
		}
		code += this.tokenSet.functionCallParamTokenPair.close;
		return code;
	}
}
