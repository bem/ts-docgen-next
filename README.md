# ts-docgen-loader

Webpack loader for generating documentation from typescript files.

### Usage example

```tsx
import props from "!!ts-docgen-loader!./Component.tsx";

<PropsTable props={props} />;
```

```tsx
// Component.tsx

interface IProps {
  loading: boolean;
}

// The loader is looking for a default exported function
export default function Props(_props: IProps) {
  return null;
}
```

### Props interface

```tsx
interface IProp {
  name: string;
  optional: boolean;
  type: string;
  defaultValue?: string;
  description?: string;
}
```