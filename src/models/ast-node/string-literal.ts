import { BaseAstNode } from './abstract/base-ast-node';

export class StringLiteral extends BaseAstNode {
	public text: string;
}
