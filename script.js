// --- Variables ---
const heroSection = document.getElementById('hero');
const storySection = document.getElementById('story');
const questionSection = document.getElementById('question');
const celebrationSection = document.getElementById('celebration');

const startBtn = document.getElementById('startBtn');
const nextStoryBtns = document.querySelectorAll('.next-story');
const storyCards = document.querySelectorAll('.story-card');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const heartTrigger = document.getElementById('heartTrigger');

let currentStory = 0;

// --- GSAP Animations ---
// Initial Fade In
gsap.fromTo('.content', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 1.5, ease: "power2.out"});

// --- Event Listeners ---

// 1. Start Journey
startBtn.addEventListener('click', () => {
    gsap.to(heroSection, {opacity: 0, duration: 0.5, onComplete: () => {
        heroSection.classList.add('hidden');
        storySection.classList.remove('hidden');
        gsap.fromTo(storySection, {opacity: 0}, {opacity: 1, duration: 0.5});
    }});
});

// 2. Story Navigation
nextStoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentCard = storyCards[currentStory];
        
        // If it's the last card (finishStory)
        if (btn.id === 'finishStory') {
            gsap.to(storySection, {opacity: 0, duration: 0.5, onComplete: () => {
                storySection.classList.add('hidden');
                questionSection.classList.remove('hidden');
                gsap.fromTo(questionSection, {opacity: 0, scale: 0.9}, {opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)"});
            }});
            return;
        }

        // Move to next card
        currentStory++;
        const nextCard = storyCards[currentStory];

        gsap.to(currentCard, {opacity: 0, x: -50, duration: 0.4, onComplete: () => {
            currentCard.classList.remove('active');
            nextCard.classList.add('active');
            gsap.fromTo(nextCard, {opacity: 0, x: 50}, {opacity: 1, x: 0, duration: 0.4});
        }});
    });
});

// 3. The "No" Button Logic (The Playful Part)
// Works on Hover (Desktop) and Touch (Mobile)
const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    // Make sure it doesn't go off screen
    const safeX = Math.min(Math.max(0, x), window.innerWidth - noBtn.offsetWidth - 20);
    const safeY = Math.min(Math.max(0, y), window.innerHeight - noBtn.offsetHeight - 20);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${safeX}px`;
    noBtn.style.top = `${safeY}px`;
    
    // Playful text changes
    const phrases = ["Are you sure?", "Try again!", "Nope!", "Can't catch me!", "Really?"];
    noBtn.innerText = phrases[Math.floor(Math.random() * phrases.length)];
};

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent clicking
    moveNoButton();
});

// 4. The "Yes" Button Logic
yesBtn.addEventListener('click', () => {
    // Confetti Explosion
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD1DC', '#D9381E', '#FFFDD0']
    });

    // Transition to Final Page
    gsap.to(questionSection, {opacity: 0, duration: 0.5, onComplete: () => {
        questionSection.classList.add('hidden');
        celebrationSection.classList.remove('hidden');
        gsap.fromTo(celebrationSection, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 1});
    }});
});

// 5. Easter Egg (Clicking the Heart)
let heartClicks = 0;
heartTrigger.addEventListener('click', () => {
    heartClicks++;
    
    // Heart Beat Animation
    gsap.to(heartTrigger, {scale: 1.4, duration: 0.1, yoyo: true, repeat: 1});
    
    if (heartClicks === 5) {
        alert("Okay, you really love clicking hearts! Here's a virtual hug! 🤗");
        confetti({ particleCount: 50, spread: 100, origin: { y: 1 } });
        heartClicks = 0;
    }
});