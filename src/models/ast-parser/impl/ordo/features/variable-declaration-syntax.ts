import { VariableDeclarationNode } from './../../../../ast-node/variable-declaration-node';
import { AssignmentNode } from './../../../../ast-node/assignment-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { SyntaxUtil } from '../../../abstract/sytax-util';

export class VariableDeclarationSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'VariableDeclarationNode';
	}

	private regExp: RegExp = new RegExp(/^const|var|let[ ]+[:[ ]+[a-zA-Z0-9]+]?/);
	public isFeatureDetected(code: string): boolean {
		const trimmedCode: string = code.trim();
		return this.regExp.test(trimmedCode);
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

		const node: VariableDeclarationNode = new VariableDeclarationNode();

		const spacedParts: string[] = curatedCode.split(' ');
		if (spacedParts.length < 2) {
			throw new Error('Variable declaration must have both const|var|let and identifier!');
		}

		node.type = spacedParts[0];
		const typedParts: string[] = curatedCode.split(':');
		if (typedParts && typedParts.length > 1) {
			node.valuetype = typedParts[1].trim();
		}
		const allParts: string[] = curatedCode.split(/ |:/g);

		if (allParts.length > 1) {
			node.label = allParts[1];
		}

		//node.value = astParser.parseAstNodeDetect(parts[0]);
		return node;
	}
}
