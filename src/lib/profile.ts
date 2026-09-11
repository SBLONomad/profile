import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface SiteProfile {
  name: string
  tagline: string
  bio: string
  email: string
  github: string
  instagram: string
  behance: string
}

const profilePath = path.join(process.cwd(), 'content/settings/profile.md')

export function getSiteProfile(): SiteProfile {
  const fallback: SiteProfile = {
    name: '김동형',
    tagline: 'Performance Creative Designer',
    bio: '7년 이상 이커머스, 브랜드 캠페인, 뷰티 광고 소재를 만들어 온 웹/콘텐츠 디자이너입니다.',
    email: 'ehdgud502@naver.com',
    github: 'https://github.com/SBLONomad',
    instagram: '',
    behance: '',
  }

  if (!fs.existsSync(profilePath)) {
    return fallback
  }

  try {
    const fileContents = fs.readFileSync(profilePath, 'utf8')
    const { data } = matter(fileContents)

    return {
      name: data.name || fallback.name,
      tagline: data.tagline || fallback.tagline,
      bio: data.bio || fallback.bio,
      email: data.email || fallback.email,
      github: data.github || fallback.github,
      instagram: data.instagram || fallback.instagram,
      behance: data.behance || fallback.behance,
    }
  } catch (e) {
    return fallback
  }
}
