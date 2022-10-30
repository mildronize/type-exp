# Type Expression

[![Node.js CI](https://github.com/mildronize/type-exp/actions/workflows/nodejs.yml/badge.svg)](https://github.com/mildronize/type-exp/actions/workflows/nodejs.yml)

> Currently in development

## Concept

Explain Type using TypeScript, Treat type as data. Thanks [Type-Level Programming](https://type-level-typescript.com/) by Gabriel Vergnaud, to make to exellent guide to understand clear in Type system of TypeScript.

here is an example, when we try to understand the type declaration for example `Pick` Utility Type, it quite hard to understand.

```ts
type MyPick<Obj, Keys extends keyof Obj> = {
    [Key in Keys]: Obj[Key];
};
```

This project try to describe the type by using TypeScript, and in the future, it should convert to the TypeScript type as well.

I convert it into the TypeScript function:

```ts
import { e } from 'type-exp';

function MyPick<T, K>(Obj: any, Keys: e.keyof<K>) {
    return e.map(Keys, (Key) => [Key, Obj[Key]]);
}

const todo = {
    title: e.string(),
    description: e.string(),
    completed: e.boolean(),
};

// Equivalent to =>
type TodoPreview = MyPick<Todo, "title" | "completed">;
console.log(MyPick(todo, e.union('title', 'description'));

// The result should be
// { title: 'string', description: 'string' }
```

# Thanks 
Template from https://github.com/jsynowiec/node-typescript-boilerplate