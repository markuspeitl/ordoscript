import { BaseAstNode } from './abstract/base-ast-node';
export class AstTree extends BaseAstNode {
    public rootNode: BaseAstNode | null = null;

    public toStringSelf(): string {
        throw new Error('Method not implemented.');
    }
    public parse(code: string): void {
        throw new Error('Method not implemented.');
    }
}