import { Identifier } from './identifier';
import { Block } from './block-content';
import { BaseAstNode } from './abstract/base-ast-node';
import { ValueListingNode } from './value-listing-node';

export class FunctionDefinition extends BaseAstNode {
	public label: string;
	public parameters: ValueListingNode;
	public returnType: Identifier;
	public body: Block;
}
