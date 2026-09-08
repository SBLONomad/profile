import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Project {
  slug: string
  title: string
  description: string
  category: string
  image: string
  year: string
  featured: boolean
}

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export function getAllProjects(): Project[] {
  // Return sample data if directory doesn't exist yet
  if (!fs.existsSync(projectsDirectory)) {
    return getSampleProjects()
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjectsData = fileNames
    .filter((fn) => fn.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        category: data.category || 'Design',
        image: data.image || '/images/placeholder.jpg',
        year: data.year || '2024',
        featured: data.featured || false,
      } as Project
    })

  return allProjectsData.length > 0 ? allProjectsData : getSampleProjects()
}

function getSampleProjects(): Project[] {
  return [
    {
      slug: 'visual-identity-01',
      title: 'Neural Landscapes',
      description: 'AI-generated visual explorations of digital consciousness and synthetic environments',
      category: 'Digital Art',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      year: '2024',
      featured: true,
    },
    {
      slug: 'motion-study-02',
      title: 'Chrome & Shadow',
      description: 'High-contrast editorial photography series exploring material and light',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80',
      year: '2024',
      featured: true,
    },
    {
      slug: 'brand-system-03',
      title: 'Velocity',
      description: 'Brand identity for a next-generation mobility startup',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
      year: '2023',
      featured: false,
    },
    {
      slug: 'editorial-04',
      title: 'Augmented Reality',
      description: 'Visual narrative series exploring the boundaries between physical and digital',
      category: 'Editorial',
      image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80',
      year: '2024',
      featured: true,
    },
    {
      slug: 'concept-05',
      title: 'Cyber Morphology',
      description: 'Character design and world-building for a speculative fiction universe',
      category: 'Concept Art',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&q=80',
      year: '2023',
      featured: false,
    },
    {
      slug: 'product-06',
      title: 'Future Form',
      description: 'Industrial design concepts for autonomous vehicle interfaces',
      category: 'Product Design',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
      year: '2024',
      featured: false,
    },
  ]
}
