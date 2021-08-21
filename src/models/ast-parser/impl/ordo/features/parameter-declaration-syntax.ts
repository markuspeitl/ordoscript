import { Identifier } from './../../../../ast-node/identifier';
import { VariableDeclarationNode } from './../../../../ast-node/variable-declaration-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { ParameterDeclaration } from '../../../../ast-node/parameter-declaration';

export class ParameterDeclarationSyntax extends BaseSyntaxFeature {
	public isFeatureDetected(code: string): boolean {
		return false;
	}
	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		const node: ParameterDeclaration = new ParameterDeclaration();

		if (!code.includes(':')) {
			node.id = astParser.parseAstNode<Identifier>(code, Identifier.name);
			return node;
		}

		const typedParts: string[] = code.split(':');
		if (typedParts && typedParts.length > 1) {
			node.id = astParser.parseAstNode<Identifier>(typedParts[0].trim(), Identifier.name);
			node.valueType = typedParts[1].trim();
		}

		return node;
	}
}
