import { PythonAstUnparser } from './models/ast-unparser/impl/python/python-ast-unparser';
import { OrdoAstParser } from './models/ast-parser/impl/ordo/ordo-ast-parser';
import { ArgumentParser } from 'argparse';
import { BaseAstParser } from './models/ast-parser/abstract/base-ast-parser';
import { BaseAstNode } from './models/ast-node/abstract/base-ast-node';
import { BaseAstUnparser } from './models/ast-unparser/abstract/base-ast-unparser';
import { TypeScriptAstUnparser } from './models/ast-unparser/impl/typescript/typescript-ast-unparser';
import { Uti } from './models/ast-parser/common/util/util';
import { Slog } from './models/ast-parser/common/util/slog';

Slog.log('Script', 'Script executed');

const parser = new ArgumentParser({
	description: 'A sample console application template'
});

parser.add_argument('source', { help: 'Source path to consume' });
parser.add_argument('target', { help: 'Target path to write to' });

const args: any = parser.parse_args();

const documentContents: string | null = Uti.readDocument(args.source);

const unparse: boolean = true;

if (documentContents) {
	const ordoAstParser: BaseAstParser = new OrdoAstParser();
	//Slog.log('Parsing: ' + String(documentContents));
	const astNode: BaseAstNode | null = ordoAstParser.parseFileContent(String(documentContents));
	if (astNode) {
		Uti.writeDocument(JSON.stringify(astNode, null, 2), String(args.target) + '-tree.json');
	}
	if (astNode && unparse) {
		const astUnparser: BaseAstUnparser = new TypeScriptAstUnparser();
		//const astUnparser: BaseAstUnparser = new PythonAstUnparser();
		const code: string | null = astUnparser.unParseAstNode(astNode);
		if (code) {
			Uti.writeDocument(code, String(args.target) + '.ts');
		}
	}
}

Slog.log('Script', 'Script finished -> exiting');
