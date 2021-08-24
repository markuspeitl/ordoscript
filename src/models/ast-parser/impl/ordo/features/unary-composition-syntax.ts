import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { UnaryCompositionNode } from '../../../../ast-node/unary-composition-node';

export class UnaryCompositionSyntax extends BaseSyntaxFeature {
	public priority: number = 2;
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.unaryCompositionDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: UnaryCompositionNode = new UnaryCompositionNode();

		const tokensInStatement: string[] = this.tokenSet.unaryExpressionTokens.filter((token: string) => code.includes(token));
		const tokenPositions: number[] = tokensInStatement.map((token: string) => code.indexOf(token));
		const firstPosition: number = Math.min(...tokenPositions);
		const firstTokenIndex: number = tokenPositions.indexOf(firstPosition);
		const firstToken: string = tokensInStatement[firstTokenIndex];
		const leftRightParts: string[] = code.split(firstToken);

		node.operationToken = firstToken;
		node.target = this.getNodeDetect(leftRightParts[0].trim(), 'target');

		return node;
	}
}
