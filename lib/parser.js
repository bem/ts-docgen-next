"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const react_docgen_typescript_1 = require("react-docgen-typescript");
function parse(source) {
    const declarations = react_docgen_typescript_1.parse(source, {
        savePropValueAsString: true,
        shouldIncludePropTagMap: true,
    });
    const result = {};
    for (const declaration of declarations) {
        result[createExportName(declaration.displayName)] = createProps(declaration.props);
    }
    return result;
}
exports.parse = parse;
function createExportName(component) {
    return component + 'Props';
}
function createProps(props) {
    const result = [];
    for (const entry of Object.entries(props)) {
        const [name, meta] = entry;
        if (meta.tags.internal) {
            continue;
        }
        result.push({
            name,
            description: meta.description,
            optional: !meta.required,
            type: meta.type.name,
            defaultValue: meta.defaultValue ? meta.defaultValue.value : undefined,
        });
    }
    return result;
}
