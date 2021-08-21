import { CompositionNode } from './../../../../ast-node/composition-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { ConsoleUtil } from '../../../common/util/console-util';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { tokenSet } from './token-set';

export class CompositionSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'BlockContent';
	}

	public isFeatureDetected(code: string): boolean {
		return tokenSet.binaryExpressionTokens.some((token: string) => code.includes(token));
	}

	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const tokensInStatement: string[] = tokenSet.binaryExpressionTokens.filter((token: string) => code.includes(token));
		const tokenPositions: number[] = tokensInStatement.map((token: string) => code.indexOf(token));

		//Parse the right side of the composition without redoing the mapping (more performant)
		//const node: CompositionNode = this.parseComposition(code, astParser, tokensInStatement, tokenPositions);

		//Just parse the right side recursively like usual
		const node: CompositionNode = this.parseCompositionFullRecursive(code, astParser);

		return node;
	}

	private parseComposition(code: string, astParser: BaseAstParser, tokensInStatement: string[], tokenPositions: number[]): CompositionNode {
		const node: CompositionNode = new CompositionNode();

		const firstPosition: number = Math.min(...tokenPositions);
		const firstTokenIndex: number = tokenPositions.indexOf(firstPosition);

		const firstToken: string = tokensInStatement[firstTokenIndex];
		const leftRightParts: string[] = code.split(firstToken);
		node.compositorToken = firstToken;

		tokensInStatement.shift();
		tokenPositions.shift();

		node.left = astParser.parseAstNodeDetect(leftRightParts[0]);

		if (tokensInStatement.length > 0) {
			node.right = this.parseComposition(leftRightParts[1], astParser, tokensInStatement, tokenPositions);
		} else {
			node.right = astParser.parseAstNodeDetect(leftRightParts[1]);
		}

		return node;
	}

	private parseCompositionFullRecursive(code: string, astParser: BaseAstParser): CompositionNode {
		const node: CompositionNode = new CompositionNode();

		const tokensInStatement: string[] = tokenSet.binaryExpressionTokens.filter((token: string) => code.includes(token));
		const tokenPositions: number[] = tokensInStatement.map((token: string) => code.indexOf(token));

		const firstPosition: number = Math.min(...tokenPositions);
		const firstTokenIndex: number = tokenPositions.indexOf(firstPosition);
		const firstToken: string = tokensInStatement[firstTokenIndex];
		const leftRightParts: string[] = code.split(firstToken);
		node.compositorToken = firstToken;
		node.left = astParser.parseAstNodeDetect(leftRightParts[0]);
		node.right = astParser.parseAstNodeDetect(leftRightParts[1]);

		return node;
	}
}