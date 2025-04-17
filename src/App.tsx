import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stars from './components/Stars';
import AudioPlayer from './components/AudioPlayer';
import WelcomePopup from './components/WelcomePopup';
import './App.css';

interface Message {
  text: string;
  isLast: boolean;
}

interface CelestialObject {
  id: number;
  type: 'star' | 'moon' | 'planet' | 'constellation' | 'comet';
  x: string;
  y: string;
  size: string;
  message: Message;
  color: string;
  imageUrl?: string;
  shape?: 'circle' | 'star' | 'crescent' | 'ring';
  rotation?: number;
}

const celestialObjects: CelestialObject[] = [
  {
    id: 1,
    type: 'star',
    x: '15%',
    y: '25%',
    size: 'min(60px, 15vw)',
    color: 'rgba(147, 112, 219, 0.3)',
    shape: 'crescent',
    imageUrl: '/primer_dia.jpg',
    message: { text: 'Jamás me arrepentí...\nPorque te conocí. Acá comenzó algo', isLast: false }
  },
  {
    id: 2,
    type: 'moon',
    x: '75%',
    y: '35%',
    size: 'min(100px, 20vw)',
    color: 'rgba(176, 196, 222, 0.3)',
    shape: 'crescent',
    imageUrl: '/chimbita.jpg',
    message: { text: 'Tod@s tan chimbas, pero tú tan "mi chimbita" 💚', isLast: false }
  },
  {
    id: 3,
    type: 'star',
    x: '45%',
    y: '65%',
    size: 'min(80px, 18vw)',
    color: 'rgba(230, 230, 250, 0.3)',
    shape: 'star',
    imageUrl: '/ultimo_dia.jpg',
    message: { text: 'El último día... ufff menos mal que no fue el último', isLast: false }
  },
  {
    id: 4,
    type: 'star',
    x: '85%',
    y: '20%',
    size: 'min(50px, 12vw)',
    color: 'rgba(255, 223, 186, 0.3)',
    shape: 'star',
    imageUrl: '/dtmf.jpg',
    rotation: 45,
    message: { text: 'Tantas fotos, ni sé de donde salen.\nLo mejor es que puedo repetirlas y es como si las viera por primera vez', isLast: false }
  },
  {
    id: 5,
    type: 'constellation',
    x: '20%',
    y: '80%',
    size: 'min(120px, 25vw)',
    color: 'rgba(135, 206, 235, 0.3)',
    shape: 'circle',
    imageUrl: '/valiente.jpg',
    message: { text: 'Le sonreí tanto tonto a la pantalla cuando vi que ibas conmigo ese día.\nNunca fui tan valiente, contigo se siente diferente', isLast: false }
  },
  {
    id: 6,
    type: 'comet',
    x: '65%',
    y: '15%',
    size: 'min(70px, 15vw)',
    color: 'rgba(255, 182, 193, 0.3)',
    shape: 'ring',
    imageUrl: '/primer.jpg',
    message: { text: 'No puede ser que me maree tan fácil, debe ser el efecto de tenerte cerca.\nNunca se me habian alborotado tanto las hormonas', isLast: false }
  },
  {
    id: 7,
    type: 'planet',
    x: '35%',
    y: '70%',
    size: 'min(90px, 20vw)',
    color: 'rgba(144, 238, 144, 0.3)',
    shape: 'circle',
    imageUrl: '/ceniza.jpg',
    message: { text: 'También tenemos un lado espiritual, quien diría que vamos a misa de vez en cuando', isLast: false }
  },
  {
    id: 8,
    type: 'star',
    x: '35%',
    y: '25%',
    size: 'min(65px, 14vw)',
    color: 'rgba(255, 218, 185, 0.3)',
    shape: 'star',
    imageUrl: '/morados.jpg',
    message: { text: 'Los labios piden más sin importar las consecuencias. Un morado en los labios no es tran grave', isLast: false }
  },
  {
    id: 9,
    type: 'constellation',
    x: '80%',
    y: '75%',
    size: 'min(95px, 22vw)',
    color: 'rgba(216, 191, 216, 0.3)',
    shape: 'circle',
    imageUrl: '/puedo.jpg',
    message: { text: 'Un día interesante ¿PUEDES recordarlo?', isLast: false }
  },
  {
    id: 10,
    type: 'planet',
    x: '10%',
    y: '40%',
    size: 'min(85px, 18vw)',
    color: 'rgba(173, 216, 230, 0.3)',
    shape: 'circle',
    imageUrl: '/ns.jpg',
    message: { text: 'N&S de No me Sueltes, como la canción de Rauw ¿O significa otra cosa?', isLast: false }
  },
  {
    id: 11,
    type: 'star',
    x: '90%',
    y: '50%',
    size: 'min(55px, 13vw)',
    color: 'rgba(221, 160, 221, 0.3)',
    shape: 'star',
    imageUrl: '/session.jpg',
    rotation: -30,
    message: { text: 'Esta session es mejor que cualquiera de BZRP, no importa que sean cosas diferentes', isLast: false }
  },
  {
    id: 12,
    type: 'moon',
    x: '30%',
    y: '10%',
    size: 'min(75px, 16vw)',
    color: 'rgba(176, 224, 230, 0.3)',
    shape: 'crescent',
    imageUrl: '/cita.jpg',
    message: { text: 'Una bonita cita que no planeamos, un feo servicio que nos obligaron a pagar', isLast: false }
  },
  {
    id: 13,
    type: 'planet',
    x: '50%',
    y: '85%',
    size: 'min(70px, 15vw)',
    color: 'rgba(255, 192, 203, 0.3)',
    shape: 'ring',
    imageUrl: '/ojitos.jpg',
    rotation: 60,
    message: { text: 'Que bendición que esos ojos me vean a mi', isLast: false }
  },
  {
    id: 14,
    type: 'star',
    x: '70%',
    y: '30%',
    size: 'min(65px, 14vw)',
    color: 'rgba(230, 230, 250, 0.3)',
    shape: 'crescent',
    imageUrl: '/imposible.jpg',
    message: { text: 'No puedo sonreir hacia abajo porque eso sería como estar triste, y si estoy contigo, eso es imposible', isLast: false }
  },
  {
    id: 15,
    type: 'star',
    x: '35%',
    y: '45%',
    size: 'min(95px, 20vw)',
    color: 'rgba(176, 196, 222, 0.3)',
    shape: 'star',
    imageUrl: '/marcada.jpg',
    message: { text: 'Podría decir que te llevo marcada en mi piel', isLast: false }
  },
  {
    id: 16,
    type: 'constellation',
    x: '60%',
    y: '70%',
    size: 'min(110px, 24vw)',
    color: 'rgba(230, 230, 250, 0.3)',
    shape: 'ring',
    imageUrl: '/choop.jpg',
    message: { text: 'Y no es por las tintas', isLast: false }
  },
  {
    id: 17,
    type: 'star',
    x: '20%',
    y: '55%',
    size: 'min(50px, 12vw)',
    color: 'rgba(255, 218, 185, 0.3)',
    shape: 'star',
    imageUrl: '/comida.jpg',
    rotation: 15,
    message: { text: 'También en las comidas.', isLast: false }
  },
  {
    id: 18,
    type: 'comet',
    x: '70%',
    y: '60%',
    size: 'min(80px, 17vw)',
    color: 'rgba(221, 160, 221, 0.3)',
    shape: 'circle',
    imageUrl: '/crazy.jpg',
    rotation: -45,
    message: { text: 'El gesto es de que me tienes crazy por ti', isLast: false }
  },
  {
    id: 19,
    type: 'planet',
    x: '55%',
    y: '5%',
    size: 'min(90px, 19vw)',
    color: 'rgba(176, 224, 230, 0.3)',
    shape: 'ring',
    imageUrl: '/girly.jpg',
    message: { text: 'Me encantan tus rutinas girly. Gracias por compartirme tus productos (no me vas a volver gay okei?)', isLast: false }
  },
  {
    id: 20,
    type: 'star',
    x: '45%',
    y: '20%',
    size: 'min(200px, 35vw)', // Aumentado significativamente de 120px a 200px y de 25vw a 35vw
    color: 'rgba(255, 192, 203, 0.3)',
    shape: 'star',
    imageUrl: '/flowers.jpg',
    message: { text: 'No todo lo que empieza, tiene que acabar. Esta página sí, se acabó el contenido. Solo una cosa más... \nLas flores tienen semillas, aquellas semillas generan vida ¿Y si la flor es de papel? ¿También puede germinar algo? ¿Más papel? La mejor forma de saber es comprobando tu misma 👀', isLast: true }
  }
];

function App() {
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(null);
  const [serClicks, setSerClicks] = useState(0);
  const [visibleObjectsCount, setVisibleObjectsCount] = useState(1);
  const [_, setPositions] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showWelcome, setShowWelcome] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  const handleCelestialClick = (object: CelestialObject) => {
    console.log('Celestial object clicked:', object.id);
    setSelectedObject(object);
  };

  const closeMessage = () => {
    setSelectedObject(null);
    if (visibleObjectsCount < celestialObjects.length) {
      setVisibleObjectsCount(prev => prev + 1);
    }
  };

  // Modificar el último objeto celestial para que sea más brillante
  const visibleObjects = celestialObjects.slice(0, visibleObjectsCount).map(obj => {
    if (obj.id === celestialObjects.length) {
      return {
        ...obj,
        color: 'rgba(255, 140, 0, 0.6)', // Color más brillante para el último objeto
      };
    }
    return obj;
  });

  const handleSerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSerClicks(prev => {
      prev = prev >= 28 ? 28 : prev+1;
      console.log(prev);
      return prev;
    });
  };

  const handleDragEnd = (objectId: number, info: { x: number; y: number }) => {
    setPositions(prev => ({
      ...prev,
      [objectId]: info
    }));
  };

  const handleStartClick = () => {
    setShowWelcome(false);
    setAutoPlayAudio(true);
  };

  return (
    <div className="universe-container" onClick={closeMessage}>
      <Stars />
      <AudioPlayer autoPlayOnMount={autoPlayAudio} />
      <AnimatePresence>
        <WelcomePopup isVisible={showWelcome} onStartClick={handleStartClick} />
      </AnimatePresence>
      <div className="ser-counter">{serClicks}</div>
      <motion.div 
        className="hidden-ser"
        initial={{ opacity: 0.05, zIndex: -10 }}
        animate={{ 
          opacity: serClicks >= 28 ? [1, 1, 1] : [0.01, 0.015, 0.02],
          scale: [1, 1.05, 1],
          fontFamily: serClicks >= 28 ? 'cursive' : 'Parisienne, cursive',
          zIndex: visibleObjectsCount >= celestialObjects.length ? 10 : -10
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={handleSerClick}
      >
        SER
      </motion.div>
      
      {visibleObjects.map((object) => {
        const baseX = parseFloat(object.x) / 100 * window.innerWidth;
        const baseY = parseFloat(object.y) / 100 * window.innerHeight;
        const isLastObject = object.id === celestialObjects.length;

        return (
          <motion.div
            key={object.id}
            className={`celestial-object ${isLastObject ? 'heart' : object.shape}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: object.id === celestialObjects.length ? [0.8, 1, 0.8] : [0.6, 1, 0.6],
              scale: object.id === celestialObjects.length ? [1, 1.1, 1] : [1, 1.05, 1]
            }}
            transition={{ 
              duration: object.id === celestialObjects.length ? 2 : 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2 * (object.id - 1)
            }}
            style={{
              width: object.size,
              height: object.size,
              background: object.imageUrl 
                ? `url(${object.imageUrl}) center/cover no-repeat, radial-gradient(circle at 30% 30%, ${object.color}, rgba(255, 255, 255, 0.05))`
                : `radial-gradient(circle at 30% 30%, ${object.color}, rgba(255, 255, 255, 0.05))`,
              boxShadow: isLastObject
                ? `0 0 30px rgba(255,20,147,0.8)`
                : `0 0 20px ${object.color}`,
              transform: object.rotation ? `rotate(${object.rotation}deg)` : undefined,
              objectFit: 'cover',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              imageRendering: 'crisp-edges',
              position: 'absolute',
              left: baseX,
              top: baseY
            }}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            dragConstraints={{
              left: 0,
              right: window.innerWidth - parseFloat(object.size),
              top: 0,
              bottom: window.innerHeight - parseFloat(object.size)
            }}
            onDragEnd={(_, info) => handleDragEnd(object.id, { 
              x: info.point.x - baseX, 
              y: info.point.y - baseY 
            })}
            whileHover={{ 
              scale: 1.2,
              boxShadow: `0 0 30px ${object.color}`
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleCelestialClick(object);
            }}
          />
        );
      })}

      <AnimatePresence>
        {selectedObject && (
          <motion.div
            className={`message-popup ${selectedObject.id === celestialObjects.length ? 'special-popup' : ''}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: popupPosition.x,
              y: popupPosition.y
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              setPopupPosition({
                x: popupPosition.x + info.offset.x,
                y: popupPosition.y + info.offset.y
              });
            }}
          >
            <div className="message-close" onClick={closeMessage}>
              😉
            </div>
            {selectedObject.imageUrl && (
              <div 
                className="message-image"
                style={{
                  backgroundImage: `url(${selectedObject.imageUrl})`,
                }}
              />
            )}
            <div className="message-content">
              <p>{selectedObject.message.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
