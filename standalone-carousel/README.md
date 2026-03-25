# Organic Carousel Component 🎡

A high-fidelity, production-ready React carousel component designed for "drag-and-drop" integration. This component was extracted from the **ION Singapore** website and features a premium, modern aesthetic with smooth animations and synchronized progress indicators.

## 🚀 Quick Start

1. **Drag and Drop**: Copy `OrganicCarousel.jsx` into your project's components folder.
2. **Install Dependencies**:
   ```bash
   npm install lucide-react
   ```
   *Note: Ensure your project has **Tailwind CSS** installed and configured.*

3. **Usage**:
   ```jsx
   import OrganicCarousel from './components/OrganicCarousel';

   const mySlides = [
     'https://example.com/slide1.jpg',
     'https://example.com/slide2.jpg'
   ];

   function App() {
     return (
       <OrganicCarousel 
         slides={mySlides}
         brandColors={['bg-blue-500', 'bg-emerald-500']}
         title="Project Showcase"
         ctaText="View Case Study"
         ctaLink="/case-study"
       />
     );
   }
   ```

## 🛠️ Requirements for another AI / Developer

### 1. Tailwind UI Classes
The component relies on standard Tailwind CSS classes. It specifically uses:
- `font-serif` and `font-sans` (ensure these are mapped in your `tailwind.config.js`).
- `aspect-square` for the image container.
- Custom background colors via the `brandColors` prop (must be valid Tailwind classes like `bg-blue-500`).

### 2. Animation Engine
The carousel uses **Native CSS Transitions** combined with React state. 
- **Bezier Curve**: It uses `cubic-bezier(0.25, 1, 0.5, 1)` for an "organic" deceleration feel.
- **Progress Sync**: The top progress bars use `transition-all ease-linear` with a dynamic `transitionDuration` mapped to the `interval` prop.

### 3. Responsive Behavior
- **Desktop**: Maximum width is constrained to `3xl` (768px) for optimal legibility of square assets.
- **Mobile**: The layout is fully responsive with padding adjustments.

## 🎨 Customization
- **Autoplay**: Pass the `interval` prop (in milliseconds) to change speed.
- **Hover behavior**: The carousel automatically pauses on hover to allow the user to focus on a slide.
- **CTA Button**: Fully optional; omit `ctaText` to remove the button.

## 🧩 Architectural Note
This component is **stateless** regarding the global app; it manages its own `activeIdx` and `isHovered` states, making it a "drop-in" solution that won't conflict with your existing state management.
