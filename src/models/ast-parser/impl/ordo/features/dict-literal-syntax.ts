import { DictLiteral } from './../../../../ast-node/dict-literal';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class DictLiteralSyntax extends BaseSyntaxFeature {
	public priority: number = 100;

	public isFeatureDetected(code: string): boolean {
		return false;
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: DictLiteral = new DictLiteral();
		node.value = JSON.parse(code);
		return node;
	}
}
