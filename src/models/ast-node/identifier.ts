import { BaseAstNode } from "./abstract/base-ast-node";

export class Identifier extends BaseAstNode {
    public label: string;
}