import { BaseAstNode } from './abstract/base-ast-node';
import { BlockScope } from './block-scope';
import { CompositionNode } from './composition-node';

export class IfNode extends BaseAstNode {
	public condition: CompositionNode;
	public thenBlock: BlockScope;
	public elseBlock: BlockScope;
	//For when they both not match
	//public defaultBlock: Block;
}
