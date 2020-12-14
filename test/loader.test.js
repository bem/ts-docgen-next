const compiler = require("./compiler");
const { getResultType, getExpectedType } = require("./utils");

test("Union types", async () => {
  const stats = await compiler("./examples/union.tsx");
  const output = stats.toJson({ source: true }).modules[0].source;
  const expectedType = [
    getExpectedType("test", false, "boolean"),
    getExpectedType("content", true, "string | number", undefined, "Содержимое, отображаемое внутри значка"),
  ];
  expect(getResultType(output)).toStrictEqual(expectedType);
});

test("Primitive types", async () => {
  const stats = await compiler("./examples/primitive.tsx");
  const output = stats.toJson({ source: true }).modules[0].source;
  const expectedType = [
    getExpectedType("id", true, "string", "useUniqId()", "Уникальный id компонента"),
    getExpectedType("test2", false, "number"),
  ];
  expect(getResultType(output)).toStrictEqual(expectedType);
});

test("React types", async () => {
  const stats = await compiler("./examples/react.tsx");
  const output = stats.toJson({ source: true }).modules[0].source;
  const expectedType = [
    getExpectedType("test", false, "RefObject<HTMLInputElement>"),
    getExpectedType(
      "onChange",
      true,
      "(event: ChangeEvent<HTMLInputElement>) => void",
      undefined,
      "Обработчик, вызываемый при смене файла"
    ),
    getExpectedType(
      "addonAfter",
      true,
      "ReactNode",
      undefined,
      "Дополнительный контент после `children`"
    ),
    getExpectedType(
      "icon",
      true,
      "IconProvider",
      undefined,
      "Иконка на кнопке"
    ),
    getExpectedType(
      "children",
      true,
      "ReactElement",
      undefined,
      "Контент иконки"
    ),
  ];
  expect(getResultType(output)).toStrictEqual(expectedType);
});
