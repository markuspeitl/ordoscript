import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { BlockScope } from '../../../../ast-node/block-scope';
import { IfNode } from '../../../../ast-node/if-node';
import { CompositionNode } from '../../../../ast-node/composition-node';
import { SyntaxTool } from '../../../common/util/syntax-tool';
import { Enclosing } from '../../../common/models/enclosing';

export class IfSyntax extends BaseSyntaxFeature {
	//private regExp: RegExp = new RegExp(/^if[ ]*\(/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmedCode);
		return this.matchSet.ifDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: IfNode = new IfNode();

		const parenthesisEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.ifParamTokenPair);
		if (!parenthesisEnclosing) {
			throw new Error('Could not find parameter definition of function');
		}

		const blockEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.blockScopeTokenPair);
		if (!blockEnclosing) {
			throw new Error('Could not find body block of function.');
		}

		node.condition = astParser.parseAstNode<CompositionNode>(SyntaxTool.getEnclosedContents(code, parenthesisEnclosing), CompositionNode.name);
		SyntaxTool.widenEnclosing(blockEnclosing, 1);
		node.thenBlock = astParser.parseAstNode<BlockScope>(SyntaxTool.getEnclosedContents(code, blockEnclosing), BlockScope.name);

		return node;
	}
}
