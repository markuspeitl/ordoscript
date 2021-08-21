import { BaseAstNode } from './abstract/base-ast-node';

export class VariableDeclarationNode extends BaseAstNode {
	//const, var, etc.
	public declaretype: string;
	public label: string;
	//public value: BaseAstNode;
	public valuetype: string;
}
