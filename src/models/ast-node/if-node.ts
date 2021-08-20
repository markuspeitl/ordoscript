import { BaseAstNode } from './abstract/base-ast-node';
import { Block } from './block';
import { CompositionNode } from './composition-node';

export class IfNode extends BaseAstNode {
    public condition: CompositionNode;
    public thenBlock: Block;
    public elseBlock: Block;
    //For when they both not match
    //public defaultBlock: Block;
}