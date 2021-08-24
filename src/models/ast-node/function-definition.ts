import { BlockScope } from './block-scope';
import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';
import { ValueListingNode } from './value-listing-node';

export class FunctionDefinition extends BaseAstNode {
	public id: Identifier;
	public parameters: ValueListingNode | null;
	public returnType: Identifier | null;
	public body: BlockScope;
}
