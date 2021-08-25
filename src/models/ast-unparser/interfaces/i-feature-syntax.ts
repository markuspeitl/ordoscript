import { BaseAstNode } from '../../ast-node';

export interface IFeatureSyntax {
	unParseFeature(node: BaseAstNode | null): string | null;
}
