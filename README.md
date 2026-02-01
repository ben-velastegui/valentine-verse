# 💕 Valentineverse - Interactive Valentine's Day Experience

A playful, interactive web experience built for Diya featuring smile detection, AR heart catching, and personalized Pixar-style videos.

## 📁 File Structure

```
valentineverse/
├── index.html              # Main HTML file
├── styles.css              # All styling and animations
├── script.js               # All JavaScript functionality
├── cosmic-odds.mp4         # Video 1: The Cosmic Odds (15 sec)
├── holiday-magic.mp4       # Video 2: Holiday Magic (8 sec)
├── early-years.mp4         # Video 3: Early Years (8 sec)
├── the-big-question.mp4    # Video 4: The Big Question (15 sec)
└── background-music.mp3    # Background music (optional)
```

## 🎬 Videos You Need

Place these 4 videos in the same folder as your HTML files:

1. **cosmic-odds.mp4** - The 15-second cosmic odds video
2. **holiday-magic.mp4** - The 8-second holiday memories video
3. **early-years.mp4** - The 8-second early years video
4. **the-big-question.mp4** - The 15-second Valentine's question video

## 🎵 Background Music (Optional)

Add a file called `background-music.mp3` for background music. If you don't have one, you can:
- Download free music from YouTube Audio Library
- Use any romantic/soft instrumental MP3
- Or skip it entirely (the app will work without it)

**Important:** The music file MUST be named `background-music.mp3` and be in MP3 format. Some browsers may block autoplay, but the music will start after the user clicks to begin.

## 🚀 How to Test Locally

### Option 1: Simple HTTP Server (Recommended)

1. Open terminal/command prompt in the valentineverse folder
2. Run one of these commands:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (if you have npx):**
```bash
npx http-server
```

3. Open browser to `http://localhost:8000`

### Option 2: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 3: Direct File Open (Limited)

Double-click `index.html` - but camera features may not work due to browser security.

## 🌐 How to Deploy (Host Online)

### Option 1: Vercel (Easiest, FREE)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/Google
3. Click "Add New Project"
4. Drag and drop your entire valentineverse folder
5. Click Deploy
6. Get your link: `https://yourproject.vercel.app`

### Option 2: Netlify (FREE)

1. Go to [netlify.com](https://netlify.com)
2. Sign up
3. Drag and drop your valentineverse folder onto the page
4. Get your link: `https://yourproject.netlify.app`

### Option 3: GitHub Pages (FREE)

1. Create a GitHub account
2. Create a new repository called `valentineverse`
3. Upload all files
4. Go to Settings > Pages
5. Enable GitHub Pages
6. Get your link: `https://yourusername.github.io/valentineverse`

## 🎮 User Flow

1. **Landing Page**: Smile to unlock → Uses camera to detect smile
2. **Video 1**: Cosmic Odds plays automatically (15 sec)
3. **AR Game**: Catch 3 hearts using your camera
4. **Unlocked Videos**: Choose from 3 unlocked options:
   - Holiday Magic (8 sec)
   - Early Years (8 sec)
   - The Big Question (15 sec)
5. **Answer**: YES/NO buttons (NO button runs away!)
6. **Celebration**: Confetti explosion when YES is clicked

## 🎨 Features

✅ Smile detection to unlock
✅ Floating animated hearts background
✅ AR heart catching game
✅ Sequential video unlocking
✅ Escaping NO button
✅ Confetti celebration
✅ Background music (pauses during videos)
✅ Fully responsive (works on mobile & desktop)
✅ Playful, cute Valentine's theme
✅ Sparkle effects

## 🔧 Troubleshooting

### Camera not working?
- Make sure you're using HTTPS (required for camera)
- Check browser permissions
- Try a different browser (Chrome/Firefox work best)

### Videos not playing?
- Check that video files are named exactly: `cosmic-odds.mp4`, `holiday-magic.mp4`, `early-years.mp4`, `the-big-question.mp4`
- Make sure videos are in the same folder as index.html
- Try converting videos to MP4 format if they're not already

### Music not playing?
- Some browsers block autoplay - user interaction is needed
- Make sure file is named `background-music.mp3`
- Check file format (must be MP3)

### Site not loading after deployment?
- Make sure ALL files are uploaded (HTML, CSS, JS, videos, music)
- Check browser console for errors (F12)
- Try clearing cache and refreshing

## 📱 Mobile Compatibility

The app works on mobile! Make sure to:
- Test on your phone before sending
- Grant camera permissions when prompted
- Use Chrome or Safari for best results

## 🎁 Sending to Diya

Once deployed, you'll get a link like:
- `https://valentineverse.vercel.app`
- `https://valentineverse.netlify.app`

Send her that link on Valentine's Day! 💕

## ⚡ Quick Customization

### Change colors:
Edit `styles.css` - look for color codes like `#ff6b9d`

### Change text:
Edit `index.html` - search for text you want to change

### Add more hearts:
In `script.js`, change the interval in `createFloatingHearts()`

## 💡 Tips

- Test everything BEFORE Valentine's Day
- Make sure videos are the right length
- Test on both desktop and mobile
- Have a backup plan (download videos to show her manually if tech fails!)

## 🆘 Need Help?

- Check browser console (F12) for errors
- Make sure all files are in the same folder
- Verify video filenames match exactly
- Test camera permissions in browser settings

---

**Built with love for Diya 💕**
**Happy Valentine's Day 2026!**
