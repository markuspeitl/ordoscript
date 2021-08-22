import { TokenSet, MatchSet } from './../impl/ordo/features/token-set';
import { ISyntaxFeature } from '../interfaces/i-syntax-feature';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BlockContent } from '../../ast-node/block-content';
import { ConsoleUtil } from '../common/util/console-util';
import { ISyntaxCurator } from '../interfaces/i-syntax-curator';
export abstract class BaseAstParser {
	protected featureSetDict: Record<string, ISyntaxFeature> = {};

	public constructor() {
		this.initializeFeatureSet();
	}

	protected addFeature(
		AstNodeConstructor: new () => BaseAstNode,
		FeatureConstructor: new (codeCurator: ISyntaxCurator) => ISyntaxFeature,
		codeCurator: ISyntaxCurator
	): void {
		const astNode: BaseAstNode = new AstNodeConstructor();
		const feature: ISyntaxFeature = new FeatureConstructor(codeCurator);
		this.featureSetDict[astNode.constructor.name] = feature;
	}

	protected getFeature(AstNodeConstructor: new () => BaseAstNode): ISyntaxFeature {
		const node: BaseAstNode = new AstNodeConstructor();
		return this.featureSetDict[node.constructor.name];
	}

	public loadTokenSet(tokenSet: TokenSet): void {
		for (const key of Object.keys(this.featureSetDict)) {
			this.featureSetDict[key].loadTokenSet(tokenSet);
		}
	}
	public loadMatchSet(matchSet: MatchSet): void {
		for (const key of Object.keys(this.featureSetDict)) {
			this.featureSetDict[key].loadMatchSet(matchSet);
		}
	}

	public abstract initializeFeatureSet(): void;
	public abstract parseAstNodeDetect(code: string): BaseAstNode;
	public abstract parseAstNode<AstNodeType extends BaseAstNode>(code: string, astNodeType: string): AstNodeType;

	public parseFileContent(code: string): BlockContent {
		ConsoleUtil.printNamedBody('Parse file content:', code);
		return this.parseAstNode<BlockContent>(code, BlockContent.name);
	}
}
