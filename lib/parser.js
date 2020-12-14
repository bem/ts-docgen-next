const { Project } = require("ts-morph");
const { TypeFormatFlags } = require("typescript");

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {string}
 */
function getEscapedName(symbol) {
  return symbol.getEscapedName();
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {import('ts-morph').Node}
 */
function getDeclaration(symbol) {
  const declarations = symbol.getDeclarations();
  return declarations[0];
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {import('ts-morph').JSDoc}
 */
function getJsDocsOfSymbol(symbol) {
  const jsDocs = getDeclaration(symbol).getJsDocs();
  return jsDocs[jsDocs.length - 1];
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {string}
 */
function getPropDescription(symbol) {
  const jsDocs = getJsDocsOfSymbol(symbol);
  if (jsDocs === undefined) {
    return undefined;
  }
  return jsDocs.getDescription();
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {boolean}
 */
function isReactSource(symbol) {
  return (
    getDeclaration(symbol)
      .getSourceFile()
      .getFilePath()
      .match(/@types\/react/) === null
  );
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {boolean}
 */
function isInternalOrPrivate(symbol) {
  const jsDocs = getJsDocsOfSymbol(symbol);
  const excludedTags = ["internal", "private"];

  if (jsDocs === undefined) {
    return false;
  }

  return jsDocs.getTags().some((tag) => excludedTags.includes(tag.getTagName()));
}

/**
 * @param {import('ts-morph').Node<Node>} node
 * @return {import('ts-morph').Symbol[]}
 */
function getProps(node) {
  return node
    .getType()
    .getProperties()
    .filter(isReactSource)
    .filter((symbol) => !isInternalOrPrivate(symbol));
}

/**
 * @param {string} str
 * @return {boolean}
 */
function isReactType(str) {
  if (typeof str !== "string") return;
  return !!str.match(/React\./);
}

/**
 * @param {string} str
 * @return {boolean}
 */
function isReactElement(str) {
  if (typeof str !== "string") return;
  return !!str.match(/React\.ReactElement/);
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {string[]}
 */
function getPropTypes(symbol) {
  const type = getDeclaration(symbol).getType();
  const typeName = type.getText();

  if (isReactElement(typeName)) {
    return "ReactElement";
  }

  if (type.isBoolean()) {
    return "boolean";
  }

  if (isReactType(typeName)) {
    return type.getText(undefined, TypeFormatFlags.InFirstTypeArgument);
  }

  if (type.isUnion()) {
    return type
      .getUnionTypes()
      .map((type) => type.getText(undefined, TypeFormatFlags.InFirstTypeArgument))
      .join(" | ");
  }

  return type.getText(undefined, TypeFormatFlags.InFirstTypeArgument);
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {string}
 */
function getDefaultValue(symbol) {
  const jsDocs = getJsDocsOfSymbol(symbol);
  const defaultValueTags = ["default", "defaultValue"];

  if (jsDocs === undefined) {
    return undefined;
  }

  const defaultValueTag = jsDocs.getTags().find((tag) => defaultValueTags.includes(tag.getTagName()));

  if (defaultValueTag === undefined) {
    return undefined;
  }

  return defaultValueTag.getComment();
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {boolean}
 */
function getOptional(symbol) {
  return getDeclaration(symbol).hasQuestionToken();
}

/**
 * @param {import('ts-morph').Symbol} symbol
 * @return {object}
 */
function getPropTypeData(symbol) {
  return {
    name: getEscapedName(symbol),
    description: getPropDescription(symbol),
    optional: getOptional(symbol),
    type: getPropTypes(symbol),
    defaultValue: getDefaultValue(symbol),
  };
}

/**
 * @param {string} inputFile
 * @return {Prop[]}
 */
function parse(inputFile) {
  let result = [];
  const project = new Project({
    compilerOptions: {
      jsx: "react",
    },
  });

  const sourceFiles = project.addSourceFilesAtPaths(inputFile);
  const sourceFile = sourceFiles[0];

  if (!sourceFile) {
    console.log("Source file not found");
    return result;
  }

  const functions = sourceFile.getFunctions();

  if (!functions || !functions.length) {
    console.log("Not found functions in source file");
    return result;
  }

  const defaultFunction = functions.find((func) => func.isDefaultExport());

  if (!defaultFunction) {
    console.log("Default exported function not found");
    return result;
  }

  const parameters = defaultFunction.getParameters();
  const firstParameter = parameters.shift();

  if (!firstParameter) {
    console.log("Parameter not found");
    return result;
  }

  const props = getProps(firstParameter);
  result = props.map(getPropTypeData);

  return result;
}

module.exports = {
  parse,
};
