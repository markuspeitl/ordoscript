import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { PropertyAccessNode } from '../../../../ast-node/property-access-node';

export class PropertyAccessSyntax extends BaseSyntaxFeature {
	public priority: number = 6;

	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.propertyAccessDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: PropertyAccessNode = new PropertyAccessNode();

		const parts: string[] = code.split(this.tokenSet.propertyAccessToken);
		if (parts.length !== 2) {
			throw Error('Invalid amount of participants for property access: ' + String(parts.length));
		}
		node.subject = this.getNodeDetect(parts[0], 'id');
		node.property = parts[1];

		return node;
	}
}
