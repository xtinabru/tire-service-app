import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
  background: {
    opacity: 0.8,
  },
  toolbar: {
    color: '#ffffff',
    textAlign: 'center' as const, // Указываем фиксированное значение
    position: 'absolute' as const, // Указываем правильный тип для position
    top: 0,
    width: '100%',
  },
  container: {
    padding: '80px',
    margin: '45vh auto',
    width: '90%',
    textAlign: 'center' as const, // Указываем тип для textAlign
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '0px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 1)',
    
  },
  footer: {
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    color: '#1a1a1a',
    padding: '4px',
    textAlign: 'center' as const, // Указываем правильное значение textAlign
    position: 'absolute' as const, // Указываем правильное значение для position
    bottom: 0,
    width: '100%',
    textShadow: '2px 2px 3px rgba(255, 255, 255, 1)',
  },
  title: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '770',
    fontSize: '2.4rem',
    textShadow: '3px 3px 3px rgba(11, 61, 145, 0.4)',
    color: '#0B3D91',
    '-webkit-text-stroke': '0.5px white', // добавляем белую обводку
    textStroke: '1px white', // для поддержки других браузеров
  },
  
};

export default styles;
