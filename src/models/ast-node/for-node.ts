import { BaseAstNode } from './abstract/base-ast-node';
import { Block } from './block';

export class ForNode extends BaseAstNode {
    public initializer: BaseAstNode;
    public endCondition: BaseAstNode;
    public incrementor: BaseAstNode;
    public body: Block;
}