import { BaseAstNode } from "../../ast-node/abstract/base-ast-node";
import { BaseAstParser } from "./base-ast-parser";

export abstract class BaseSyntaxFeature {
    public abstract isFeatureDetected(code: string): boolean;
    public abstract parseFeature(code: string, astParser: BaseAstParser): BaseAstNode;
}