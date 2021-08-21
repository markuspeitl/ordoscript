import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from './base-ast-parser';

export interface ISyntaxFeature {
	getTargetNodeType(): string;
	parseFeature(trimmedCode: string, astParser: BaseAstParser): BaseAstNode | null;
}
