import { BaseAstNode } from '../../ast-node';

export interface IAstParser {
	initializeFeatureSet(): void;
	parseAstNodeDetect(code: string): BaseAstNode | null;
	parseAstNode<AstNodeType extends BaseAstNode>(code: string, astNodeType: string): AstNodeType | null;
}
