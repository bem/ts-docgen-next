# ts-docgen

[![npm](https://img.shields.io/npm/v/next-global-css.svg?style=flat-square&labelColor=111)][npm]

## ✈️ Install

```sh
npm i -DE ts-docgen
```

## ☄️ Usage

### As webpack-loader

**component.tsx**

```ts
import { FC } from 'react'

interface ComponentProps {
  property: string
}

export const Component: FC<ComponentProps> = () => null
```

**documentation.mdx**

```tsx
import { ComponentProps } from '!!ts-docgen/loader!./component.tsx'

<PropsTable value={ComponentProps} />
```

## 📜 License

Project is [MIT licensed](https://github.com/bem/ts-docgen/blob/master/license.md).

[npm]: https://www.npmjs.com/package/ts-docgen
