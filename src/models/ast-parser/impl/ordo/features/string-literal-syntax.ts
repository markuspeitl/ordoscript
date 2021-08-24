import { StringLiteral } from './../../../../ast-node/string-literal';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class StringLiteralSyntax extends BaseSyntaxFeature {
	public priority: number = 100;

	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.stringLiteralDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: StringLiteral = new StringLiteral();
		node.text = String(code.substring(1, code.length - 1));
		return node;
	}
}
