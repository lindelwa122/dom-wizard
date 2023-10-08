# Style Guide

This guide gives coding conventions that must be used when contributing to this project. The main idea behind this guide is to ensure we write consistent code that can easily be understood.

This guideline is in compliance with [Google JS Style Guide.](https://google.github.io/styleguide/jsguide.html)

## How to use this guide?

You are requested to read this guide before you start writing code, so you know what is accepted and what is not. When refactoring your code, you must also use this guide to ensure your solution complies with what is expected.

## Writing comments

Comments should **_always_** be written in English.

Comments that contradict the code are worse than no comments. Always make a priority of keeping the comments up to date when the code changes!

Comments should be complete sentences. The first word should be capitalized, unless it is an identifier that begins with a lower-case letter (never alter the case of identifiers!).

Comments should be short and concise. They should be easy to understand. Take your time when writing comments.

## Formatting

- Braces are required for all control structures (i.e., `if`, `else`, `for`, `do`, `while`, as well as any others), even if the body contains only a single statement. The first statement of a non-empty block must begin on its own line.

  ```jsx
  // Disallowed
  if (someVeryLongCondition()) doSomething();

  for (let i = 0; i < foo.length; i++) bar(foo[i]);
  ```

  A simple if statement that can fit entirely on a single line with no wrapping (and that doesn’t have an else) may be kept on a single line with no braces when it improves readability. This is the only case in which a control structure may omit braces and newlines.

  ```jsx
  if (shortCondition()) foo();
  ```

- Indentation level is 2 lines.
- Class literals (whether declarations or expressions) are indented as blocks. Do not add semicolons after methods, or after the closing brace of a class *declaration* (statements—such as assignments—that contain class *expressions* are still terminated with a semicolon). Use the `extends`keyword, but not the `@extends`.

  ```jsx
  // Example

  class Foo {
    constructor() {
      /** @type {number} */
      this.x = 42;
    }

    /** @return {number} */
    method() {
      return this.x;
    }
  }
  Foo.Empty = class {};
  ```

- When declaring an anonymous function in the list of arguments for a function call, the body of the function is indented two spaces more than the preceding indentation depth.

  ```jsx
  // Example

  prefix.something.reallyLongFunctionName('whatever', (a1, a2) => {
    // Indent the function body +2 relative to indentation depth
    // of the 'prefix' statement one line above.
    if (a1.equals(a2)) {
      someOtherLongFunctionName(a1);
    } else {
      andNowForSomethingCompletelyDifferent(a2.parrot);
    }
  });
  ```

- [Switch Statements] After a switch label, a newline appears, and the indentation level is increased +2, exactly as if a block were being opened.

  ```jsx
  // Examole

  switch (animal) {
    case Animal.BANDERSNATCH:
      handleBandersnatch();
      break;

    case Animal.JABBERWOCK:
      handleJabberwock();
      break;

    default:
      throw new Error('Unknown animal');
  }
  ```

  Always use a switch statement when you can, instead of an if statement.

  ```jsx
  // Example

  // Don't do
  if (num === 1) {
  	code goes here...
  }
  else if (num === 2) {
  	code goes here...
  }
  else if (num === 3) {
  	code goes here...
  }
  else {
  	code goes here...
  }

  // Do
  switch(num) {
  	case 1:
  		code goes here...
  		break;

  	case 2:
  		code goes here...
  		break;

  	case 3:
  		code goes here...
  		break;

  	default:
  		code goes here...
  }

  ```

- Always put spaces around operators ( = + - \* / ), and after commas.

  ```jsx
  // Disallowed
  let x = y + z;
  const myArray = ['Volvo', 'Saab', 'Flat'];

  // Allowed
  let x = y + z;
  const myArray = ['Volvo', 'Saab', 'Fiat'];
  ```

## Statements

- Each statement is followed by a line-break.
- Every statement must be terminated with a semicolon. Relying on automatic semicolon insertion is forbidden.
- JavaScript code has a column limit of 80 characters, any line that would exceed this limit must be line-wrapped.

  - Break at a higher syntactic level. For example:

    ```jsx
    // Preferred:
    currentEstimate = calc(currentEstimate + x * currentEstimate) / 2.0;

    // Discouraged:
    currentEstimate = calc(currentEstimate + x * currentEstimate) / 2.0;
    ```

- When line-wrapping, each line after the first (each *continuation line*) is indented at least +4 from the original line, unless it falls under the rules of block indentation.

## Comments

- Block comments are indented at the same level as the surrounding code. They may be in
  `/* … */` or `//`-style. For multi-line `/* … */` comments, subsequent lines must start with _ aligned with the `_` on the previous line, to make comments obvious with no extra context.

  ```jsx
  /*
   * This is
   * okay.
   */

  // And so
  // is this.

  /* This is fine, too. */
  ```

## Language Features

### Local Variables

- Declare all local variables with either `const` or `let`. Use `const` by default, unless a variable needs to be reassigned. The `var` keyword must not be used.
- Every local variable declaration declares only one variable: declarations such as
  `let a = 1, b = 2;` are not used.
- Local variables are **not** habitually declared at the start of their containing block or block-like construct. Instead, local variables are declared close to the point they are first used (within reason), to minimize their scope.

### Array Literals

- Include a trailing comma whenever there is a line break between the final element and the closing bracket.

  ```jsx
  // Example

  const values = ['first value', 'second value'];
  ```

- Do not use the variadic `Array` constructor.

  ```jsx
  // Disallowed:
  const a1 = new Array(x1, x2, x3);
  const a2 = new Array(x1, x2);
  const a3 = new Array(x1);
  const a4 = new Array();

  // Instead
  const a1 = [x1, x2, x3];
  const a2 = [x1, x2];
  const a3 = [x1];
  const a4 = [];
  ```

- Do not use an object constructor. While `Object` does not have the same problems as `Array`, it is still disallowed for consistency. Use an object literal (`{}` or `{a: 0, b: 1, c: 2}`) instead.

## String Literals

- In a dictionary, use unquoted keys.

  ```jsx
  // Discouraged
  const box = {
    width: 100,
    height: 50,
  };

  // Encouraged
  const box = {
    width: 100,
    height: 50,
  };
  ```

- Use template literals (delimited with ```) over complex string concatenation.

  ```jsx
  // Disallowed
  let greetings = 'Hello, ' + name + ' ' + surname;

  // Allowed
  let grettings = `Hello, ${name} ${surname}`;
  ```

- Do not use *line continuations* (that is, ending a line inside a string literal with a backslash) in either ordinary or template string literals.

  ```jsx
  // Disallowed
  const longString =
    'This is a very long string that far exceeds the 80 \
      column limit. It unfortunately contains long stretches of spaces due \
      to how the continued lines are indented.';

  // Allowed
  const longString =
    'This is a very long string that far exceeds the 80 ' +
    'column limit. It does not contain long stretches of spaces since ' +
    'the concatenated strings are cleaner.';
  ```

## Disallowed features

- Do not use the `with` keyword. It makes your code harder to understand and has been banned in strict mode since ES5.
- Always terminate statements with semicolons (except function and class declarations, as noted above).
- Never use `new` on the primitive object wrappers (`Boolean`, `Number`, `String`, `Symbol`), nor include them in type annotations.

  ```jsx
  // Disallowed:
  const x = new Boolean(false);

  // Allowed
  const x = Boolean(0);
  ```
