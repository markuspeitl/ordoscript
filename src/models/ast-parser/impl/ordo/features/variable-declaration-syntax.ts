import { Identifier } from './../../../../ast-node/identifier';
import { VariableDeclarationNode } from './../../../../ast-node/variable-declaration-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class VariableDeclarationSyntax extends BaseSyntaxFeature {
	public priority: number = 10;
	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.variableDeclarationDetector.test(trimmed);
	}
	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: VariableDeclarationNode = new VariableDeclarationNode();

		const variableAndType: string[] = code.split(this.tokenSet.typeDefinitionStartToken);
		if (variableAndType.length > 1) {
			node.valuetype = this.getNode<Identifier>(variableAndType[1], Identifier.name, 'valuetype');
		}

		const declaration: string = variableAndType[0].trim();
		const declarationParts: string[] = declaration.split(' ');

		if (declarationParts.length < 2) {
			throw new Error('Variable declaration must have both const|var|let and identifier!');
		}
		node.modifier = this.getNode<Identifier>(declarationParts[0], Identifier.name, 'modifier');
		node.id = this.getNode<Identifier>(declarationParts[1], Identifier.name, 'id');

		return node;
	}
}
