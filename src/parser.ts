import { Props, parse as p } from 'react-docgen-typescript'

export type Property = {
  name: string
  description: string
  optional: boolean
  type: string
  defaultValue: string
}

type ParseResult = Record<string, Property[]>

export function parse(source: string): ParseResult {
  const declarations = p(source, {
    savePropValueAsString: true,
    shouldIncludePropTagMap: true,
  })

  const result: Record<string, Property[]> = {}

  for (const declaration of declarations) {
    result[createExportName(declaration.displayName)] = createProps(declaration.props)
  }

  return result
}

function createExportName(component: string): string {
  return component + 'Props'
}

function createProps(props: Props): Property[] {
  const result: Property[] = []

  for (const entry of Object.entries(props)) {
    const [name, meta] = entry

    if ((meta.tags as any).internal) {
      continue
    }

    result.push({
      name,
      description: meta.description,
      optional: !meta.required,
      type: meta.type.name,
      defaultValue: meta.defaultValue ? meta.defaultValue.value : undefined,
    })
  }

  return result
}
