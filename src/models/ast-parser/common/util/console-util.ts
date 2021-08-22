export class ConsoleUtil {
	public static printSep(): void {
		console.log('--------------------------------');
	}
	public static printEnclosed(value: string): void {
		ConsoleUtil.printSep();
		console.log(value);
		ConsoleUtil.printSep();
	}
	public static printNamedBody(name: string, body: string, printOutPut: boolean = true): void {
		if (printOutPut) {
			console.log('\n\n----' + name);
			ConsoleUtil.printSep();
			console.log(body);
			ConsoleUtil.printSep();
			console.log('\n');
		}
	}
}
