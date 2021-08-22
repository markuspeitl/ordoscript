import { ReturnNode } from './../../../../ast-node/return-node';
import { SyntaxTool } from './../../../common/util/syntax-tool';
import { Enclosing } from './../../../common/models/enclosing';
import { Identifier } from './../../../../ast-node/identifier';
import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node/function-definition';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class ReturnSyntax extends BaseSyntaxFeature {
	private regExp: RegExp = new RegExp(/^return /);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ReturnNode = new ReturnNode();
		const afterReturn: string = code.replace(this.regExp, '').replace(';', '').trim();
		node.returnValue = astParser.parseAstNodeDetect(afterReturn);

		return node;
	}
}
