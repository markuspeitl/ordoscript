import fs from 'fs';

export class Uti {
	public static clone<Type>(obj: Type): Type {
		return JSON.parse(JSON.stringify(obj)) as Type;
	}

	public static readDocument(targetFilePath: string): string | null {
		console.log('Reading document from: ' + targetFilePath);
		if (!fs.existsSync(targetFilePath)) {
			console.log('File does not exist');
			return null;
		}

		return fs.readFileSync(targetFilePath) as unknown as string;
	}
	public static writeDocument(contents: string, targetFilePath: string): void {
		//console.log('Writing: \n' + contents + '\nto: ' + targetFilePath + '\n');
		fs.writeFileSync(targetFilePath, contents);
	}

	public static readJSON(targetFilePath: string): Record<string, unknown> {
		const contents: string | null = fs.readFileSync(targetFilePath) as unknown as string;
		return JSON.parse(contents);
	}
}
