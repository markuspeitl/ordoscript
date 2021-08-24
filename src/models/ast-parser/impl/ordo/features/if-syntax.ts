import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { BlockScope } from '../../../../ast-node/block-scope';
import { IfNode } from '../../../../ast-node/if-node';
import { CompositionNode } from '../../../../ast-node/composition-node';
import { SyntaxTool } from '../../../common/util/syntax-tool';
import { Enclosing } from '../../../common/models/enclosing';
import { BaseBodiedSyntax } from '../../../abstract/base-bodied-syntax';

export class IfSyntax extends BaseBodiedSyntax {
	public priority: number = 2;
	//private regExp: RegExp = new RegExp(/^if[ ]*\(/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmedCode);
		return this.matchSet.ifDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: IfNode = new IfNode();

		const conditionContents: string | null = SyntaxTool.getTokenEnclosedContents(code, this.tokenSet.ifParamTokenPair);
		if (!conditionContents) {
			throw new Error('If must have condition');
		}

		node.condition = this.getNodeDetect(conditionContents, 'condition');
		node.thenBlock = this.parseBody(code, this.tokenSet.blockScopeTokenPair);

		return node;
	}
}
