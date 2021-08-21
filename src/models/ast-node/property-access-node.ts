import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';

export class PropertyAccessNode extends BaseAstNode {
	public id: Identifier;
	//Function call or Identifier
	//public property: BaseAstNode;
	//Should be id or property node, or function call node
	public property: string;
}
