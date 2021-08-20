import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
export abstract class BaseAstParser {
    public abstract parseAstNode(code: string): BaseAstNode;
}