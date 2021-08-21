import { Identifier } from './identifier';
import { BaseAstNode } from './abstract/base-ast-node';

export class ParameterDeclaration extends BaseAstNode {
	public id: Identifier;
	public valueType: string;
}
