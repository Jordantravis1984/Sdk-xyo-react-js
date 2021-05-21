import typescript from '@rollup/plugin-typescript'

export default [
  {
    external: [
      '@emotion/react',
      '@emotion/styled',
      '@material-ui/core',
      '@material-ui/core/styles',
      '@material-ui/styles',
      '@xyo-network/sdk-xyo-js',
      'axios',
      'lodash',
      'lodash/isEqual',
      'numeral',
      'query-string',
      'randombytes',
      'react',
      'react/jsx-runtime',
      'react-cookie-consent',
      'react-dom',
      'react-helmet',
      'react-icons',
      'react-icons/ai',
      'react-router-dom',
    ],
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
]
