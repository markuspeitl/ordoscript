import { BaseAstUnparser } from '../../abstract/base-ast-unparser';
import * as nodeModule from '../../../ast-node';
import * as syntaxModule from './features';
import * as defaultSyntaxModule from '../default/features';
import path from 'path';
import { TokenSet } from '../../../common/token-set';
import { Slog } from '../../../ast-parser/common/util/slog';

export class PythonAstUnparser extends BaseAstUnparser {
	public initializeSubParsers(): void {
		//Load all default parsers
		this.loadSyntaxFeaturesDynamic(nodeModule, defaultSyntaxModule);
		//Load specific typescript parsers and optionally override Default parsers
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
		this.addFeature(NumericLiteral, NumericLiteralSyntax);
		this.addFeature(StringLiteral, StringLiteralSyntax);
		//this.addFeature(DictLiteral, DictLiteralSyntax);
		//this.addFeature(ParameterDeclaration, ParameterDeclarationSyntax);
		this.addFeature(Identifier, IdentifierSyntax);*/

		const tokenPath: string = path.join(__dirname, 'tokenSet/python-token-set.json');
		const tokenSet: TokenSet = TokenSet.loadFromFile(tokenPath);
		Slog.jlog('TokenSet', tokenSet);
		this.loadTokenSet(tokenSet);
	}
}
