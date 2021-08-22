import { SyntaxTool } from './../../../common/util/syntax-tool';
import { ReturnNode } from './../../../../ast-node/return-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { BaseAstNode } from '../../../../ast-node';

export class ReturnSyntax extends BaseSyntaxFeature {
	public priority: number = 2;
	//private regExp: RegExp = new RegExp(/^return /);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.returnDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ReturnNode = new ReturnNode();
		const afterReturn: string = code.replace(this.matchSet.returnDetector, '').replace(';', '').trim();
		node.returnValue = SyntaxTool.getNodeDetect(afterReturn, astParser);

		return node;
	}
}
