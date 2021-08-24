import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { ElseNode } from '../../../../ast-node/else-node';
import { BaseBodiedSyntax } from '../../../abstract/base-bodied-syntax';

export class ElseSyntax extends BaseBodiedSyntax {
	public priority: number = 4;
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.elseDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ElseNode = new ElseNode();
		node.thenBlock = this.parseBody(code, this.tokenSet.blockScopeTokenPair);
		return node;
	}
}
