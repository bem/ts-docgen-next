# ts-docgen-next

[![npm](https://img.shields.io/npm/v/ts-docgen-next.svg?style=flat-square&labelColor=111)][npm]

## ✈️ Install

```sh
npm i -DE ts-docgen-next
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
import { ComponentProps } from '!!ts-docgen-next/loader!./component.tsx'

<PropsTable value={ComponentProps} />
```

## 📜 License

Project is [MIT licensed](https://github.com/bem/ts-docgen-next/blob/master/license.md).

[npm]: https://www.npmjs.com/package/ts-docgen-next
