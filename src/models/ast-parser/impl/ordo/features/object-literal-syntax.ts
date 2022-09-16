import { ObjectLiteral } from '../../../../ast-node';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';
import { SyntaxTool } from '../../../common/util/syntax-tool';

export class ObjectLiteralSyntax extends BaseSyntaxFeature {
	public priority: number = 100;

	public isFeatureDetected(code: string): boolean {
		const trimmed: string = code.trim();
		return this.matchSet.objectLiteralDetector.test(trimmed);
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}
		const node: ObjectLiteral = new ObjectLiteral();
		const enclosedCode: string | null = SyntaxTool.getTokenEnclosedContents(code, this.tokenSet.objectLiteralTokenPair);
		if (enclosedCode) {
			//node.value = this.getNodeDetect(enclosedCode, 'value');
		}
		return node;
	}
}
