import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { BlockScope } from '../../../../ast-node/block-scope';
import { IfNode } from '../../../../ast-node/if-node';
import { CompositionNode } from '../../../../ast-node/composition-node';
import { SyntaxTool } from '../../../common/util/syntax-tool';
import { Enclosing } from '../../../common/models/enclosing';

export class IfSyntax extends BaseSyntaxFeature {
	public priority: number = 4;
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

		const condition: CompositionNode | null = astParser.parseAstNode<CompositionNode>(
			SyntaxTool.getEnclosedContents(code, parenthesisEnclosing),
			CompositionNode.name
		);
		if (!condition) {
			throw new Error('If must have a non empty condition');
		}
		node.condition = condition;
		node.thenBlock = SyntaxTool.parseBody(code, this.tokenSet.blockScopeTokenPair, astParser, this.constructor.name);

		return node;
	}
}
