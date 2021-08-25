import { Slog } from './slog';
export class ConsoleUtil {
	public static printSep(label: string): void {
		Slog.log(label, '--------------------------------');
	}
	public static printEnclosed(label: string, value: string): void {
		ConsoleUtil.printSep(label);
		Slog.log(label, value);
		ConsoleUtil.printSep(label);
	}
	public static printNamedBody(label: string, name: string, body: string): void {
		Slog.log(label, '----' + name);
		ConsoleUtil.printSep(label);
		Slog.log(label, body);
		ConsoleUtil.printSep(label);
		Slog.log(label, '\n');
	}
}
