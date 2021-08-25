import { BaseSyntaxParser } from '../../abstract/base-syntax-parser';
import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { ConsoleUtil } from '../../ast-parser/common/util/console-util';
import { IFeatureSyntax } from '../interfaces/i-feature-syntax';
import { BaseAstUnparser } from './base-ast-unparser';

export abstract class BaseFeatureSyntax extends BaseSyntaxParser implements IFeatureSyntax {
	protected astUnparser: BaseAstUnparser;
	public constructor(astUnparser: BaseAstUnparser) {
		super();
		this.astUnparser = astUnparser;
	}

	public unParseFeature(node: BaseAstNode | null): string | null {
		if (!node) {
			return null;
		}

		ConsoleUtil.printNamedBody('BaseFeatureSyntax', 'UnParsing feature to syntax' + String(this.constructor.name), JSON.stringify(node, null, 2));
		const code: string | null = this.unParseFeatureInternal(node);
		if (!code) {
			return '';
		}

		ConsoleUtil.printNamedBody('BaseFeatureSyntax', String(this.constructor.name) + ' CODE: ', code);
		node.type = String(node.constructor.name);

		return code;
	}
	protected abstract unParseFeatureInternal(node: BaseAstNode): string | null;

	protected tryUnparse(code: string, node: BaseAstNode | null): string {
		if (!node) {
			return '';
		}

		const unparsedBody: string | null = this.astUnparser.unParseAstNode(node);
		if (unparsedBody) {
			code += unparsedBody;
		}
		return code;
	}
}
