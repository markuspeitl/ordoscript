import { BaseAstNode } from './abstract/base-ast-node';

export class CompositionNode extends BaseAstNode {
	public left: BaseAstNode;
	public compositorToken: CompositorTokenType;
	public right: BaseAstNode;
}
export enum CompositorTokenType {
	PLUS,
	MINUS,
	DIV,
	MUL,
	POW,
	SQUARE
}
