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
| `footer-loader.js` | Fetch footer, handle scroll-based visibility |
| `content-loader.js` | Fetch Gist markdown via GitHub API, render with marked.js |
| `iframe-handler.js` | Manage Airtable iframe loading/errors with retry logic |
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
- `landing.css` - Homepage hero and sections
- `footer.css` - Footer positioning and animations
- `iframe.css` - Airtable iframe containers, loading states
- `inventory.css` - Collection cards and filters
- `info.css` - Gist content pages
- `content.css` - Markdown rendering styles
- `about.css` - About page sections

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
4. Update `/sitemap.xml` with new page
5. Add to navbar dropdown if needed (edit `/components/navbar.html`)

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

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript (async/await, classes, arrow functions)
- CSS Grid and Flexbox required
- localStorage required for language/age disclaimer
- Backdrop filters for navbar/footer blur effects

## Performance Considerations

- Preload critical resources in `<head>`
- Lazy loading on iframes (`loading="lazy"`)
- Debounced search input (150ms)
- Throttled scroll handlers
- Resource preconnect for fonts and analytics
- Component loading on DOMContentLoaded

## Deployment

The site is deployed via GitHub Pages. Any push to `main` branch triggers automatic deployment.

**Manual deployment**:
```bash
make deploy
```

This builds the site, commits changes, and pushes to GitHub.
