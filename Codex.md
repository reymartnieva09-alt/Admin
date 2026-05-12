Act as a senior front-end developer.

I already have an existing static portfolio website in this repository, intended to be published through GitHub Pages. Refactor and improve it so that it uses Tailwind CSS v4 properly with a local build process, not the Tailwind Play CDN.

GOAL:
Create a polished, responsive, modern personal portfolio website using:
- HTML
- Tailwind CSS v4 compiled locally through the Tailwind CLI
- Minimal vanilla JavaScript only when needed

IMPORTANT TECHNICAL REQUIREMENTS:
1. Do NOT use:
   - Tailwind Play CDN
   - Bootstrap
   - React
   - Vite
   - Any backend
2. This must remain a static site compatible with GitHub Pages.
3. Use Tailwind CSS through the official CLI workflow:
   - Install `tailwindcss` and `@tailwindcss/cli`
   - Create an input CSS file that imports Tailwind:
     `@import "tailwindcss";`
   - Compile it into a generated CSS file that the HTML links to.
4. The generated CSS file must be committed so GitHub Pages can serve it directly.
5. Keep the website deployable from the repository root using GitHub Pages.

FILE STRUCTURE TO CREATE OR USE:
- index.html
- src/input.css
- assets/css/output.css
- assets/js/script.js
- assets/images/ if needed
- package.json

PACKAGE.JSON:
Add scripts similar to:
- "dev": Tailwind CLI watch command
- "build": Tailwind CLI production build command

Use this general pattern:
- Input: ./src/input.css
- Output: ./assets/css/output.css

DESIGN REQUIREMENTS:
Build or refactor the portfolio into a clean, elegant, professional layout with:
1. Sticky responsive navigation bar
2. Hero section with:
   - Name
   - Professional tagline
   - Short introduction
   - CTA buttons such as “View Projects” and “Contact Me”
3. About section
4. Skills / Tech Stack section
5. Projects section with project cards
6. Experience or Services section if suitable
7. Contact section
8. Footer with social links

VISUAL STYLE:
- Modern, minimalist, professional
- Strong spacing and visual hierarchy
- Smooth card layouts
- Soft shadows and rounded corners
- Responsive grid system
- Good typography
- Mobile-first layout
- Subtle hover effects and transitions
- Clean neutral palette with one accent color
- Avoid clutter and overly flashy effects

RESPONSIVENESS:
Make sure it works well on:
- Mobile
- Tablet
- Desktop

ACCESSIBILITY:
- Semantic HTML5
- Proper heading structure
- Alt text for meaningful images
- Buttons and links should be clearly identifiable
- Good color contrast
- Keyboard-friendly navigation where applicable

FUNCTIONAL REQUIREMENTS:
- Smooth scrolling for anchor navigation
- Responsive mobile menu with JavaScript toggle
- Highlight active or hover nav states if practical
- Project cards should support:
  - Title
  - Description
  - Tech tags
  - GitHub link
  - Live demo link

IF EXISTING CONTENT IS PRESENT:
- Preserve my existing text and information where possible.
- Improve structure and presentation without deleting meaningful content.
- Replace old Bootstrap or custom layout classes with Tailwind utility classes.
- Remove unused CSS or scripts when no longer needed.

OUTPUT TASKS:
1. Inspect the current repository files.
2. Refactor the site to Tailwind CSS.
3. Create or update:
   - index.html
   - src/input.css
   - assets/css/output.css
   - assets/js/script.js
   - package.json
4. Make sure all file paths are correct for GitHub Pages.
5. Make sure index.html links to:
   - ./assets/css/output.css
   - ./assets/js/script.js
6. Keep the website fully static and GitHub Pages-ready.
7. At the end, provide a concise summary of:
   - Files created/changed
   - Command to run during development
   - Command to build the final CSS