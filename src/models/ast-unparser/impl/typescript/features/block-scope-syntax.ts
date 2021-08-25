import { BlockScope } from './../../../../ast-node/block-scope';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class BlockScopeSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof BlockScope)) {
			return null;
		}

		let code: string = '';
		code += '\n' + this.tokenSet.blockScopeTokenPair.open + '\n';
		if (node.content) {
			const unParsedBlock: string | null = this.astUnparser.unParseAstNode(node.content);
			if (unParsedBlock) {
				const lines: string[] = unParsedBlock.split('\n');
				for (const line of lines) {
					if (line && line.length > 0) {
						code += '\t' + line.trim() + '\n';
					}
				}
			}
		}
		code += this.tokenSet.blockScopeTokenPair.close;
		return code;
	}
}
