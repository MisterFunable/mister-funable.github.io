# Variables
SHELL := /bin/bash
BUNDLE := bundle
JEKYLL := jekyll
PYTHON := python3

# Colors for terminal output
CYAN := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RED := \033[31m
RESET := \033[0m

# Directories
DIST_DIR := _site
ASSETS_DIR := assets
CSS_DIR := css
JS_DIR := js

.PHONY: all clean install serve build format help deploy

# Default target
all: help

# Install dependencies
install:
	@echo "$(CYAN)Installing dependencies...$(RESET)"
	@if ! command -v $(BUNDLE) >/dev/null; then \
		echo "$(YELLOW)Installing Bundler...$(RESET)"; \
		gem install bundler; \
	fi
	@$(BUNDLE) install
	@echo "$(GREEN)Dependencies installed successfully!$(RESET)"

# Start development server
serve:
	@echo "$(CYAN)Starting development server...$(RESET)"
	@$(BUNDLE) exec $(JEKYLL) serve --livereload

# Build the site
build:
	@echo "$(CYAN)Building site...$(RESET)"
	@$(BUNDLE) exec $(JEKYLL) build
	@echo "$(GREEN)Build completed successfully!$(RESET)"

# Clean built files
clean:
	@echo "$(CYAN)Cleaning built files...$(RESET)"
	@rm -rf $(DIST_DIR)
	@rm -rf .sass-cache
	@rm -rf .jekyll-cache
	@echo "$(GREEN)Cleaned successfully!$(RESET)"

# Format HTML files
format-html:
	@echo "$(CYAN)Formatting HTML files...$(RESET)"
	@find . -name "*.html" -not -path "./$(DIST_DIR)/*" -not -path "./vendor/*" -exec prettier --write {} +

# Format CSS files
format-css:
	@echo "$(CYAN)Formatting CSS files...$(RESET)"
	@find $(CSS_DIR) -name "*.css" -exec prettier --write {} +

# Format JavaScript files
format-js:
	@echo "$(CYAN)Formatting JavaScript files...$(RESET)"
	@find $(JS_DIR) -name "*.js" -exec prettier --write {} +

# Format all files
format: format-html format-css format-js
	@echo "$(GREEN)All files formatted successfully!$(RESET)"

# Start local server for testing
local:
	@echo "$(CYAN)Starting local server...$(RESET)"
	@$(PYTHON) -m http.server 8000

# Deploy to GitHub Pages
deploy:
	@echo "$(CYAN)Deploying to GitHub Pages...$(RESET)"
	@git checkout main
	@git pull origin main
	@make build
	@git add .
	@read -p "Enter commit message: " message; \
	git commit -m "$$message"
	@git push origin main
	@echo "$(GREEN)Deployed successfully!$(RESET)"

# Validate HTML files
validate:
	@echo "$(CYAN)Validating HTML files...$(RESET)"
	@find . -name "*.html" -not -path "./$(DIST_DIR)/*" -not -path "./vendor/*" -exec html5validator {} +

# Show help
help:
	@echo "$(CYAN)Available commands:$(RESET)"
	@echo "  $(GREEN)make install$(RESET)      - Install project dependencies"
	@echo "  $(GREEN)make serve$(RESET)        - Start development server with live reload"
	@echo "  $(GREEN)make build$(RESET)        - Build the site"
	@echo "  $(GREEN)make clean$(RESET)        - Clean built files"
	@echo "  $(GREEN)make format$(RESET)       - Format all files (HTML, CSS, JS)"
	@echo "  $(GREEN)make serve-local$(RESET)  - Start local Python server"
	@echo "  $(GREEN)make deploy$(RESET)       - Deploy to GitHub Pages"
	@echo "  $(GREEN)make validate$(RESET)     - Validate HTML files"
	@echo "  $(GREEN)make help$(RESET)         - Show this help message"
