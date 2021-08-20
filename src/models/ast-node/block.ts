import { BaseAstNode } from "./abstract/base-ast-node";

export class Block extends BaseAstNode {
    public children: BaseAstNode[] | null = null;
}