export class Slog {
	private static loggerLabels: Record<string, boolean> = {
		BaseSyntaxFeature: true,
		BaseFeatureSyntax: true,
		BaseAstParser: true,
		BaseAstUnparser: true,
		default: true
	};

	private static lastLogger: string = '';
	public static log(label: string, message: string): void {
		if (Slog.loggerLabels[label]) {
			const lines: string[] = message.split('\n');
			const newLines: string[] = lines.map((line: string) => label + '-->\t\t' + line);

			if (Slog.lastLogger !== label) {
				console.log('');
			}
			console.log(newLines.join('\n'));

			Slog.lastLogger = label;
		}
	}

	public static jlog(label: string, json: any): void {
		Slog.log(label, JSON.stringify(json));
	}
}
