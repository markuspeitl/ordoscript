import { BaseAstNode } from '../../../ast-node';
import { BaseAstUnparser } from '../../abstract/base-ast-unparser';

export class UnparseTool {
	public static tryUnparse(code: string, node: BaseAstNode | null, astUnparser: BaseAstUnparser): string {
		if (!node) {
			return '';
		}

		const unparsedBody: string | null = astUnparser.unParseAstNode(node);
		if (unparsedBody) {
			code += unparsedBody;
		}
		return code;
	}
}
