export class Uti {
	public static clone<Type>(obj: Type): Type {
		return JSON.parse(JSON.stringify(obj)) as Type;
	}
}
