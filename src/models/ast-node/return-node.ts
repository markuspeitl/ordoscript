import { Identifier } from './identifier';
import { BaseAstNode } from "./abstract/base-ast-node";

export class ReturnNode extends BaseAstNode {
    public returnValue: BaseAstNode;
}