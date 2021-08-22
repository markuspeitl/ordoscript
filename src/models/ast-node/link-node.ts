import { StringLiteral } from './string-literal';
import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';
import { ValueListingNode } from './value-listing-node';

// Include any external resources
export class LinkNode extends BaseAstNode {
	public selectedResources: ValueListingNode | null;
	public selectedIdentifiers: Identifier[];
	public locationSpecification: StringLiteral;
}
