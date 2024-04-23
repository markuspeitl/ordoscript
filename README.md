# OrdoScript
was a concept for a dynamic language, with
convenient definitions of program flow patterns that are used
frequently when developing TypeScript/JavaScript applications and programs.

## State
essentially implemented a part of ast parsing of the ordoscript language using regexes 
and transpiling/serializing to typescript code.
Can only do some very basic transpilation and does not have any unique features currently.

The theoretical attempt was to create some kind of polyglot language, which enables the common denominators between languages
to be reused and only platform specific language features needing to be added in the ordoscript code if necessary
if there is no polyfill for the language.
This way the code base can be located and collected at one location and if you need the same concept in another programming language
you just compile to that language (treating languages like platform).

One of the ideas as for instance shown at the pseudocode below was to provide interactivity
to other language from ordoscript as a language feature. Where serializable objects are passed
to the implementation through serialization/deserialization over stdin/stdout, where this process would be 
implicit and not visible in the *ordoscript* code.

## Notes

```js
//Auto module = file (top level {} are just there to make this more visible)
{
	//Plop the module to global scope
	plop myNewVariable: number = 0;
	
	@i32
	myLocalScopedVariable: number = 0;
	
	public someFunction(x: number): SomeReturnType {
		functionLocalVariable: Class = new();
		
		if(x < 32) {
			plop isLower: boolean = true;
		}
		else {
			//Both plops with same name must have same type
			plop isLower: boolean = false;
		}
		// Plop implicitly defined variable in upper scope (-> is default value 		when if elseif unmatched)
	
		
		console.log(isLower);
		
		//Merge operators and immutability
		imm leftMasterMerged: obj = leftObj -> rightObj
		imm rightMasterMerged: obj = leftObj <- rightObj
		// Right left and left right
		imm bothMergedRlLr: obj = leftObj <-> rightObj
		imm bothMerged2LrRl: obj = leftObj >-< rightObj
		
		//Interface extraction (should not be in production code)
		//Creates new type from contents and (casts bothMergedRlLr to MyNewType)
		//freeze(bothMergedRlLr, MyNewType)
		
		@python
		
		import numpy as np from 'numpy'
		someValue = bothMerged2LrRl['key']
		numpyArray = np.zeros(4,4)
		
		@endmodule
		
		console.log(numpyArray)
		
	}
	
	@python someFunction(): string {
		myPythonVar: string = "some string"
		print(myPythonVar)
		
		return myPythonVar
	}
	
	
	//Module resolvers are a way to replace modules with other implementations
	@python
	moduleresolver(path: string): object {
		if(path === 'numpy'){
			return {
				zeros(args: any): any {
					return [0,0,0]
				}
			}
		}
	}
	
	@ordo
	moduleresolver(path: string): object {
		//Moduleresolvers should make the code compileable to different languages
		//If the target is mixed language then a compability layer is simulated
	}
	
	private class SomeDataClass {
		id: string;
		name: string;
		amount: number;
	}
	
	//Default constructor
	dataClassInstance: SomeDataClass = new()
	//Allsetter constructor (transpiled to function call)
	dataClassInstance2: SomeDataClass = new('xyz','instanceName',10)

	//Propsetter constructor
	dataClassInstance2: SomeDataClass = new({
		id: 'xyz',
		name: 'instanceName',
		amount: 10
	})

	abstractObj: IAbstractClass = new(): ConcreteClass
	
}
```

- No function, const, let, var keywords
- Plop moves variable to outer scope (parameters can not be plopped) and no variable of the same name is allowed to exist in outer scope at compile time
- Fill typed objects with primitive random data option (useful for rappid testing and for mocking)
- Public properties of the top scope are auto exported, private properties are not exported


# OrdoScript design document

Goals: 
- Encourage creation of new files and classes
- Simpler than ever code sharing
- Transpile to any language
- Minimalistic -> not too much programming overhead
- (find and share resources automatically -> write once and use forever and everywhere)
- If C can be compiled to ARM, x86, x64 then why can't ordoScript be compiled to python, typescript, java, c#, c++

- Scope escalation (and it goes plop)
- First class classes
- First class functions?
- Operators, who does not like shorthand operators for generic useful stuff  
(->, <-, <->, >-<)
- Shorthand initializers, constructors, new() type is inferred from variable (only valid in assignment)
- 3 Default constructors: Empty default constructor, Filled setter constructor, PropertySetter constructor
- Type Annotations (may be used to: optimize ordo code, transpile to more restrictive languages), annotations can be stripped -> valid ordo code
= additional info that can be used by the compiler
- Module resolvers, can be used to modify import behaviour and replace modules in place
- Automatic modules (every file is an implicit class, with private and public methods and properties (public -> auto exported))
- Dynamic compile time binding: Read types from directory and use
- Target transpileable (python, typescript, java, c#, c++, webassembly)
	- Non existing features filled with a language specific polyfill
	- Some languages require additional information (java requires type annotation)
	- Additional information is optional (by default can be stripped and compiled to typescript/python)
- Target interactivity modules: Communication with transpile targets of other languages
	- Has some performance implications (example ordo -> python: python startup time + also needs to do heavy processing as communication is slow)
	- Communication handlers (stdout, stdin, websockets, rest, native)
- General purpose loop -> loop keyword (binds to for if 3 statements, binds to while if 1 evaluation statement, binds to foreach with additional keyword)
- Should multi inheritance be allowed

Next goal:
- Make ast more abstract (find common denominator between different programming languages) -> derive specific ast node implementations
- Transformer -> automatically transform the nodes that are the same + polyfill or translate the nodes that do not exist.
- (Optional) optimize the ast tree

Most languages share following constructs:
- Variable declarations
- Loops
- function declarations
- function calls
- function returns
- classes/modules/namespaces -> similar things
- Branching methods
- Instantiation of memory or 'constructs'
- (Conditional) Scoping and blocks
- Assignment
- Value manipulation and combination -> Evaluation
- Variable Types (even if implicit)
- Lists and arrays
- Linking external code
- Order manipulations (parenthesis) + ordering rules (math)
- Identifiers for various elements (names of functions, types, variables)
