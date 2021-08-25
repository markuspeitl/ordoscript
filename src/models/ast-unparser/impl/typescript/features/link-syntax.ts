import { UnparseTool } from './../../../common/util/unparse-tool';
import { LinkNode } from './../../../../ast-node/link-node';

import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class LinkSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof LinkNode)) {
			return null;
		}
		let code: string = '';
		code += this.tokenSet.linkExtTokenKeyword + ' ';
		code += this.tokenSet.blockScopeTokenPair.open;
		code = this.tryUnparse(code, node.selectedResources);
		code += this.tokenSet.blockScopeTokenPair.close + ' ';
		code += this.tokenSet.linkExtLocationToken + ' ';
		code = this.tryUnparse(code, node.locationSpecification);
		//code += this.tokenSet.delimiterTokens.join('');
		return code;
	}
}
