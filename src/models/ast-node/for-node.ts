import { AstNode } from './abstract/base-ast-node';

export class ForNode extends AstNode {

    public toString(): string {
        return "for";
    }

    public parse(code: string): void {
        throw new Error('Method not implemented.');
    }

}