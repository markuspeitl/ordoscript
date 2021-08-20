import { BaseAstNode } from "../../../ast-node/abstract/base-ast-node";
import { AstTree } from "../../../ast-node/ast-tree";
import { BaseAstParser } from "../../abstract/base-ast-parser";

export class OrdoAstParser extends BaseAstParser {

    public static delimiterToken: string = ';';
    public static delimiterTokenLength: number = OrdoAstParser.delimiterToken.length;
    public static nodeEnclosureOpenToken: string = '{';
    public static nodeEnclosureCloseToken: string = '}';

    public parseAstNode(code: string): BaseAstNode {

        if(code.includes(OrdoAstParser.nodeEnclosureOpenToken))

        if (!code.includes(OrdoAstParser.nodeEnclosureOpenToken) && !code.includes(OrdoAstParser.nodeEnclosureOpenToken)) {
            return this.parseAstLeaf(code);
        } else if (code.includes(OrdoAstParser.nodeEnclosureOpenToken) && code.includes(OrdoAstParser.nodeEnclosureOpenToken)) {
            const statements: string[] = code.split(delimiterToken);
            let startIndex: number = 0;
            let endIndex: number = 0;

            const rootAstNode: BaseAstNode = new AstTree();
            rootAstNode.children = [];

            for (const statement of statements) {
                const statementNode: BaseAstNode = this.parseAstNode(statement);

                statementNode.startCharIndex = startIndex;
                endIndex = statementNode.startCharIndex + statement.length + delimiterTokenLength;
                statementNode.endCharIndex = endIndex;
                startIndex = endIndex;

                rootAstNode.children.push(statementNode);
            }

            return rootAstNode;
        }

        throw new Error("Invalid number of Enclosure tokens");
    }

    public parseAstLeaf(code: string): BaseAstNode {
        const trimmedCode: string = code.trim();

        if (trimmedCode.startsWith('function ')) {
            console.log("Function detected");
        }
    }

    public getNextEnclosure(code: string): string {
        const enclosureStart: number = code.indexOf(OrdoAstParser.nodeEnclosureOpenToken);
        const enclosureEnd: number = code.lastIndexOf(OrdoAstParser.nodeEnclosureCloseToken);
        return code.substring(enclosureStart + 1, enclosureEnd - 1);
    }

    public parseNextEnclosure()

    public detectStatementAndCreate(snippet: string): BaseAstNode {
        return null;
    }
}