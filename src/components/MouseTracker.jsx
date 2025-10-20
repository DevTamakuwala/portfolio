import React, { useRef, useEffect } from 'react';

// Particle class defined outside the component for better performance and code structure.
class Particle {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 2 + 1; // Smaller particles
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? 'hsl(180, 100%, 50%)' : 'hsl(300, 100%, 50%)';
    }

    update() {
        // Keep particles within bounds
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
        
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}


const MouseTracker = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: null, y: null, radius: 150 }); // Mouse influence radius
    const animationFrameId = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const init = () => {
            particles.current = [];
            const numberOfParticles = (canvas.width * canvas.height) / 12000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.current.push(new Particle(canvas, ctx));
            }
        };

        const connect = () => {
            let opacityValue = 1;
            // Connect particles to each other
            for (let a = 0; a < particles.current.length; a++) {
                for (let b = a; b < particles.current.length; b++) {
                    const dx = particles.current[a].x - particles.current[b].x;
                    const dy = particles.current[a].y - particles.current[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) { // Connection distance threshold
                        opacityValue = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(0, 255, 255, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles.current[a].x, particles.current[a].y);
                        ctx.lineTo(particles.current[b].x, particles.current[b].y);
                        ctx.stroke();
                    }
                }
            }
             // Connect particles to mouse
            if(mouse.current.x !== null){
                for(let i = 0; i < particles.current.length; i++){
                    const dx = particles.current[i].x - mouse.current.x;
                    const dy = particles.current[i].y - mouse.current.y;
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    if(distance < mouse.current.radius){
                        opacityValue = 1 - (distance / mouse.current.radius);
                        ctx.strokeStyle = `rgba(255, 0, 255, ${opacityValue})`; // Magenta lines to mouse
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particles.current[i].x, particles.current[i].y);
                        ctx.lineTo(mouse.current.x, mouse.current.y);
                        ctx.stroke();
                    }
                }
            }
        };
        
        const animate = () => {
            if(!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const particle of particles.current) {
                particle.update();
                particle.draw();
            }
            connect();
            animationFrameId.current = requestAnimationFrame(animate);
        };
        
        init();
        animate();

        const handleMouseMove = (event) => {
            mouse.current.x = event.x;
            mouse.current.y = event.y;
        };
        
        const handleMouseLeave = () => {
             mouse.current.x = null;
             mouse.current.y = null;
        }

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                mouse.current.radius = 150;
                init();
            }
        }

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            if(animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef} id="mouse-tracker-canvas"></canvas>;
};

export default MouseTracker;

