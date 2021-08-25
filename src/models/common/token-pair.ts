export class TokenPair {
	public open: string;
	public close: string;
	public constructor(open: string, close: string) {
		this.open = open;
		this.close = close;
	}
	public fromArray(array: string[]): void {
		this.open = array[0];
		this.close = array[1];
	}
}
