import { BaseAstNode, AssignmentNode } from '../../../../ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { SyntaxTool } from '../../../common/util/syntax-tool';

export class AssignmentSyntax extends BaseSyntaxFeature {
	public priority: number = 2;

	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.matchSet.assignmentDetector.test(trimmedCode);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: AssignmentNode = new AssignmentNode();

		const parts: string[] = code.split('=');
		if (parts.length !== 2) {
			throw Error('Invalid amount of participants for an assignment: ' + String(parts.length));
		}

		const children: BaseAstNode[] = SyntaxTool.parseDetectArray(parts, astParser, this.constructor.name);
		node.left = children[0];
		node.right = children[1];

		return node;
	}
}
