import * as t from '../src/libs.js';

// Ref: https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md

describe('Test Pick', () => {
  type MyReadonly<Obj> = {
    readonly [Key in keyof Obj]: Obj[Key]
  };

  function MyReadonly<T, K>(Obj: any) {
    return t.map(Obj, (Key) => [Key, Obj[Key]]);
  }

  it('When using Pick with union', () => {
    const todo = {
      title: t.string(),
      description: t.string(),
      completed: t.boolean(),
    };
    // Equivalent to => type TodoPreview = MyReadonly<Todo>;
    const actual = MyReadonly(todo);
    expect(actual).toStrictEqual({ title: 'string', description: 'string', completed: 'boolean' });
  });
});
