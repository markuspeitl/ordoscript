import { BlockContent } from './block-content';
import { BaseAstNode } from "./abstract/base-ast-node";

export class BlockScope extends BaseAstNode {
    public content: BlockContent | null = null;
}