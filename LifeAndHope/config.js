System.config({
    /* Transpile TypeScript to JavaScript at runtime */
    //transpiler: 'typescript',
    //typescriptOptions: { emitDecoratorMetadata: true },
    //packages: {'app': {defaultExtension: 'ts'}}

    /* Let Intellij transpile TypeScript */
    packages: {'app': {defaultExtension: 'js'}},
})

System.import('app/main')
    .then(null, console.error.bind(console))