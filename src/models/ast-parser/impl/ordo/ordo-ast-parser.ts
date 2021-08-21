import { ElseSyntax } from './features/else-syntax';
import { IfSyntax } from './features/if-syntax';
import { ElseNode } from './../../../ast-node/else-node';
import { IfNode } from './../../../ast-node/if-node';
import { BlockContentSyntax } from './features/block-content-syntax';
import { BlockScopeSyntax } from './features/block-scope-syntax';
import { ISyntaxFeature } from './../../abstract/i-syntax-feature';
import { BlockContent } from './../../../ast-node/block-content';
import { FunctionDefinition } from './../../../ast-node/function-definition';
import { FunctionSyntax } from './features/function-syntax';
import { BaseAstNode } from '../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../abstract/base-syntax-feature';
import { BlockScope } from '../../../ast-node/block-scope';

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
		this.addFeature(FunctionDefinition, FunctionSyntax);
		this.addFeature(BlockScope, BlockScopeSyntax);
		this.addFeature(BlockContent, BlockContentSyntax);
		this.addFeature(IfNode, IfSyntax);
		this.addFeature(ElseNode, ElseSyntax);
	}

	public parseAstNodeDetect(code: string): BaseAstNode {
		for (const astNodeKey of Object.keys(this.featureSetDict)) {
			const parsedNode: BaseAstNode | null = this.tryParseFeature(code, astNodeKey);
			if (parsedNode) {
				return parsedNode;
			}
		}
		throw new Error('Failed to parse AST node, syntax feature not detected');
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
		const selectedFeature: ISyntaxFeature = this.featureSetDict[astNodeType];
		return selectedFeature.parseFeature(code, this) as AstNodeType;
	}

	public parseFileContent(code: string): BlockContent {
		return this.parseAstNode<BlockContent>(code, BlockContent.name);
	}
}
