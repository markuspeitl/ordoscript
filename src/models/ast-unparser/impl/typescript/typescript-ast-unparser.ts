import { BaseAstNode } from '../../../ast-node/abstract/base-ast-node';
import { AssignmentNode } from '../../../ast-node/assignment-node';
import { BlockContent } from '../../../ast-node/block-content';
import { BlockScope } from '../../../ast-node/block-scope';
import { CompositionNode } from '../../../ast-node/composition-node';
import { DictLiteral } from '../../../ast-node/dict-literal';
import { ElseNode } from '../../../ast-node/else-node';
import { FunctionCall } from '../../../ast-node/function-call';
import { FunctionDefinition } from '../../../ast-node/function-definition';
import { Identifier } from '../../../ast-node/identifier';
import { IfNode } from '../../../ast-node/if-node';
import { LinkNode } from '../../../ast-node/link-node';
import { NumberLiteral } from '../../../ast-node/number-literal';
import { ParameterDeclaration } from '../../../ast-node/parameter-declaration';
import { PropertyAccessNode } from '../../../ast-node/property-access-node';
import { PropertyCallNode } from '../../../ast-node/property-call-node';
import { StringLiteral } from '../../../ast-node/string-literal';
import { ValueListingNode } from '../../../ast-node/value-listing-node';
import { VariableDeclarationNode } from '../../../ast-node/variable-declaration-node';
import { AssignmentSyntax } from '../../../ast-parser/impl/ordo/features/assignment-syntax';
import { BlockContentSyntax } from '../../../ast-parser/impl/ordo/features/block-content-syntax';
import { BlockScopeSyntax } from '../../../ast-parser/impl/ordo/features/block-scope-syntax';
import { CompositionSyntax } from '../../../ast-parser/impl/ordo/features/composition-syntax';
import { DictLiteralSyntax } from '../../../ast-parser/impl/ordo/features/dict-literal-syntax';
import { ElseSyntax } from '../../../ast-parser/impl/ordo/features/else-syntax';
import { FunctionCallSyntax } from '../../../ast-parser/impl/ordo/features/function-call-syntax';
import { FunctionSyntax } from '../../../ast-parser/impl/ordo/features/function-syntax';
import { IdentifierSyntax } from '../../../ast-parser/impl/ordo/features/identifier-syntax';
import { IfSyntax } from '../../../ast-parser/impl/ordo/features/if-syntax';
import { ImportSyntax } from '../../../ast-parser/impl/ordo/features/import-syntax';
import { NumberLiteralSyntax } from '../../../ast-parser/impl/ordo/features/number-literal-syntax';
import { ParameterDeclarationSyntax } from '../../../ast-parser/impl/ordo/features/parameter-declaration-syntax';
import { PropertyAccessSyntax } from '../../../ast-parser/impl/ordo/features/property-access-syntax';
import { PropertyCallSyntax } from '../../../ast-parser/impl/ordo/features/property-call-syntax';
import { StringLiteralSyntax } from '../../../ast-parser/impl/ordo/features/string-literal-syntax';
import { ValueListingSyntax } from '../../../ast-parser/impl/ordo/features/value-listing-syntax';
import { VariableDeclarationSyntax } from '../../../ast-parser/impl/ordo/features/variable-declaration-syntax';
import { BaseAstUnparser } from '../../abstract/base-ast-unparser';

export class TypeScriptAstUnparser extends BaseAstUnparser {
	public initializeFeatureSet(): void {
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
	}
	public unParseAstNodeDetect(node: BaseAstNode): string | null {
		throw new Error('Method not implemented.');
	}
	public unParseAstNode(astNode: BaseAstNode): string {
		console.log('Unparse AST Node');
		console.log(astNode);
		console.log(JSON.stringify(astNode, null, 2));
		return JSON.stringify(astNode, null, 2);
	}
}
