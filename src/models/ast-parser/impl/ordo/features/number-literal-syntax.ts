import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { NumberLiteral } from '../../../../ast-node/number-literal';

export class NumberLiteralSyntax extends BaseSyntaxFeature {
	public priority: number = 100;
	//private regExp: RegExp = new RegExp(/^[0-9]+/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.numberLiteralDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: NumberLiteral = new NumberLiteral();
		node.value = Number(code);
		return node;
	}
}
