# Custom Banner Images

This folder contains custom banner images for pages across the site.

## How it works

The banner system automatically checks for custom images based on the page name:

- For `one-sixth.html` → looks for `one-sixth.png` or `one-sixth.jpg`
- For `guides.html` → looks for `guides.png` or `guides.jpg`
- For `youtube.html` → looks for `youtube.png` or `youtube.jpg`
- etc.

## Fallback behavior

If no custom image is found, the banner will display a default gradient background (dark blue-gray gradient).

## Image specifications

- **Format**: PNG or JPG
- **Recommended size**: 1920x280px (or similar aspect ratio)
- **File naming**: Must match the page filename (without `.html` extension)

## Examples

```
assets/images/banners/
├── one-sixth.png       ← Custom banner for one-sixth.html
├── guides.jpg          ← Custom banner for guides.html
├── youtube.png         ← Custom banner for youtube.html
└── README.md           ← This file
```

## Adding a new banner

1. Create your banner image (1920x280px recommended)
2. Name it to match your page (e.g., `products.png` for `products.html`)
3. Place it in this folder
4. The system will automatically detect and use it!
