import { BlockContent } from './../../../../ast-node/block-content';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseAstParser } from '../../../abstract/base-ast-parser';
import { ConsoleUtil } from '../../../common/util/console-util';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class BlockContentSyntax extends BaseSyntaxFeature {
	public getTargetNodeType(): string {
		return 'BlockContent';
	}

	public isFeatureDetected(code: string): boolean {
		return false;
	}

	public parseFeatureInternal(code: string, astParser: BaseAstParser): BaseAstNode | null {
		if (!code) {
			return null;
		}

		if (!this.isValid) {
			throw new Error('Can not create a valid AST as the number of block opening and closing tokens does not match');
		}

		ConsoleUtil.printNamedBody('Parsing Syntax feature ' + String(this.constructor.name), code);

		//trimmedCode = trimmedCode.trim();

		const node: BlockContent = new BlockContent();
		const curatedLines: string[] | null = this.syntaxCurator.getCuratedLines(code);

		if (!curatedLines) {
			return node;
		}

		const statements: string[] = [];

		let blockCode: string | null = null;
		for (let i: number = 0; i < curatedLines.length; i++) {
			const line: string = curatedLines[i];

			if (line.includes('{')) {
				const previousCode: string = line.substring(0, line.indexOf('{'));
				const previousLineIndex: number = i - 1;
				if (previousCode.trim().length > 0) {
					blockCode = line;
				} else if (curatedLines.length > previousLineIndex && curatedLines[previousLineIndex].trim().length > 0) {
					blockCode = curatedLines[previousLineIndex] + line;
				}
			} else if (blockCode !== null) {
				blockCode = blockCode + '\n' + line;
				if (line.includes('}')) {
					statements.push(blockCode);
					blockCode = null;
				}
			} else {
				statements.push(line);
			}
		}

		ConsoleUtil.printNamedBody('Block Statements: ', JSON.stringify(statements, null, 2));

		if (statements.length > 0) {
			node.children = [];
			for (const statement of statements) {
				const childStatement: BaseAstNode = astParser.parseAstNodeDetect(statement);
				node.children.push(childStatement);
			}
		}

		ConsoleUtil.printNamedBody('Block AST: ', JSON.stringify(node, null, 2));
		return node;
	}

	private isValid(code: string): boolean {
		const openParts: string[] = code.split('{');
		const closeParts: string[] = code.split('}');
		//The amount of open and close tokens must match for a valid block to be created
		return openParts.length === closeParts.length;
	}
}
