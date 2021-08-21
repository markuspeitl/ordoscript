import { BaseAstNode } from "./abstract/base-ast-node";

export class BlockContent extends BaseAstNode {
    public children: BaseAstNode[] | null = null;
}