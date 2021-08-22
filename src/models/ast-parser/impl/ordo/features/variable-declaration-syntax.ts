import { VariableDeclarationNode } from './../../../../ast-node/variable-declaration-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class VariableDeclarationSyntax extends BaseSyntaxFeature {
	//private regExp: RegExp = new RegExp(/^const|var|let[ ]+[:[ ]+[a-zA-Z0-9]+]?/);
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		//return this.regExp.test(trimmed);
		return this.matchSet.variableDeclarationDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: VariableDeclarationNode = new VariableDeclarationNode();

		const spacedParts: string[] = code.split(' ');
		if (spacedParts.length < 2) {
			throw new Error('Variable declaration must have both const|var|let and identifier!');
		}

		node.declaretype = spacedParts[0];
		const typedParts: string[] = code.split(':');
		if (typedParts && typedParts.length > 1) {
			node.valuetype = typedParts[1].trim();
		}
		const allParts: string[] = code.split(/ |:/g);

		if (allParts.length > 1) {
			node.label = allParts[1];
		}

		//node.value = astParser.parseAstNodeDetect(parts[0]);
		return node;
	}
}
