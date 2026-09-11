// ================================================================
// ✏️  이 파일 하나에서 사이트의 모든 텍스트를 자유롭게 수정할 수 있습니다.
//     따옴표('...') 안의 글자를 바꾸고 저장(Cmd + S)하면 즉시 반영됩니다!
// ================================================================

export const CONTENT = {

  // ── 1. 상단 헤더 ──────────────────────────────────────────────
  header: {
    logo: 'KIM DONG HYEONG',
    nav: {
      about: 'About',
      projects: 'Works',
      contact: 'Contact',
    },
  },

  // ── 2. 메인 Hero 화면 ──────────────────────────────────────────
  hero: {
    eyebrow: '✦  Performance Creative Designer',
    headline1: 'Designing visuals',
    headline2: 'that move people.',
    subtext1: 'E-commerce, beauty, campaign, and content design.',
    subtext2: 'Creative direction shaped by data, speed, and execution.',
    cta_primary: 'View Works',      // 버튼 글자
    cta_secondary: '연락하기',
  },

  // ── 3. 3D 갤러리 바로 밑 안내 텍스트 ─────────────────────────
  // (원치 않으시면 '' 로 비워두시면 사라집니다!)
  gallery_hint: '✦  마우스로 드래그하여 3D 갤러리를 회전해보세요  ✦',

  // ── 4. 질문하신 3컬럼 영역 (아이콘, 제목, 설명 완벽 수정 가능!) ──
  features: [
    {
      icon: '📈',
      title: 'Data-led\nimprovement',
      desc: 'Microsoft Clarity and A/B tests inform layouts, copy, and conversion-focused decisions.',
    },
    {
      icon: '✨',
      title: 'AI creative\nworkflow',
      desc: 'AI-generated staging cuts production time while keeping campaign visuals polished and scalable.',
    },
    {
      icon: '⚡',
      title: 'Fast commerce\nexecution',
      desc: 'Large-scale promotion pages, banners, motion assets, and detail pages built with stable speed.',
    },
  ],

  // ── 5. About (소개) 영역 ──────────────────────────────────────
  about: {
    profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", // 👈 여기에 내 사진 경로 입력 (예: "/images/profile.jpg")
    eyebrow: '✦  About',
    headline1: 'A designer who',
    headline2: 'suggests',
    highlight: 'direction',
    bio1: '김동형은 7년 이상 이커머스, 브랜드 캠페인, 뷰티 광고 소재를 만들어 온 웹/콘텐츠 디자이너입니다. 요청받은 결과물을 구현하는 데서 멈추지 않고, 레퍼런스 분석과 브랜드 맥락을 바탕으로 더 나은 비주얼 방향을 제안합니다.',
    bio2: '이랜드월드에서는 Microsoft Clarity 분석과 A/B 테스트를 통해 배너 클릭률 25% 상승, 이탈률 13% 감소 등 실제 지표 개선을 만들었습니다. 현재는 발렌라이프에서 LG생활건강, 도미나스, 리쥬란, 이자녹스, 글린트, CNP 등 뷰티 브랜드 광고 소재를 담당하며 AI 이미지 생성 프로세스를 실무에 적용하고 있습니다.',
    badge_year: '7+',
    badge_status: 'Years Experience',
    skills: [
      'Web Design', 'Commerce Campaign', 'Performance Creative', 'Detail Page',
      'Motion Banner', 'UX/UI', 'AI Image Generation', 'Creative Direction',
    ],
    stats: [
      { value: '7+',  label: 'Years' },
      { value: '25%', label: 'CTR Growth' },
      { value: '13%', label: 'Bounce Reduced' },
      { value: '70%+',  label: 'AI-assisted Ads' },
    ],
  },

  // ── 6. 프로젝트 갤러리 영역 ──────────────────────────────────
  projects: {
    eyebrow: '✦  Selected Works',
    headline1: 'Selected',
    highlight: 'Works',
    subtext: 'A curated archive of campaigns, digital content, visual systems, and brand experiences.',
    filter_all: 'All',
    empty_state: 'No works are available in this category yet.',
  },

  // 카테고리 탭 목록
  categories: [
    'All',
    'Digital Art',
    'Photography',
    'Branding',
    'Editorial',
    'Concept Art',
    'Product Design',
  ],

  // ── 7. Contact (연락처) 영역 ──────────────────────────────────
  contact: {
    eyebrow: '✦  Contact',
    headline1: 'Let’s build',
    headline2: 'better visuals.',
    subtext: '브랜드 메시지와 성과를 함께 고려하는 캠페인, 콘텐츠, 상세페이지 디자인을 함께 만들 수 있습니다.',
    email: 'ehdgud502@naver.com',    // 내 실제 이메일
    copied_label: '복사됨 ✓',
    send_label: '이메일 보내기',
    social: [
      { label: 'Portfolio', href: 'https://shiny-brioche-0b8393.netlify.app' },
      { label: 'YouTube',   href: 'https://www.youtube.com/@qwau29' },
      { label: 'GitHub',    href: 'https://github.com/SBLONomad' },
    ],
  },

  // ── 8. Footer (하단) ──────────────────────────────────────────
  footer: {
    logo: 'KIM DONG HYEONG',
    copyright: `© ${new Date().getFullYear()} All rights reserved.`,
    social: [
      { label: 'Portfolio', href: 'https://shiny-brioche-0b8393.netlify.app' },
      { label: 'YouTube',   href: 'https://www.youtube.com/@qwau29' },
      { label: 'GitHub',    href: 'https://github.com/SBLONomad' },
    ],
  },
}
