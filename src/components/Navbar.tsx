import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (section: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const links = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'contact', label: 'Contacto' }
  ]

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link.id))
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            setActiveSection(section.id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed w-full z-50 bg-linear-to-br from-black to-gray-800 text-white backdrop-blur-sm font-bold">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold select-none"
          >
            BrandonAlanDev
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-1 rounded-full transition-shadow hover:shadow-md hover:shadow-white ${
                  activeSection === link.id 
                    ? 'text-black bg-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? (
        <XMarkIcon className="h-6 w-6" />
        ) : (
        <Bars3Icon className="h-6 w-6" />
        )}

          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4"
          >
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-gray-300 hover:text-amber-300"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar