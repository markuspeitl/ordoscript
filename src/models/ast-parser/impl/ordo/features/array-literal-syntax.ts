import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { SyntaxTool } from '../../../common/util/syntax-tool';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { tokenSet } from './token-set';
import { ArrayLiteral } from '../../../../ast-node/array-literal';

export class ArrayLiteralSyntax extends BaseSyntaxFeature {
	private regExp: RegExp = new RegExp(/^\[[a-zA-Z0-9_ ,]*\]/);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const arrayContents: string | null = SyntaxTool.getTokenEnclosedContents(code, tokenSet.arrayLiteralTokenPair);
		if (!arrayContents) {
			throw new Error('Array literal must be enclosed by array def tokens!');
		}

		const node: ArrayLiteral = new ArrayLiteral();
		node.value = astParser.parseAstNode<ValueListingNode>(arrayContents, ValueListingNode.name);

		return node;
	}
}
