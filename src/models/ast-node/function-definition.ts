import { Block } from './block';
import { BaseAstNode } from "./abstract/base-ast-node";

export class FunctionDefinition extends BaseAstNode {
    public label: string;
    public parameters: BaseAstNode[];
    public returnType: BaseAstNode;
    public body: Block;
}