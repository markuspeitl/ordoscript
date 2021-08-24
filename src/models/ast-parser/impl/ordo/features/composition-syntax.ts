import { CompositionNode } from './../../../../ast-node/composition-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class CompositionSyntax extends BaseSyntaxFeature {
	public priority: number = 3;

	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.tokenSet.binaryExpressionTokens.some((token: string) => code.includes(token));
		return this.matchSet.compositionDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const tokensInStatement: string[] = this.tokenSet.binaryExpressionTokens.filter((token: string) => code.includes(token));
		const tokenPositions: number[] = tokensInStatement.map((token: string) => code.indexOf(token));

		//Parse the right side of the composition without redoing the mapping (more performant)
		//const node: CompositionNode = this.parseComposition(code, astParser, tokensInStatement, tokenPositions);

		//Just parse the right side recursively like usual
		const node: CompositionNode = this.parseCompositionFullRecursive(code);

		return node;
	}

	/*private parseComposition(code: string, astParser: BaseAstParser, tokensInStatement: string[], tokenPositions: number[]): CompositionNode {
		const node: CompositionNode = new CompositionNode();

		const firstPosition: number = Math.min(...tokenPositions);
		const firstTokenIndex: number = tokenPositions.indexOf(firstPosition);

		const firstToken: string = tokensInStatement[firstTokenIndex];
		const leftRightParts: string[] = code.split(firstToken);
		node.compositorToken = firstToken;

		tokensInStatement.shift();
		tokenPositions.shift();

		node.left = this.getNodeDetectNullable(leftRightParts[0]);

		if (tokensInStatement.length > 0) {
			node.right = this.parseComposition(leftRightParts[1], astParser, tokensInStatement, tokenPositions);
		} else {
			node.right = this.getNodeDetectNullable(leftRightParts[1]);
		}

		return node;
	}*/

	private parseCompositionFullRecursive(code: string): CompositionNode {
		const node: CompositionNode = new CompositionNode();

		const tokensInStatement: string[] = this.tokenSet.binaryExpressionTokens.filter((token: string) => code.includes(token));
		const tokenPositions: number[] = tokensInStatement.map((token: string) => code.indexOf(token));

		const firstPosition: number = Math.min(...tokenPositions);
		const firstTokenIndex: number = tokenPositions.indexOf(firstPosition);
		const firstToken: string = tokensInStatement[firstTokenIndex];
		const parts: string[] = code.split(firstToken);
		node.compositorToken = firstToken;

		node.left = this.getNodeDetect(parts[0], 'left');
		node.right = this.getNodeDetect(parts[1], 'right');

		return node;
	}
}
