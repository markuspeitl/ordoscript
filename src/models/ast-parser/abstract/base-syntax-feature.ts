import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from './base-ast-parser';
import { ISyntaxFeature } from './i-syntax-feature';

export abstract class BaseSyntaxFeature implements ISyntaxFeature {
	public abstract getTargetNodeType(): string;
	public abstract isFeatureDetected(code: string): boolean;
	public abstract parseFeature(trimmedCode: string, astParser: BaseAstParser): BaseAstNode | null;
	public tryParseFeature(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!this.isFeatureDetected(code)) {
			return null;
		}

		return this.parseFeature(code, astParser);
	}
}
