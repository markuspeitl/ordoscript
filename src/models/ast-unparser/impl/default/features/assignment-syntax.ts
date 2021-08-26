import { AssignmentNode } from './../../../../ast-node/assignment-node';
import { BaseFeatureSyntax } from '../../../abstract/base-feature-syntax';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';

export class AssignmentSyntax extends BaseFeatureSyntax {
	protected unParseFeatureInternal(node: BaseAstNode): string | null {
		if (!(node instanceof AssignmentNode)) {
			return null;
		}

		let code: string = '';
		const unParsedLeft: string | null = this.astUnparser.unParseAstNode(node.left);
		if (!unParsedLeft) {
			throw Error('Assignment must have left hand element');
		}
		const unParsedRight: string | null = this.astUnparser.unParseAstNode(node.right);
		if (!unParsedRight) {
			throw Error('Assignment must have right hand element');
		}
		code += unParsedLeft + this.tokenSet.assignMentToken + unParsedRight;
		return code;
	}
}
