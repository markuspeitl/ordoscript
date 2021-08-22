import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';
import { ValueListingNode } from './value-listing-node';

export class FunctionCall extends BaseAstNode {
	public identifier: Identifier;
	public parameters: ValueListingNode | null;
}
