import { BaseAstNode } from "../../../../ast-node/abstract/base-ast-node";
import { BaseAstParser } from "../../../abstract/base-ast-parser";
import { BaseSyntaxFeature } from "../../../abstract/base-syntax-feature";

export class FunctionSyntax extends BaseSyntaxFeature {
    public isFeatureDetected(code: string): boolean {
        const trimmed: string = code.trim();
        return trimmed.startsWith('function ');
    }
    public parseFeature(code: string, astParser: BaseAstParser): BaseAstNode | null {
        if (!this.isFeatureDetected(code)) {
            return null;
        }

        astParser.parseAstNode(astParser)

    }

}