# Lunacal Assignment — React + Vite implementation

This small project reproduces the right-hand widgets from the provided Figma mockup: a Profile widget with three tabs and a Gallery widget with an Add Image button and simple controls. The left pane is intentionally left empty per the assignment instructions.

How to run locally

1. Install dependencies:

   npm install

2. Run the dev server:

   npm run dev

The dev server will start (Vite) and show the UI at the printed local address.

Notes
- This is a minimal implementation focusing on layout and interactions described in the assignment. The styles approximate the dark, neumorphic look from the Figma file using Tailwind and a couple of custom utility classes.
- The "Add Image" button currently appends a placeholder image. Replace files in `src/assets` or extend the component to accept file uploads for a production-ready version.

## Deployment

Build and deploy to Vercel/Netlify by connecting the repository and using the `npm run build` output.

Live demo command:
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

## Notes and Next Steps

### Architecture
- Built with React 18 + Vite for fast development and build
- Uses Tailwind CSS for styling with custom neumorphic shadow utilities
- Responsive design: left pane hidden on mobile (<768px), full-width widgets on mobile

### Accessibility
- All interactive elements are keyboard accessible
- Tab navigation works through widget tabs and buttons
- Consider adding ARIA labels and focus indicators for production use

### Future Improvements
- Replace placeholder images in `src/assets/` with real assets
- Implement actual file upload for "Add Image" functionality
- Add unit tests with React Testing Library
- Fine-tune exact padding, margins, and shadows to match Figma pixel-perfect
- Add animations/transitions for tab switching and image carousel
- Implement proper image carousel with navigation (currently placeholder buttons)
