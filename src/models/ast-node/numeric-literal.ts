import { BaseAstNode } from './abstract/base-ast-node';

export class NumericLiteral extends BaseAstNode {
	public value: number;
}
