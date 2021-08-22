import { BaseAstUnparser } from '../../abstract/base-ast-unparser';
import * as nodeModule from '../../../ast-node';
import * as syntaxModule from './features';

export class TypeScriptAstUnparser extends BaseAstUnparser {
	public initializeFeatureSet(): void {
		this.loadSyntaxFeaturesDynamic(nodeModule, syntaxModule);

		/*this.addFeature(BlockScope, BlockScopeSyntax);
		this.addFeature(BlockContent, BlockContentSyntax);
		//this.addFeature(LinkNode, ImportSyntax);
		this.addFeature(FunctionDefinition, FunctionSyntax);
		this.addFeature(BlockScope, BlockScopeSyntax);
		this.addFeature(BlockContent, BlockContentSyntax);
		//this.addFeature(IfNode, IfSyntax);
		//this.addFeature(ElseNode, ElseSyntax);
		this.addFeature(AssignmentNode, AssignmentSyntax);
		this.addFeature(VariableDeclarationNode, VariableDeclarationSyntax);
		this.addFeature(ValueListingNode, ValueListingSyntax);
		this.addFeature(PropertyCallNode, PropertyCallSyntax);
		//this.addFeature(PropertyAccessNode, PropertyAccessSyntax);
		this.addFeature(FunctionCall, FunctionCallSyntax);
		this.addFeature(CompositionNode, CompositionSyntax);
		this.addFeature(NumberLiteral, NumberLiteralSyntax);
		this.addFeature(StringLiteral, StringLiteralSyntax);
		//this.addFeature(DictLiteral, DictLiteralSyntax);
		//this.addFeature(ParameterDeclaration, ParameterDeclarationSyntax);
		this.addFeature(Identifier, IdentifierSyntax);*/
	}
}
