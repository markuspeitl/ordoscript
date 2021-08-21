import { ParameterDeclarationSyntax } from './features/parameter-declaration-syntax';
import { ParameterDeclaration } from './../../../ast-node/parameter-declaration';
import { IdentifierSyntax } from './features/identifier-syntax';
import { Identifier } from './../../../ast-node/identifier';
import { StringLiteralSyntax } from './features/string-literal-syntax';
import { ImportSyntax } from './features/import-syntax';
import { LinkNode } from './../../../ast-node/link-node';
import { PropertyCallSyntax } from './features/property-call-syntax';
import { PropertyCallNode } from './../../../ast-node/property-call-node';
import { NumberLiteralSyntax } from './features/number-literal-syntax';
import { NumberLiteral } from './../../../ast-node/number-literal';
import { CompositionSyntax } from './features/composition-syntax';
import { CompositionNode } from './../../../ast-node/composition-node';
import { FunctionCall } from './../../../ast-node/function-call';
import { PropertyAccessSyntax } from './features/property-access-syntax';
import { ValueListingSyntax } from './features/value-listing-syntax';
import { ValueListingNode } from './../../../ast-node/value-listing-node';
import { AssignmentSyntax } from './features/assignment-syntax';
import { AssignmentNode } from './../../../ast-node/assignment-node';
import { VariableDeclarationSyntax } from './features/variable-declaration-syntax';
import { VariableDeclarationNode } from './../../../ast-node/variable-declaration-node';
import { OrdoSyntaxCurator } from './features/util/ordo-syntax-curator';
import { ElseSyntax } from './features/else-syntax';
import { IfSyntax } from './features/if-syntax';
import { ElseNode } from './../../../ast-node/else-node';
import { IfNode } from './../../../ast-node/if-node';
import { BlockContentSyntax } from './features/block-content-syntax';
import { BlockScopeSyntax } from './features/block-scope-syntax';
import { ISyntaxFeature } from '../../interfaces/i-syntax-feature';
import { BlockContent } from './../../../ast-node/block-content';
import { FunctionDefinition } from './../../../ast-node/function-definition';
import { FunctionSyntax } from './features/function-syntax';
import { BaseAstNode } from '../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../abstract/base-syntax-feature';
import { BlockScope } from '../../../ast-node/block-scope';
import { PropertyAccessNode } from '../../../ast-node/property-access-node';
import { ISyntaxCurator } from '../../interfaces/i-syntax-curator';
import { FunctionCallSyntax } from './features/function-call-syntax';
import { StringLiteral } from '../../../ast-node/string-literal';
import { DictLiteral } from '../../../ast-node/dict-literal';
import { DictLiteralSyntax } from './features/dict-literal-syntax';

export class OrdoAstParser extends BaseAstParser {
	public static delimiterToken: string = ';';
	public static delimiterTokenLength: number = OrdoAstParser.delimiterToken.length;
	public static nodeEnclosureOpenToken: string = '{';
	public static nodeEnclosureCloseToken: string = '}';
	public static functionParamOpenToken: string = '(';
	public static functionParamCloseToken: string = ')';
	public static typeDefStartToken: string = ':';

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
