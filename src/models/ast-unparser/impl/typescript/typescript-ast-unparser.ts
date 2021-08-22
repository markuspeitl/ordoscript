import {
	FunctionDefinition,
	BlockScope,
	BlockContent,
	AssignmentNode,
	VariableDeclarationNode,
	ValueListingNode,
	PropertyCallNode,
	FunctionCall,
	CompositionNode,
	NumberLiteral,
	StringLiteral,
	Identifier
} from '../../../ast-node';
import { BaseAstNode } from '../../../ast-node/abstract/base-ast-node';
import { BaseAstUnparser } from '../../abstract/base-ast-unparser';
import { BaseFeatureSyntax } from '../../abstract/base-feature-syntax';
import {
	BlockScopeSyntax,
	BlockContentSyntax,
	FunctionSyntax,
	AssignmentSyntax,
	VariableDeclarationSyntax,
	ValueListingSyntax,
	PropertyCallSyntax,
	FunctionCallSyntax,
	CompositionSyntax,
	NumberLiteralSyntax,
	StringLiteralSyntax,
	IdentifierSyntax
} from './features';

export class TypeScriptAstUnparser extends BaseAstUnparser {
	public initializeFeatureSet(): void {
		this.addFeature(BlockScope, BlockScopeSyntax);
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
		this.addFeature(Identifier, IdentifierSyntax);
	}
	public unParseAstNodeDetect(node: BaseAstNode): string | null {
		throw new Error('Method not implemented.');
	}
	public unParseAstNode(astNode: BaseAstNode): string | null {
		//console.log('Unparse AST Node');
		//console.log(astNode);
		//console.log(JSON.stringify(astNode, null, 2));
		//return JSON.stringify(astNode, null, 2);

		const feature: BaseFeatureSyntax = this.getFeatureFor(astNode);
		return feature.unParseFeature(astNode, this);
	}
}
