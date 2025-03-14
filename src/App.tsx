import './App.css'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Torus, PerspectiveCamera } from '@react-three/drei'
import ParticlesBackground from './components/ParticlesBackground'
import Navbar from './components/Navbar'
import Image from './assets/img/Brandon-BN.png'
import CSharp from './assets/img/logos/csharp.png'
import Javascript from './assets/img/logos/javascript.png'
import Java from './assets/img/logos/java.png'
import MsSql from './assets/img/logos/mssql.png'
import MySql from './assets/img/logos/mysql.png'
import React from './assets/img/logos/react.png'
import DotNet from './assets/img/logos/dotnet.png'
import CVEs from './assets/pdf/Brandon-CV-Español-2025.pdf'
import CVEn from './assets/pdf/BrandonCV-English-2025.pdf'

const Section = ({ id, title, children, dark }: { id: string, title: string, children: React.ReactNode, dark: boolean }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id={id} className={`min-h-screen py-20 px-8 md:px-20 flex flex-col items-center ${(!dark)?'bg-linear-to-br from-white to-gray-200':'bg-linear-to-tr from-black to-gray-800'}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r ${(!dark)? 'from-gray-900 to-gray-800':'from-gray-200 to-gray-500'}`}>
          {title}
        </h2>
      </motion.div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay:1 , duration: 1 }}
        className="mx-auto"
      >
        {children}
      </motion.div>
    </section>
  )
}

const ThreeTorus = ({estilo=""}) => (
  <Canvas className={`absolute w-full h-full select-none ${estilo} `}>
    <ambientLight intensity={4} />
    <pointLight position={[1, 1, 1]} intensity={1} />
    <PerspectiveCamera
      position={[0, 0, 15]}
      fov={50}
      makeDefault
    />
    <Torus args={[3, 1, 15, 50]} rotation={[Math.PI / 1, 0, 0]} position={[1, 1, 1]}>
      <meshStandardMaterial 
        color="#ffc400" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#000000"
      />
    </Torus>
    <OrbitControls 
      enableZoom={false} 
      enablePan={false}
      enableRotate={false}
      autoRotate 
      autoRotateSpeed={5}
    />
  </Canvas>
)

const logos = [
  Javascript,
  CSharp,
  Java,
  React,
  DotNet,
  MsSql,
  MySql,
];

const App = () => {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="bg-white text-black">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <section id="home" className="relative min-h-screen h-auto flex flex-col items-center justify-center select-none gap-5 pt-[70px] pb-2">
        <ParticlesBackground />
        <div className="inset-0 flex flex-col lg:flex-row items-center justify-evenly text-left min-h-[75vh] min-w-full sm:min-w-[90vw] md:min-w-[80vw] bg-linear-to-br from-black to-gray-800 rounded-2xl p-4 gap-5">
          <div className="text-center z-10">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-6xl md:text-8xl font-bold mt-4 mb-4 text-white"
            >
              Brandon Alan Carabajal
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-4xl text-white mt-2"
            >
              Analista de Sistemas
            </motion.p>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-4xl text-white mt-2"
            >
              Desarrollador de Software
            </motion.p>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-xl text-white mt-4 flex flex-row justify-center gap-5"
              >
              <a href={CVEs} target='_blank' className='bg-transparent border-2 border-white transition-all hover:shadow-md hover:shadow-white hover:cursor-pointer hover:bg-white hover:text-gray-900 px-2 py-1 rounded-full ' >CV Español</a>
              <a href={CVEn} target='_blank' className='bg-transparent border-2 border-white transition-all hover:shadow-md hover:shadow-white hover:cursor-pointer hover:bg-white hover:text-gray-900 px-2 py-1 rounded-full ' >CV Ingles</a>
              <a href='https://github.com/BrandonAlanDev' target='_blank' className='bg-transparent border-2 border-white transition-all hover:shadow-md hover:shadow-white hover:cursor-pointer hover:bg-white hover:text-gray-900 px-2 py-1 rounded-full '>GitHub</a>
              <a href='https://www.linkedin.com/in/brandon-alan-carabajal-97b294223/' target='_blank' className='bg-transparent border-2 border-white transition-all hover:shadow-md hover:shadow-white hover:cursor-pointer hover:bg-white hover:text-gray-900 px-2 py-1 rounded-full '>LinkedIn</a>
            </motion.p>
          </div>
          <img src={Image} alt="Brandon Carabajal" className='h-[50vh] z-10 rounded-2xl shadow-md shadow-white'/>
        </div>
        <div className="relative inset-0 flex items-center justify-center w-full h-[8vh] overflow-hidden bg-gradient-to-tr from-gray-400 to-transparent rounded-2xl px-4">
          <div className="absolute flex animate-infinite-slide gap-8 whitespace-nowrap">
          {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Logo"
              className="h-[6vh] max-w-[120px] flex-shrink-0"
            />
          ))}
        </div>
      </div>
      </section>

      <Section id="about" title="Sobre mí" dark={true}>
        <div className='flex flex-col lg:flex-row justify-between p-4 gap-5 items-center'>
          <p className="text-gray-200 text-xl font-bold shadow-white leading-relaxed flex-col text-left">
            <div>👋 ¡Hola! Soy Brandon Alan Carabajal, un desarrollador de software apasionado por la tecnología y la innovación.</div>
            <div>Tengo 25 Años y soy de Mar del Plata - Argentina 🌊</div>
            <div>Desde 2021 me he dedicado a crear soluciones digitales utilizando múltiples herramientas y lenguajes de programación.</div>
            <div>En 2022 inicié la carrera de Analista de Sistemas en el Instituto Argentino de la Empresa (HILET), y me gradué en diciembre de 2024.</div>
            <div className='my-4' />
            <div className='text-2xl mb-2'>💡 ¿Qué me define?</div>
            <div>✔️ Experiencia Full Stack: Desarrollo aplicaciones con .NET, React y SQL.</div>
            <div>✔️ Lenguajes principales: C#, JavaScript y Java.</div>
            <div>✔️ Trabajo en equipo: Uso metodologías ágiles como SCRUM, Git y herramientas de gestión como Trello.</div>
            <div>✔️ Mentalidad de aprendizaje continuo: Siempre en busca de nuevos desafíos y oportunidades para mejorar mis habilidades.</div>
            <div className='my-4' />
            <div>🚀 Mi objetivo es formar parte de equipos de desarrollo dinámicos, contribuir con soluciones eficientes y seguir creciendo profesionalmente en el mundo del software.</div>
          </p>
          <div>
          <ThreeTorus />
          </div>
        </div>
      </Section>

      <ParticlesBackground />
      <Section id="projects" title="Proyectos" dark={false}>
        <div className="flex flex-col w-[90vw] items-center gap-8">
          {[1, 2, 3, 4].map((item) => (
            <motion.div 
              key={item}
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col md:flex-row items-center gap-8'>
                <img src={Java} className='w-[200px] h-[200px] '/>
                <div className='items-center w-full'>
                  <h3 className="text-xl font-bold mb-4">Proyecto {item}</h3>
                  <p >Descripción del proyecto...</p>
                  <hr className='my-2' />
                  <div className="flex w-full items-end justify-end"><button className='border-white border-2 p-2 rounded-full cursor-pointer'>Github code</button></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contacto" dark={true}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 mb-4 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col md:flex-row items-center gap-8  font-bold '>
                <img src={Image} className='w-[200px] h-[200px]  rounded-2xl'/>
                <div className='flex-col items-center w-full'>
                  <h2 className='text-2xl mb-4'>Contacto directo</h2>
                  <div className='items-center w-full'>
                    <h3 className="text-xl font-bold mb-2">E-Mail</h3>
                    <div className='flex flex-row w-full justify-between items-center'>
                      <p >Brandoncarabajal@gmail.com</p>
                      <button className='border-white border-2 p-2 rounded-full cursor-pointer'>Copiar</button>
                    </div>
                    <hr className='my-2' />
                    <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                    <div className='flex flex-row w-full justify-between items-center'>
                      <p >+542236686159 </p>
                      <button className='border-white border-2 p-2 rounded-full cursor-pointer'>Copiar</button>
                    </div>
                    <hr className='my-2' />
                  </div>
                </div>
              </div>
          </motion.div>
          <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col items-center gap-8  font-bold '>
                <h2 className='text-2xl mb-4'>Redes</h2>
                <div className='flex flex-col md:flex-row items-center gap-8  font-bold '>
                <img src={Image} className='w-[200px] h-[200px]  rounded-2xl'/>
                <div className='flex-col items-center w-full'>
                  <div className='items-center w-full'>
                    <h3 className="text-xl font-bold mb-2">E-Mail</h3>
                    <div className='flex flex-row w-full justify-between items-center'>
                      <p >Brandoncarabajal@gmail.com</p>
                      <button className='border-white border-2 p-2 rounded-full cursor-pointer'>Copiar</button>
                    </div>
                    <hr className='my-2' />
                    <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                    <div className='flex flex-row w-full justify-between items-center'>
                      <p >+542236686159 </p>
                      <button className='border-white border-2 p-2 rounded-full cursor-pointer'>Copiar</button>
                    </div>
                    <hr className='my-2' />
                  </div>
                </div>
                </div>
              </div>
          </motion.div>
      </Section>
    </div>
  )
}

export default App