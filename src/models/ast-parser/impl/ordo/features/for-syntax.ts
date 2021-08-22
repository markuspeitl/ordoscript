import { CompositionNode } from './../../../../ast-node/composition-node';
import { ForNode } from './../../../../ast-node/for-node';
import { SyntaxTool } from './../../../common/util/syntax-tool';
import { Enclosing } from './../../../common/models/enclosing';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { BlockScope } from '../../../../ast-node/block-scope';

export class ForSyntax extends BaseSyntaxFeature {
	public priority: number = 0.1;
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

		const childNode: CompositionNode | null = astParser.parseAstNode<CompositionNode>(forParamsParts[1].trim(), CompositionNode.name);
		if (!childNode) {
			throw new Error('Failed parsing endcondition.');
		}
		node.endCondition = childNode;

		const children: BaseAstNode[] = SyntaxTool.parseDetectArray(
			[forParamsParts[0].trim(), forParamsParts[2].trim()],
			astParser,
			this.constructor.name
		);
		node.initializer = children[0];
		node.incrementor = children[1];

		node.body = SyntaxTool.parseBody(code, this.tokenSet.blockScopeTokenPair, astParser, this.constructor.name);

		return node;
	}
}
