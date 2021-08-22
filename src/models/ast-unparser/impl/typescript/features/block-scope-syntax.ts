import { BlockScope } from './../../../../ast-node/block-scope';
import { BaseAstUnparser } from '../../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class BlockScopeSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode, astUnparser: BaseAstUnparser): string | null {
		if (!(node instanceof BlockScope)) {
			return null;
		}

		let code: string = '';
		code += '\n{\n';
		if (node.content) {
			const unParsedBlock: string | null = astUnparser.unParseAstNode(node.content);
			if (unParsedBlock) {
				const lines: string[] = unParsedBlock.split('\n');
				for (const line of lines) {
					if (line && line.length > 0) {
						code += '\t' + line.trim() + '\n';
					}
				}
			}
		}
		code += '}';
		return code;
	}
}
