import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/**
 * OrganicCarousel Component
 * 
 * A high-fidelity, responsive carousel featuring:
 * - Autoplay with progress bar synchronization
 * - Smooth CSS transitions with custom bezier curves
 * - Mobile-friendly touch-ready layout
 * - Brand color integration for progress indicators
 * 
 * @param {Array} slides - Array of image URLs or paths
 * @param {Array} brandColors - Array of Tailwind background color classes (e.g. ['bg-blue-500', 'bg-green-500'])
 * @param {string} title - Section title
 * @param {string} ctaText - Call to action button text
 * @param {string} ctaLink - Destination URL for the CTA button
 * @param {number} interval - Autoplay duration (default: 4500ms)
 */
export default function OrganicCarousel({ 
    slides = [], 
    brandColors = [], 
    title = "Featured Gallery",
    ctaText = "Learn More",
    ctaLink = "#",
    interval = 4500 
}) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-advance logic
    useEffect(() => {
        if (isHovered || slides.length === 0) return;
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % slides.length);
        }, interval);
        return () => clearInterval(timer);
    }, [isHovered, slides.length, interval]);

    const nextSlide = () => setActiveIdx((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);

    if (slides.length === 0) return null;

    return (
        <section className="py-20 bg-white selection:bg-black/10">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
                {title && (
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl lg:text-5xl font-serif italic text-black tracking-tight">{title}</h2>
                    </div>
                )}
                
                {/* Carousel Shell */}
                <div 
                    className="relative w-full max-w-3xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#f5f5f7] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-4 border-white ring-1 ring-black/5 flex flex-col"
                >
                    {/* Top Progress Bars */}
                    <div className="w-full pt-6 px-8 pb-4 flex gap-2">
                        {slides.map((_, i) => (
                            <div key={i} className="h-1.5 flex-1 bg-black/10 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${brandColors[i % brandColors.length] || 'bg-black'} transition-all ease-linear`}
                                    style={{ 
                                        width: i < activeIdx ? '100%' : i === activeIdx ? '100%' : '0%',
                                        transitionDuration: i === activeIdx && !isHovered ? `${interval}ms` : '0.s'
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Viewport & Track */}
                    <div 
                        className="relative w-full overflow-hidden flex px-8"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow-sm border border-black/5 bg-white/50">
                            {slides.map((slide, i) => (
                                <div 
                                    key={i}
                                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                    style={{ transform: `translateX(${(i - activeIdx) * 100}%)` }}
                                >
                                    <img src={slide} alt={`Slide ${i + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="w-full pb-6 pt-4 px-8 flex items-center justify-between gap-4">
                        <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-black flex items-center justify-center transition-colors shrink-0 shadow-sm border border-black/5">
                            <ChevronLeft size={20} />
                        </button>
                        
                        <div className="flex-1 flex justify-center items-center gap-4">
                            {slides.map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setActiveIdx(i)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIdx ? `${brandColors[i % brandColors.length] || 'bg-black'} scale-125 shadow-sm` : 'bg-black/10 hover:bg-black/20'}`}
                                ></button>
                            ))}
                        </div>

                        <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 text-black flex items-center justify-center transition-colors shrink-0 shadow-sm border border-black/5">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {ctaText && (
                    <div className="mt-12 text-center">
                        <a
                            href={ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 group bg-black hover:bg-black/90 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 font-sans text-sm tracking-wide shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-1"
                        >
                            <span>{ctaText}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}
