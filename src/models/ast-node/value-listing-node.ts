import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';

//Or parameter content (or can also be inside of an array initializer)
export class ValueListingNode extends BaseAstNode {
	public values: BaseAstNode[];
}
