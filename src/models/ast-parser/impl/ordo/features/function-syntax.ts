import { SyntaxTool } from './../../../common/util/syntax-tool';
import { Enclosing } from './../../../common/models/enclosing';
import { Identifier } from './../../../../ast-node/identifier';
import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node/function-definition';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { OrdoAstParser } from '../ordo-ast-parser';
import { BlockScope } from '../../../../ast-node/block-scope';
import { tokenSet } from './token-set';

export class FunctionSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'FunctionDefinition';
	}
	private regExp: RegExp = new RegExp(/^function [a-zA-Z0-9]+()/);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: FunctionDefinition = new FunctionDefinition();

		const whitespaceIndex: number = code.indexOf(' ');
		const parenthesisEnclosing: Enclosing = SyntaxTool.getEnclosingOfTokens(code, tokenSet.functionParamTokenPair);
		const blockEnclosing: Enclosing = SyntaxTool.getEnclosingOfTokens(code, tokenSet.blockScopeTokenPair);
		const returnTypeStartIndex: number = code.indexOf(tokenSet.typeDefinitionStartToken);
		const typeEnclosing: Enclosing = new Enclosing(returnTypeStartIndex, blockEnclosing.open);

		const enclosedParam: string = SyntaxTool.getEnclosedContents(code, parenthesisEnclosing);

		node.label = code.substring(whitespaceIndex + 1, parenthesisEnclosing.open);
		node.parameters = astParser.parseAstNode<ValueListingNode>(enclosedParam, ValueListingNode.name);

		if (returnTypeStartIndex > -1 && returnTypeStartIndex < parenthesisEnclosing.open) {
			const enclosedType: string = SyntaxTool.getEnclosedContents(code, typeEnclosing);
			node.returnType = astParser.parseAstNode<Identifier>(enclosedType.trim(), Identifier.name);
		}

		const enclosedBlock: string = SyntaxTool.getEnclosedContents(code, blockEnclosing);
		node.body = astParser.parseAstNode<BlockScope>(enclosedBlock, BlockScope.name);

		return node;
	}
}
