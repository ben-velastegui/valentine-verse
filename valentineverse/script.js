// State management
let gameState = {
    heartsCaught: 0,
    unlocksViewed: [false, false, false],
    currentScreen: 'landing-page'
};

// Background music
const bgMusic = document.getElementById('background-music');
let musicStarted = false;

// Initialize floating hearts background
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '🩷'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        if (Math.random() > 0.5) {
            heart.classList.add('sparkle');
        }
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }, 300);
}

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
    
    // Pause all videos
    document.querySelectorAll('video').forEach(video => {
        if (!video.id.includes('webcam') && !video.id.includes('ar-webcam')) {
            video.pause();
        }
    });
}

// Start background music
function startBackgroundMusic() {
    if (!musicStarted) {
        bgMusic.play().catch(e => console.log('Music autoplay prevented'));
        musicStarted = true;
    }
}

// Stop background music
function stopBackgroundMusic() {
    bgMusic.pause();
}

// SMILE DETECTION
let detector;
let smileDetected = false;

async function setupSmileDetection() {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('overlay');
    const ctx = canvas.getContext('2d');
    const status = document.getElementById('smile-status');
    
    try {
        // Get webcam access
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' } 
        });
        video.srcObject = stream;
        
        // Wait for video to load
        await new Promise(resolve => {
            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                resolve();
            };
        });
        
        // Load face detection model
        status.textContent = 'Loading face detection...';
        detector = await window.faceLandmarksDetection.createDetector(
            window.faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
            { runtime: 'tfjs' }
        );
        
        status.textContent = 'Smile to continue! 😊';
        
        // Detect smiles
        detectSmile(video, ctx, status);
        
    } catch (error) {
        console.error('Error setting up smile detection:', error);
        status.textContent = 'Camera access needed! Please allow camera access.';
        
        // Fallback: click to continue after 3 seconds
        setTimeout(() => {
            status.textContent = 'Click here to continue →';
            status.style.cursor = 'pointer';
            status.onclick = () => {
                startBackgroundMusic();
                proceedToVideo1();
            };
        }, 3000);
    }
}

async function detectSmile(video, ctx, status) {
    if (smileDetected) return;
    
    try {
        const faces = await detector.estimateFaces(video);
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        if (faces.length > 0) {
            const face = faces[0];
            
            // Simple smile detection: check mouth corners
            // Points 61 and 291 are mouth corners, 13 is bottom lip center
            const leftMouth = face.keypoints[61];
            const rightMouth = face.keypoints[291];
            const bottomLip = face.keypoints[13];
            
            // Calculate smile ratio
            const mouthWidth = Math.abs(rightMouth.x - leftMouth.x);
            const mouthHeight = Math.abs((leftMouth.y + rightMouth.y) / 2 - bottomLip.y);
            const smileRatio = mouthWidth / mouthHeight;
            
            // Draw face indicator
            ctx.strokeStyle = '#ff6b9d';
            ctx.lineWidth = 3;
            
            if (smileRatio > 8) { // Threshold for smile
                status.textContent = '😊 Perfect! Loading...';
                ctx.strokeStyle = '#4CAF50';
                smileDetected = true;
                
                setTimeout(() => {
                    startBackgroundMusic();
                    proceedToVideo1();
                }, 500);
            }
        }
        
    } catch (error) {
        console.error('Detection error:', error);
    }
    
    requestAnimationFrame(() => detectSmile(video, ctx, status));
}

function proceedToVideo1() {
    // Stop webcam
    const video = document.getElementById('webcam');
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }
    
    showScreen('video1-screen');
    const cosmicVideo = document.getElementById('cosmic-odds-video');
    stopBackgroundMusic();
    cosmicVideo.play();
    
    // When video ends, proceed to heart game
    cosmicVideo.onended = () => {
        startBackgroundMusic();
        showScreen('heart-game-screen');
    };
}

// AR HEART CATCHING GAME
let arStream;
let hearts = [];
let gameActive = false;

document.getElementById('start-game-btn').addEventListener('click', startHeartGame);

async function startHeartGame() {
    const video = document.getElementById('ar-webcam');
    const canvas = document.getElementById('ar-canvas');
    const btn = document.getElementById('start-game-btn');
    
    try {
        arStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' } 
        });
        video.srcObject = arStream;
        
        await new Promise(resolve => {
            video.onloadedmetadata = () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                resolve();
            };
        });
        
        btn.style.display = 'none';
        gameActive = true;
        spawnHearts(canvas);
        
    } catch (error) {
        console.error('Camera error:', error);
        alert('Please allow camera access to play!');
    }
}

function spawnHearts(canvas) {
    if (!gameActive) return;
    
    // Spawn 3 hearts at random positions
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.className = 'ar-heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * (canvas.clientWidth - 50) + 'px';
        heart.style.top = Math.random() * (canvas.clientHeight - 50) + 'px';
        
        heart.addEventListener('click', () => catchHeart(heart));
        
        canvas.parentElement.appendChild(heart);
        hearts.push(heart);
    }
}

function catchHeart(heart) {
    heart.remove();
    hearts = hearts.filter(h => h !== heart);
    
    gameState.heartsCaught++;
    document.getElementById('heart-count').textContent = gameState.heartsCaught;
    
    // Visual feedback
    confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff6b9d', '#ff8fab', '#ffc0cb']
    });
    
    if (gameState.heartsCaught >= 3) {
        gameActive = false;
        
        // Stop AR camera
        if (arStream) {
            arStream.getTracks().forEach(track => track.stop());
        }
        
        setTimeout(() => {
            unlockAllVideos();
            showScreen('unlocks-screen');
        }, 1000);
    } else {
        // Spawn new heart
        const canvas = document.getElementById('ar-canvas');
        const newHeart = document.createElement('div');
        newHeart.className = 'ar-heart';
        newHeart.textContent = '💖';
        newHeart.style.left = Math.random() * (canvas.clientWidth - 50) + 'px';
        newHeart.style.top = Math.random() * (canvas.clientHeight - 50) + 'px';
        newHeart.addEventListener('click', () => catchHeart(newHeart));
        canvas.parentElement.appendChild(newHeart);
        hearts.push(newHeart);
    }
}

// UNLOCK SYSTEM
function unlockAllVideos() {
    document.querySelectorAll('.unlock-card').forEach((card, index) => {
        card.classList.remove('locked');
        card.classList.add('unlocked');
        
        card.addEventListener('click', () => {
            if (card.classList.contains('unlocked')) {
                gameState.unlocksViewed[index] = true;
                card.classList.add('viewed');
                playUnlockedVideo(index);
            }
        });
    });
}

function playUnlockedVideo(index) {
    stopBackgroundMusic();
    
    if (index === 0) {
        showScreen('video-holiday');
        const video = document.querySelector('#video-holiday video');
        video.play();
    } else if (index === 1) {
        showScreen('video-early-years');
        const video = document.querySelector('#video-early-years video');
        video.play();
    } else if (index === 2) {
        showScreen('video-question');
        const video = document.getElementById('question-video');
        video.play();
        
        // When question video ends, show answer buttons
        video.onended = () => {
            startBackgroundMusic();
            showScreen('answer-screen');
        };
    }
}

function backToUnlocks() {
    startBackgroundMusic();
    showScreen('unlocks-screen');
}

// YES/NO BUTTONS
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
let noAttempts = 0;

yesBtn.addEventListener('click', () => {
    celebrate();
});

noBtn.addEventListener('mouseover', () => {
    moveNoButton();
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    noAttempts++;
    
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Random position within container
    const maxX = containerRect.width - btnRect.width;
    const maxY = 200; // Allow vertical movement
    
    const randomX = Math.random() * maxX - (btnRect.left - containerRect.left);
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    if (noAttempts >= 3) {
        noBtn.textContent = 'Nice try! 😏';
    }
}

function celebrate() {
    stopBackgroundMusic();
    showScreen('celebration-screen');
    
    // Epic confetti
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const colors = ['#ff6b9d', '#ff8fab', '#ffc0cb', '#ff1493', '#ff69b4'];

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
    
    // Heart explosion
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 160,
            origin: { y: 0.6 },
            shapes: ['circle'],
            colors: colors
        });
    }, 500);
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    createFloatingHearts();
    setupSmileDetection();
});

// Pause background music when videos play
document.querySelectorAll('video').forEach(video => {
    if (!video.id.includes('webcam') && !video.id.includes('ar-webcam')) {
        video.addEventListener('play', stopBackgroundMusic);
        video.addEventListener('pause', startBackgroundMusic);
        video.addEventListener('ended', startBackgroundMusic);
    }
});
