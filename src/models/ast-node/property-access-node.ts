import { BaseAstNode } from './abstract/base-ast-node';

export class PropertyAccessNode extends BaseAstNode {
	public subject: BaseAstNode;
	//Function call or Identifier
	//public property: BaseAstNode;
	//Should be id or property node, or function call node
	public property: string;
}
