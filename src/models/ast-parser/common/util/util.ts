import { Slog } from './slog';
import fs from 'fs';

export class Uti {
	public static clone<Type>(obj: Type): Type {
		return JSON.parse(JSON.stringify(obj)) as Type;
	}

	public static readDocument(targetFilePath: string): string | null {
		Slog.log('Uti', 'Reading document from: ' + targetFilePath);
		if (!fs.existsSync(targetFilePath)) {
			Slog.log('Uti', 'File does not exist');
			return null;
		}

		return fs.readFileSync(targetFilePath) as unknown as string;
	}
	public static writeDocument(contents: string, targetFilePath: string): void {
		Slog.log('Uti', 'Writing: \n' + contents + '\nto: ' + targetFilePath + '\n');
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
				Slog.log('MatchType', 'Found match: ' + String(key) + ' -> ' + String(foundPoolType));
			} else {
				Slog.log('MatchType', 'No match found for: ' + String(key));
			}
		}
		return matches;
	}

	public static printUnmatchedPoolTypes(matchMaster: any, matchPool: any, matcherFn: (a: string, b: string) => boolean): void {
		const masterKeys: string[] = Object.keys(matchMaster);
		const poolKeys: string[] = Object.keys(matchPool);
		for (const key of poolKeys) {
			if (!masterKeys.find((masterType: string) => matcherFn(masterType, key))) {
				Slog.log('MatchType', 'No match found for pooltype: ' + String(key));
			}
		}
	}
}

export interface Tuple<Type> {
	a: Type;
	b: Type;
}
