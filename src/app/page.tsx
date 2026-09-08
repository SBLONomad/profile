import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProjectsGrid from '@/components/ProjectsGrid'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getAllProjects } from '@/lib/projects'

export default function HomePage() {
  const projects = getAllProjects()

  return (
    <>
      <Header />
      <main>
        {/* Hero with rolling marquee gallery */}
        <Hero projects={projects} />

        {/* About section */}
        <About />

        {/* Projects grid with filter */}
        <ProjectsGrid projects={projects} />

        {/* Contact */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
