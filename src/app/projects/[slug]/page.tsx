import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToWorksButton from '@/components/BackToWorksButton'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'

interface Props {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }: Props) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return {
      title: '작업물을 찾을 수 없습니다',
    }
  }

  return {
    title: `${project.title} — 포트폴리오`,
    description: project.description,
    openGraph: {
      title: `${project.title} — 포트폴리오`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const detailImages = [project.fullImage, ...project.images].filter(Boolean)
  const paragraphs = project.content
    ? project.content.split(/\n{2,}/).filter(Boolean)
    : [project.description]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-28 md:pt-36">
        <article className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
          <BackToWorksButton />

          <header className="mt-10 mb-12">
            <p className="text-neon font-mono text-xs tracking-[0.25em] uppercase mb-4">
              {project.category}{project.year && ` / ${project.year}`}
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl">
              {project.title}
            </h1>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl mt-6">
              {project.description}
            </p>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-14 items-start">
            <div className="space-y-8">
              {detailImages.map((image, index) => (
                <figure
                  key={`${image}-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
                >
                  <img
                    src={image}
                    alt={index === 0 ? project.title : `${project.title} 상세 이미지 ${index + 1}`}
                    className="w-full h-auto object-contain"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </figure>
              ))}
            </div>

            <aside className="lg:sticky lg:top-28 space-y-8">
              <div className="border-t border-white/10 pt-6">
                <p className="text-muted-2 font-mono text-xs uppercase tracking-[0.2em] mb-3">
                  작업 소개
                </p>
                <div className="space-y-4 text-sm md:text-base text-zinc-300 leading-relaxed">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                {project.year && <div>
                  <dt className="text-muted-2 text-xs font-mono uppercase mb-1">연도</dt>
                  <dd className="text-white text-sm">{project.year}</dd>
                </div>}
                <div>
                  <dt className="text-muted-2 text-xs font-mono uppercase mb-1">분류</dt>
                  <dd className="text-white text-sm">{project.category}</dd>
                </div>
              </dl>
            </aside>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
