import { BaseAstNode, AssignmentNode } from '../../../../ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class AssignmentSyntax extends BaseSyntaxFeature {
	public priority: number = 2;

	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.matchSet.assignmentDetector.test(trimmedCode);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: AssignmentNode = new AssignmentNode();

		const parts: string[] = code.split(this.tokenSet.assignMentToken);
		if (parts.length !== 2) {
			throw Error('Invalid amount of participants for an assignment: ' + String(parts.length));
		}

		node.left = this.getNodeDetect(parts[0], 'left');
		node.right = this.getNodeDetect(parts[1], 'right');

		return node;
	}
}
