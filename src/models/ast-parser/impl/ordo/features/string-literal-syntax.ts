import { StringLiteral } from './../../../../ast-node/string-literal';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class StringLiteralSyntax extends BaseSyntaxFeature {
	public priority: number = 100;
	//private regExp: RegExp = new RegExp(/^'|"[a-zA-Z0-9 ]+'|"/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.stringLiteralDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: StringLiteral = new StringLiteral();
		node.text = String(code.substring(1, code.length - 1));
		return node;
	}
}
