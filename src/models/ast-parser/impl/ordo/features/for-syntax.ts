import { CompositionNode } from './../../../../ast-node/composition-node';
import { ForNode } from './../../../../ast-node/for-node';
import { SyntaxTool } from './../../../common/util/syntax-tool';
import { Enclosing } from './../../../common/models/enclosing';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { BlockScope } from '../../../../ast-node/block-scope';

export class ForSyntax extends BaseSyntaxFeature {
	//private regExp: RegExp = new RegExp(/^for[ ]*\(/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.forDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const forParams: string | null = SyntaxTool.getTokenEnclosedContents(code, this.tokenSet.functionParamTokenPair);
		if (!forParams) {
			throw new Error('For loop must have params!');
		}
		const forParamsParts: string[] = forParams.split(';');
		if (!forParamsParts || forParamsParts.length < 3) {
			throw new Error('Invalid number of for param parts -> must be 3 and received: ' + String(forParamsParts?.length));
		}

		const node: ForNode = new ForNode();
		//node.initializer = astParser.parseAstNode<VariableDeclarationNode>(forParamsParts[0].trim(), VariableDeclarationNode.name);
		node.initializer = astParser.parseAstNodeDetect(forParamsParts[0].trim());
		node.endCondition = astParser.parseAstNode<CompositionNode>(forParamsParts[1].trim(), CompositionNode.name);
		node.incrementor = astParser.parseAstNodeDetect(forParamsParts[2].trim());

		const forBlockEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.blockScopeTokenPair);

		if (!forBlockEnclosing) {
			throw new Error('For loop must have enclosed block as component.');
		}

		SyntaxTool.widenEnclosing(forBlockEnclosing, 1);
		const enclosedBlock: string = SyntaxTool.getEnclosedContents(code, forBlockEnclosing);
		node.body = astParser.parseAstNode<BlockScope>(enclosedBlock, BlockScope.name);

		return node;
	}
}
