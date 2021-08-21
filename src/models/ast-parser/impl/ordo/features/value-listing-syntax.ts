import { Identifier } from './../../../../ast-node/identifier';
import { AssignmentNode } from './../../../../ast-node/assignment-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { ValueListingNode } from '../../../../ast-node/value-listing-node';

export class ValueListingSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'ValueListingNode';
	}

	public isFeatureDetected(code: string): boolean {
		return false;
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ValueListingNode = new ValueListingNode();

		if (!code.includes(',') && code.length > 0) {
			node.values = [];
			const id: Identifier = new Identifier();
			id.label = code.trim();
			node.values.push(id);
			return node;
		}

		const parts: string[] = code.split(',');
		if (parts.length < 1) {
			return null;
		}

		node.values = [];
		for (const part of parts) {
			const id: Identifier = new Identifier();
			id.label = part.trim();
			node.values.push(id);
		}

		return node;
	}
}
