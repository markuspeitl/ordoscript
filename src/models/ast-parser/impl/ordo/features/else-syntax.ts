import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { BlockScope } from '../../../../ast-node/block-scope';
import { CompositionNode } from '../../../../ast-node/composition-node';
import { ElseNode } from '../../../../ast-node/else-node';
import { SyntaxTool } from '../../../common/util/syntax-tool';
import { Enclosing } from '../../../common/models/enclosing';

export class ElseSyntax extends BaseSyntaxFeature {
	public priority: number = 4;
	//private regExp: RegExp = new RegExp(/}[ \n]*else[ ]/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.elseDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ElseNode = new ElseNode();
		node.thenBlock = SyntaxTool.parseBody(code, this.tokenSet.blockScopeTokenPair, astParser, this.constructor.name);
		return node;
	}
}
