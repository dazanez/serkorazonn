import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Stars from './components/Stars';
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
    shape: 'star',
    message: { text: 'Cada estrella representa un momento especial contigo...', isLast: false }
  },
  {
    id: 2,
    type: 'moon',
    x: '75%',
    y: '35%',
    size: 'min(100px, 20vw)',
    color: 'rgba(176, 196, 222, 0.3)',
    shape: 'crescent',
    message: { text: 'La luna es testigo de nuestras conversaciones hasta el amanecer...', isLast: false }
  },
  {
    id: 3,
    type: 'planet',
    x: '45%',
    y: '65%',
    size: 'min(80px, 18vw)',
    color: 'rgba(230, 230, 250, 0.3)',
    shape: 'ring',
    message: { text: 'Busca el papel donde comenzó todo... donde nos conocimos por primera vez ♥', isLast: false }
  },
  {
    id: 4,
    type: 'star',
    x: '85%',
    y: '20%',
    size: 'min(50px, 12vw)',
    color: 'rgba(255, 223, 186, 0.3)',
    shape: 'star',
    rotation: 45,
    message: { text: 'Momento para agregar tu imagen especial...', isLast: false }
  },
  {
    id: 5,
    type: 'constellation',
    x: '20%',
    y: '80%',
    size: 'min(120px, 25vw)',
    color: 'rgba(135, 206, 235, 0.3)',
    shape: 'circle',
    imageUrl: '/constelacion.jpg',
    message: { text: 'Espacio para un recuerdo juntos de lo que sea aqui va un lorem ipsuum ave maria purisima que mas sigue no se que tu tiene una vaina...', isLast: false }
  },
  {
    id: 6,
    type: 'comet',
    x: '65%',
    y: '15%',
    size: 'min(70px, 15vw)',
    color: 'rgba(255, 182, 193, 0.3)',
    shape: 'star',
    message: { text: 'Una foto de nuestras aventuras...', isLast: false }
  },
  /* {
    id: 7,
    type: 'planet',
    x: '30%',
    y: '90%',
    size: 'min(90px, 20vw)',
    color: 'rgba(144, 238, 144, 0.3)',
    shape: 'circle',
    message: { text: 'Agrega aquí un momento inolvidable...', isLast: false }
  }, */
  {
    id: 8,
    type: 'star',
    x: '40%',
    y: '20%',
    size: 'min(65px, 14vw)',
    color: 'rgba(255, 218, 185, 0.3)',
    shape: 'star',
    message: { text: 'Un espacio para tus recuerdos...', isLast: false }
  },
  {
    id: 9,
    type: 'constellation',
    x: '80%',
    y: '75%',
    size: 'min(95px, 22vw)',
    color: 'rgba(216, 191, 216, 0.3)',
    shape: 'circle',
    message: { text: 'Aquí puedes poner una foto especial...', isLast: false }
  },
  {
    id: 10,
    type: 'planet',
    x: '10%',
    y: '40%',
    size: 'min(85px, 18vw)',
    color: 'rgba(173, 216, 230, 0.3)',
    shape: 'circle',
    message: { text: 'Espacio para un momento mágico...', isLast: false }
  },
  {
    id: 11,
    type: 'star',
    x: '90%',
    y: '50%',
    size: 'min(55px, 13vw)',
    color: 'rgba(221, 160, 221, 0.3)',
    shape: 'star',
    rotation: -30,
    message: { text: 'Una imagen de nosotros...', isLast: false }
  },
  {
    id: 12,
    type: 'moon',
    x: '30%',
    y: '10%',
    size: 'min(75px, 16vw)',
    color: 'rgba(176, 224, 230, 0.3)',
    shape: 'crescent',
    message: { text: 'Coloca aquí un recuerdo especial...', isLast: false }
  },
  {
    id: 13,
    type: 'comet',
    x: '50%',
    y: '85%',
    size: 'min(70px, 15vw)',
    color: 'rgba(255, 192, 203, 0.3)',
    shape: 'star',
    rotation: 60,
    message: { text: 'Un espacio para nuestras sonrisas...', isLast: false }
  },
  {
    id: 14,
    type: 'star',
    x: '70%',
    y: '30%',
    size: 'min(65px, 14vw)',
    color: 'rgba(230, 230, 250, 0.3)',
    shape: 'star',
    message: { text: 'Agrega una foto que te haga sonreír...', isLast: false }
  },
  {
    id: 15,
    type: 'planet',
    x: '35%',
    y: '45%',
    size: 'min(95px, 20vw)',
    color: 'rgba(176, 196, 222, 0.3)',
    shape: 'circle',
    message: { text: 'Un lugar para nuestros momentos...', isLast: false }
  },
  {
    id: 16,
    type: 'constellation',
    x: '60%',
    y: '70%',
    size: 'min(110px, 24vw)',
    color: 'rgba(230, 230, 250, 0.3)',
    shape: 'circle',
    message: { text: 'Espacio para una foto especial...', isLast: false }
  },
  {
    id: 17,
    type: 'star',
    x: '20%',
    y: '55%',
    size: 'min(50px, 12vw)',
    color: 'rgba(255, 218, 185, 0.3)',
    shape: 'star',
    rotation: 15,
    message: { text: 'Un rincón para nuestros recuerdos...', isLast: false }
  },
  {
    id: 18,
    type: 'comet',
    x: '80%',
    y: '95%',
    size: 'min(80px, 17vw)',
    color: 'rgba(221, 160, 221, 0.3)',
    shape: 'star',
    rotation: -45,
    message: { text: 'Guarda aquí un momento especial...', isLast: false }
  },
  {
    id: 19,
    type: 'planet',
    x: '55%',
    y: '5%',
    size: 'min(90px, 19vw)',
    color: 'rgba(176, 224, 230, 0.3)',
    shape: 'ring',
    message: { text: 'Un espacio más para nuestros recuerdos...', isLast: false }
  },
  {
    id: 20,
    type: 'star',
    x: '40%',
    y: '90%',
    size: 'min(70px, 15vw)',
    color: 'rgba(255, 192, 203, 0.3)',
    shape: 'star',
    message: { text: 'El último rincón de nuestro universo...', isLast: true }
  }
];

function App() {
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(null);
  const [serClicks, setSerClicks] = useState(0);
  const [_, setPositions] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleCelestialClick = (object: CelestialObject) => {
    setSelectedObject(object);
  };

  const closeMessage = () => {
    setSelectedObject(null);
  };

  const handleSerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSerClicks(prev => {
      prev++;
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

  return (
    <div className="universe-container" onClick={closeMessage}>
      <Stars />
      <motion.div 
        className="hidden-ser"
        initial={{ opacity: 0.05 }}
        animate={{ 
          opacity: serClicks >= 28 ? [1, 1, 1] : [0.01, 0.015, 0.02],
          scale: [1, 1.05, 1],
          fontFamily: serClicks >= 28 ? 'cursive' : 'Parisienne, cursive',
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
      
      {celestialObjects.map((object) => {
        // const position = positions[object.id] || { x: 0, y: 0 };
        const baseX = parseFloat(object.x) / 100 * window.innerWidth;
        const baseY = parseFloat(object.y) / 100 * window.innerHeight;

        return (
          <motion.div
            key={object.id}
            className={`celestial-object ${object.shape}`}
            style={{
              width: object.size,
              height: object.size,
              background: object.imageUrl 
                ? `url(${object.imageUrl}) center/cover no-repeat, radial-gradient(circle at 30% 30%, ${object.color}, rgba(255, 255, 255, 0.05))`
                : `radial-gradient(circle at 30% 30%, ${object.color}, rgba(255, 255, 255, 0.05))`,
              boxShadow: `0 0 20px ${object.color}`,
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
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
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
            className="message-popup"
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
