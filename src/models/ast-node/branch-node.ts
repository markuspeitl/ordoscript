import { BaseAstNode } from './abstract/base-ast-node';
import { BlockScope } from './block-scope';
import { CompositionNode } from './composition-node';

export class BranchNode extends BaseAstNode {
	public conditions: CompositionNode;
	public resultBlocks: BlockScope;
}
