import { ForNode } from './../../../../ast-node/for-node';
import { UnparseTool } from './../../../common/util/unparse-tool';

import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class ForSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof ForNode)) {
			return null;
		}

		let code: string = '';
		code += this.tokenSet.forKeywordToken + ' ';
		code += this.tokenSet.forParamTokenPair.open;
		code = this.tryUnparse(code, node.initializer);
		code += this.tokenSet.forParamStatementSeperator;
		code = this.tryUnparse(code, node.endCondition);
		code += this.tokenSet.forParamStatementSeperator;
		code = this.tryUnparse(code, node.incrementor);
		code += this.tokenSet.forParamTokenPair.close;

		code = this.tryUnparse(code, node.body);

		return code;
	}
}
