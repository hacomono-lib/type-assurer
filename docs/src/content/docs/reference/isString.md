---
title: isString
description: A Type Guard function that checks if a value is a string.
---
A Type Guard function that checks if a value is a string.

## Usage

```typescript
import { isString } from 'type-assurer';

isString(''); // true
isString('foo'); // true
isString(0); // false
isString(null); // false
isString(undefined); // false
isString({}); // false
isString(new String()); // false
```
