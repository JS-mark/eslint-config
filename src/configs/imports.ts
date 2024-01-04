import type { FlatConfigItem, OptionsStylistic } from '../types'
import { pluginImport, pluginTm2js } from '../plugins'
import { GLOB_SRC_EXT } from '../globs'

export async function imports(options: OptionsStylistic = {}): Promise<FlatConfigItem[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'tm2js:imports',
      plugins: {
        import: pluginImport,
        tm2js: pluginTm2js,
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'error',
        'tm2js/import-dedupe': 'error',
        'tm2js/no-import-dist': 'error',
        'tm2js/no-import-node-modules-by-path': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
            }
          : {},
      },
    },
    {
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      name: 'tm2js:imports:bin',
      rules: {
        'tm2js/no-import-dist': 'off',
        'tm2js/no-import-node-modules-by-path': 'off',
      },
    },
  ]
}
