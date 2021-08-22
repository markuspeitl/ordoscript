import { Uti, Tuple } from './../common/util/util';
import { TokenSet, MatchSet } from './../impl/ordo/features/token-set';
import { ISyntaxFeature } from '../interfaces/i-syntax-feature';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BlockContent } from '../../ast-node/block-content';
import { ConsoleUtil } from '../common/util/console-util';
import { ISyntaxCurator } from '../interfaces/i-syntax-curator';
import { BaseSyntaxFeature } from './base-syntax-feature';
import { IAstParser } from '../interfaces/i-ast-parser';
export abstract class BaseAstParser implements IAstParser {
	private featureSetDict: Record<string, BaseSyntaxFeature> = {};
	protected featuresArray: BaseSyntaxFeature[] = [];

	public constructor() {
		this.initializeFeatureSet();
	}

	public abstract initializeFeatureSet(): void;

	protected addFeature(
		AstNodeConstructor: new () => BaseAstNode,
		FeatureConstructor: new (codeCurator: ISyntaxCurator) => BaseSyntaxFeature,
		codeCurator: ISyntaxCurator
	): void {
		const astNode: BaseAstNode = new AstNodeConstructor();
		const feature: BaseSyntaxFeature = new FeatureConstructor(codeCurator);
		this.featureSetDict[astNode.constructor.name] = feature;
		this.featuresArray.push(feature);
		console.log('Adding feature for ast: ' + astNode.constructor.name);
		console.log('is of type: ' + feature.constructor.name);
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
		const nodeModuleKeys: string[] = Object.keys(nodeModule);
		const syntaxModuleKeys: string[] = Object.keys(syntaxModule);

		const matches: Tuple<string>[] = Uti.matchModuleTypes(syntaxModule, nodeModule, this.moduleTypesMatch);

		for (const match of matches) {
			console.log('\nLinking: ' + match.b + ' -> ' + match.a);
			this.addFeature(nodeModule[match.b], syntaxModule[match.a], syntaxCurator);
		}

		/*for (const key of syntaxModuleKeys) {
			//const syntaxNameParts: string[] = key.split(/.[A-Z]/);
			//console.log(syntaxNameParts);
			const checkForName: string = key.toLowerCase().replace('syntax', '');

			const foundType: string | undefined = nodeModuleKeys.find((nodeType: string) =>
				nodeType.toLowerCase().startsWith(checkForName.toLowerCase())
			);
			if (foundType) {
				console.log('\nLinking: ' + foundType + ' -> ' + key);
				this.addFeature(nodeModule[foundType], syntaxModule[key], syntaxCurator);
			} else {
				console.log('No node type found for syntax parser: ' + key);
			}

			//console.log(key);
			//console.log((syntaxParsers as any)[key]);
			//const featureType: BaseSyntaxFeature = (syntaxParsers as any)[key] as BaseSyntaxFeature;
			//this.addFeature(ForNode, (syntaxParsers as any)[key], syntaxCurator);
		}*/
		console.log(this.featuresArray);
	}

	protected getFeature(astNodeName: string): ISyntaxFeature {
		return this.featureSetDict[astNodeName];
	}

	public printParserMapping(): void {
		for (const key of Object.keys(this.featureSetDict)) {
			console.log('Node: ' + key + ' -> ' + this.featureSetDict[key].constructor.name);
		}
	}

	/*protected getFeature(AstNodeConstructor: new () => BaseAstNode): ISyntaxFeature {
		const node: BaseAstNode = new AstNodeConstructor();
		return this.featureSetDict[node.constructor.name];
	}*/

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
		ConsoleUtil.printNamedBody('Parse file content:', code);
		return this.parseAstNode<BlockContent>(code, BlockContent.name);
	}

	public parseAstNodeDetect(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		console.log('Starting to parse code: ' + String(code));
		for (const syntaxFeature of this.featuresArray) {
			const parsedNode: BaseAstNode | null = this.tryParseFeature(code, syntaxFeature);
			if (parsedNode) {
				console.log('Successfully parsed with: ' + String(syntaxFeature.constructor.name));
				return parsedNode;
			}
		}
		throw new Error('Failed to parse AST node, syntax feature not detected: ' + String(code));
	}

	private tryParseFeature(code: string, feature: BaseSyntaxFeature): BaseAstNode | null {
		const selectedFeature: ISyntaxFeature = feature;
		if (selectedFeature instanceof BaseSyntaxFeature) {
			//console.log('Try parsing with: ' + selectedFeature.constructor.name + ' : ' + code);
			const parsedNode: BaseAstNode | null = selectedFeature.tryParseFeature(code, this);
			return parsedNode;
		}
		return null;
	}

	public parseAstNode<AstNodeType extends BaseAstNode>(code: string, astNodeType: string): AstNodeType | null {
		if (!code) {
			return null;
		}
		console.log('Before Parse: ' + astNodeType);
		console.log(code);
		const selectedFeature: ISyntaxFeature = this.getFeature(astNodeType);

		this.printParserMapping();
		console.log('Selected parser: ');
		console.log(selectedFeature);
		if (!selectedFeature) {
			throw new Error('Can not parse code for which no Syntax Parser was found: ' + astNodeType);
		}
		return selectedFeature.parseFeature(code, this) as AstNodeType;
	}
}
