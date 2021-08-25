import { Slog } from './../../common/util/slog';
import { TokenSet } from '../../../common/token-set';
import * as syntax from './features';
import * as nodes from '../../../ast-node/index';
import { OrdoSyntaxCurator } from './util/ordo-syntax-curator';
import { BaseAstParser } from '../../abstract/base-ast-parser';
import { ISyntaxCurator } from '../../interfaces/i-syntax-curator';
import { LinkNode } from '../../../ast-node/index';
import { ImportSyntax } from './features';
import { MatchSet } from '../../../common/match-set';
import path from 'path';

export class OrdoAstParser extends BaseAstParser {
	public initializeSubParsers(): void {
		//Optimization todo -> order by usage probability
		const syntaxCurator: ISyntaxCurator = new OrdoSyntaxCurator();

		this.loadSyntaxFeaturesDynamic(nodes, syntax, syntaxCurator);

		//Add features that can not be dynamically linked
		this.addFeatureFromTypes(LinkNode, ImportSyntax, syntaxCurator);

		/*this.addFeature(ForNode, ForSyntax, syntaxCurator);
		this.addFeature(ReturnNode, ReturnSyntax, syntaxCurator);
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
		this.addFeature(NumericLiteral, NumericLiteralSyntax, syntaxCurator);
		this.addFeature(StringLiteral, StringLiteralSyntax, syntaxCurator);
		this.addFeature(DictLiteral, DictLiteralSyntax, syntaxCurator);
		this.addFeature(ParameterDeclaration, ParameterDeclarationSyntax, syntaxCurator);
		this.addFeature(ArrayLiteral, ArrayLiteralSyntax, syntaxCurator);
		this.addFeature(Identifier, IdentifierSyntax, syntaxCurator);*/

		const tokenPath: string = path.join(__dirname, 'tokenSet/ordo-token-set.json');
		const tokenSet: TokenSet = TokenSet.loadFromFile(tokenPath);
		Slog.jlog('TokenSet', tokenSet);
		//const tokenSet: TokenSet = new TokenSet();
		this.loadTokenSet(tokenSet);
		const matchSet: MatchSet = MatchSet.fromTokenSet(tokenSet);
		this.loadMatchSet(matchSet);

		this.printParserMapping();

		//Todo add detection tree hierarchy
	}
}
