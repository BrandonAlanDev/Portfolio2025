import ParticlesBg from 'particles-bg';

const ParticlesBackground = () => {
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 100 : 400;
  return (
    <div className="absolute w-full h-full z-0">
      <ParticlesBg
        type="cobweb"
        bg={true}
        config={{
          num: [particleCount,particleCount*2],
          rps: 0.5,
          radius: [2, 6],
          life: [2, 5],
          v: [0.5, 1.5],
          tha: [-40, 40],
          alpha: [0.3, 0.7],  // Alpha ajustado para mejor visibilidad en blanco
          scale: [1, 5],
          position: "all",
          color: ["#ffffff", "#f0f0f0", "#e6e6e6"],  // Variaciones de blanco
          cross: "true",
          random: 25,
          g: 0.5,
          body: "custom-shape",
          rotate: [0, 360],
          f: [3, 7],
          // Eliminamos la animación de color HSV para mantener el blanco
        }}
      />
    </div>
  );
};

export default ParticlesBackground;
