let currentScene = 0;
let isPlaying = false;
let autoPlayInterval = null;
const scenes = document.querySelectorAll('.commercial-scene');
const totalScenes = scenes.length;

// Professional commercial timing
const sceneDurations = [
    5000,  // Scene 0: Opening
    7000,  // Scene 1: Kobe - Minerals
    7000,  // Scene 2: Kobe - Water Source
    8000,  // Scene 3: Dwayne - Benefits
    7000,  // Scene 4: Dwayne - Blood Pressure
    7000,  // Scene 5: Kobe - Location
    7000,  // Scene 6: Dwayne - Technology
    7000,  // Scene 7: Kobe - Uniqueness
    7000,  // Scene 8: Dwayne - Factory
    8000   // Scene 9: Final
];


function showScene(index) {
   
    if (index >= totalScenes) {
        index = 0;
    } else if (index < 0) {
        index = totalScenes - 1;
    }
    
   
    if (currentScene === index && document.querySelector('.commercial-scene.active')) {
        return;
    }
    
    currentScene = index;
    
    
    const currentActive = document.querySelector('.commercial-scene.active');
    if (currentActive) {
        currentActive.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        currentActive.style.opacity = '0';
        
        setTimeout(() => {
            scenes.forEach(scene => {
                scene.classList.remove('active');
                scene.style.opacity = '0';
            });
            
            const nextScene = scenes[currentScene];
            if (nextScene) {
                nextScene.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                nextScene.classList.add('active');
                
                requestAnimationFrame(() => {
                    nextScene.style.opacity = '1';
                });
                
                triggerAnimations(currentScene);
            }
        }, 300);
    } else {
        scenes.forEach(scene => {
            scene.classList.remove('active');
            scene.style.opacity = '0';
        });
        
        const nextScene = scenes[currentScene];
        if (nextScene) {
            nextScene.classList.add('active');
            nextScene.style.opacity = '1';
            triggerAnimations(currentScene);
        }
    }
}


function triggerAnimations(sceneIndex) {
    const scene = scenes[sceneIndex];
    if (!scene) return;
    
    
    const animatedElements = scene.querySelectorAll(
        '.celebrity-image-wrapper, .speech-bubble-wrapper, .minerals-display, .benefit-card, .bottle-showcase, .altitude-indicator, .bubble, .final-celebrities, .final-message, .mineral-badge, .credits, .credit-name'
    );
    
    animatedElements.forEach((el) => {
        if (el) {
            // Force reflow
            el.style.animation = 'none';
            el.style.opacity = '';
            el.offsetHeight; // Trigger reflow
            // Reset animation
            setTimeout(() => {
                el.style.animation = '';
                el.style.opacity = '';
            }, 50);
        }
    });
    
    // Special handling for elements with initial opacity 0
    const fadeInElements = scene.querySelectorAll('.minerals-display, .altitude-indicator, .bottle-showcase, .benefit-card');
    fadeInElements.forEach((el) => {
        if (el) {
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.opacity = '';
            }, 100);
        }
    });
}

// Auto-play function
function autoPlay() {
    if (!isPlaying) return;
    
    const duration = sceneDurations[currentScene] || 7000;
    
    autoPlayInterval = setTimeout(() => {
        if (isPlaying) {
            nextScene();
        }
    }, duration);
}

// Next scene
function nextScene() {
    showScene(currentScene + 1);
    if (isPlaying) {
        clearTimeout(autoPlayInterval);
        autoPlay();
    }
}

// Previous scene
function previousScene() {
    showScene(currentScene - 1);
    if (isPlaying) {
        clearTimeout(autoPlayInterval);
        autoPlay();
    }
}

// Play function
function play() {
    isPlaying = true;
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'flex';
    autoPlay();
}

// Pause function
function pause() {
    isPlaying = false;
    document.getElementById('playBtn').style.display = 'flex';
    document.getElementById('pauseBtn').style.display = 'none';
    clearTimeout(autoPlayInterval);
}

// Event listeners
document.getElementById('playBtn').addEventListener('click', play);
document.getElementById('pauseBtn').addEventListener('click', pause);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (isPlaying) pause();
        nextScene();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (isPlaying) pause();
        previousScene();
    } else if (e.key === ' ') {
        e.preventDefault();
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (isPlaying) pause();
        
        if (diff > 0) {
            nextScene();
        } else {
            previousScene();
        }
    }
}

// Initialize
showScene(0);

// Auto-start the commercial
setTimeout(() => {
    play();
}, 1000);
