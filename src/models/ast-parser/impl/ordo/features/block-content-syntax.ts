import { ConsoleUtil } from './../../../common/util/console-util';
import { BlockContent } from './../../../../ast-node/block-content';
import { BaseAstNode } from '../../../../ast-node/abstract/base-ast-node';
import { BaseSyntaxFeature } from '../../../abstract/base-syntax-feature';

export class BlockContentSyntax extends BaseSyntaxFeature {
	public priority: number = 0.5;

	//Is always dependent on other feature -> can not be detected on its own
	public isFeatureDetected(code: string): boolean {
		return false;
	}

	public parseFeatureInternal(code: string): BaseAstNode | null {
		if (!code) {
			return null;
		}

		if (!this.isValid) {
			throw new Error('Can not create a valid AST as the number of block opening and closing tokens does not match');
		}

		const node: BlockContent = new BlockContent();
		let curatedLines: string[] | null = null;
		if (!this.syntaxCurator) {
			curatedLines = code.split('\n');
		} else {
			curatedLines = this.syntaxCurator.getCuratedLines(code);
		}

		if (!curatedLines) {
			return node;
		}

		ConsoleUtil.printNamedBody('BlockContentSyntax', 'BLOCKCURATEDLINES', JSON.stringify(curatedLines, null, 2));

		const statements: string[] = [];

		let blockCode: string | null = null;
		for (let i: number = 0; i < curatedLines.length; i++) {
			const line: string = curatedLines[i];

			const openBlockIndex: number = line.indexOf(this.tokenSet.blockScopeTokenPair.open);
			if (openBlockIndex > -1) {
				const previousCode: string = line.substring(0, openBlockIndex);
				const previousLineIndex: number = i - 1;
				if (previousCode.trim().length > 0) {
					blockCode = '';
				} else if (curatedLines.length > previousLineIndex && curatedLines[previousLineIndex].trim().length > 0) {
					blockCode = curatedLines[previousLineIndex];
				}
			}
			if (blockCode !== null) {
				blockCode = blockCode + '\n' + line;
				if (line.includes(this.tokenSet.blockScopeTokenPair.close)) {
					statements.push(blockCode);
					blockCode = null;
				}
			} else {
				statements.push(line);
			}
		}

		ConsoleUtil.printNamedBody('BlockContentSyntax', 'BLOCKSTATEMENTS', JSON.stringify(statements, null, 2));

		if (statements.length > 0) {
			node.children = [];
			for (const statement of statements) {
				const childStatement: BaseAstNode | null = this.getNodeDetectNullable(statement);

				if (!childStatement) {
					throw new Error('Block child statement with non empty code must result in an Ast node');
				}

				node.children.push(childStatement);
			}
		}
		return node;
	}

	private isValid(code: string): boolean {
		const openParts: string[] = code.split(this.tokenSet.blockScopeTokenPair.open);
		const closeParts: string[] = code.split(this.tokenSet.blockScopeTokenPair.close);
		//The amount of open and close tokens must match for a valid block to be created
		return openParts.length === closeParts.length;
	}
}
