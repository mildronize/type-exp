import * as t from '../src/libs.js';

// Ref: https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md

describe('Test Pick', () => {
  type MyPick<Obj, Keys extends keyof Obj> = {
    [Key in Keys]: Obj[Key];
  };

  function MyPick<T, K>(Obj: any, Keys: t.keyof<K>) {
    return t.map(Keys, (Key) => [Key, Obj[Key]]);
  }

  it('When using Pick with union', () => {
    const todo = {
      title: t.string(),
      description: t.string(),
      completed: t.boolean(),
    };
    // Equivalent to => type TodoPreview = MyPick<Todo, "title" | "completed">;
    const actual = MyPick(todo, t.union('title', 'description'));
    expect(actual).toStrictEqual({ title: 'string', description: 'string' });
  });
});
