## What are Type definitions?
Type definitions are globally declared typescript types, or interfaces. These allow developers to use types in multiple locations in the project without worrying about importing?

## Do I need to use the d.ts file extension?
Yes. The <filename>.d.ts is a reserved file extension for type definitions. They are what cause the types and interfaces to be available globally, and are what stop the webpack from compiling them.

## Aren't global declarations an antipattern?
Well yeah... and no. Globals are generally bad, but in this case typedefinitions are not compiled, and only used for the typescript transpiler, and linter. **This code never makes it into our builds so global shmobals**.