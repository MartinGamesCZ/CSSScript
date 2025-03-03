# CSSScript
> Who said CSS is not a programming language?

This is a joke, please don't take it seriously. This is a project I've started for fun and to learn more about compilers and programming languages. It's not meant to be used in production.

But if you want to use it, go ahead. I won't stop you.

If you make something cool with it, let me know and I will add you to the list of projects using CSSScript.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Rules](#rules)
- [Syntax](#syntax)
  - [Functions](#functions)
  - [Variables](#variables)
  - [Executing instructions and functions](#executing-instructions-and-functions)
  - [Getting results from functions](#getting-results-from-functions)
- [Built-in functions](#built-in-functions)


## Introduction
CSSScript is a toolkit for compiling and running CSS code as a programming language. Why? Because I can.

### Installation
- Clone this repo
- Go into `compiler` directory and run `bun install`
- Go into folder with your project and run `bun <path_to_compiler_directory>/src/index.ts`
- You can now run compiled code using `bun run compiled.js`

## Features
- [x] Functions
- [x] Variables
- [x] Executing instructions and functions
- [x] Getting results from functions
- [x] Returning values from functions
- [ ] More built-in functions
- [ ] Loops
- [x] Conditions
- [x] Importing other files
- [ ] Importing libraries
- [ ] More data types
- [ ] Switch statements
- [ ] Error handling
- [ ] Arithmetic operations
- [ ] More...

- [ ] Rewrite in CSS

## Rules
I wanted to keep the language as similar to CSS as possible, so I've decided to keep the syntax as close to CSS as possible. Here are some rules that you need to follow:

- Main file must be named `index.css`
- Main function needs to be named `main`
- Follow syntax as described below

## Syntax

### Functions
Note: Function names are case-sensitive and can only contain letter and underscores, dashes are not allowed.

Every function is defined as a CSS class. For example for `my_function` function:
```css
.my_function {
  /* Your code here */
}
```

You can also add arguments to the function:
```css
.my_function[arg1, arg2] {
  /* Your code here */
}
```

You can also define default values for arguments:
```css
.my_function[arg1="something", arg2] {
  /* Your code here */
}
```

### Variables
Variables are global, for now. Variables need to be defined in the body of function.

Variable names are case-sensitive and can only contain letters and underscores, dashes are not allowed.

You can define them like this:
```css
$my_variable: "Hello, world!";
```

This will create the variable if needed and assign the value to it.
If the variable already exists, it will overwrite the value.

You can then use the variable like this:
```css
print: var(--my_variable);
```

### Executing instructions and functions
You can execute instructions and functions like setting css styles. The style name is the function name and the value is the arguments, separated by space.

For example:
```css
print: "Hello, world!";
```

Or:

```css
my_function: arg1 arg2;
```

You can also execute functions without arguments (the colon is important):
```css
my_function:;
```

### Getting results from functions
You cannot currently return values from functions, but you can read results of the built-in functions using `result` variable.

For example:
```css
fetch-json: "https://jsonplaceholder.typicode.com/todos/1";
print: var(--result);
```

### If statements
You can use if statements to execute code conditionally.

```css
@if [condition] {
    /* Your code here */
}
```

### Return statements
You can use return statements to return values from functions.

```css
@return "Hello, world!";
```

Or to return variables:

```css
@return var(--my_variable);
```

## Built-in functions
- `print`: Prints to the console | Args: `data: any`
- `fetch-json`: Sends HTTP request and returns JSON response | Args: `url: string`
- `prompt`: Reads input from the console | Args: `message: string`
