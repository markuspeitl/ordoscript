export abstract class BaseAstNode {
    public parent: BaseAstNode | null = null;
    //public children: BaseAstNode[] | null = null;
    public startCharIndex: number = -1;
    public endCharIndex: number = -1;

    /*public abstract toStringSelf(): string;
    public abstract parse(code: string): void;

    public toString(): string {
        let code: string = '';
        code += this.toStringSelf() + " {\n";
        if (this.children) {
            for (const child of this.children) {
                code += child.toString();
            }
        }
        code += " }\n";
        return code;
    };*/
}