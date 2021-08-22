import { BaseAstNode, BlockScope } from '../../../ast-node';
import { BaseAstParser } from '../../abstract/base-ast-parser';
import { TokenPair } from './../../impl/ordo/features/token-set';
import { Enclosing } from './../models/enclosing';
export class SyntaxTool {
	public static getEnclosing(code: string, openToken: string, closeToken: string): Enclosing | null {
		const enclosing: Enclosing = new Enclosing();
		enclosing.open = code.indexOf(openToken);
		enclosing.close = code.indexOf(closeToken);
		if (enclosing.open === -1 && enclosing.close === -1) {
			return null;
		}
		return enclosing;
	}
	public static getEnclosingOfTokens(code: string, tokenPair: TokenPair): Enclosing | null {
		return SyntaxTool.getEnclosing(code, tokenPair.open, tokenPair.close);
	}
	public static getTokenEnclosedContents(code: string, tokenPair: TokenPair): string | null {
		const enclosing: Enclosing | null = this.getEnclosingOfTokens(code, tokenPair);
		if (!enclosing) {
			return null;
		}

		return this.getEnclosedContents(code, enclosing);
	}
	public static getEnclosedContents(code: string, enclosing: Enclosing): string {
		return code.substring(enclosing.open + 1, enclosing.close);
	}
	public static widenEnclosing(enclosing: Enclosing, widenSize: number): void {
		enclosing.open -= widenSize;
		enclosing.close += widenSize;
	}

	public static parseDetectArrayNullable(codes: string[], astParser: BaseAstParser, errorLabel: string): Array<BaseAstNode | null> {
		const children: Array<BaseAstNode | null> = new Array<BaseAstNode | null>();
		for (const code of codes) {
			const child: BaseAstNode | null = astParser.parseAstNodeDetect(code);
			children.push(child);
		}
		return children;
	}

	public static parseDetectArray(codes: string[], astParser: BaseAstParser, errorLabel: string): Array<BaseAstNode> {
		const children: Array<BaseAstNode> = new Array<BaseAstNode>();

		for (const code of codes) {
			const child: BaseAstNode | null = astParser.parseAstNodeDetect(code);
			if (!child) {
				throw Error(errorLabel + ': ast node with code: "' + code + '" can not be parsed to null -> error');
			}
			children.push(child);
		}
		return children;
	}

	public static parseBody(code: string, tokenPair: TokenPair, astParser: BaseAstParser, errorLabel: string): BlockScope {
		const blockEnclosing: Enclosing | null = SyntaxTool.getEnclosingOfTokens(code, tokenPair);
		if (!blockEnclosing) {
			throw new Error(errorLabel + ': could not find body block of function.');
		}
		SyntaxTool.widenEnclosing(blockEnclosing, 1);
		const enclosedBlock: string = SyntaxTool.getEnclosedContents(code, blockEnclosing);
		const body: BlockScope | null = astParser.parseAstNode<BlockScope>(enclosedBlock, BlockScope.name);
		if (!body) {
			throw new Error(errorLabel + ': must have a body scope');
		}
		return body;
	}

	public static getNodeDetect<BaseAstNode>(code: string, astParser: BaseAstParser): BaseAstNode {
		const node: BaseAstNode | null = astParser.parseAstNodeDetect(code.trim()) as BaseAstNode | null;
		if (!node) {
			throw Error('Property call must have child function');
		}
		return node;
	}

	public static getNode<Type extends BaseAstNode>(code: string, astParser: BaseAstParser, typeName: string): Type {
		const node: Type | null = astParser.parseAstNode<Type>(code.trim(), typeName);
		if (!node) {
			throw Error('Property call must have child function');
		}
		return node;
	}
}
