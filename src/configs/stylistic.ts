import { interopDefault } from '../utils'
import type { FlatConfigItem, OptionsOverrides, StylisticConfig } from '../types'
import { pluginTm2js } from '../plugins'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export async function stylistic(
  options: StylisticConfig & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'tm2js:stylistic',
      plugins: {
        style: pluginStylistic,
        tm2js: pluginTm2js,
      },
      rules: {
        ...config.rules,
        'curly': ['error', 'multi-or-nest', 'consistent'],
        'tm2js/consistent-list-newline': 'error',
        'tm2js/if-newline': 'error',
        'tm2js/top-level-function': 'error',
        ...overrides,
      },
    },
  ]
}
