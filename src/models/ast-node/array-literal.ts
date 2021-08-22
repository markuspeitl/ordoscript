import { ValueListingNode } from './value-listing-node';
import { BaseAstNode } from './abstract/base-ast-node';

export class ArrayLiteral extends BaseAstNode {
	public value: ValueListingNode;
}
