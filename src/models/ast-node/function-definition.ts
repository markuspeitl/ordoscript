import { BlockScope } from './block-scope';
import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';
import { ValueListingNode } from './value-listing-node';

export class FunctionDefinition extends BaseAstNode {
	public label: string;
	public parameters: ValueListingNode;
	public returnType: Identifier;
	public body: BlockScope;
}
