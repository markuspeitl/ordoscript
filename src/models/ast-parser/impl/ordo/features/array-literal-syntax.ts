import { BaseAstNode, ArrayLiteral, ValueListingNode } from '../../../../ast-node/index';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { SyntaxTool } from '../../../common/util/syntax-tool';

export class ArrayLiteralSyntax extends BaseSyntaxFeature {
	public priority: number = 100;

	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.matchSet.arrayLiteralDetector.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const arrayContents: string | null = SyntaxTool.getTokenEnclosedContents(code, this.tokenSet.arrayLiteralTokenPair);
		if (!arrayContents) {
			throw new Error('Array literal must be enclosed by array def tokens!');
		}

		const node: ArrayLiteral = new ArrayLiteral();
		node.value = astParser.parseAstNode<ValueListingNode>(arrayContents, ValueListingNode.name);

		return node;
	}
}
