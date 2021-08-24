import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';

export class VariableDeclarationNode extends BaseAstNode {
	//const, var, etc. -> should be another ast node
	public modifier: Identifier;
	public id: Identifier;
	public valuetype: Identifier;
}
