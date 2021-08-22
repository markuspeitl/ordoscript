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

	public static matchModuleTypes(matchMaster: any, matchPool: any, matcherFn: (a: string, b: string) => boolean): Tuple<string>[] {
		const masterKeys: string[] = Object.keys(matchMaster);
		const poolKeys: string[] = Object.keys(matchPool);

		const matches: Tuple<string>[] = [];
		for (const key of masterKeys) {
			const foundPoolType: string | undefined = poolKeys.find((poolType: string) => matcherFn(key, poolType));

			if (foundPoolType) {
				matches.push({ a: key, b: foundPoolType });
			} else {
				console.log('No node type found for: ' + String(key));
			}
		}
		return matches;
	}
}

export interface Tuple<Type> {
	a: Type;
	b: Type;
}
