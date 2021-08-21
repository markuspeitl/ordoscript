import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
export abstract class BaseAstUnparser {
	public abstract unParseAstNode(astNode: BaseAstNode): string;
}
