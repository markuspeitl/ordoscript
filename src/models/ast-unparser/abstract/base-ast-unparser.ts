import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BlockContent } from '../../ast-node/block-content';
import { ConsoleUtil } from '../../ast-parser/common/util/console-util';
import { BaseFeatureSyntax } from './base-feature-syntax';
export abstract class BaseAstUnparser {
	protected featureSetDict: Record<string, BaseFeatureSyntax> = {};

	public constructor() {
		this.initializeFeatureSet();
	}

	protected addFeature(AstNodeConstructor: new () => BaseAstNode, FeatureConstructor: new () => BaseFeatureSyntax): void {
		const astNode: BaseAstNode = new AstNodeConstructor();
		const feature: BaseFeatureSyntax = new FeatureConstructor();
		this.featureSetDict[astNode.constructor.name] = feature;
	}

	protected getFeatureFor(unParseSubject: BaseAstNode): BaseFeatureSyntax {
		/*if (!this.featureSetDict[unParseSubject.constructor.name]) {
			throw new Error('Can not get missing unparsing feature for node: ' + unParseSubject.constructor.name);
		}*/

		return this.featureSetDict[unParseSubject.constructor.name];
	}

	public abstract initializeFeatureSet(): void;
	//public abstract unParseAstNodeDetect(node: BaseAstNode): string | null;
	public abstract unParseAstNode(node: BaseAstNode | null): string | null;

	public unParseFullAst(node: BlockContent): string | null {
		ConsoleUtil.printNamedBody('Parse node content:', JSON.stringify(node, null, 2));
		return this.unParseAstNode(node);
	}
}
