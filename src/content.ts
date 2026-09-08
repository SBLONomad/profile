// ================================================================
// ✏️  이 파일 하나에서 사이트의 모든 텍스트를 수정할 수 있습니다.
//     저장하면 브라우저에 즉시 반영됩니다.
// ================================================================

export const CONTENT = {

  // ── 헤더 ──────────────────────────────────────────────────────
  header: {
    logo: 'PORTFOLIO',
    nav: {
      about: 'About',
      projects: '작업물',
      contact: 'Contact',
    },
  },

  // ── Hero 섹션 (메인 화면) ──────────────────────────────────────
  hero: {
    eyebrow: '✦  비주얼 디자이너 & 크리에이티브 디렉터',
    headline1: '나만의 감성으로',    // ← 첫 번째 줄 (글리치 효과)
    headline2: '세상을 담다.',       // ← 두 번째 줄 (글리치 효과)
    subtext1: '아이디어를 고품질 비주얼로.',
    subtext2: '타협 없이, 한계 없이.',
    cta_primary: '작업물 보기',      // ← 흰색 버튼
    cta_secondary: '연락하기',       // ← 테두리 버튼
  },

  // ── Hero 하단 3컬럼 피처 그리드 ──────────────────────────────
  features: [
    {
      icon: '⚡',
      title: '즉시 업로드',
      desc: '관리자 패널에서 새 작업물을 추가하면 사이트에 바로 반영됩니다.',
    },
    {
      icon: '🎨',
      title: '다양한 카테고리',
      desc: '브랜딩, 디지털 아트, 포토그래피 등 카테고리별로 작업물을 정리하세요.',
    },
    {
      icon: '📐',
      title: '고해상도 표현',
      desc: '모든 이미지를 최신 포맷(AVIF/WebP)으로 최고 화질로 제공합니다.',
    },
  ],

  // ── About 섹션 ────────────────────────────────────────────────
  about: {
    eyebrow: '✦  소개',
    headline1: '비주얼로 전달하는',
    headline2: '진심 어린',
    highlight: '이야기',             // ← 네온 그린으로 강조
    bio1: '5년 이상의 경험을 가진 비주얼 디자이너이자 크리에이티브 디렉터입니다. 디지털 미학의 경계를 넓히는 작업을 즐깁니다.',
    bio2: '스타트업 브랜드 아이덴티티부터 글로벌 에디토리얼 비주얼까지, 모든 프로젝트에 세심한 디테일과 탁월함을 담습니다.',
    badge_year: '2024',
    badge_status: '작업 가능',
    skills: [
      '비주얼 디자인', '브랜드 아이덴티티', '디지털 아트', '모션 그래픽',
      '타이포그래피', 'UI/UX 디자인', '포토그래피', '크리에이티브 디렉션',
    ],
    stats: [
      { value: '5+',  label: '연차' },
      { value: '80+', label: '완료 프로젝트' },
      { value: '30+', label: '클라이언트' },
      { value: '12',  label: '수상 경력' },
    ],
  },

  // ── 프로젝트 그리드 섹션 ──────────────────────────────────────
  projects: {
    eyebrow: '✦  선택된 작업물',
    headline1: '나의 비전을 담은',
    highlight: '프로젝트',
    subtext: '디지털 아트, 브랜딩, 크리에이티브 디렉션을 아우르는 선별된 작업물입니다.',
    filter_all: '전체',
    empty_state: '이 카테고리에는 아직 작업물이 없습니다.',
  },

  // ── 프로젝트 카테고리 목록 ────────────────────────────────────
  // ⚠️  Decap CMS config.yml 의 options 목록과 일치해야 합니다.
  categories: [
    '전체',
    '디지털 아트',
    '포토그래피',
    '브랜딩',
    '에디토리얼',
    '컨셉 아트',
    '제품 디자인',
  ],

  // ── Contact 섹션 ──────────────────────────────────────────────
  contact: {
    eyebrow: '✦  함께 만들어요',
    headline1: '새로운 프로젝트,',
    headline2: '함께 시작할까요?',
    subtext: '새 프로젝트, 크리에이티브 아이디어, 협업 제안이 있다면 언제든지 연락주세요.',
    email: 'hello@yourportfolio.com',    // ← 내 이메일로 교체
    copied_label: '복사됨 ✓',
    send_label: '이메일 보내기',
    social: [
      { label: 'GitHub',    href: 'https://github.com/yourusername' },
      { label: 'Instagram', href: 'https://instagram.com/yourusername' },
      { label: 'Behance',   href: 'https://behance.net/yourusername' },
      { label: 'LinkedIn',  href: 'https://linkedin.com/in/yourusername' },
    ],
  },

  // ── Footer ────────────────────────────────────────────────────
  footer: {
    logo: 'PORTFOLIO',
    copyright: `© ${new Date().getFullYear()} All rights reserved.`,
    social: [
      { label: 'GitHub',    href: 'https://github.com' },
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'Behance',   href: 'https://behance.net' },
    ],
  },
}
