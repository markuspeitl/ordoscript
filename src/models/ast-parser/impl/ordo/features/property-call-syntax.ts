import { FunctionCall } from './../../../../ast-node/function-call';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { Identifier } from '../../../../ast-node/identifier';
import { PropertyCallNode } from '../../../../ast-node/property-call-node';

export class PropertyCallSyntax extends BaseSyntaxFeature {
	public priority: number = 5;
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.propertyCallDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: PropertyCallNode = new PropertyCallNode();

		const parts: string[] = code.split(this.tokenSet.propertyAccessToken);
		if (parts.length !== 2) {
			throw Error('Invalid amount of participants for property method call: ' + String(parts.length));
		}
		node.subject = this.getNodeDetect(parts[0], 'id');
		node.method = this.getNode<FunctionCall>(parts[1].trim(), FunctionCall.name, 'method');

		return node;
	}
}
