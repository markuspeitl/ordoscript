import { Slog } from '../common/util/slog';
import { Uti, Tuple } from './../common/util/util';
import { ISyntaxFeature } from '../interfaces/i-syntax-feature';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BlockContent } from '../../ast-node/block-content';
import { ConsoleUtil } from '../common/util/console-util';
import { ISyntaxCurator } from '../interfaces/i-syntax-curator';
import { BaseSyntaxFeature } from './base-syntax-feature';
import { IAstParser } from '../interfaces/i-ast-parser';
import { MatchSet } from '../../common/match-set';
import { BaseParser } from '../../abstract/base-parser';

export abstract class BaseAstParser extends BaseParser<BaseSyntaxFeature> implements IAstParser {
	protected addFeatureFromTypes(
		AstNodeConstructor: new () => BaseAstNode,
		FeatureConstructor: new (astParser: IAstParser, codeCurator?: ISyntaxCurator) => BaseSyntaxFeature,
		codeCurator: ISyntaxCurator
	): void {
		const feature: BaseSyntaxFeature = new FeatureConstructor(this, codeCurator);
		this.addSubParser(AstNodeConstructor, feature);
		this.sortFeaturesByPriority();
	}

	protected sortFeaturesByPriority(): void {
		this.subParserArray = this.subParserArray.sort((a: BaseSyntaxFeature, b: BaseSyntaxFeature) => a.priority - b.priority);
	}

	private moduleTypesMatch(syntaxTypeName: string, nodeTypeName: string): boolean {
		const extractedName: string = syntaxTypeName.toLowerCase().replace('syntax', '');
		return nodeTypeName.toLowerCase().startsWith(extractedName.toLowerCase());
	}

	protected loadSyntaxFeaturesDynamic(nodeModule: any, syntaxModule: any, syntaxCurator: ISyntaxCurator): void {
		Slog.log('MatchType', '\n-----------BaseAstParser: Load dynamic syntax features.');

		const matches: Tuple<string>[] = Uti.matchModuleTypes(syntaxModule, nodeModule, this.moduleTypesMatch);

		for (const match of matches) {
			Slog.log('BaseAstParser', '\nLinking: ' + match.b + ' -> ' + match.a);
			this.addFeatureFromTypes(nodeModule[match.b], syntaxModule[match.a], syntaxCurator);
		}
		//Slog.log('BaseAstParser', this.featuresArray);
		Uti.printUnmatchedPoolTypes(syntaxModule, nodeModule, this.moduleTypesMatch);
	}

	public loadMatchSet(matchSet: MatchSet): void {
		for (const key of Object.keys(this.subParserDict)) {
			this.subParserDict[key].loadMatchSet(matchSet);
		}
		for (const subParser of this.subParserArray) {
			subParser.loadMatchSet(matchSet);
		}
	}
	public parseFileContent(code: string): BlockContent | null {
		ConsoleUtil.printNamedBody('BaseAstParser', 'Parse file content:', code);
		return this.parseAstNode<BlockContent>(code, BlockContent.name);
	}

	public parseAstNodeDetect(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		Slog.log('BaseAstParser', 'Starting to parse code: ' + String(code));
		for (const syntaxFeature of this.subParserArray) {
			const parsedNode: BaseAstNode | null = this.tryParseFeature(code, syntaxFeature);
			if (parsedNode) {
				Slog.log('BaseAstParser', 'Successfully parsed with: ' + String(syntaxFeature.constructor.name));
				return parsedNode;
			}
		}
		throw new Error(this.constructor.name + ': Failed to parse AST node, syntax feature not detected: ' + String(code));
	}

	private tryParseFeature(code: string, feature: BaseSyntaxFeature): BaseAstNode | null {
		const selectedFeature: ISyntaxFeature = feature;
		if (selectedFeature instanceof BaseSyntaxFeature) {
			//Slog.log('BaseAstParser', 'Try parsing with: ' + selectedFeature.constructor.name + ' : ' + code);
			const parsedNode: BaseAstNode | null = selectedFeature.tryParseFeature(code);
			return parsedNode;
		}
		return null;
	}

	public parseAstNode<AstNodeType extends BaseAstNode>(code: string, astNodeType: string): AstNodeType | null {
		if (!code) {
			return null;
		}
		Slog.log('BaseAstParser', 'Before Parse: ' + astNodeType);
		Slog.log('BaseAstParser', code);
		const selectedFeature: ISyntaxFeature = this.getSubParser(astNodeType);

		Slog.log('BaseAstParser', 'Selected parser: ');
		Slog.log('BaseAstParser', selectedFeature.constructor.name);
		if (!selectedFeature) {
			throw new Error('Can not parse code for which no Syntax Parser was found: ' + astNodeType);
		}
		return selectedFeature.parseFeature(code) as AstNodeType;
	}
}
