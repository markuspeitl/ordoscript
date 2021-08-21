export class Enclosing {
	public open: number;
	public close: number;
	public openToken: string;
	public closeToken: string;

	public constructor(open?: number, close?: number) {
		if (open) {
			this.open = open;
		}
		if (close) {
			this.close = close;
		}
	}
}
