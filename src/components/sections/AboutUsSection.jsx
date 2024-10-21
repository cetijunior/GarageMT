import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Canvas Animation Function
const CanvasAnimation = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		const particlesArray = [];
		const numberOfParticles = 60;
		const particleColor = "rgba(255, 0, 0, 0.5)"; // Red-ish particles

		// Set canvas size
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// Resize canvas on window resize
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
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
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;
				if (this.size > 0.1) this.size -= 0.05; // Shrinking effect
			}

			draw() {
				context.beginPath();
				context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				context.fillStyle = particleColor;
				context.fill();
			}
		}

		const initParticles = () => {
			for (let i = 0; i < numberOfParticles; i++) {
				const size = Math.random() * 3 + 2;
				const x = Math.random() * canvas.width;
				const y = Math.random() * canvas.height;
				const speedX = Math.random() * 1 - 0.5;
				const speedY = Math.random() * 1 - 0.5;
				particlesArray.push(new Particle(x, y, size, speedX, speedY));
			}
		};

		const handleParticles = () => {
			for (let i = 0; i < particlesArray.length; i++) {
				particlesArray[i].update();
				particlesArray[i].draw();
				if (particlesArray[i].size <= 0.2) {
					particlesArray.splice(i, 1);
					i--;
				}
			}
		};

		const animate = () => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			handleParticles();
			requestAnimationFrame(animate);
		};

		initParticles();
		animate();

		return () => window.removeEventListener("resize", resizeCanvas);
	}, []);

	return <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>;
};

function AboutUsSection() {
	return (
		<section
			id="about"
			className="relative py-20 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden"
		>
			{/* Background Particle Animation */}
			<CanvasAnimation />

			<div className="container mx-auto px-6 lg:px-12 relative z-10">
				{/* Section Heading */}
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-12"
				>
					<h4 className="text-red-500 text-lg md:text-xl font-semibold tracking-widest uppercase mb-4">
						Who We Are
					</h4>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
						Expert Car Repairs & Maintenance
					</h2>
					<p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
						We bring years of experience in providing exceptional automotive
						services. Our team of certified professionals ensures your vehicle
						is in the best hands, with precise diagnostics and top-notch
						maintenance.
					</p>
				</motion.div>

				{/* Content Layout */}
				<div className="flex flex-col lg:flex-row lg:items-start gap-16 relative z-10">
					{/* Left Side */}
					<motion.div
						className="lg:w-1/2 w-full relative flex flex-col items-center"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						{/* Floating Background Accent */}
						<div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-600 to-transparent rounded-full -z-10 rotate-45 transform"></div>

						{/* Image Row */}
						<div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-center justify-center">
							<motion.img
								src="/assets/images/work1.jpg"
								alt="Car Service"
								className="rounded-xl shadow-2xl object-cover w-full md:w-1/2 h-auto max-h-96 transition-transform duration-500 ease-in-out hover:scale-105"
							/>

							<motion.img
								src="/assets/images/entry2.jpg"
								alt="Car Service"
								className="rounded-xl shadow-2xl object-cover w-full md:w-1/2 h-auto max-h-96 transition-transform duration-500 ease-in-out hover:scale-105"
							/>
						</div>

						{/* Description */}
						<motion.p
							className="text-gray-600 mt-6 leading-relaxed text-lg text-center md:text-left"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
						>
							Our technicians are highly trained to handle various car repairs,
							ensuring your vehicle remains safe and efficient. We use
							state-of-the-art tools to deliver precise and high-quality
							results.
						</motion.p>
					</motion.div>

					{/* Right Side */}
					<motion.div
						className="lg:w-1/2 w-full flex flex-col space-y-6 items-center"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, staggerChildren: 0.3 }}
						viewport={{ once: true }}
					>
						{/* Description */}
						<motion.p
							className="text-gray-600 leading-relaxed text-lg text-center md:text-left"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true }}
						>
							Transparency is our priority. With every service, we provide
							detailed diagnostics and recommend the best solutions to keep your
							car in peak condition.
						</motion.p>

						{/* Secondary Image */}
						<div className="flex items-center justify-center">
							<motion.img
								src="/assets/images/work4.jpg"
								alt="Car Service"
								className="rounded-xl shadow-2xl object-cover w-full h-auto max-h-[500px] transition-transform duration-500 ease-in-out hover:scale-105"
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

export default AboutUsSection;
