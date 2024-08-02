import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ff5861',
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#FFFFFF',
          'base-100': '#ffffff',
        },
      },
      'dark',
      'cupcake',
    ],
  },
}
export default config
