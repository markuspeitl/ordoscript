import { OrdoAstParser } from './models/ast-parser/impl/ordo/ordo-ast-parser';
import { ArgumentParser } from 'argparse';
import fs from 'fs';
import { BaseAstParser } from './models/ast-parser/abstract/base-ast-parser';
import { BaseAstNode } from './models/ast-node/abstract/base-ast-node';
import { BaseAstUnparser } from './models/ast-unparser/abstract/base-ast-unparser';
import { TypeScriptAstUnparser } from './models/ast-unparser/impl/typescript/typescript-ast-unparser';

console.log('Script executed');

const parser = new ArgumentParser({
	description: 'A sample console application template'
});

parser.add_argument('source', { help: 'Source path to consume' });
parser.add_argument('target', { help: 'Target path to write to' });

const args: any = parser.parse_args();

function readDocument(targetFilePath: string): string | null {
	console.log('Reading document from: ' + targetFilePath);
	if (!fs.existsSync(targetFilePath)) {
		console.log('File does not exist');
		return null;
	}

	return fs.readFileSync(targetFilePath) as unknown as string;
}
function writeDocument(contents: string, targetFilePath: string): void {
	console.log('Writing: \n' + contents + '\nto: ' + targetFilePath + '\n');
	fs.writeFileSync(targetFilePath, contents);
}

const documentContents: string | null = readDocument(args.source);

if (documentContents) {
	const ordoAstParser: BaseAstParser = new OrdoAstParser();
	//console.log('Parsing: ' + String(documentContents));
	const astNode: BaseAstNode = ordoAstParser.parseFileContent(String(documentContents));
	const astUnparser: BaseAstUnparser = new TypeScriptAstUnparser();
	const code: string | null = astUnparser.unParseAstNode(astNode);
	if (astNode) {
		writeDocument(JSON.stringify(astNode, null, 2), String(args.target) + '-tree.json');
	}
	if (code) {
		writeDocument(code, args.target);
	}
}

console.log('Script finished -> exiting');
