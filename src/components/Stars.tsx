import { motion } from 'framer-motion';

// Generate random star positions once, outside the component
const stars = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  scale: Math.random() * 0.5 + 0.5,
  duration: Math.random() * 2 + 2
}));

const Stars = () => {
  return (
    <div className="stars">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          style={{
            position: 'absolute',
            left: star.x,
            top: star.y,
            width: '2px',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%'
          }}
          animate={{
            scale: [star.scale, star.scale * 1.5, star.scale],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

export default Stars;