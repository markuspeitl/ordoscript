import { BaseParser } from '../../abstract/base-parser';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BlockContent } from '../../ast-node/block-content';
import { ConsoleUtil } from '../../ast-parser/common/util/console-util';
import { Slog } from '../../ast-parser/common/util/slog';
import { Tuple, Uti } from '../../ast-parser/common/util/util';
import { BaseFeatureSyntax } from './base-feature-syntax';
export abstract class BaseAstUnparser extends BaseParser<BaseFeatureSyntax> {
	protected addFeatureFromTypes(
		AstNodeConstructor: new () => BaseAstNode,
		FeatureConstructor: new (astUnparser: BaseAstUnparser) => BaseFeatureSyntax
	): void {
		const feature: BaseFeatureSyntax = new FeatureConstructor(this);
		this.addSubParser(AstNodeConstructor, feature);
	}

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

		const feature: BaseFeatureSyntax = this.getSubParser(astNode.constructor.name);

		if (!feature) {
			return JSON.stringify(astNode, null, 2);
		}

		return feature.unParseFeature(astNode);
	}

	private moduleTypesMatch(syntaxTypeName: string, nodeTypeName: string): boolean {
		const extractedName: string = syntaxTypeName.toLowerCase().replace('syntax', '');
		return nodeTypeName.toLowerCase().startsWith(extractedName.toLowerCase());
	}

	protected loadSyntaxFeaturesDynamic(nodeModule: any, syntaxModule: any): void {
		Slog.log('MatchType', '\n-----------BaseAstUnparser: Load dynamic syntax features.');

		const matches: Tuple<string>[] = Uti.matchModuleTypes(syntaxModule, nodeModule, this.moduleTypesMatch);

		for (const match of matches) {
			Slog.log('BaseAstUnparser', '\nLinking: ' + match.b + ' -> ' + match.a);
			this.addFeatureFromTypes(nodeModule[match.b], syntaxModule[match.a]);
		}

		Uti.printUnmatchedPoolTypes(syntaxModule, nodeModule, this.moduleTypesMatch);
	}
}
