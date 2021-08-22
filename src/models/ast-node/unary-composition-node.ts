import { BaseAstNode } from './abstract/base-ast-node';

export class UnaryCompositionNode extends BaseAstNode {
	public target: BaseAstNode;
	public operationToken: string;
}
