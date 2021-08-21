import { AssignmentNode } from './../../../../ast-node/assignment-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { PropertyAccessNode } from '../../../../ast-node/property-access-node';
import { Identifier } from '../../../../ast-node/identifier';

export class PropertyAccessSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'PropertyAccessNode';
	}

	private regExp: RegExp = new RegExp(/^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+()/);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: PropertyAccessNode = new PropertyAccessNode();

		const parts: string[] = code.split('.');
		if (parts.length !== 2) {
			throw Error('Invalid amount of participants for property access: ' + String(parts.length));
		}
		node.id = new Identifier();
		node.id.label = parts[0];
		node.property = parts[1];

		return node;
	}
}
