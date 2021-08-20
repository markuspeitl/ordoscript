import { BaseAstNode } from "./abstract/base-ast-node";

export class ParenthizedNode extends BaseAstNode {
    public content: BaseAstNode;
}