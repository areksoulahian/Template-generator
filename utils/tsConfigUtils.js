export const generateTsConfig = (answers) => {
  if (answers.language.toLowerCase() === 'typescript') {
    return JSON.stringify(
      {
        compilerOptions: {
          target: 'es6',
          module: 'commonjs',
          strict: true,
          esModuleInterop: true,
          outDir: './dist',
        },
        include: ['./src/**/*'],
        exclude: ['./node_modules'],
      },
      null,
      2,
    );
  }

  return null;
};
