import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { ValueListingNode } from '../../../../ast-node/value-listing-node';

export class ValueListingSyntax extends BaseSyntaxFeature {
	public priority: number = 100;

	public isFeatureDetected(code: string): boolean {
		return false;
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code.trim()) {
			return null;
		}

		const node: ValueListingNode = new ValueListingNode();

		const parts = code.trim().split(this.tokenSet.listSeperator);
		if (parts.length < 1 || !parts[0]) {
			return null;
		}

		node.values = [];
		for (const part of parts) {
			const value: BaseAstNode = this.getNodeDetect(part.trim(), 'single-value');
			node.values.push(value);
		}

		return node;
	}
}
