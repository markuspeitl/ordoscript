export abstract class BaseAstNode {
	//Type field for possible serialization and deserialization of the ast
	public type: string;
	//public parent: BaseAstNode | null = null;
	//public children: BaseAstNode[] | null = null;
	//public startCharIndex: number = -1;
	//public endCharIndex: number = -1;

	//Only for debugging
	public original: string;
}
