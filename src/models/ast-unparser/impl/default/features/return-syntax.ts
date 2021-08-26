import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

import { ReturnNode } from '../../../../ast-node';

export class ReturnSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof ReturnNode)) {
			return null;
		}

		let code: string = '';
		code += this.tokenSet.returnKeyword + ' ';
		code = this.tryUnparse(code, node.returnValue);
		//code += ';';

		return code;
	}
}
