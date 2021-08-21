import { FunctionCall } from './function-call';
import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';

export class PropertyCallNode extends BaseAstNode {
	public id: Identifier;
	public method: FunctionCall;
}
