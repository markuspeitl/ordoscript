import { AssignmentNode } from './../../../../ast-node/assignment-node';
import { Identifier } from './../../../../ast-node/identifier';
import { ValueListingNode } from './../../../../ast-node/value-listing-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { FunctionDefinition } from '../../../../ast-node/function-definition';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { OrdoAstParser } from '../ordo-ast-parser';
import { BlockScope } from '../../../../ast-node/block-scope';
import { SyntaxUtil } from '../../../abstract/sytax-util';
import { IfNode } from '../../../../ast-node/if-node';
import { CompositionNode } from '../../../../ast-node/composition-node';

export class AssignmentSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'AssignmentNode';
	}

	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return trimmedCode.includes('=');
	}
	public parseFeature(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const curatedLines: string[] | null = SyntaxUtil.getStrippedLines(code);
		if (!curatedLines) {
			return null;
		}
		const curatedCode: string = curatedLines.join('');

		const node: AssignmentNode = new AssignmentNode();

		const parts: string[] = curatedCode.split('=');
		if (parts.length !== 2) {
			throw Error('Invalid amount of participants for an assignment: ' + String(parts.length));
		}

		node.left = astParser.parseAstNodeDetect(parts[0]);
		node.right = astParser.parseAstNodeDetect(parts[1]);

		return node;
	}
}
