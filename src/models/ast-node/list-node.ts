import { BaseAstNode } from "./abstract/base-ast-node";

export class ListNode extends BaseAstNode {
    public elements: BaseAstNode[]
}