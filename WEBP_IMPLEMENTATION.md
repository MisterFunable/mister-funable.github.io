# WebP Image Implementation Guide

## Overview

WebP is a modern image format that provides superior compression for images on the web. Implementing WebP can reduce image file sizes by 25-35% compared to PNG/JPG, improving page load times and Core Web Vitals scores.

## Benefits

- **Smaller file sizes**: 25-35% smaller than PNG/JPG
- **Faster loading**: Reduces bandwidth and improves LCP (Largest Contentful Paint)
- **Browser support**: 97%+ browser support (all modern browsers)
- **Lossless and lossy**: Supports both compression modes

## Priority Images to Convert

### High Priority (Largest Impact)
1. **Mascot Images** (560KB+ each):
   - `/assets/images/mascot/bunny-suit.png`
   - `/assets/images/iratsutoya-style/yukata-*.png` (6 files)
   - `/assets/images/iratsutoya-style/chilean-dress-*.png`

2. **Banner Images** (~200KB+ each):
   - `/assets/images/banners/*.png`
   - `/assets/images/banners/*.jpg`

### Medium Priority
3. **Collection Images**: Any large product/doll photos
4. **Background Images**: Decorative backgrounds

### Low Priority (Already Small)
5. **Flag Icons**: `/assets/img/flags/*.png` (~5KB each)
6. **Icons and SVGs**: Keep as-is (SVGs preferred)

## Conversion Process

### Using cwebp (Command Line)

Install cwebp:
```bash
# macOS
brew install webp

# Ubuntu/Debian
sudo apt-get install webp

# Windows
# Download from: https://developers.google.com/speed/webp/download
```

Convert images:
```bash
# High quality (85-90 for photos, 90-95 for graphics)
cwebp -q 90 input.png -o output.webp

# Batch convert all PNGs in a directory
for file in *.png; do
  cwebp -q 90 "$file" -o "${file%.png}.webp"
done

# Batch convert all JPGs
for file in *.jpg; do
  cwebp -q 85 "$file" -o "${file%.jpg}.webp"
done
```

### Using Online Tools

- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **CloudConvert**: https://cloudconvert.com/png-to-webp
- **Online-Convert**: https://image.online-convert.com/convert-to-webp

### Quality Guidelines

- **Photos/Mascots**: Quality 85-90
- **Graphics/UI**: Quality 90-95
- **Always compare**: Ensure visual quality is acceptable

## HTML Implementation

### Basic Pattern

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="Description" width="400" height="300" loading="lazy">
</picture>
```

### Responsive Images with WebP

```html
<picture>
  <!-- WebP versions -->
  <source
    srcset="image-small.webp 480w, image-medium.webp 768w, image-large.webp 1200w"
    type="image/webp"
    sizes="(max-width: 768px) 100vw, 50vw">

  <!-- PNG/JPG fallback -->
  <source
    srcset="image-small.png 480w, image-medium.png 768w, image-large.png 1200w"
    sizes="(max-width: 768px) 100vw, 50vw">

  <img
    src="image-medium.png"
    alt="Description"
    width="768"
    height="512"
    loading="lazy">
</picture>
```

### Hero Mascot Example

```html
<!-- English Mascot -->
<picture>
  <source srcset="/assets/images/mascot/bunny-suit.webp" type="image/webp">
  <img
    src="/assets/images/mascot/bunny-suit.png"
    alt="Doll Inventory Mascot"
    class="hero-mascot"
    width="400"
    height="560"
    loading="eager"
    data-normal="/assets/images/mascot/bunny-suit.webp"
    data-hover="/assets/images/mascot/bunny-suit-wave.webp">
</picture>
```

## Files to Update

### Already Updated with WebP Support

The following files have been updated with `<picture>` elements for WebP support. After converting images to WebP, place them in the same directory as the originals.

1. **index.html**: Hero mascot images (en, jp, es)
2. **components/footer.html**: Social icons (optional - already small)

### Need Manual Update

These files should be updated following the pattern above:

- `about.html`: Mascot images
- `/inventory/*/products.html`: Product images (if local)
- Banner images: Any page using page-banner.js

## JavaScript Considerations

### Dynamic Image Loading

If changing images dynamically (like the mascot hover effects in index.html), update the JS to use WebP:

```javascript
// Before
mascot.src = '/assets/images/mascot/bunny-suit.png';

// After - with WebP detection
function getImagePath(basePath) {
  const ext = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0 ? 'webp' : 'png';
  return basePath.replace(/\.(png|jpg)$/, `.${ext}`);
}

mascot.src = getImagePath('/assets/images/mascot/bunny-suit.png');
```

### Page Banner System

Update `js/page-banner.js` to check for WebP first:

```javascript
// Add WebP check before PNG check
async function loadBannerImage(pageName) {
  const extensions = ['webp', 'png', 'jpg'];

  for (const ext of extensions) {
    const url = `/assets/images/banners/${pageName}.${ext}`;
    if (await imageExists(url)) {
      return url;
    }
  }
  return null;
}
```

## Performance Testing

After implementing WebP, test the improvements:

### Before/After Comparison

```bash
# Check file sizes
ls -lh assets/images/mascot/
# Before: bunny-suit.png = 560KB
# After:  bunny-suit.webp = ~350KB (37% reduction)
```

### Lighthouse Audit

1. Open DevTools > Lighthouse
2. Run Performance audit
3. Check "Serve images in next-gen formats" - should be green
4. Compare LCP scores before/after

### Expected Improvements

- **Page weight**: -20% to -30% reduction
- **LCP improvement**: 200-500ms faster
- **Lighthouse score**: +5 to +10 points

## Migration Checklist

- [ ] Install webp conversion tool (cwebp or Squoosh)
- [ ] Convert high-priority images (mascots, banners)
- [ ] Update HTML files with `<picture>` elements
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Verify fallback images load in older browsers
- [ ] Run Lighthouse audit to confirm improvements
- [ ] Update page-banner.js for WebP support
- [ ] Document any dynamic image loading changes

## Rollback Plan

If issues occur:
1. Remove `<source type="image/webp">` elements
2. Keep original PNG/JPG in `<img>` tags
3. Delete .webp files to free space
4. No code changes needed - graceful degradation works automatically

## Browser Support

WebP is supported in:
- ✅ Chrome 32+ (2014)
- ✅ Firefox 65+ (2019)
- ✅ Safari 14+ (2020)
- ✅ Edge 18+ (2018)
- ❌ IE 11 (falls back to PNG/JPG)

The `<picture>` element provides automatic fallback for unsupported browsers.
