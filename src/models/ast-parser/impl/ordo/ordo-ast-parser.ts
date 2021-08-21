import { BlockScopeSyntax } from './features';
import { ImportSyntax } from './features/import-syntax';

export class OrdoAstParser extends BaseAstParser {
	public initializeFeatureSet(): void {
		//Optimization todo -> order by usage probability
		const syntaxCurator: ISyntaxCurator = new OrdoSyntaxCurator();
		this.addFeature(LinkNode, ImportSyntax, syntaxCurator);
		this.addFeature(FunctionDefinition, FunctionSyntax, syntaxCurator);
		this.addFeature(BlockScope, BlockScopeSyntax, syntaxCurator);
		this.addFeature(BlockContent, BlockContentSyntax, syntaxCurator);
		this.addFeature(IfNode, IfSyntax, syntaxCurator);
		this.addFeature(ElseNode, ElseSyntax, syntaxCurator);
		this.addFeature(AssignmentNode, AssignmentSyntax, syntaxCurator);
		this.addFeature(VariableDeclarationNode, VariableDeclarationSyntax, syntaxCurator);
		this.addFeature(ValueListingNode, ValueListingSyntax, syntaxCurator);
		this.addFeature(PropertyCallNode, PropertyCallSyntax, syntaxCurator);
		this.addFeature(PropertyAccessNode, PropertyAccessSyntax, syntaxCurator);
		this.addFeature(FunctionCall, FunctionCallSyntax, syntaxCurator);
		this.addFeature(CompositionNode, CompositionSyntax, syntaxCurator);
		this.addFeature(NumberLiteral, NumberLiteralSyntax, syntaxCurator);
		this.addFeature(StringLiteral, StringLiteralSyntax, syntaxCurator);
		this.addFeature(DictLiteral, DictLiteralSyntax, syntaxCurator);
		this.addFeature(ParameterDeclaration, ParameterDeclarationSyntax, syntaxCurator);
		this.addFeature(Identifier, IdentifierSyntax, syntaxCurator);

		//Todo add detection tree hierarchy
	}

	public parseAstNodeDetect(code: string): BaseAstNode {
		for (const astNodeKey of Object.keys(this.featureSetDict)) {
			const parsedNode: BaseAstNode | null = this.tryParseFeature(code, astNodeKey);
			if (parsedNode) {
				return parsedNode;
			}
		}
		throw new Error('Failed to parse AST node, syntax feature not detected: ' + String(code));
	}

	private tryParseFeature(code: string, targetAstNode: string): BaseAstNode | null {
		const selectedFeature: ISyntaxFeature = this.featureSetDict[targetAstNode];
		if (selectedFeature instanceof BaseSyntaxFeature) {
			const parsedNode: BaseAstNode | null = selectedFeature.tryParseFeature(code, this);
			return parsedNode;
		}
		return null;
	}

	public parseAstNode<AstNodeType extends BaseAstNode>(code: string, astNodeType: string): AstNodeType {
		console.log('Before Parse: ' + astNodeType);
		console.log(code);
		const selectedFeature: ISyntaxFeature = this.featureSetDict[astNodeType];
		console.log('Selected parser: ');
		console.log(selectedFeature);
		if (!selectedFeature) {
			throw new Error('Can not parse code for which no Syntax Parser was found: ' + astNodeType);
		}
		return selectedFeature.parseFeature(code, this) as AstNodeType;
	}
}
