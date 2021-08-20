import { Identifier } from './identifier';
import { Block } from './block';
import { BaseAstNode } from "./abstract/base-ast-node";

export class FunctionCall extends BaseAstNode {
    public identifier: Identifier;
    public parameters: BaseAstNode[];
}