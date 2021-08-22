import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../abstract/base-ast-parser';
import { MatchSet, TokenSet } from '../impl/ordo/features';

export interface ISyntaxFeature {
	//getTargetNodeType(): string;
	parseFeature(trimmedCode: string, astParser: BaseAstParser): BaseAstNode | null;
	loadTokenSet(tokenSet: TokenSet): void;
	loadMatchSet(matchSet: MatchSet): void;
}
