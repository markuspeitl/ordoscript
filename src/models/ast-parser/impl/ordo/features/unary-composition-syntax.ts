import { CompositionNode } from './../../../../ast-node/composition-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { tokenSet } from './token-set';
import { UnaryCompositionNode } from '../../../../ast-node/unary-composition-node';

export class UnaryCompositionSyntax extends BaseSyntaxFeature {
	public isFeatureDetected(code: string): boolean {
		return tokenSet.unaryExpressionTokens.some((token: string) => code.includes(token));
	}

	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: UnaryCompositionNode = new UnaryCompositionNode();

		const tokensInStatement: string[] = tokenSet.unaryExpressionTokens.filter((token: string) => code.includes(token));
		const tokenPositions: number[] = tokensInStatement.map((token: string) => code.indexOf(token));
		const firstPosition: number = Math.min(...tokenPositions);
		const firstTokenIndex: number = tokenPositions.indexOf(firstPosition);
		const firstToken: string = tokensInStatement[firstTokenIndex];
		const leftRightParts: string[] = code.split(firstToken);

		node.operationToken = firstToken;
		node.target = astParser.parseAstNodeDetect(leftRightParts[0].trim());

		return node;
	}
}
