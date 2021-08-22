import { UnparseTool } from './../../../common/util/unparse-tool';
import { LinkNode } from './../../../../ast-node/link-node';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class LinkSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof LinkNode)) {
			return null;
		}
		let code: string = '';
		code += 'import ';
		code += '{';
		code = UnparseTool.tryUnparse(code, node.selectedResources, astUnparser);
		code += '} ';
		code += 'from ';
		code = UnparseTool.tryUnparse(code, node.locationSpecification, astUnparser);
		code += ';\n';
		return code;
	}
}
