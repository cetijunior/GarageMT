import { useEffect, useRef } from "react";

// Canvas Particle Animation with Scroll and Random Appearance Effect
const ParticlesBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const particlesArray = [];
        const numberOfParticles = 30; // Reduced the number of particles to make them rarer
        const particleColor = "rgba(255, 0, 0, 0.5)"; // Red particles

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth - 20; // Automatically responsive
            canvas.height = window.innerHeight;
        };

        setCanvasSize(); // Initial size setting

        // Resize canvas when window size changes
        const resizeCanvas = () => {
            setCanvasSize(); // Update size on resize
        };
        window.addEventListener("resize", resizeCanvas);

        // Particle constructor
        class Particle {
            constructor(x, y, size, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
                this.baseX = x; // Store original X position
                this.baseY = y; // Store original Y position
            }

            reset() {
                this.size = Math.random() * 2 + 1; // Smaller size range
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.baseX = this.x;
                this.baseY = this.y;
                this.speedX = Math.random() * 0.5 - 0.25; // Slower speed
                this.speedY = Math.random() * 0.5 - 0.25; // Slower speed
            }

            update(scrollOffset) {
                // Move particles based on the scroll position
                this.x = this.baseX + scrollOffset * 0.05; // Horizontal scroll effect (more subtle)
                this.y = this.baseY + scrollOffset * 0.05; // Vertical scroll effect (more subtle)

                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) {
                    this.size -= 0.01; // Slower shrinking for smoother effect
                } else {
                    this.reset(); // Reset particle when it's too small
                }
            }

            draw() {
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fillStyle = particleColor;
                context.fill();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particlesArray.length = 0; // Clear previous particles
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2 + 1; // Smaller and smoother particles
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const speedX = Math.random() * 0.5 - 0.25; // Slower horizontal movement
                const speedY = Math.random() * 0.5 - 0.25; // Slower vertical movement
                particlesArray.push(new Particle(x, y, size, speedX, speedY));
            }
        };

        // Handle particle updates
        const handleParticles = (scrollOffset) => {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update(scrollOffset);
                particlesArray[i].draw();
            }
        };

        // Animation loop
        const animate = (scrollOffset) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            handleParticles(scrollOffset);
            requestAnimationFrame(() => animate(window.scrollY));
        };

        initParticles();
        animate(window.scrollY); // Start animation with initial scroll value

        // Scroll event listener to update particle movement
        const handleScroll = () => {
            const scrollOffset = window.scrollY;
            animate(scrollOffset);
        };


        // Cleanup event listeners
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none"></canvas>;
};

export default ParticlesBackground;
