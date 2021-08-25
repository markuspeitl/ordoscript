import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { NumericLiteral } from '../../../../ast-node/numeric-literal';

export class NumericLiteralSyntax extends BaseSyntaxFeature {
	public priority: number = 100;
	//private regExp: RegExp = new RegExp(/^[0-9]+/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.numberLiteralDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: NumericLiteral = new NumericLiteral();
		node.value = Number(code);
		return node;
	}
}
