import { Identifier } from './../../../../ast-node/identifier';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class IdentifierSyntax extends BaseSyntaxFeature {
	public priority: number = 200;
	//private regExp: RegExp = new RegExp(/^[a-zA-Z0-9_]+/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.identifierDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: Identifier = new Identifier();
		node.label = String(code);
		return node;
	}
}
