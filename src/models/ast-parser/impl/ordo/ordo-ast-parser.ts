import { ReturnSyntax } from './features/return-syntax';
import { ReturnNode } from './../../../ast-node/return-node';
import { ForSyntax } from './features/for-syntax';
import { ForNode } from './../../../ast-node/for-node';
import { ArrayLiteralSyntax } from './features/array-literal-syntax';
import { ArrayLiteral } from './../../../ast-node/array-literal';
import {
	LinkNode,
	FunctionDefinition,
	BlockScope,
	BlockContent,
	IfNode,
	ElseNode,
	AssignmentNode,
	VariableDeclarationNode,
	ValueListingNode,
	PropertyCallNode,
	PropertyAccessNode,
	FunctionCall,
	CompositionNode,
	NumberLiteral,
	StringLiteral,
	DictLiteral,
	ParameterDeclaration,
	Identifier
} from '../../../ast-node';
import {
	ImportSyntax,
	FunctionSyntax,
	BlockScopeSyntax,
	BlockContentSyntax,
	IfSyntax,
	ElseSyntax,
	AssignmentSyntax,
	VariableDeclarationSyntax,
	ValueListingSyntax,
	PropertyCallSyntax,
	PropertyAccessSyntax,
	FunctionCallSyntax,
	CompositionSyntax,
	NumberLiteralSyntax,
	StringLiteralSyntax,
	DictLiteralSyntax,
	ParameterDeclarationSyntax,
	IdentifierSyntax
} from './features/index';
import { OrdoSyntaxCurator } from './features/util/ordo-syntax-curator';
import { BaseAstNode } from '../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../abstract/base-syntax-feature';
import { ISyntaxCurator } from '../../interfaces/i-syntax-curator';
import { ISyntaxFeature } from '../../interfaces/i-syntax-feature';
import { UnaryCompositionNode } from '../../../ast-node/unary-composition-node';
import { UnaryCompositionSyntax } from './features/unary-composition-syntax';

export class OrdoAstParser extends BaseAstParser {
	public initializeFeatureSet(): void {
		//Optimization todo -> order by usage probability
		const syntaxCurator: ISyntaxCurator = new OrdoSyntaxCurator();
		this.addFeature(ReturnNode, ReturnSyntax, syntaxCurator);
		this.addFeature(ForNode, ForSyntax, syntaxCurator);
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
		this.addFeature(UnaryCompositionNode, UnaryCompositionSyntax, syntaxCurator);
		this.addFeature(CompositionNode, CompositionSyntax, syntaxCurator);
		this.addFeature(NumberLiteral, NumberLiteralSyntax, syntaxCurator);
		this.addFeature(StringLiteral, StringLiteralSyntax, syntaxCurator);
		this.addFeature(DictLiteral, DictLiteralSyntax, syntaxCurator);
		this.addFeature(ParameterDeclaration, ParameterDeclarationSyntax, syntaxCurator);
		this.addFeature(ArrayLiteral, ArrayLiteralSyntax, syntaxCurator);
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
		//console.log('Before Parse: ' + astNodeType);
		//console.log(code);
		const selectedFeature: ISyntaxFeature = this.featureSetDict[astNodeType];
		//console.log('Selected parser: ');
		//console.log(selectedFeature);
		if (!selectedFeature) {
			throw new Error('Can not parse code for which no Syntax Parser was found: ' + astNodeType);
		}
		return selectedFeature.parseFeature(code, this) as AstNodeType;
	}
}
