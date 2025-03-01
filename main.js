// Variable pour stocker l'intervalle des étoiles filantes
let shootingStarInterval;

function toggleLights() {
    const fanous = document.querySelector('.fanous');
    const ramadanText = document.querySelector('.ramadan-text');
    const crescentMoon = document.querySelector('.crescent-moon');
    
    fanous.classList.toggle('off');
    fanous.classList.toggle('on');
    
    if (fanous.classList.contains('on')) {
        ramadanText.style.opacity = "1";
        ramadanText.style.transform = "translateY(150px)";
        
        crescentMoon.style.opacity = "1";
        crescentMoon.style.transform = "translateY(150px)";
        
        createStars();
        playLightSound(); // Ajout du son
        
        // Planifier des étoiles filantes occasionnelles
        shootingStarInterval = setInterval(createShootingStar, 3000);
    } else {
        ramadanText.style.opacity = "0";
        ramadanText.style.transform = "translateY(-100px)";
        
        crescentMoon.style.opacity = "0";
        crescentMoon.style.transform = "translateY(-100px)";
        
        clearStars();
        
        // Arrêter les étoiles filantes
        clearInterval(shootingStarInterval);
    }
}

function createStars() {
    const starsContainer = document.querySelector('.stars');
    starsContainer.innerHTML = '';
    for (let i = 0; i < 90; i++) {
        let star = document.createElement('span');
        star.classList.add('star');
       
        let randomX = Math.random() * window.innerWidth;
        let randomY = Math.random() * window.innerHeight * 0.5;
        let randomSize = Math.random() * 20 + 10;
        star.style.left = `${randomX * 0.5}px`;
        star.style.top = `${randomY}px`;
        star.style.width = `${randomSize}px`;
        star.style.height = `${randomSize}px`;
       
        setTimeout(() => {
            star.style.opacity = "1";
            star.style.transform = "translateY(150px)";
        }, 100);
        starsContainer.appendChild(star);
    }
}

function clearStars() {
    document.querySelector('.stars').innerHTML = '';
}

// Fonction pour créer des étoiles filantes
function createShootingStar() {
    if (document.querySelector('.fanous').classList.contains('on')) {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        
        // Position et angle aléatoires
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight * 0.3;
        const angle = Math.random() * 30 - 15; // Entre -15 et 15 degrés
        
        shootingStar.style.left = `${startX}px`;
        shootingStar.style.top = `${startY}px`;
        shootingStar.style.transform = `rotate(${angle}deg)`;
        
        document.body.appendChild(shootingStar);
        
        // Animation de l'étoile filante
        setTimeout(() => {
            shootingStar.style.opacity = "1";
            shootingStar.style.transform = `rotate(${angle}deg) translateX(200px)`;
        }, 10);
        
        // Suppression après animation
        setTimeout(() => {
            shootingStar.remove();
        }, 1200);
    }
}

// Fonction pour produire un effet sonore doux lors de l'allumage
function playLightSound() {
    const audio = document.getElementById('ramadanSound');
    
    // Réinitialiser l'audio si déjà en cours de lecture
    audio.pause();
    audio.currentTime = 0;
    
    // Jouer l'audio
    audio.play().catch(error => {
        console.log("Impossible de jouer l'audio automatiquement :", error);
    });
}

// Si vous préférez conserver également l'effet sonore synthétisé original,
// vous pouvez renommer la fonction existante et appeler les deux :
function playOriginalLightSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Oscillateur pour le son principal
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // La note A
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1); // Montée en fréquence
        
        // Contrôle du volume
        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05); // Fade in
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5); // Fade out
        
        // Connexion et lecture
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log("Effet sonore non pris en charge par ce navigateur");
    }
}

// Pour utiliser les deux effets sonores, modifiez la fonction toggleLights() :
function toggleLights() {
    const fanous = document.querySelector('.fanous');
    const ramadanText = document.querySelector('.ramadan-text');
    const crescentMoon = document.querySelector('.crescent-moon');
    
    fanous.classList.toggle('off');
    fanous.classList.toggle('on');
    
    if (fanous.classList.contains('on')) {
        ramadanText.style.opacity = "1";
        ramadanText.style.transform = "translateY(150px)";
        
        crescentMoon.style.opacity = "1";
        crescentMoon.style.transform = "translateY(150px)";
        
        createStars();
        playLightSound(); // Joue votre audio personnalisé
        // playOriginalLightSound(); // Décommentez si vous souhaitez également jouer le son original
        
        // Planifier des étoiles filantes occasionnelles
        shootingStarInterval = setInterval(createShootingStar, 3000);
    } else {
        ramadanText.style.opacity = "0";
        ramadanText.style.transform = "translateY(-100px)";
        
        crescentMoon.style.opacity = "0";
        crescentMoon.style.transform = "translateY(-100px)";
        
        clearStars();
        
        // Arrêter les étoiles filantes
        clearInterval(shootingStarInterval);
    }
}