import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import BADIcon from '../assets/img/logos/BADclean.webp'

const translations = {
  en: {
    home: 'Home',
    about: 'About Me',
    projects: 'Projects',
    contact: 'Contact',
    toggleLang: 'ES',
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    projects: 'Proyectos',
    contact: 'Contacto',
    toggleLang: 'EN',
  }
}

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
}

const Navbar = ({ activeSection, setActiveSection, language, setLanguage }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  useEffect(() => {
    const userLang = navigator.language.startsWith('es') ? 'es' : 'en'
    setLanguage(userLang)
  }, [])

  const labels = translations[language]

  const links = [
    { id: 'home', label: labels.home },
    { id: 'about', label: labels.about },
    { id: 'projects', label: labels.projects },
    { id: 'contact', label: labels.contact }
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
  }, [links])

  return (
    <nav className="fixed w-full z-50 bg-linear-to-br from-black to-gray-800 text-white backdrop-blur-sm font-bold">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold select-none flex flex-row"
          >
            <img src={BADIcon} alt="LOGO" className='logo' />
            BrandonAlanDev
          </motion.div>

          <div className="hidden md:flex space-x-4 items-center">
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

            {/* Botón para cambiar idioma */}
            <button
              onClick={toggleLanguage}
              className="text-gray-300 hover:text-white border px-2 py-1 rounded-full transition-shadow hover:shadow-md hover:shadow-white"
            >
              {language.toUpperCase()}
            </button>
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
            <button
              onClick={toggleLanguage}
              className="block text-left text-gray-300 hover:text-amber-300 border-2 p-2 rounded-full"
            >
              {language.toUpperCase()}
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
