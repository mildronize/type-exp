import * as e from '../src/libs.js';

// Treat type as data

describe('Test Pick', () => {
  type MyPick<Obj, Keys extends keyof Obj> = {
    [Key in Keys]: Obj[Key];
  };

  function MyPick<T, K>(Obj: any, Keys: e.keyof<K>) {
    return e.map(
      Keys,
      (Key) => Key,
      (Key) => Obj[Key],
    );
  }

  it('When using Pick with union', () => {
    const todo = {
      title: e.string(),
      description: e.string(),
      completed: e.boolean(),
    };
    // Equivalent to => type TodoPreview = MyPick<Todo, "title" | "completed">;
    const actual = MyPick(todo, e.union('title', 'description'));
    expect(actual).toStrictEqual({ title: 'string', description: 'string' });
  });
});
