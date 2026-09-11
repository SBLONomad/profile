import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProjectsGrid from '@/components/ProjectsGrid'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getAllProjects } from '@/lib/projects'
import { getSiteProfile } from '@/lib/profile'

export default function HomePage() {
  const projects = getAllProjects()
  const profile = getSiteProfile()

  return (
    <>
      <Header />
      <main>
        {/* Hero with rolling marquee gallery */}
        <Hero projects={projects} profile={profile} />

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
