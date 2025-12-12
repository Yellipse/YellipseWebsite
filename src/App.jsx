import React from 'react';
import { Outlet, RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import SpotlightBackground from './components/SpotlightBackground';
import Navbar from './components/Navbar';

// Root Route: Provides the layout (Background + Outlet for content)
const rootRoute = createRootRoute({
    component: () => (
        <>
            <SpotlightBackground />
            <Navbar />
            <Outlet />
        </>
    ),
});

// Index Component: The main page content with sections
const IndexComponent = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(false);

    const products = [
        {
            title: "Yellipse UI",
            desc: "A modern, glassmorphism-inspired UI library for building stunning web applications. Features pre-built components and animations.",
            link: "Learn more →"
        },
        {
            title: "Project Nebula",
            desc: "An AI-powered collaboration tool designed for students and small teams to manage projects efficiently.",
            link: "Coming Soon →"
        },
        {
            title: "Aura Theme",
            desc: "A premium VS Code theme that brings the Yellipse aesthetic to your development environment.",
            link: "Get it now →"
        }
    ];

    // Check if mobile
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-play carousel
    React.useEffect(() => {
        if (!isMobile || isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % products.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [isMobile, isPaused, products.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
    };

    // Touch swipe handling
    const [touchStart, setTouchStart] = React.useState(0);
    const [touchEnd, setTouchEnd] = React.useState(0);

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            // Swiped left - next
            nextSlide();
        }
        if (touchStart - touchEnd < -50) {
            // Swiped right - previous
            prevSlide();
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden', boxSizing: 'border-box' }}>
            {/* Hero Section */}
            <div id="home" className="content" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box' }}>
                <h1 className="brand-name">Yellipse</h1>
                <div className="tagline">Made by students</div>

                <div className="scroll-down-container" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
                    <div className="mouse-icon">
                        <div className="wheel"></div>
                    </div>
                    <div className="arrow-down"></div>
                </div>
            </div>

            {/* Products Section */}
            <div id="products" className="products-section">
                <h2 className="section-title">Our Products</h2>

                {isMobile ? (
                    <div
                        className="carousel-container"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >

                        <div
                            className="carousel-track"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {products.map((product, index) => (
                                <div
                                    key={index}
                                    className={`product-card carousel-card ${index === currentSlide ? 'active' : ''}`}
                                    style={{
                                        transform: `translate(-50%, -50%) translateX(${(index - currentSlide) * 100}%)`,
                                        opacity: index === currentSlide ? 1 : 0,
                                        pointerEvents: index === currentSlide ? 'auto' : 'none'
                                    }}
                                    onClick={(e) => {
                                        const card = e.currentTarget;
                                        const rect = card.getBoundingClientRect();
                                        const clickX = e.clientX - rect.left;
                                        const cardWidth = rect.width;

                                        // Left 40% - previous
                                        if (clickX < cardWidth * 0.4) {
                                            e.preventDefault();
                                            prevSlide();
                                        }
                                        // Right 40% - next
                                        else if (clickX > cardWidth * 0.6) {
                                            e.preventDefault();
                                            nextSlide();
                                        }
                                        // Center 20% - allow normal link clicks
                                    }}
                                >
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-desc">{product.desc}</p>
                                    <a href="#" className="product-link">{product.link}</a>
                                </div>
                            ))}
                        </div>

                        <div className="carousel-dots">
                            {products.map((_, index) => (
                                <button
                                    key={index}
                                    className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                    aria-label={`Go to product ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <div key={index} className="product-card">
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-desc">{product.desc}</p>
                                <a href="#" className="product-link">{product.link}</a>
                            </div>
                        ))}
                    </div>
                )}

                {/* More Button */}
                <div className="more-button-container">
                    <button className="glass-button more-button">
                        Explore More Products
                    </button>
                </div>
            </div>
        </div>
    );
};

// Index Route Definition
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: IndexComponent,
});

// Create Router
const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({ routeTree });

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
