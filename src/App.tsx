import './App.css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Canvas } from '@react-three/fiber'
import { OrbitControls} from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useLoader} from '@react-three/fiber'
import { Suspense } from 'react'
import ParticlesBackground from './components/ParticlesBackground'
import Navbar from './components/Navbar'
import CSharp from './assets/img/logos/csharp.png'
import Javascript from './assets/img/logos/javascript.png'
import Java from './assets/img/logos/java.png'
import MsSql from './assets/img/logos/mssql.png'
import MySql from './assets/img/logos/mysql.png'
import React from './assets/img/logos/react.png'
import DotNet from './assets/img/logos/dotnet.png'
import Angular from './assets/img/logos/angular.png'
import Springboot from './assets/img/logos/springboot.png'
import CVEs from './assets/pdf/CVBrandonCarabajalEspañol.pdf'
import CVEn from './assets/pdf/CVBrandonCarabajalEnglish.pdf'
import Avatar from '@mui/material/Avatar'
import {GitHub,LinkedIn} from '@mui/icons-material'
import ProyectIMG1 from './assets/img/projects/Proyect1.png'
import ProyectIMG2 from './assets/img/projects/Proyect2.png'
import ProyectIMG3 from './assets/img/projects/Proyect3.png'
import ProyectIMG4 from './assets/img/projects/Proyect4.png'
import ProyectIMG5 from './assets/img/projects/Proyect5.png'
import * as THREE from 'three'

const Section = ({ id, title, children, dark }: { id: string, title: string, children: React.ReactNode, dark: boolean }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id={id} className={`min-h-screen w-full py-20 px-8 md:px-20 flex flex-col items-center ${(!dark)?'bg-linear-to-br from-white to-gray-200':'bg-linear-to-tr from-black to-gray-800'}`}>
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

interface ModelProps {
  srcModel: string
  position?: [number, number, number]
  rotation?: [number, number, number]
}

interface ThreeTorusProps {
  estilo?: string
  srcModel?: string
}

const Model = ({ srcModel }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, srcModel)
  
  const bbox = new THREE.Box3().setFromObject(gltf.scene)
  const size = bbox.getSize(new THREE.Vector3())
  
  return (
    <primitive 
      object={gltf.scene} 
      scale={[10,10,10]}
      position={[0, -size.y+(size.y), 0]} // Centrado vertical
      rotation={[0, Math.PI, 0]}
    />
  )
}

const ThreeTorus = ({ estilo = "", srcModel }: ThreeTorusProps) => (
  <div 
    className={`relative ${estilo}`}
    style={{
      minWidth: 250,
      minHeight: 250,
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}
  >
    <Canvas
      style={{
        width: '100%',
        height: '100%',
        minHeight: 250,
        minWidth: 250,
        touchAction: 'none'
      }}
      gl={{ antialias: true }}
      camera={{
        position: [0, 0, 15],
        fov: 45,
        near: 0.1,
        far: 1000
      }}
    >
      <ambientLight intensity={4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      
      <Suspense fallback={null}>
        {srcModel ? (
          <Model srcModel={srcModel} />
        ) : (
          <mesh scale={[1.5, 1.5, 1.5]}>
            <torusGeometry args={[3, 1, 16, 100]} />
            <meshStandardMaterial 
              color="#ffc400"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        )}
      </Suspense>

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={2}
        minDistance={10}
        maxDistance={20}
      />
    </Canvas>
  </div>
)

const logos = [
  Javascript,
  CSharp,
  Java,
  React,
  Angular,
  DotNet,
  Springboot,
  MsSql,
  MySql,
];
const Copy = (texto : any) => {
  navigator.clipboard.writeText(texto)
    .then(() => alert("Texto copiado al portapapeles"))
    .catch((err) => console.error("Error al copiar el texto: ", err));
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home')
  useEffect(() => {
    const canvases = document.querySelectorAll("canvas");
    canvases.forEach(canvas => {
      if(!canvas.classList.contains("particles-bg-canvas-self")){
        canvas.style.minHeight = "250px";
        canvas.style.width = "240px";
      }
    });
  }, []);

  return (
    <div className="bg-white text-black align-middle justify-center items-center">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <section id="home" className="relative w-[100vw] min-h-screen h-auto flex flex-col items-center justify-center align-middle select-none gap-5 pt-[70px] pb-2">
        <ParticlesBackground />
        <div className="inset-0 flex flex-col lg:flex-row items-center justify-evenly text-left min-h-[75vh] min-w-[100vw] sm:min-w-[90vw] md:min-w-[80vw] max-w-[100vw] bg-linear-to-br from-black to-gray-800 rounded-2xl p-4 gap-5 mx-auto">
          <div className="text-center z-10">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-6xl md:text-8xl font-bold mt-4 mb-4 text-white"
            >
              <ThreeTorus srcModel='./models/BuhoBlancoTJS.glb'/>
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-3xl md:text-6xl lg:text-8xl font-bold mt-4 mb-4 text-white"
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
              <a href={CVEs} target='_blank' className='bg-transparent border-2 border-white transition-all hover:shadow-md hover:shadow-white hover:cursor-pointer hover:bg-white hover:text-gray-900 px-2 py-1 rounded-full ' >CV 🇪🇸</a>
              <a href={CVEn} target='_blank' className='bg-transparent border-2 border-white transition-all hover:shadow-md hover:shadow-white hover:cursor-pointer hover:bg-white hover:text-gray-900 px-2 py-1 rounded-full ' >CV 🇺🇸</a>
              <a href='https://github.com/BrandonAlanDev' target='_blank' className='bg-transparent border-2 border-white transition-all hover:shadow-md hover:shadow-white hover:cursor-pointer hover:bg-white hover:text-gray-900 px-2 py-1 rounded-full '><GitHub/></a>
              <a href='https://www.linkedin.com/in/brandon-alan-carabajal-97b294223/' target='_blank' className='bg-transparent border-2 border-white transition-all hover:shadow-md hover:shadow-white hover:cursor-pointer hover:bg-white hover:text-gray-900 px-2 py-1 rounded-full '><LinkedIn/></a>
            </motion.p>
            </div>
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
          <img src="https://avatars.githubusercontent.com/u/130699120?v=4" alt="Brandon Carabajal" className=' z-10 rounded-2xl shadow-md shadow-white'/>
          </div>
        </div>
      </Section>

      <ParticlesBackground />
      <Section id="projects" title="Proyectos" dark={false}>
        <div className="flex flex-col w-[90vw] items-center gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col md:flex-row items-center gap-8'>
                <img src={ProyectIMG1} className='w-[200px] '/>
                <div className='items-center w-full'>
                  <h3 className="text-xl font-bold mb-4">Finales Hilet </h3>
                  <div className='flex flex-col'>
                    <p><strong>Rol: </strong>Desarrollador Front-End</p>
                    <p><strong>Metodología: </strong>SCRUM (Enero 2024 - Diciembre 2024)</p>
                    <p><strong>Tecnologías: </strong>React, JavaScript, Fetch, API Rest, SQL, Dapper, ASP.NET, GIT, TRELLO.</p>
                    <p><strong>Descripción: </strong>
                    Desarrollé la interfaz de usuario para una aplicación web que permite a los estudiantes inscribirse en los exámenes finales.
                    Colaboré estrechamente con el equipo de back-end para integrar las API REST y asegurar una experiencia de usuario fluida.
                    Utilicé React para crear componentes reutilizables y gestioné el estado de la aplicación para garantizar la coherencia y eficiencia.
                    Participé en reuniones SCRUM diarias y en la planificación de sprints para coordinar el progreso del proyecto.</p>
                  </div>
                  <hr className='my-2' />
                  <div className="flex flex-wrap w-full items-end justify-between gap-4">
                    <div className='flex flex-row gap-5'>
                      <Avatar alt="JS logo" src={Javascript} />
                      <Avatar alt="React logo" src={React} />
                      <Avatar alt="C Sharp logo" src={CSharp} />
                      <Avatar alt=".NET logo" src={DotNet} />
                      <Avatar alt="SQL Server logo" src={MsSql} />
                    </div>
                    <a href="https://github.com/BrandonAlanDev/frontend-hilet.git" className='rounded-full border-white border-2 p-1' target='_blank'><GitHub sx={{ fontSize: '40px' }} /> Publico</a>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col md:flex-row items-center gap-8'>
                <img src={ProyectIMG2} className='w-[200px] h-[200px] '/>
                <div className='items-center w-full'>
                  <h3 className="text-xl font-bold mb-4">Sistema de gestion : Finca Sagrado Corazon</h3>
                  <div className='flex flex-col'>
                    <p><strong>Rol: </strong>Desarrollador Full-Stack Independiente por encargo (Febrero 2023 - Julio 2023)</p>
                    <p><strong>Metodología: </strong>Cascada</p>
                    <p><strong>Tecnologías: </strong> WPF, C# .NET, Microsoft SQL Server.</p>
                    <p><strong>Descripción: </strong>
                    Diseñé y desarrollé una aplicación de escritorio para gestionar las operaciones de un taller de arte, incluyendo la gestión de alumnos, cursos y materiales.
                    Implementé funcionalidades de Alta, Baja, Modificación y Listado (ABML) utilizando WPF para la interfaz de usuario y Microsoft SQL Server para la base de datos.
                    El proyecto abarcó desde el diseño de la base de datos hasta la implementación y pruebas de la aplicación.</p>
                  </div>
                  <hr className='my-2' />
                  <div className="flex flex-wrap w-full items-end justify-between gap-4">
                    <div className='flex flex-row gap-5'>
                      <Avatar alt="C Sharp logo" src={CSharp} />
                      <Avatar alt=".NET logo" src={DotNet} />
                      <Avatar alt="SQL Server logo" src={MsSql} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col md:flex-row items-center gap-8'>
                <img src={ProyectIMG5} className='w-[200px] h-[200px] '/>
                <div className='items-center w-full'>
                  <h3 className="text-xl font-bold mb-4">Gestion de Catalogo de Vehiculos (Proyecto Final de Ingenieria de Software)</h3>
                  <div className='flex flex-col'>
                    <p><strong>Rol: </strong>Desarrollador Full-Stack (Noviembre - Diciembre 2024)</p>
                    <p><strong>Tecnologías: </strong> Java, Springboot, AngularJS, Mave, JPA Hibernate, Apache, MySQL, JavaScript, Bootstrap 5, HTML, CSS.</p>
                    <p><strong>Descripción: </strong>
                    Diseñe y desarrolle una aplicacion con Java Springbooot + Angular, que permite gestionar con un formulario, un catalogo de vehiculos (subir, modificar o eliminar).
                    </p>
                  </div>
                  <hr className='my-2' />
                  <div className="flex flex-wrap w-full items-end justify-between gap-4">
                    <div className='flex flex-row gap-5'>
                      <Avatar alt="Java logo" src={Java} />
                      <Avatar alt="Springboot logo" src={Springboot} />
                      <Avatar alt="Angular logo" src={Angular} />
                      <Avatar alt="JavaScript logo" src={Javascript} />
                      <Avatar alt="MySQL Logo" src={MySql} />
                    </div>
                    <a href="https://github.com/BrandonAlanDev/Auto-Angular-Springboot.git" className='rounded-full border-white border-2 p-1' target='_blank'><GitHub sx={{ fontSize: '40px' }} /> Publico</a>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col md:flex-row items-center gap-8'>
                <img src={ProyectIMG3} className='w-[200px] h-[200px] '/>
                <div className='items-center w-full'>
                  <h3 className="text-xl font-bold mb-4">Drag & Drop Tier list Maker de libros</h3>
                  <div className='flex flex-col'>
                    <p><strong>Rol: </strong>Desarrollo Independiente privado (Febrero 2025)</p>
                    <p><strong>Tecnologías: </strong> JavaScript, TailwindCSS, HTML, CSS.</p>
                    <p><strong>Descripción: </strong>
                    Diseñe y desarrolle una aplicacion drag and drop para crear Tier list completamente editable y con posibilidad de descargar el resultado.</p>
                  </div>
                  <hr className='my-2' />
                  <div className="flex flex-wrap w-full items-end justify-between gap-4">
                    <div className='flex flex-row gap-5'>
                      <Avatar alt="JavaScript logo" src={Javascript} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col md:flex-row items-center gap-8'>
                <img src={ProyectIMG4} className='w-[200px] h-[200px] '/>
                <div className='items-center w-full'>
                  <h3 className="text-xl font-bold mb-4">Girar Ruleta (WEB APP)</h3>
                  <div className='flex flex-col'>
                    <p><strong>Rol: </strong>Desarrollo Independiente privado (Diciembre 2022)</p>
                    <p><strong>Tecnologías: </strong> JavaScript, TailwindCSS, HTML, CSS.</p>
                    <p><strong>Descripción: </strong>
                    Diseñe y desarrolle una aplicacion de una ruleta con posibilidad de añadir elementos o eliminarlos, girar la ruleta, indicando un ganador al cual se le puede 
                    preservar o eliminar de la misma lista.</p>
                  </div>
                  <hr className='my-2' />
                  <div className="flex flex-wrap w-full items-end justify-between gap-4">
                    <div className='flex flex-row gap-5'>
                      <Avatar alt="JavaScript logo" src={Javascript} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
        </div>
      </Section>

      <Section id="contact" title="Contacto" dark={true}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[80vw] lg:-[65vw] bg-black text-white rounded-2xl p-6 mb-4 hover:shadow-xl transition-shadow border-2 hover:border-gray-500 hover:bg-gradient-to-tr hover:from-black hover:to-gray-500 z-40"
            >
              <div className='flex flex-col md:flex-row items-center gap-8  font-bold '>
                <img src="https://avatars.githubusercontent.com/u/130699120?v=4" className='w-[200px] h-[200px]  rounded-2xl'/>
                <div className='flex-col items-center w-full'>
                  <h2 className='text-2xl mb-4'>Contacto directo</h2>
                  <div className='items-center w-full'>
                    <h3 className="text-xl font-bold mb-2">E-Mail</h3>
                    <div className='flex flex-row w-full justify-between items-center'>
                      <p >Brandoncarabajal@gmail.com</p>
                      <button className='border-white border-2 p-2 rounded-full cursor-pointer' onClick={()=>{Copy('Brandoncarabajal@gmail.com');}}>Copiar</button>
                    </div>
                    <hr className='my-2' />
                    <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                    <div className='flex flex-row w-full justify-between items-center'>
                      <p >+542236686159 </p>
                      <button className='border-white border-2 p-2 rounded-full cursor-pointer' onClick={()=>{Copy('+542236686159');}}>Copiar</button>
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
                  <a href='https://www.linkedin.com/in/brandon-alan-carabajal-97b294223/' target='blank_' className='flex-col items-center justify-center text-center w-full p-4 border-2 border-white rounded-xl hover:bg-gradient-to-tr hover:from-gray-400 hover:to-gray-900 transition-all duration-200 hover:cursor-pointer'>
                    <p><LinkedIn sx={{ fontSize: '200px' }} /></p>
                    <p>Brandon Alan Carabajal</p>
                  </a>
                  <a href='https://github.com/BrandonAlanDev' target='blank_' className='flex-col items-center justify-center text-center w-full p-4 border-2 border-white rounded-xl hover:bg-gradient-to-tr hover:from-gray-400 hover:to-gray-900 transition-all duration-200 hover:cursor-pointer'>
                    <p><GitHub sx={{ fontSize: '200px' }} /></p>
                    <p>BrandonAlanDev</p>
                  </a>
                </div>
              </div>
          </motion.div>
      </Section>
    </div>
  )
}

export default App