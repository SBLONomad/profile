import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content.ts',
  ],
  theme: {
    extend: {
      colors: {
        // 레퍼런스 원본: 딥 블랙 + 크리스프 화이트 + 네온 그린 포인트
        'neon': '#39FF14',
        'neon-dim': '#22C55E',
        'surface': '#111111',
        'surface-2': '#181818',
        'muted': '#888888',
        'muted-2': '#555555',
        'border-subtle': '#222222',
      },
      fontFamily: {
        display: ['Pretendard', 'sans-serif'],
        body: ['Pretendard', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
