import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Project {
  slug: string
  title: string
  description: string
  category: string
  image: string
  fullImage: string
  images: string[]
  content: string
  year: string
  featured: boolean
}

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return getSampleProjects()
  }

  try {
    const fileNames = fs.readdirSync(projectsDirectory)
    const allProjectsData = fileNames
      .filter((fn) => fn.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        const images = Array.isArray(data.images)
          ? data.images
              .map((item) => {
                if (typeof item === 'string') return item
                if (item && typeof item === 'object' && 'image' in item) {
                  return String(item.image)
                }
                return ''
              })
              .filter(Boolean)
          : []

        return {
          slug,
          title: data.title || 'Untitled',
          description: data.description || '',
          category: data.category || '커머스 캠페인',
          image: data.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          fullImage: data.fullImage || data.full_image || data.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
          images,
          content: content.trim(),
          year: data.year ? String(data.year) : '2024',
          featured: data.featured !== undefined ? data.featured : true,
        } as Project
      })

    return allProjectsData.length > 0 ? allProjectsData : getSampleProjects()
  } catch (e) {
    return getSampleProjects()
  }
}

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((project) => project.slug === slug) || null
}

export function getSampleProjects(): Project[] {
  return [
    {
      slug: 'neural-landscapes',
      title: 'Neural Landscapes',
      description: '인공지능과 감각의 경계를 탐구하는 생성형 비주얼 아트워크 시리즈',
      category: 'AI 이미지',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
      images: [],
      content: 'AI와 인간 창의성이 만나는 지점에서 탄생한 비주얼 시리즈입니다.',
      year: '2024',
      featured: true,
    },
    {
      slug: 'chrome-shadow',
      title: 'Chrome & Shadow',
      description: '사이버네틱 질감과 하이 콘트라스트 조명을 활용한 오브젝트 탐구',
      category: '광고 소재',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
      images: [],
      content: '크롬 소재와 그림자의 대비를 탐구하는 에디토리얼 포토그래피 시리즈입니다.',
      year: '2024',
      featured: true,
    },
    {
      slug: 'velocity-identity',
      title: 'Velocity Mobility',
      description: '미래형 모빌리티와 자율주행 인터페이스를 위한 차세대 브랜드 시스템',
      category: '브랜딩',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=80',
      images: [],
      content: '미래형 모빌리티와 자율주행 인터페이스를 위한 브랜드 시스템입니다.',
      year: '2024',
      featured: true,
    },
    {
      slug: 'augmented-reality',
      title: 'Spatial Horizon',
      description: '현실과 가상이 중첩되는 인터랙티브 증강현실 비주얼 디렉션',
      category: 'UX/UI',
      image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=1400&q=80',
      images: [],
      content: '현실과 가상이 중첩되는 인터랙티브 증강현실 비주얼 디렉션입니다.',
      year: '2024',
      featured: true,
    },
    {
      slug: 'cyber-morphology',
      title: 'Cyber Morphology',
      description: 'SF 세계관 속 캐릭터와 사이보그 유기체 조형 컨셉 아트',
      category: 'AI 이미지',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1400&q=80',
      images: [],
      content: 'SF 세계관 속 캐릭터와 사이보그 유기체 조형 컨셉 아트입니다.',
      year: '2023',
      featured: true,
    },
    {
      slug: 'future-interface',
      title: 'Next UI System',
      description: '미니멀리즘과 햅틱 인터랙션을 결합한 차세대 하드웨어 디스플레이 디자인',
      category: '상세페이지',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80',
      images: [],
      content: '미니멀리즘과 햅틱 인터랙션을 결합한 차세대 하드웨어 디스플레이 디자인입니다.',
      year: '2024',
      featured: true,
    },
  ]
}
