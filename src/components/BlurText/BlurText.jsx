// BlurText.jsx
import { useRef, useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import React from 'react';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);
  
  // Direction-based variants
  const yOffset = direction === 'top' ? -50 : 50;
  const intermediateYOffset = direction === 'top' ? 5 : -5;
  
  const variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: yOffset,
    },
    intermediate: {
      filter: 'blur(5px)',
      opacity: 0.5,
      y: intermediateYOffset,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  
  const handleAnimationComplete = (definitionId) => {
    animatedCount.current += 1;
    if (animatedCount.current === elements.length && onAnimationComplete) {
      onAnimationComplete();
    }
  };
  
  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          custom={index}
          initial="hidden"
          animate={inView ? ["intermediate", "visible"] : "hidden"}
          variants={variants}
          transition={{
            delay: index * delay / 1000, // Convert to seconds for framer-motion
            duration: 0.3,
            ease: "easeOut",
          }}
          onAnimationComplete={handleAnimationComplete}
          className="inline-block transition-transform will-change-transform"
        >
          {element === ' ' ? '\u00A0' : element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;