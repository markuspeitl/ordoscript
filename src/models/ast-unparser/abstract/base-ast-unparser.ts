import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BlockContent } from '../../ast-node/block-content';
import { ConsoleUtil } from '../../ast-parser/common/util/console-util';
import { Slog } from '../../ast-parser/common/util/slog';
import { Tuple, Uti } from '../../ast-parser/common/util/util';
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
	//public abstract unParseAstNode(node: BaseAstNode | null): string | null;

	public unParseFullAst(node: BlockContent): string | null {
		ConsoleUtil.printNamedBody('BaseAstUnparser', 'Parse node content:', JSON.stringify(node, null, 2));
		return this.unParseAstNode(node);
	}

	public unParseAstNode(astNode: BaseAstNode | null): string | null {
		if (!astNode) {
			return '';
		}

		//Slog.log('BaseAstUnparser', 'Unparse AST Node');
		//Slog.log('BaseAstUnparser', astNode);

		const feature: BaseFeatureSyntax = this.getFeatureFor(astNode);

		if (!feature) {
			return JSON.stringify(astNode, null, 2);
		}

		return feature.unParseFeature(astNode, this);
	}

	private moduleTypesMatch(syntaxTypeName: string, nodeTypeName: string): boolean {
		const extractedName: string = syntaxTypeName.toLowerCase().replace('syntax', '');
		return nodeTypeName.toLowerCase().startsWith(extractedName.toLowerCase());
	}

	protected loadSyntaxFeaturesDynamic(nodeModule: any, syntaxModule: any): void {
		const matches: Tuple<string>[] = Uti.matchModuleTypes(syntaxModule, nodeModule, this.moduleTypesMatch);

		for (const match of matches) {
			Slog.log('BaseAstUnparser', '\nLinking: ' + match.b + ' -> ' + match.a);
			this.addFeature(nodeModule[match.b], syntaxModule[match.a]);
		}
	}
}
