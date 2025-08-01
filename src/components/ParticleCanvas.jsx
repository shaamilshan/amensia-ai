// src/components/ParticleCanvas.js
import React, { useRef, useEffect } from 'react';

const ParticleCanvas = ({ onAnimationComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
        this.life = 1;
        this.fadeSpeed = Math.random() * 0.03 + 0.01;
      }
      update() { 
        this.x += this.speedX; 
        this.y += this.speedY; 
        this.life -= this.fadeSpeed; 
      }
      draw() { 
        ctx.globalAlpha = this.life; 
        ctx.fillStyle = this.color; 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fill(); 
      }
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    for (let i = 0; i < 200; i++) {
      particles.push(new Particle(centerX, centerY));
    }

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]; 
        p.update(); 
        p.draw();
        if (p.life <= 0) { 
          particles.splice(i, 1); 
        }
      }
      ctx.globalAlpha = 1;
      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animate);
      } else { 
        onAnimationComplete(); 
      }
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [onAnimationComplete]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default ParticleCanvas;