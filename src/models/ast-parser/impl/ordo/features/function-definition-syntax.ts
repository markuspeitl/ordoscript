import { SyntaxTool } from '../../../common/util/syntax-tool';
import { Enclosing } from '../../../common/models/enclosing';
import { Identifier } from '../../../../ast-node/identifier';
import { ValueListingNode } from '../../../../ast-node/value-listing-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node/function-definition';
import { BaseBodiedSyntax } from '../../../abstract/base-bodied-syntax';

export class FunctionDefinitionSyntax extends BaseBodiedSyntax {
	public priority: number = 0.2;
	//private regExp: RegExp = new RegExp(/^function [a-zA-Z0-9]+()/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.functionDefDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: FunctionDefinition = new FunctionDefinition();

		const functionParamsEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, this.tokenSet.functionParamTokenPair);
		if (!functionParamsEnclosing) {
			throw new Error('Could not find parameter definition of function');
		}
		const beforeParams: string = SyntaxTool.beforeOpening(code, functionParamsEnclosing).trim();
		const name: string = beforeParams.substring(this.tokenSet.functionKeywordToken.length).trim();
		node.id = this.getNode<Identifier>(name, Identifier.name, 'id');

		const enclosedParams: string | null = SyntaxTool.getEnclosedContents(code, functionParamsEnclosing);
		if (enclosedParams) {
			node.parameters = this.getNodeNullable<ValueListingNode>(enclosedParams, ValueListingNode.name);
		}

		const afterParamsCode: string = SyntaxTool.afterEnclosing(code, functionParamsEnclosing);
		const blockEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(afterParamsCode, this.tokenSet.blockScopeTokenPair);
		if (!blockEnclosing) {
			throw new Error('Function definition must have a body block');
		}

		const afterParamsBeforeBlock: string = SyntaxTool.beforeOpening(afterParamsCode, blockEnclosing);
		const trimmedType: string = afterParamsBeforeBlock.trim();
		if (trimmedType.startsWith(this.tokenSet.typeDefinitionStartToken)) {
			node.returnType = this.getNode<Identifier>(trimmedType.substring(1), Identifier.name, 'returnType');
		}

		node.body = this.parseBody(afterParamsCode, this.tokenSet.blockScopeTokenPair);

		return node;
	}
}
