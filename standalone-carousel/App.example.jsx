import React from 'react';
import OrganicCarousel from './OrganicCarousel';

/**
 * Example App demonstrating the integration of the OrganicCarousel
 */
function ExampleApp() {
    // These would typically be high-resolution square assets
    const ionProjectSlides = [
        "/Assets/slide-1--NerBnWf-sZJswuKcfBmfA.png",
        "/Assets/slide-2-KIN7Rnhm0L93rN21IuUw8g.png",
        "/Assets/slide-3-xCrQYvOt-lnmxjY2sx6oDQ.png",
        "/Assets/slide-4-RY61D-y2yPkeDQmExduK6A.png",
        "/Assets/slide-5-wngjyaylFrXGJHrMq6iMAQ.png"
    ];

    // Tailwind background colors for the top progress bars
    const ionBrandColors = [
        'bg-[#3F7CBF]', // ION Blue
        'bg-[#76C691]', // ION Green
        'bg-[#FFC614]', // ION Yellow
        'bg-[#EF534C]', // ION Red
        'bg-[#3F7CBF]'  // Cycle back
    ];

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
            <OrganicCarousel 
                slides={ionProjectSlides}
                brandColors={ionBrandColors}
                title="Leadership Dialogue Series"
                ctaText="Register via Eventbrite"
                ctaLink="https://www.eventbrite.sg/..."
                interval={5000} 
            />
        </div>
    );
}

export default ExampleApp;
