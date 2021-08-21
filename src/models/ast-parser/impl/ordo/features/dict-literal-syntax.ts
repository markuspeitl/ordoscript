import { DictLiteral } from './../../../../ast-node/dict-literal';
import { StringLiteral } from './../../../../ast-node/string-literal';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class DictLiteralSyntax extends BaseSyntaxFeature {
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return false;
	}

	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: DictLiteral = new DictLiteral();
		node.value = JSON.parse(code);
		return node;
	}
}
