import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { BaseAstUnparser } from '../abstract/base-ast-unparser';

export class TypeScriptAstUnparser extends BaseAstUnparser {
	public unParseAstNode(astNode: BaseAstNode): string {
		console.log('Unparse AST Node');
		console.log(astNode);
		return 'Test';
	}
}
