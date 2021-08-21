import { ISyntaxFeature } from './i-syntax-feature';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BlockContent } from '../../ast-node/block-content';
import { BaseSyntaxFeature } from './base-syntax-feature';
export abstract class BaseAstParser {
	//protected featureSet: BaseSyntaxFeature[] = [];
	protected featureSetDict: Record<string, ISyntaxFeature> = {};

	public constructor() {
		this.initializeFeatureSet();
	}

	protected addFeature(AstNodeConstructor: new () => BaseAstNode, FeatureConstructor: new () => ISyntaxFeature): void {
		const astNode: BaseAstNode = new AstNodeConstructor();
		const feature: ISyntaxFeature = new FeatureConstructor();
		this.featureSetDict[astNode.constructor.name] = feature;
	}

	protected getFeature(AstNodeConstructor: new () => BaseAstNode): ISyntaxFeature {
		const node: BaseAstNode = new AstNodeConstructor();
		return this.featureSetDict[node.constructor.name];
	}

	public abstract initializeFeatureSet(): void;
	public abstract parseAstNodeDetect(code: string): BaseAstNode;
	public abstract parseAstNode<AstNodeType extends BaseAstNode>(code: string, astNodeType: string): AstNodeType;

	public parseFileContent(code: string): BlockContent {
		return this.parseAstNode<BlockContent>(code, BlockContent.name);
	}
}
