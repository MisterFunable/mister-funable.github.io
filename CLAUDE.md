# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

My Doll Inventory is a static website for cataloging and sharing doll collections, customs, and resin figures. It's a GitHub Pages-hosted site using HTML, CSS, and vanilla JavaScript with Airtable integration for collection management.

**Tech Stack**: HTML5, CSS3 (with Tailwind CDN), vanilla JavaScript, Jekyll (build tool), Airtable embeds, GitHub Gists for content

## Development Commands

### Local Development

```bash
# Start simple Python HTTP server (recommended for quick testing)
make local
# Opens browser at http://localhost:8000

# Or manually:
python3 -m http.server 8000
```

### Jekyll Development (with live reload)

```bash
# Install dependencies (first time only)
make install

# Start Jekyll server with live reload
make serve
```

### Build & Deploy

```bash
# Build the site
make build

# Format all files (HTML, CSS, JS)
make format

# Deploy to GitHub Pages (commits and pushes)
make deploy
```

### Code Quality

```bash
# Format HTML files
make format-html

# Format CSS files
make format-css

# Format JavaScript files
make format-js

# Validate HTML
make validate
```

## Architecture

### Component System

The site uses a **fetch-based component injection** pattern for shared UI elements:

1. **Navbar** (`/components/navbar.html`)
   - Loaded by: `js/navbar-loader.js`
   - Injected into: `#navbar-placeholder`
   - Features: Dropdown navigation, mobile menu, language switcher
   - Triggers: Language switcher initialization, age disclaimer

2. **Footer** (`/components/footer.html`)
   - Loaded by: `js/footer-loader.js`
   - Injected into: `#footer-placeholder`
   - Features: Scroll-triggered visibility, social links, mobile language switcher

3. **Age Disclaimer Modal** (`/components/age-disclaimer.html`)
   - Loaded by: `js/age-disclaimer.js` (IIFE pattern)
   - Storage: Uses localStorage (`ageDisclaimerAccepted`)
   - Prevents body scrolling when displayed

**Component Loading Order**:
```
navbar-loader.js → language-switcher.js → age-disclaimer.js
footer-loader.js → (page-specific loaders)
```

### Page Structure

```
Root Pages: index.html, about.html, one-sixth.html, one-one.html, metal-build.html, custom.html

/info/
  - Content-driven pages using GitHub Gists
  - Markdown rendering via marked.js
  - Dual-language content containers

/inventory/
  - Airtable iframe embed pages
  - Products, brands, accessories, heads, bodies
  - Forms for adding content
  - 1:1 scale and 1:6 scale subdirectories

/components/
  - Reusable HTML snippets (navbar, footer, age-disclaimer, analytics)
```

### JavaScript Module Organization

| Module | Purpose |
|--------|---------|
| `navbar-loader.js` | Fetch navbar, initialize UI, manage dropdowns |
| `navbar-scroll.js` | Scroll-triggered navbar styling (adds `.scrolled` class) |
| `footer-loader.js` | Fetch footer, handle scroll-based visibility |
| `content-loader.js` | Fetch Gist markdown via GitHub API, render with marked.js |
| `iframe-handler.js` | Manage Airtable iframe loading/errors with retry logic |
| `loading-screen.js` | Animated loading screen with rotating ironic messages for iframe pages |
| `page-banner.js` | Smart banner image loader with PNG/JPG fallback and gradient default |
| `language-switcher.js` | Language state management, DOM updates, localStorage |
| `age-disclaimer.js` | Modal injection, acceptance tracking |
| `search.js` | Client-side search (DollInventorySearch class) |
| `analytics.js` | GA4 tracking wrapper (DollInventoryAnalytics class) |
| `clean-urls.js` | Remove .html extensions client-side |
| `mobile-menu.js` | Mobile navigation toggle and overlay |

**Design Patterns**:
- IIFE for scope isolation
- Class-based for stateful operations
- Singleton initialization via DOMContentLoaded
- Custom events for cross-module communication
- Graceful degradation with try-catch wrappers

### CSS Organization

**Main Stylesheet**: `css/styles.css` (21KB)
- CSS Custom Properties in `:root` (colors, typography, spacing)
- Global styles and typography
- Navbar, footer, language switcher styles
- Mobile menu and dropdown styles

**Feature-Specific Stylesheets**:
- `landing.css` / `landing-modern.css` - Homepage hero and sections
- `footer.css` / `footer-modern.css` - Footer positioning and animations
- `navbar-modern.css` - Modern navbar styling with scroll effects
- `iframe.css` / `iframe-enhanced.css` - Airtable iframe containers, loading states
- `loading-screen.css` - Loading screen animation and messages
- `page-banner.css` - Page banner styles with image/gradient backgrounds
- `notebook-cover.css` - Notebook-style cover sections
- `age-disclaimer-modern.css` - Modern age disclaimer modal styling
- `inventory.css` - Collection cards and filters
- `info.css` - Gist content pages
- `content.css` - Markdown rendering styles
- `about.css` - About page sections
- `metal-build.css` - Metal build showcase page
- `form.css` - Form styling for Airtable forms

**Naming Conventions**:
- BEM-inspired: `.navbar-container`, `.dropdown-content`
- State classes: `.active`, `.show`, `.loading`, `.loaded`
- Data attributes: `[data-lang-en]`, `[data-src]`

**Tailwind Integration**:
- Play CDN configured with `preflight: false`
- Used alongside custom CSS, not as replacement

### Multi-Language Support

**Languages**: English (en), Español (es), Español Chile (cl mapped to es)

**Implementation**:
1. Language preference stored in `localStorage.preferredLanguage`
2. HTML uses data attributes: `<span data-lang-en="..." data-lang-es="...">`
3. Language switcher updates DOM via `data-lang-*` attributes
4. Gist-based content loads separate markdown files per language
5. Custom event `language-changed` for page-specific reactions

**UI Elements**:
- Navbar: Flag buttons with inline-flex layout
- Footer: Mobile language switcher
- Active state via CSS `.active` class and `aria-pressed`

### Airtable Integration

**Pattern**: Embedded iframes with smart error handling

- Iframes use `data-src` for deferred loading
- 10-second timeout with loading overlay
- Error popup modal with retry/open-in-Airtable buttons
- Mobile detection for responsive height
- Bilingual error messages

**Error Flow**:
```
Load → Show overlay → Iframe onload → Hide overlay
                    ↓ (timeout)
                    Show error modal → Retry or open externally
```

### Content Loading (Gist-based pages)

**Content Sources**: GitHub Gists with markdown files

**Fetch Strategy** (with CORS fallbacks):
1. Direct raw URL
2. Anonymous raw URL
3. GitHub API endpoint
4. CORS proxy services (cors-anywhere, allorigins)

**Configuration**: `gistConfig` object maps page IDs to Gist IDs and filenames per language

**Rendering**: marked.js for markdown → highlight.js for code blocks → Tailwind classes applied

### Loading Screen System

The site includes a custom loading screen (`js/loading-screen.js`) that displays while Airtable iframes and page content load:

**Features**:
- **Rotating Messages**: Array of 20+ ironic/humorous loading messages that rotate every 3 seconds
- **Visual Elements**: Mascot image (`/assets/images/mascot/bunny-suit.png`), animated spinner, and animated dots
- **Honest Loading Indicators**: No fake progress bars - only shows actual loading status
- **Smart Triggers**:
  - Automatically shown on page load
  - Hides when iframe `#airtableFrame` loads successfully
  - 45-second timeout forces hide if content never loads
  - Detects `document.readyState` for immediate display
- **Final Message**: Shows "Done! That wasn't so bad... was it? 🎉" before fading out
- **Manual Control**: `window.hideLoadingScreen()` exposed for programmatic control
- **Accessibility**: Respects `prefers-reduced-motion` for animations

**Integration**: Add before closing `</body>` tag:
```html
<link rel="stylesheet" href="css/loading-screen.css">
<script src="/js/loading-screen.js"></script>
```

**Adding Messages**: Edit `loadingMessages` array in `js/loading-screen.js:10`

**Note**: Previous versions included a fake progress bar that animated to 95% over 30 seconds regardless of actual loading status. This was removed in favor of honest loading indicators.

### Page Banner System

Dynamic page banner with intelligent image loading (`js/page-banner.js`):

**Behavior**:
1. Checks for custom banner image at `/assets/images/banners/{page-name}.webp` (first priority)
2. Falls back to `/assets/images/banners/{page-name}.png` if WebP not found
3. Falls back to `/assets/images/banners/{page-name}.jpg` if PNG not found
4. Uses CSS gradient (defined in stylesheet) as final fallback
5. Adds `.has-custom-image` class when custom image successfully loads

**WebP Support**: The banner system now prioritizes WebP images for better performance (25-35% smaller file sizes). See `WEBP_IMPLEMENTATION.md` for conversion guidelines.

**Page Name Detection**:
- From `data-page` attribute on `.page-banner` element
- Or extracted from URL path (e.g., `/one-sixth.html` → `one-sixth`)

**Integration**: Requires element with `.page-banner` class:
```html
<div class="page-banner" data-page="custom-name">
  <!-- Banner content -->
</div>
<script src="/js/page-banner.js"></script>
```

## Google Analytics Setup

The site includes GA4 integration. To activate:

1. Get your Measurement ID from Google Analytics (format: G-XXXXXXXXXX)
2. Replace `G-RJ7GFZ6R5Q` in HTML files:
   - `index.html` (lines 99, 101)
   - `one-sixth.html`
   - `about.html`
   - Other pages with analytics

**Tracked Events**: Page views, search queries, collection browsing, external links, scroll depth

## SEO Features

- Comprehensive meta tags (Open Graph, Twitter Cards)
- Structured data (JSON-LD) for rich snippets
- Sitemap at `/sitemap.xml`
- Robots.txt for crawling instructions
- Canonical URLs on all pages

See `SEO_SETUP.md` for detailed SEO and analytics setup instructions.

## Documentation Files

The project includes comprehensive documentation for various features and implementations:

- **`WEBP_IMPLEMENTATION.md`**: Complete guide for converting images to WebP format
  - Priority images to convert (mascots, banners)
  - Conversion tools and quality guidelines
  - HTML patterns with `<picture>` elements
  - Performance testing procedures

- **`BLUR_OPTIMIZATION.md`**: Performance optimization documentation for backdrop-filter blur
  - Blur reduction strategy (20px → 10px → 6px → 0px)
  - Performance metrics and testing results
  - Browser compatibility and fallbacks
  - Visual trade-offs analysis

- **`TESTING_GUIDE.md`**: Comprehensive testing procedures
  - Accessibility testing (keyboard, screen reader, WCAG compliance)
  - Performance testing (Lighthouse, Core Web Vitals)
  - Cross-browser testing procedures
  - Mobile device testing

- **`SEO_SETUP.md`**: SEO and analytics setup instructions
  - Google Analytics configuration
  - Meta tags and structured data
  - Sitemap and robots.txt configuration

## File Modification Guidelines

### Adding New Pages

1. Create HTML file in appropriate directory (root, /info/, or /inventory/)
2. Include navbar and footer placeholders:
   ```html
   <div id="navbar-placeholder"></div>
   <!-- Your content -->
   <div id="footer-placeholder"></div>
   ```
3. Load required scripts:
   ```html
   <script src="/js/navbar-loader.js"></script>
   <script src="/js/footer-loader.js"></script>
   ```
4. **Optional**: Add loading screen for iframe pages:
   ```html
   <link rel="stylesheet" href="css/loading-screen.css">
   <script src="/js/loading-screen.js"></script>
   ```
5. **Optional**: Add page banner with custom image:
   ```html
   <div class="page-banner" data-page="page-name">
     <h1>Page Title</h1>
   </div>
   <script src="/js/page-banner.js"></script>
   ```
6. Update `/sitemap.xml` with new page
7. Add to navbar dropdown if needed (edit `/components/navbar.html`)

### Adding Gist Content Pages

1. Create Gist on GitHub with markdown files (one per language)
2. Add configuration to `js/content-loader.js`:
   ```javascript
   gistConfig = {
     'page-name': {
       en: { id: 'gist-id', file: 'en-file.md' },
       es: { id: 'gist-id', file: 'es-file.md' }
     }
   }
   ```
3. Create HTML page with dual content containers:
   ```html
   <div id="content-en" data-lang-container="en"></div>
   <div id="content-es" data-lang-container="es"></div>
   ```
4. Load content-loader.js and initialize

### Modifying Components

**Navbar Changes**:
- Edit `/components/navbar.html`
- Test mobile menu functionality
- Verify dropdown keyboard navigation (Escape key)
- Check language switcher integration

**Footer Changes**:
- Edit `/components/footer.html`
- Test scroll-triggered visibility
- Verify mobile language switcher

**Styling Changes**:
- Use CSS custom properties from `:root` in `css/styles.css`
- Keep feature-specific styles in separate CSS files
- Maintain responsive breakpoints (768px, 480px)

### Adding Languages

1. Add language code to `SUPPORTED_LANGUAGES` in `js/language-switcher.js`
2. Add flag button to navbar and footer
3. Add `data-lang-XX` attributes to translatable elements
4. Create Gist markdown files for content pages
5. Update language switcher initialization

## Common Patterns

### Loading External Content

```javascript
// Always use try-catch for fetch operations
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.text();
  // Process data
} catch (error) {
  console.error('Load failed:', error);
  // Show fallback UI
}
```

### Language-Aware Content

```html
<!-- HTML -->
<button data-lang-en="Click me" data-lang-es="Haz clic">Click me</button>

<!-- JavaScript updates via language-switcher.js -->
```

### Iframe with Error Handling

```html
<iframe id="airtableFrame"
  data-src="https://airtable.com/embed/..."
  loading="lazy">
</iframe>

<script src="/js/iframe-handler.js"></script>
```

### Adding Loading Screen

```html
<!-- In <head> -->
<link rel="stylesheet" href="css/loading-screen.css">

<!-- Before closing </body> -->
<script src="/js/loading-screen.js"></script>

<!-- Optional: Manual control in your code -->
<script>
  // Force hide loading screen
  window.hideLoadingScreen();
</script>
```

### Adding Page Banner with Custom Image

```html
<!-- HTML -->
<div class="page-banner" data-page="my-page">
  <h1>Page Title</h1>
</div>

<!-- Add image to /assets/images/banners/my-page.png or .jpg -->
<!-- Load script -->
<script src="/js/page-banner.js"></script>
```

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript (async/await, classes, arrow functions)
- CSS Grid and Flexbox required
- localStorage required for language/age disclaimer
- Backdrop filters for navbar/footer blur effects

## Accessibility Features

The site is WCAG 2.1 AA compliant with the following features:

**Keyboard Navigation**:
- Visible focus states on all interactive elements (3px solid #D4AF37 outline)
- Skip-to-content link for keyboard users
- Dropdown navigation with Escape key support
- Focus trap in mobile menu
- Tab order follows visual hierarchy

**Screen Reader Support**:
- ARIA landmarks (`role="navigation"`, `role="dialog"`, `role="menu"`)
- ARIA states (`aria-expanded`, `aria-pressed`, `aria-current="page"`)
- ARIA labels on interactive elements
- `aria-hidden="true"` on decorative SVGs
- `aria-live` regions for dynamic content

**Motion Accessibility**:
- Full `@media (prefers-reduced-motion: reduce)` support
- Disables all animations when user prefers reduced motion
- Instant transitions (0.01ms) instead of animations
- Respects OS-level accessibility settings

**Touch Targets**:
- Minimum 44x44px touch targets on all interactive elements (WCAG 2.5.5)
- Adequate spacing between interactive elements
- Mobile-optimized button sizes

**Visual Accessibility**:
- Current page indicator in navbar (`aria-current="page"`)
- High contrast color scheme (4.5:1 ratio)
- Focus visible indicators
- Semantic HTML (`<button>` instead of fake links)

See `/TESTING_GUIDE.md` for comprehensive accessibility testing procedures.

## Performance Considerations

**Core Web Vitals Optimizations**:
- CLS < 0.1 (Cumulative Layout Shift)
- LCP < 2.5s (Largest Contentful Paint)
- Optimized loading animations to prevent layout shift

**Image Optimization**:
- WebP support with PNG/JPG fallbacks (25-35% file size reduction)
- Explicit width/height on all images to prevent layout shift
- Lazy loading on iframes and images
- See `WEBP_IMPLEMENTATION.md` for WebP conversion guidelines

**CSS Performance**:
- Reduced backdrop-filter blur for GPU optimization:
  - Desktop: 10px blur (reduced from 20px, -30-40% GPU cost)
  - Mobile: 6px blur (reduced from 10px, -50-60% GPU cost)
  - Low-end devices: No blur (0px, -100% GPU cost)
- `will-change` hints on frequently animated elements
- See `BLUR_OPTIMIZATION.md` for performance metrics

**JavaScript Performance**:
- Preload critical resources in `<head>`
- Debounced search input (150ms)
- Throttled scroll handlers
- Resource preconnect for fonts and analytics
- Component loading on DOMContentLoaded
- IIFE pattern for scope isolation and memory efficiency

**Loading UX**:
- Removed misleading progress bars (was fake 30s animation)
- Honest loading indicators (spinner, rotating messages)
- 45-second timeout with error handling
- No fake progress that doesn't reflect actual loading status

## Deployment

The site is deployed via GitHub Pages. Any push to `main` branch triggers automatic deployment.

**Manual deployment**:
```bash
make deploy
```

This builds the site, commits changes, and pushes to GitHub.
