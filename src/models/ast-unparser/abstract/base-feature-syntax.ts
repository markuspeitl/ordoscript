import { BaseAstNode } from '../../ast-node/abstract/base-ast-node';
import { ConsoleUtil } from '../../ast-parser/common/util/console-util';
import { BaseAstUnparser } from './base-ast-unparser';

export abstract class BaseFeatureSyntax {
	public unParseFeature(node: BaseAstNode | null, astUnparser: BaseAstUnparser): string | null {
		if (!node) {
			return null;
		}

		ConsoleUtil.printNamedBody('BaseFeatureSyntax', 'UnParsing feature to syntax' + String(this.constructor.name), JSON.stringify(node, null, 2));
		const code: string | null = this.unParseFeatureInternal(node, astUnparser);
		if (!code) {
			return '';
		}

		ConsoleUtil.printNamedBody('BaseFeatureSyntax', String(this.constructor.name) + ' CODE: ', code);
		node.type = String(node.constructor.name);

		return code;
	}
	protected abstract unParseFeatureInternal(node: BaseAstNode, astParser: BaseAstUnparser): string | null;
	/*public tryUnParseFeature(node: BaseAstNode, astUnParser: BaseAstUnparser): string | null {
		if (!node) {
			return null;
		}
		if (!this.isOfFeatureType(node)) {
			return null;
		}
		return this.unParseFeature(node, astUnParser);
	}*/
}
