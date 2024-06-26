import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { StringLiteral } from './../../../../ast-node/string-literal';
import { SyntaxTool } from './../../../common/util/syntax-tool';
import { Enclosing } from './../../../common/models/enclosing';
import { LinkNode } from './../../../../ast-node/link-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class ImportSyntax extends BaseSyntaxFeature {
	public priority: number = 1;
	//private regExp: RegExp = new RegExp(/^import /);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.importDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: LinkNode = new LinkNode();
		const selectionEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.foreignScopeTokenPair);

		if (selectionEnclosing) {
			const selectionContents: string | null = SyntaxTool.getEnclosedContents(code, selectionEnclosing);
			if (selectionContents) {
				node.selectedResources = this.getNodeNullable<ValueListingNode>(selectionContents, ValueListingNode.name);
			}
		}

		const importFromParts: string[] = code.split(/from[ ]*/);
		const fromLocationCode: string = importFromParts[1].replace(';', '').trim();
		const externLocation: StringLiteral | null = this.getNodeNullable<StringLiteral>(fromLocationCode, StringLiteral.name);
		if (!externLocation) {
			throw Error('Import statement must have a resource location specified');
		}
		node.locationSpecification = externLocation;

		return node;
	}
}
