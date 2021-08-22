import { CompositionNode } from './composition-node';
import { BlockScope } from './block-scope';
import { BaseAstNode } from './abstract/base-ast-node';

export class ForNode extends BaseAstNode {
	//public initializer: VariableDeclarationNode;
	public initializer: BaseAstNode;
	public endCondition: CompositionNode;
	public incrementor: BaseAstNode;
	public body: BlockScope;
}
