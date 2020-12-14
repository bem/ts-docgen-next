function clearDescription(str) {
  if (typeof str !== "string") return;
  return str.replace(/\r?\n/g, "").replace(/^\s/, "");
}

function getResultType(resultString) {
  const result = resultString.replace("module.exports = ", "");
  const type = JSON.parse(result);
  type.forEach((el) => {
    if (el.description) {
      el.description = clearDescription(el.description);
    }
  });
  return type;
}

function getExpectedType(name, optional, type, defaultValue = undefined, description = undefined) {
  const data = { name, optional, type };
  if (defaultValue) data.defaultValue = defaultValue;
  if (description) data.description = description;
  return data;
}

module.exports = { getResultType, getExpectedType };
