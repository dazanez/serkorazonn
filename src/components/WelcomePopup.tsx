import { motion } from 'framer-motion';

interface WelcomePopupProps {
  onStartClick: () => void;
  isVisible: boolean;
}

const WelcomePopup = ({ onStartClick, isVisible }: WelcomePopupProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="message-popup"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        background: 'rgba(147, 112, 219, 0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <h2 style={{ margin: 0, color: 'var(--text-color)' }}>¡Holaaaa!</h2>
      <p style={{ margin: 0, color: 'var(--text-color)' }}>
        Antes de empezar, activemos el audio
      </p>
      <button
        onClick={onStartClick}
        style={{
          background: 'rgba(147, 112, 219, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '20px',
          padding: '12px 24px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(5px)',
        }}
      >
        Comenzar ✨
      </button>
    </motion.div>
  );
};

export default WelcomePopup;