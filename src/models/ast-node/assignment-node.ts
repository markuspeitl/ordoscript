import { BaseAstNode } from './abstract/base-ast-node';

export class AssignmentNode extends BaseAstNode {
	//valuetarget
	public left: BaseAstNode;
	//valuesource
	public right: BaseAstNode;
	//public assignmentToken: AssignmentToken;
}
