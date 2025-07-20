// weezly.works - Main JavaScript
// Created by SuperNinja AI - 2025

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const heroGrid = document.querySelector('.hero-grid');
    
    // Create grid background for hero section
    createHeroGrid();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create grid background for hero section
    function createHeroGrid() {
        if (!heroGrid) return;
        
        // Clear existing grid
        heroGrid.innerHTML = '';
        
        // Create grid lines
        const gridSize = 30;
        const gridWidth = Math.ceil(window.innerWidth / gridSize);
        const gridHeight = Math.ceil(window.innerHeight / gridSize);
        
        // Create horizontal lines
        for (let i = 0; i <= gridHeight; i++) {
            const line = document.createElement('div');
            line.classList.add('grid-line', 'horizontal');
            line.style.top = `${i * gridSize}px`;
            line.style.width = '100%';
            heroGrid.appendChild(line);
        }
        
        // Create vertical lines
        for (let i = 0; i <= gridWidth; i++) {
            const line = document.createElement('div');
            line.classList.add('grid-line', 'vertical');
            line.style.left = `${i * gridSize}px`;
            line.style.height = '100%';
            heroGrid.appendChild(line);
        }
    }
    
    // Resize event for grid
    window.addEventListener('resize', () => {
        createHeroGrid();
    });
    
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.project-item, .tandy-container, .contact-content');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        fadeObserver.observe(element);
    });
    
    // Parallax effect for hero section and content fade-in
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Parallax effect for grid
        if (heroGrid) {
            heroGrid.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
        
        // Fade in content sections as user scrolls
        const contentSections = document.querySelectorAll('section:not(#home)');
        contentSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = sectionTop < viewportHeight * 0.75;
            
            if (sectionVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add CSS for grid lines (dynamically to avoid cluttering the CSS file)
    const style = document.createElement('style');
    style.textContent = `
        .hero-grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            perspective: 1000px;
            transform-style: preserve-3d;
            pointer-events: none;
        }
        
        .grid-line {
            position: absolute;
            background: rgba(255, 0, 170, 0.1);
            z-index: 1;
        }
        
        .horizontal {
            height: 1px;
            transform: scaleY(0.5);
        }
        
        .vertical {
            width: 1px;
            transform: scaleX(0.5);
        }
        
        .fade-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-element.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Terminal typing effect for Tandy screen
    const terminalLines = document.querySelectorAll('.terminal-line:not(.cursor)');
    
    terminalLines.forEach((line, index) => {
        const originalText = line.textContent;
        line.textContent = '';
        
        // Delay each line typing
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    line.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, Math.random() * 50 + 30); // Random typing speed
                }
            };
            
            typeWriter();
        }, index * 1000); // Delay between lines
    });
});

// Typing effect for the tagline
document.addEventListener('DOMContentLoaded', function() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
});

// Add scanline effect
document.addEventListener('DOMContentLoaded', function() {
    const scanline = document.createElement('div');
    scanline.classList.add('scanline');
    document.body.appendChild(scanline);
    
    // Add CSS for scanline
    const scanlineStyle = document.createElement('style');
    scanlineStyle.textContent = `
        .scanline {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(255, 0, 170, 0.2);
            opacity: 0.5;
            z-index: 9998;
            pointer-events: none;
            animation: scanline 8s linear infinite;
        }
        
        @keyframes scanline {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(scanlineStyle);
    
    // Add synthwave boot sequence
    const bootSequence = document.createElement('div');
    bootSequence.classList.add('boot-sequence');
    document.body.appendChild(bootSequence);
    
    // Hide the body content until boot sequence is complete
    document.body.style.visibility = 'hidden';
    bootSequence.style.visibility = 'visible';
    
    bootSequence.innerHTML = `
        <div class="boot-content">
            <p>> Initializing system...</p>
            <p>> Loading weezly.works OS v2.5.0...</p>
            <p>> Establishing connection...</p>
            <p>> Connection established.</p>
            <p>> Welcome to weezly.works</p>
            <p>> Loading interface...</p>
        </div>
    `;
    
    // Boot sequence animation
    setTimeout(() => {
        bootSequence.classList.add('boot-complete');
        setTimeout(() => {
            bootSequence.style.display = 'none';
            document.body.style.visibility = 'visible';
        }, 1000);
    }, 3000);
    
    // Boot sequence CSS is now in the main CSS file
});

// Project hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
});