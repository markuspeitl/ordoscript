import { BaseSyntaxFeature } from '../abstract/base-syntax-feature';

export interface INodeSyntax {
	nodeName: string;
	syntaxFeature: BaseSyntaxFeature;
}
