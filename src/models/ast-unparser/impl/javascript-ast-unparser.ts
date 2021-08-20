import { BaseAstNode } from "../../ast-node/abstract/base-ast-node";
import { BaseAstUnparser } from "../abstract/base-ast-unparser";

export class JavaScriptAstUnparser extends BaseAstUnparser {
    public unParseAstNode(astNode: BaseAstNode): string {
        throw new Error("Method not implemented.");
    }
}