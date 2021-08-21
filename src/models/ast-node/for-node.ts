import { BlockScope } from './block-scope';
import { BaseAstNode } from './abstract/base-ast-node';

export class ForNode extends BaseAstNode {
	public initializer: BaseAstNode;
	public endCondition: BaseAstNode;
	public incrementor: BaseAstNode;
	public body: BlockScope;
}
