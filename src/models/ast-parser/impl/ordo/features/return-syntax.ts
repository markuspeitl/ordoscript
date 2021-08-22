import { ReturnNode } from './../../../../ast-node/return-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class ReturnSyntax extends BaseSyntaxFeature {
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
		node.returnValue = astParser.parseAstNodeDetect(afterReturn);

		return node;
	}
}
