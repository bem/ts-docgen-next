import { parse } from './parser'

export = function loader() {
  let value = {}

  try {
    value = parse(this.resourcePath)
  } catch (error) {
    console.error('Error in ts-docgen-loader', error)
  }

  return `module.exports = ${JSON.stringify(value)}`
}
