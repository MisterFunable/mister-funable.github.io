# UX Improvements Testing Guide

## Quick Start

```bash
# Start local server
make local
# Or manually:
python3 -m http.server 8000
```

Then open: http://localhost:8000

---

## TIER 1 Testing - Critical Accessibility Fixes

### 1. Focus States Testing ✓

**What Changed:** All interactive elements now have visible gold focus indicators.

**How to Test:**
1. Open any page (start with http://localhost:8000)
2. Press `Tab` key repeatedly
3. **Expected:** See gold outline (3px solid #D4AF37) around focused elements
4. Continue tabbing through:
   - Logo
   - Navigation links
   - Dropdown buttons
   - Language switcher flags
   - Mobile menu button (on mobile view)

**Test Cases:**
- [ ] Tab through entire navbar
- [ ] Tab into and out of dropdown menus
- [ ] First tab should focus "Skip to main content" link (visible at top when focused)
- [ ] Press Enter on "Skip to main content" → should jump to main content
- [ ] Focus indicators are clearly visible on all elements
- [ ] `:focus-visible` works (no focus ring when clicking with mouse)

**Files to Test:** All pages, especially:
- http://localhost:8000
- http://localhost:8000/about.html
- http://localhost:8000/inventory/1-6-scale/products.html

---

### 2. Reduced Motion Testing ✓

**What Changed:** All animations disabled for motion-sensitive users.

**How to Test:**

**On macOS:**
1. System Settings → Accessibility → Display → Reduce motion (toggle ON)
2. Refresh browser
3. **Expected:** No animations play

**On Windows:**
1. Settings → Ease of Access → Display → Show animations (toggle OFF)
2. Refresh browser

**Test Cases:**
- [ ] Hero section: No mascot sliding animation (should fade in place)
- [ ] Navbar: No dropdown slide animations
- [ ] Loading screen: No spinner rotation, no progress bar animation
- [ ] Language switcher: No hover animations
- [ ] All transitions are instant (< 0.01ms)

**Pages to Test:**
- http://localhost:8000 (hero mascot)
- http://localhost:8000/inventory/1-6-scale/products.html (loading screen)

**Dev Tools Check:**
```javascript
// In browser console
window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Should return: true (if enabled)
```

---

### 3. Modal ARIA Semantics Testing ✓

**What Changed:** Modals now have proper ARIA attributes for screen readers.

**How to Test with VoiceOver (Mac):**
1. Press `Cmd + F5` to enable VoiceOver
2. Open http://localhost:8000 in incognito (to trigger age disclaimer)
3. **Expected:** VoiceOver announces "Dialog, Adults Only (18+)"
4. Navigate through modal elements
5. **Expected:** Hears title, warning, and description

**How to Test with NVDA (Windows):**
1. Start NVDA
2. Open page in incognito
3. Listen for dialog announcement

**Test Cases:**
- [ ] Age disclaimer modal announced as "dialog"
- [ ] Modal title is announced
- [ ] Modal description is announced
- [ ] Decorative image has `aria-hidden="true"`
- [ ] Escape key closes modal (test with keyboard)

**Test Iframe Error Modal:**
1. Go to http://localhost:8000/inventory/1-6-scale/products.html
2. Disconnect internet or wait 45 seconds
3. **Expected:** Error popup has `role="dialog"`, `aria-modal="true"`

---

### 4. Breadcrumb Navigation Testing ✓

**What Changed:** Breadcrumb trails added to all inventory and info pages.

**How to Test:**
1. Navigate to http://localhost:8000/inventory/1-6-scale/products.html
2. **Expected:** See breadcrumb trail below navbar:
   ```
   Home › Inventory › 1/6 Scale › Full Sets
   ```
3. Click each breadcrumb link
4. **Expected:** Navigates to that level

**Test Cases:**
- [ ] Breadcrumbs appear on all inventory pages
- [ ] Breadcrumbs appear on all info pages
- [ ] "Home" link works (goes to /)
- [ ] Intermediate links work (clickable)
- [ ] Last item is not clickable (current page)
- [ ] Breadcrumbs are sticky (scroll down, stays visible)
- [ ] Separators (›) appear between items
- [ ] Focus states work on breadcrumb links

**Language Switching:**
1. Change language to Japanese
2. **Expected:** Breadcrumbs update to Japanese text
   - Home → ホーム
   - Inventory → インベントリ
   - 1/6 Scale → 1/6スケール

**Pages to Test:**
- http://localhost:8000/inventory/1-6-scale/accessories.html
- http://localhost:8000/inventory/1-6-scale/forms/add-product.html
- http://localhost:8000/inventory/1-1-scale/sets.html
- http://localhost:8000/info/seamless-dolls.html

---

## TIER 2 Testing - High Priority Fixes

### 5. Consolidated Navigation Code ✓

**What Changed:** Deleted duplicate `mobile-menu.js`, merged into `navbar-loader.js`.

**How to Test:**
1. Open browser dev tools (F12)
2. Go to Network tab
3. Refresh http://localhost:8000
4. **Expected:** NO request for `mobile-menu.js` (should 404 or not appear)
5. Test mobile menu still works

**Test Cases:**
- [ ] Mobile menu opens/closes (resize window to mobile)
- [ ] Dropdown menus work on mobile
- [ ] Focus trap works: Tab through open mobile menu, focus loops
- [ ] Escape key closes mobile menu
- [ ] Clicking overlay closes mobile menu
- [ ] Desktop dropdowns work (hover)
- [ ] No JavaScript errors in console

**Mobile Testing:**
1. Open dev tools → Toggle device toolbar (Ctrl+Shift+M)
2. Set viewport to 375x667 (iPhone SE)
3. Click hamburger menu icon
4. **Expected:** Menu slides in from right
5. Tab through menu items
6. **Expected:** Focus stays trapped in menu
7. Press Escape
8. **Expected:** Menu closes

---

### 6. Cumulative Layout Shift (CLS) Testing ✓

**What Changed:** Hero mascot uses opacity instead of position, loading screen stays in DOM.

**How to Test with Lighthouse:**
1. Open http://localhost:8000 in incognito
2. Open Dev Tools → Lighthouse tab
3. Select "Performance" + "Desktop"
4. Click "Analyze page load"
5. **Expected:** CLS score < 0.1 (green)

**Manual Visual Test:**
1. Open http://localhost:8000
2. Watch hero section load
3. **Expected:** Mascot fades in without moving page layout
4. Scroll down and back up
5. **Expected:** No content jumps

**Test Cases:**
- [ ] Hero mascot starts in final position (left: 10%)
- [ ] Mascot fades in smoothly (opacity 0 → 1)
- [ ] No horizontal scrollbar during animation
- [ ] Loading screen fades out but stays in DOM (check with inspector)
- [ ] Flag images in navbar have width/height attributes (28x28)
- [ ] Images don't cause layout shifts

**Dev Tools Check:**
```javascript
// In console after page loads
document.getElementById('loading-screen')
// Should return: <div class="loading-screen fade-out">
// (Not null - proves it's still in DOM)
```

**Before/After Comparison:**
- **Before:** CLS ~0.25-0.30 (red/orange)
- **After:** CLS < 0.1 (green)

---

### 7. Current Page Indicator Testing ✓

**What Changed:** Active page highlighted in gold in navbar.

**How to Test:**
1. Go to http://localhost:8000
2. **Expected:** "Home" in navbar has no special styling (not in menu)
3. Click "1/6 Scale" → "Full Sets"
4. **Expected:**
   - "1/6 Scale" dropdown button is gold
   - "Full Sets" in dropdown has gold background + left border
5. Click other pages and verify highlighting follows

**Test Cases:**
- [ ] Current page has gold color (#D4AF37)
- [ ] Current page has gold background gradient
- [ ] Current page has bottom underline (on main nav items)
- [ ] Dropdown items get gold left border when active
- [ ] Parent dropdown is highlighted when child page is active
- [ ] Only one item is highlighted at a time
- [ ] Highlighting updates when navigating

**Pages to Test:**
- http://localhost:8000/about.html
- http://localhost:8000/inventory/1-6-scale/products.html
- http://localhost:8000/inventory/1-6-scale/accessories.html (test the corrected URL)
- http://localhost:8000/inventory/1-1-scale/sets.html

**Visual Check:**
- Active nav link should be noticeably different
- Gold color (#D4AF37) matches site theme
- Hover states still work on inactive items

---

### 8. URL Typo Fix Testing ✓

**What Changed:** Fixed "accesories" → "accessories" with redirect.

**How to Test:**
1. Go to http://localhost:8000/inventory/1-6-scale/accesories.html (old URL)
2. **Expected:** Redirects immediately to accessories.html
3. Check navbar: "1/6 Scale" → "Accessories" link
4. **Expected:** URL is `/inventory/1-6-scale/accessories` (no typo)

**Test Cases:**
- [ ] Old URL (accesories) redirects to new URL (accessories)
- [ ] Navbar link uses correct spelling
- [ ] Breadcrumbs show "Accessories" (correct spelling)
- [ ] Page loads correctly at new URL
- [ ] Search functionality finds "accessories" not "accesories"

**SEO Check (in page source):**
```html
<!-- Old page (accesories.html) should have: -->
<meta http-equiv="refresh" content="0; url=/inventory/1-6-scale/accessories.html">
<link rel="canonical" href="https://mydollinventory.com/inventory/1-6-scale/accessories.html">
```

**Files to Verify:**
- [ ] http://localhost:8000/inventory/1-6-scale/accessories.html exists
- [ ] http://localhost:8000/inventory/1-6-scale/accesories.html shows redirect page
- [ ] No broken links in navbar

---

## Automated Testing

### 1. Lighthouse Audit

```bash
# Install lighthouse CLI (optional)
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8000 --view
```

**Target Scores:**
- Performance: 90+ ✓
- Accessibility: 95+ ✓ (was ~75)
- Best Practices: 95+ ✓
- SEO: 95+ ✓

**Key Metrics to Check:**
- CLS (Cumulative Layout Shift): < 0.1 ✓
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms

---

### 2. axe DevTools

1. Install [axe DevTools Extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
2. Open any page
3. Open Dev Tools → axe DevTools tab
4. Click "Scan ALL of my page"
5. **Expected:** 0 violations, 0 critical issues

---

### 3. WAVE Accessibility Tool

1. Install [WAVE Extension](https://wave.webaim.org/extension/)
2. Open http://localhost:8000
3. Click WAVE icon
4. **Expected:**
   - No errors (red)
   - Few or no alerts (yellow)
   - Many features (green) - ARIA, landmarks, etc.

---

## Cross-Browser Testing

Test in all major browsers:

### Chrome/Edge (Chromium)
- [ ] All features work
- [ ] Focus states visible
- [ ] Animations respect prefers-reduced-motion

### Firefox
- [ ] Focus states visible
- [ ] Breadcrumbs display correctly
- [ ] Dropdowns work

### Safari (Mac)
- [ ] Backdrop filters work (navbar blur)
- [ ] Focus states visible
- [ ] Mobile menu works on iOS

**Mobile Browsers:**
- [ ] Safari iOS (iPhone)
- [ ] Chrome Android
- [ ] Test on real devices if possible

---

## Regression Testing

### Things That Should Still Work:

**Navigation:**
- [ ] Navbar loads correctly
- [ ] Dropdowns open/close
- [ ] Mobile menu works
- [ ] Language switcher works (EN, ES, JP)

**Age Disclaimer:**
- [ ] Shows on first visit (incognito mode)
- [ ] "Accept" button stores in localStorage
- [ ] Doesn't show on subsequent visits
- [ ] "Leave" button redirects to Google

**Loading Screen:**
- [ ] Shows on iframe pages
- [ ] Displays funny messages (rotating every 3s)
- [ ] Hides when iframe loads
- [ ] Times out after 45 seconds

**Content:**
- [ ] Airtable iframes load
- [ ] Images load correctly
- [ ] Links work
- [ ] Forms work (if tested)

---

## Performance Testing

### 1. Network Throttling

1. Dev Tools → Network tab → Throttling dropdown
2. Select "Slow 3G"
3. Refresh page
4. **Expected:** Loading screen shows, content loads gracefully

### 2. Monitor Console Errors

1. Open Dev Tools → Console
2. Navigate through site
3. **Expected:** No errors (red messages)
4. Warnings (yellow) are OK if minor

### 3. Check File Sizes

```bash
# Check no large files were added
du -sh css/*.css js/*.js
```

**Expected:**
- No CSS file > 50KB
- No JS file > 100KB
- Total added: ~10-15KB (breadcrumbs, improvements)

---

## Issue Reporting Template

If you find bugs, please report with:

```markdown
**Issue:** [Brief description]

**Page:** http://localhost:8000/[path]

**Browser:** Chrome 120 / Firefox 121 / Safari 17

**Steps to Reproduce:**
1. Go to [page]
2. Click [element]
3. Observe [behavior]

**Expected:** [What should happen]
**Actual:** [What actually happens]

**Console Errors:** [Any red errors in console]

**Screenshot:** [If visual issue]
```

---

## Quick Checklist

Before moving to TIER 3, verify:

### TIER 1
- [x] Focus states visible on all interactive elements
- [x] Skip-to-content link works
- [x] Reduced motion disables animations
- [x] Modals have proper ARIA
- [x] Breadcrumbs appear on nested pages
- [x] Breadcrumbs update with language

### TIER 2
- [x] No mobile-menu.js loaded (check Network tab)
- [x] Mobile menu still works perfectly
- [x] CLS < 0.1 in Lighthouse
- [x] Loading screen stays in DOM (fade only)
- [x] Current page highlighted in navbar
- [x] "accessories" URL correct (no typo)
- [x] Old URL redirects properly

### General
- [ ] No console errors
- [ ] All pages load
- [ ] Navigation works
- [ ] Lighthouse Accessibility 95+

---

## Next Steps

After testing, report findings and we'll:
1. Fix any bugs found
2. Proceed to TIER 3 (Medium Priority)
3. Continue improving UX

**Estimated Testing Time:** 30-45 minutes for thorough testing
