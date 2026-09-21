import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProjectsGrid from '@/components/ProjectsGrid'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WaveBackdrop from '@/components/WaveBackdrop'
import { getAllProjects } from '@/lib/projects'
import { getSiteProfile } from '@/lib/profile'

export default function HomePage() {
  const projects = getAllProjects()
  const profile = getSiteProfile()

  return (
    <>
      <WaveBackdrop />
      <Header />
      <main className="site-shell">
        {/* Hero with rolling marquee gallery */}
        <Hero projects={projects} />

        {/* About section */}
        <About profile={profile} />

        {/* Projects grid with filter */}
        <ProjectsGrid projects={projects} />

        {/* Contact */}
        <Contact profile={profile} />
      </main>
      <Footer />
    </>
  )
}
