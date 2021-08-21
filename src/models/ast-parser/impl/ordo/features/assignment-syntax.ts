import { AssignmentNode } from './../../../../ast-node/assignment-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class AssignmentSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'AssignmentNode';
	}

	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return trimmedCode.includes('=');
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

		node.left = astParser.parseAstNodeDetect(parts[0]);
		node.right = astParser.parseAstNodeDetect(parts[1]);

		return node;
	}
}
