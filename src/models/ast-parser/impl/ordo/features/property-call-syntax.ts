import { FunctionCall } from './../../../../ast-node/function-call';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { Identifier } from '../../../../ast-node/identifier';
import { PropertyCallNode } from '../../../../ast-node/property-call-node';

export class PropertyCallSyntax extends BaseSyntaxFeature {
	public priority: number = 5;
	//private regExp: RegExp = new RegExp(/^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//const propertyAccessed: boolean = this.regExp.test(trimmed);
		//const isFunctionCall: boolean = code.includes('(') && code.includes(')');
		//return propertyAccessed && isFunctionCall;
		return this.matchSet.propertyCallDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: PropertyCallNode = new PropertyCallNode();

		const parts: string[] = code.split('.');
		if (parts.length !== 2) {
			throw Error('Invalid amount of participants for property method call: ' + String(parts.length));
		}
		node.id = new Identifier();
		node.id.label = parts[0];
		node.method = this.getFunctionCall(parts[1], astParser);

		return node;
	}

	private getFunctionCall(code: string, astParser: BaseAstParser): FunctionCall {
		const functionCall: FunctionCall | null = astParser.parseAstNode<FunctionCall>(code.trim(), FunctionCall.name);
		if (!functionCall) {
			throw Error('Property call must have child function');
		}
		return functionCall;
	}
}
