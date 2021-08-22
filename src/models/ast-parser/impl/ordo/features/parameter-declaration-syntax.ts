import { Identifier } from './../../../../ast-node/identifier';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { ParameterDeclaration } from '../../../../ast-node/parameter-declaration';

export class ParameterDeclarationSyntax extends BaseSyntaxFeature {
	public priority: number = 5;
	public isFeatureDetected(code: string): boolean {
		return false;
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ParameterDeclaration = new ParameterDeclaration();

		if (!code.includes(':')) {
			node.id = this.getId(code.trim(), astParser);
			return node;
		}

		const typedParts: string[] = code.split(':');
		if (typedParts && typedParts.length > 1) {
			node.id = this.getId(typedParts[0].trim(), astParser);
			node.valueType = typedParts[1].trim();
		}

		return node;
	}

	private getId(code: string, astParser: BaseAstParser): Identifier {
		const identifier: Identifier | null = astParser.parseAstNode<Identifier>(code.trim(), Identifier.name);
		if (!identifier) {
			throw Error('Parameter declaration must have an identifier if names are in code');
		}
		return identifier;
	}
}
