import { BaseAstNode } from "./abstract/base-ast-node";

// Include any external resources
export class LinkNode extends BaseAstNode {
    public chosenSelection: BaseAstNode;
    public chosenLabels: BaseAstNode;
    public locationSpecification: BaseAstNode;
}