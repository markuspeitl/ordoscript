import { BlockScope } from '../../ast-node';
import { TokenPair } from '../../common/token-pair';
import { Enclosing } from '../common/models/enclosing';
import { SyntaxTool } from '../common/util/syntax-tool';
import { BaseSyntaxFeature } from './base-syntax-feature';

export abstract class BaseBodiedSyntax extends BaseSyntaxFeature {
	public parseBody(code: string, tokenPair: TokenPair): BlockScope {
		const blockEnclosing: Enclosing | null = SyntaxTool.getMaxEnclosingOfTokens(code, tokenPair);
		SyntaxTool.widenEnclosing(blockEnclosing, 1);
		const enclosedBlock: string | null = SyntaxTool.getEnclosedContents(code, blockEnclosing);
		if (!blockEnclosing || !enclosedBlock) {
			throw new Error(this.prependNodeName('body') + ': could not find body block of function.');
		}

		const body: BlockScope = this.getNode<BlockScope>(enclosedBlock, BlockScope.name, 'body');
		return body;
	}
}
