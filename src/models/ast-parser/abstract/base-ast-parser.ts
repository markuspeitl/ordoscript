import { Slog } from '../common/util/slog';
import { Uti, Tuple } from './../common/util/util';
import { TokenSet } from '../../common/token-set';
import { ISyntaxFeature } from '../interfaces/i-syntax-feature';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BlockContent } from '../../ast-node/block-content';
import { ConsoleUtil } from '../common/util/console-util';
import { ISyntaxCurator } from '../interfaces/i-syntax-curator';
import { BaseSyntaxFeature } from './base-syntax-feature';
import { IAstParser } from '../interfaces/i-ast-parser';
import { MatchSet } from '../../common/match-set';
export abstract class BaseAstParser implements IAstParser {
	private featureSetDict: Record<string, BaseSyntaxFeature> = {};
	protected featuresArray: BaseSyntaxFeature[] = [];

	public constructor() {
		this.initializeFeatureSet();
	}

	public abstract initializeFeatureSet(): void;

	protected addFeature(
		AstNodeConstructor: new () => BaseAstNode,
		FeatureConstructor: new (astParser: IAstParser, codeCurator?: ISyntaxCurator) => BaseSyntaxFeature,
		codeCurator: ISyntaxCurator
	): void {
		const astNode: BaseAstNode = new AstNodeConstructor();
		const feature: BaseSyntaxFeature = new FeatureConstructor(this, codeCurator);
		this.featureSetDict[astNode.constructor.name] = feature;
		this.featuresArray.push(feature);
		Slog.log('BaseAstParser', 'Adding feature for ast: ' + astNode.constructor.name);
		Slog.log('BaseAstParser', 'is of type: ' + feature.constructor.name);
		this.sortFeaturesByPriority();
	}

	protected sortFeaturesByPriority(): void {
		this.featuresArray = this.featuresArray.sort((a: BaseSyntaxFeature, b: BaseSyntaxFeature) => a.priority - b.priority);
		/*const dictKeys: string[] = Object.keys(this.featureSetDict);
		const features: BaseSyntaxFeature[] = dictKeys.map((key: string) => this.featureSetDict[key]);
		let nodeSytaxes: INodeSyntax[] = [];
		for (let i = 0; i < features.length; i++) {
			nodeSytaxes.push({
				nodeName: dictKeys[i],
				syntaxFeature: features[i]
			});
		}

		nodeSytaxes = nodeSytaxes.sort((a: INodeSyntax, b: INodeSyntax) => a.syntaxFeature.priority - b.syntaxFeature.priority);
		nodeSytaxes.forEach((nodeSytax: INodeSyntax) => {
			this.featureSetDict[nodeSytax.nodeName] = nodeSytax.syntaxFeature;
		});*/
	}

	private moduleTypesMatch(syntaxTypeName: string, nodeTypeName: string): boolean {
		const extractedName: string = syntaxTypeName.toLowerCase().replace('syntax', '');
		return nodeTypeName.toLowerCase().startsWith(extractedName.toLowerCase());
	}

	protected loadSyntaxFeaturesDynamic(nodeModule: any, syntaxModule: any, syntaxCurator: ISyntaxCurator): void {
		const matches: Tuple<string>[] = Uti.matchModuleTypes(syntaxModule, nodeModule, this.moduleTypesMatch);

		for (const match of matches) {
			Slog.log('BaseAstParser', '\nLinking: ' + match.b + ' -> ' + match.a);
			this.addFeature(nodeModule[match.b], syntaxModule[match.a], syntaxCurator);
		}
		//Slog.log('BaseAstParser', this.featuresArray);
	}

	protected getFeature(astNodeName: string): ISyntaxFeature {
		return this.featureSetDict[astNodeName];
	}

	public printParserMapping(): void {
		for (const key of Object.keys(this.featureSetDict)) {
			Slog.log('BaseAstParser', 'Node: ' + key + ' -> ' + this.featureSetDict[key].constructor.name);
		}
	}

	public loadTokenSet(tokenSet: TokenSet): void {
		for (const key of Object.keys(this.featureSetDict)) {
			this.featureSetDict[key].loadTokenSet(tokenSet);
		}
		for (const feature of this.featuresArray) {
			feature.loadTokenSet(tokenSet);
		}
	}
	public loadMatchSet(matchSet: MatchSet): void {
		for (const key of Object.keys(this.featureSetDict)) {
			this.featureSetDict[key].loadMatchSet(matchSet);
		}
		for (const feature of this.featuresArray) {
			feature.loadMatchSet(matchSet);
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
		for (const syntaxFeature of this.featuresArray) {
			const parsedNode: BaseAstNode | null = this.tryParseFeature(code, syntaxFeature);
			if (parsedNode) {
				Slog.log('BaseAstParser', 'Successfully parsed with: ' + String(syntaxFeature.constructor.name));
				return parsedNode;
			}
		}
		throw new Error('Failed to parse AST node, syntax feature not detected: ' + String(code));
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
		const selectedFeature: ISyntaxFeature = this.getFeature(astNodeType);

		Slog.log('BaseAstParser', 'Selected parser: ');
		Slog.log('BaseAstParser', selectedFeature.constructor.name);
		if (!selectedFeature) {
			throw new Error('Can not parse code for which no Syntax Parser was found: ' + astNodeType);
		}
		return selectedFeature.parseFeature(code) as AstNodeType;
	}
}
