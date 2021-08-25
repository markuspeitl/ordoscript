import { VariableDeclarationNode } from './../../../../ast-node/variable-declaration-node';
import { Enclosing } from './../../../common/models/enclosing';
import { CompositionNode } from './../../../../ast-node/composition-node';
import { ForNode } from './../../../../ast-node/for-node';
import { SyntaxTool } from './../../../common/util/syntax-tool';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseBodiedSyntax } from '../../../abstract/base-bodied-syntax';

export class ForSyntax extends BaseBodiedSyntax {
	public priority: number = 0.1;
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.forDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const forParamsEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.functionParamTokenPair);
		const forParams: string | null = SyntaxTool.getEnclosedContents(code, forParamsEnclosing);
		if (!forParams || !forParamsEnclosing) {
			throw new Error('For loop must have params!');
		}
		const forParamStatements: string[] = forParams.split(';');
		if (!forParamStatements || forParamStatements.length < 3) {
			throw new Error('Invalid number of for param parts -> must be 3 and received: ' + String(forParamStatements?.length));
		}

		const node: ForNode = new ForNode();
		node.initializer = this.getNode<VariableDeclarationNode>(forParamStatements[0].trim(), VariableDeclarationNode.name, 'initializer');
		node.endCondition = this.getNode<CompositionNode>(forParamStatements[1].trim(), CompositionNode.name, 'endCondition');
		//Can be unary or a composition
		node.incrementor = this.getNodeDetect(forParamStatements[2].trim(), 'incrementor');

		const afterParams: string = SyntaxTool.afterEnclosing(code, forParamsEnclosing);
		node.body = this.parseBody(afterParams, this.tokenSet.blockScopeTokenPair);

		return node;
	}
}
