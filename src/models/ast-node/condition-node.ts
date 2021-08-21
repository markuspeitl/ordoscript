import { BaseAstNode } from './abstract/base-ast-node';
import { BlockScope } from './block-scope';
import { CompositionNode } from './composition-node';

export class ConditionNode extends BaseAstNode {
	public condition: CompositionNode;
	public thenBlock: BlockScope;
}
