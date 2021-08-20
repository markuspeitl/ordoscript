import { BaseAstNode } from "./abstract/base-ast-node";

export class PropertyAccessNode extends BaseAstNode {
    public source: BaseAstNode;
    //Function call or Identifier
    public property: BaseAstNode;
}