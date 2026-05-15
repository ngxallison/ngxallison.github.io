# Allison Ng — Portfolio Site

A music-themed Jekyll portfolio site built for GitHub Pages.

## 🎵 Theme
Vintage record shop / hi-fi studio aesthetic — dark ink backgrounds, gold accents,
vinyl record animations, and a decorative audio player bar.

## 🚀 Deploy to GitHub Pages

### 1. Create a new GitHub repository
Name it `yourusername.github.io` (replace with your actual GitHub username)
for it to be available at `https://yourusername.github.io`.

### 2. Push this folder to GitHub
```bash
cd allison-portfolio
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to your repo → Settings → Pages
- Under "Source", select **Deploy from a branch**
- Choose **main** branch, **/ (root)** folder
- Click Save — your site will be live in ~1 minute!

### 4. Customize
- **`_config.yml`** — update `url` with your GitHub Pages URL
- **`index.html`** — update LinkedIn/GitHub hrefs with your real profile URLs
- **`_layouts/default.html`** — update meta tags as needed

## 🛠 Run Locally (optional)
```bash
gem install bundler
bundle install
bundle exec jekyll serve
# Open http://localhost:4000
```

## 📁 Structure
```
allison-portfolio/
├── _layouts/
│   └── default.html       # Base HTML layout
├── _includes/
│   ├── nav.html            # Navigation bar
│   ├── audio-bar.html      # Decorative music player
│   └── vinyl-cursor.html   # Custom vinyl cursor
├── assets/
│   ├── css/main.css        # All styles
│   └── js/main.js          # Interactions
├── _config.yml             # Jekyll config
├── Gemfile                 # Ruby dependencies
└── index.html              # Main page content
```
