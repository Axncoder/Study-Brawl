document.addEventListener('DOMContentLoaded', () => {
    // --- PARTICLE BACKGROUND ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray = [];
    const mouse = { x: null, y: null, radius: 100 };
    window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
    class Particle {
        constructor(x, y, dirX, dirY, size, color) { this.x = x; this.y = y; this.dirX = dirX; this.dirY = dirY; this.size = size; this.color = color; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill(); }
        update() { if (this.x > canvas.width || this.x < 0) this.dirX = -this.dirX; if (this.y > canvas.height || this.y < 0) this.dirY = -this.dirY; let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy); if (distance < mouse.radius + this.size) { if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 5; if (mouse.x > this.x && this.x > this.size * 10) this.x -= 5; if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 5; if (mouse.y > this.y && this.y > this.size * 10) this.y -= 5; } this.x += this.dirX; this.y += this.dirY; this.draw(); }
    }
    function initParticles() { particlesArray = []; let numParticles = (canvas.height * canvas.width) / 9000; for (let i = 0; i < numParticles; i++) { let size = (Math.random() * 2) + 1; let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2); let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2); let dirX = (Math.random() * .4) - .2; let dirY = (Math.random() * .4) - .2; let color = 'rgba(255, 221, 87, 0.5)'; particlesArray.push(new Particle(x, y, dirX, dirY, size, color)); } }
    function animateParticles() { requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight); for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update(); }
    initParticles(); animateParticles();
    window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); });

    // --- CONSOLIDATED UI ELEMENTS ---
    const UI = {
        screens: {
            start: document.getElementById('start-screen'),
            game: document.getElementById('game-screen'),
            end: document.getElementById('end-screen'),
            shop: document.getElementById('shop-screen'),
            leaderboard: document.getElementById('leaderboard-screen')
        },
        profileHeader: document.getElementById('profile-header'),
        buttons: {
            start: document.getElementById('start-btn'),
            shop: document.getElementById('shop-btn'),
            leaderboard: document.getElementById('leaderboard-btn'),
            playAgain: document.getElementById('play-again-btn'),
            mainMenu: document.getElementById('main-menu-btn'),
            backToMenuShop: document.getElementById('back-to-menu-shop-btn'),
            backToMenuLeaderboard: document.getElementById('back-to-menu-leaderboard-btn'),
            powerUp5050: document.getElementById('power-up-5050'),
            powerUpHeal: document.getElementById('power-up-heal'),
        },
        displays: {
            playerLevel: document.getElementById('player-level'),
            xpBar: document.getElementById('xp-bar'),
            brawlCoins: document.getElementById('brawlcoins-balance'),
            playerAvatar: document.getElementById('player-avatar-img'),
            gamePlayerAvatar: document.getElementById('game-player-avatar'),
            score: document.getElementById('score-display'),
            endMessage: document.getElementById('end-message'),
            finalScore: document.getElementById('final-score'),
            // ADDED THIS for correct answer stats
            correctAnswersStat: document.getElementById('correct-answers-stat'),
            xpGain: document.getElementById('xp-gain'),
            shopItems: document.getElementById('avatar-shop-items'),
            highScores: document.getElementById('high-scores-list'),
            question: document.getElementById('question'),
            answerOptions: document.getElementById('answer-options'),
            playerHealth: document.getElementById('player1-health'),
            botHealth: document.getElementById('player2-health'),
            pu5050Count: document.getElementById('pu-5050-count'),
            puHealCount: document.getElementById('pu-heal-count'),
        },
        selects: {
            category: document.getElementById('category'),
            difficulty: document.getElementById('difficulty'),
        },
        sounds: {
            correct: document.getElementById('correct-sound'),
            incorrect: document.getElementById('incorrect-sound'),
            win: document.getElementById('win-sound'),
            lose: document.getElementById('lose-sound'),
            powerUp: document.getElementById('power-up-sound'),
            purchase: document.getElementById('purchase-sound'),
        }
    };

    // --- GAME STATE & DATA ---
    const GameState = {
        playerData: {
            level: 1, xp: 0, brawlCoins: 100,
            ownedAvatars: [1], currentAvatar: 1,
            powerUps: { '5050': 1, heal: 1 }
        },
        game: {
            playerHealth: 100, botHealth: 100, score: 0,
            questions: [], currentQuestionIndex: 0,
            // ADDED THIS to track correct answers
            correctAnswersCount: 0,
        },
        // UPDATED with placeholder images. Replace these URLs with your own files!
        avatars: [
            { id: 1, name: 'Explorer', price: 0, src: 'https://placehold.co/100x100/1a1a2e/ffdd57?text=P1' },
            { id: 2, name: 'Ninja', price: 150, src: 'https://placehold.co/100x100/4a4a5e/ffffff?text=Ninja' },
            { id: 3, name: 'Wizard', price: 150, src: 'https://placehold.co/100x100/6a4a8e/ffffff?text=Wizard' },
            { id: 4, name: 'Astronaut', price: 250, src: 'https://placehold.co/100x100/1a3a6e/ffffff?text=Astro' },
        ]
    };

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function showScreen(screenKey) {
        Object.values(UI.screens).forEach(screen => screen.classList.add('hidden'));
        if (screenKey !== 'start') {
            UI.profileHeader.classList.remove('hidden');
        } else {
            UI.profileHeader.classList.add('hidden');
        }
        UI.screens[screenKey].classList.remove('hidden');
    }

    function loadPlayerData() {
        const savedData = JSON.parse(localStorage.getItem('studyBrawlPlayerData'));
        if (savedData) GameState.playerData = savedData;
    }

    function savePlayerData() {
        localStorage.setItem('studyBrawlPlayerData', JSON.stringify(GameState.playerData));
    }

    function updateProfileUI() {
        const { level, xp, brawlCoins, currentAvatar, powerUps } = GameState.playerData;
        UI.displays.playerLevel.textContent = `Level ${level}`;
        UI.displays.brawlCoins.textContent = `💰 ${brawlCoins}`;
        
        const xpForNextLevel = level * 100;
        const xpPercentage = (xp / xpForNextLevel) * 100;
        UI.displays.xpBar.style.width = `${xpPercentage}%`;

        const avatarSrc = GameState.avatars.find(a => a.id === currentAvatar)?.src || 'https://placehold.co/100x100/1a1a2e/ffdd57?text=P1';
        UI.displays.playerAvatar.src = avatarSrc;
        UI.displays.gamePlayerAvatar.src = avatarSrc;
        
        UI.displays.pu5050Count.textContent = powerUps['5050'];
        UI.displays.puHealCount.textContent = powerUps.heal;
    }

    async function fetchCategories() {
        try {
            const response = await fetch('https://opentdb.com/api_category.php');
            const data = await response.json();
            UI.selects.category.innerHTML = '<option value="any">Any Category</option>';
            data.trivia_categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                UI.selects.category.appendChild(option);
            });
        } catch (error) { console.error("Failed to fetch categories:", error); }
    }

    async function startGame() {
        // Reset game state
        GameState.game = { playerHealth: 100, botHealth: 100, score: 0, questions: [], currentQuestionIndex: 0, correctAnswersCount: 0 };
        
        const category = UI.selects.category.value;
        const difficulty = UI.selects.difficulty.value;
        let url = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;
        if (category !== "any") url += `&category=${category}`;
        
        try {
            UI.displays.question.textContent = "Loading questions...";
            const response = await fetch(url);
            const data = await response.json();
            if (data.results.length === 0) throw new Error("No questions returned from API.");
            GameState.game.questions = data.results.map(q => ({
                question: q.question,
                answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
                correct: q.correct_answer
            }));
        } catch (error) {
            console.error("Failed to fetch questions", error);
            GameState.game.questions = [{ question: "Failed to load questions. Play again?", answers: ["Yes"], correct: "Yes" }];
        }

        updateProfileUI();
        showScreen('game');
        askQuestion();
    }
    
    function askQuestion() {
        if (GameState.game.currentQuestionIndex >= GameState.game.questions.length || GameState.game.playerHealth <= 0 || GameState.game.botHealth <= 0) {
            endGame();
            return;
        }

        UI.displays.playerHealth.style.width = `${GameState.game.playerHealth}%`;
        UI.displays.botHealth.style.width = `${GameState.game.botHealth}%`;
        UI.displays.score.textContent = `Score: ${GameState.game.score}`;
        UI.buttons.powerUp5050.disabled = GameState.playerData.powerUps['5050'] <= 0;
        UI.buttons.powerUpHeal.disabled = GameState.playerData.powerUps.heal <= 0;

        const currentQ = GameState.game.questions[GameState.game.currentQuestionIndex];
        UI.displays.question.textContent = decodeHtml(currentQ.question);
        UI.displays.answerOptions.innerHTML = '';

        currentQ.answers.forEach(answer => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = decodeHtml(answer);
            button.addEventListener('click', () => checkAnswer(button, answer, currentQ.correct));
            UI.displays.answerOptions.appendChild(button);
        });
    }

    function checkAnswer(button, selectedAnswer, correctAnswer) {
        const buttons = UI.displays.answerOptions.querySelectorAll('.answer-btn');
        buttons.forEach(btn => btn.disabled = true);

        if (decodeHtml(selectedAnswer) === decodeHtml(correctAnswer)) {
            UI.sounds.correct.play();
            button.classList.add('correct');
            GameState.game.score += 10;
            GameState.playerData.brawlCoins += 5;
            GameState.game.botHealth -= 20;
            // ADDED THIS to increment correct answer count
            GameState.game.correctAnswersCount++;
        } else {
            UI.sounds.incorrect.play();
            button.classList.add('incorrect');
            GameState.game.playerHealth -= 25;
            buttons.forEach(btn => {
                if (decodeHtml(btn.textContent) === decodeHtml(correctAnswer)) {
                    btn.classList.add('correct');
                }
            });
        }
        
        updateProfileUI();
        UI.displays.playerHealth.style.width = `${Math.max(0, GameState.game.playerHealth)}%`;
        UI.displays.botHealth.style.width = `${Math.max(0, GameState.game.botHealth)}%`;
        UI.displays.score.textContent = `Score: ${GameState.game.score}`;
        
        setTimeout(() => {
            GameState.game.currentQuestionIndex++;
            askQuestion();
        }, 1500);
    }

    function endGame() {
        showScreen('end');
        const xpGained = GameState.game.score;
        const playerWon = GameState.game.playerHealth > 0;
        
        UI.sounds[playerWon ? 'win' : 'lose'].play();
        UI.displays.endMessage.textContent = playerWon ? "You Win! 🎉" : "Bot Wins! 😢";
        UI.displays.finalScore.textContent = `Final Score: ${GameState.game.score}`;

        // ADDED/MODIFIED THIS LOGIC to show the final stats
        const questionsAnswered = GameState.game.currentQuestionIndex;
        if (questionsAnswered > 0) {
            const percentage = Math.round((GameState.game.correctAnswersCount / questionsAnswered) * 100);
            UI.displays.correctAnswersStat.textContent = `Correct Answers: ${GameState.game.correctAnswersCount} / ${questionsAnswered} (${percentage}%)`;
        } else {
            UI.displays.correctAnswersStat.textContent = "No questions answered.";
        }

        if (playerWon) {
            UI.displays.xpGain.textContent = `+${xpGained} XP!`;
            addXP(xpGained);
        } else {
             UI.displays.xpGain.textContent = ``;
        }
        savePlayerData();
    }

    function addXP(amount) {
        GameState.playerData.xp += amount;
        let xpForNextLevel = GameState.playerData.level * 100;
        while (GameState.playerData.xp >= xpForNextLevel) {
            GameState.playerData.level++;
            GameState.playerData.xp -= xpForNextLevel;
            GameState.playerData.brawlCoins += 50;
            GameState.playerData.powerUps['5050']++;
            GameState.playerData.powerUps.heal++;
             xpForNextLevel = GameState.playerData.level * 100;
        }
        updateProfileUI();
    }

    function showShop() {
        UI.displays.shopItems.innerHTML = '';
        GameState.avatars.forEach(avatar => {
            const item = document.createElement('div');
            item.classList.add('shop-item');
            const isOwned = GameState.playerData.ownedAvatars.includes(avatar.id);
            if (isOwned) item.classList.add('owned');
            
            item.innerHTML = `<img src="${avatar.src}" alt="${avatar.name}"><p>${avatar.name}</p><p>${isOwned ? 'Owned' : `💰 ${avatar.price}`}</p>`;
            
            item.addEventListener('click', () => isOwned ? equipAvatar(avatar.id) : buyAvatar(avatar));
            UI.displays.shopItems.appendChild(item);
        });
        showScreen('shop');
    }
    
    function buyAvatar(avatar) {
        if (GameState.playerData.brawlCoins >= avatar.price) {
            GameState.playerData.brawlCoins -= avatar.price;
            GameState.playerData.ownedAvatars.push(avatar.id);
            UI.sounds.purchase.play();
            savePlayerData();
            updateProfileUI();
            showShop();
        } else {
            alert("Not enough BrawlCoins!");
        }
    }
    
    function equipAvatar(avatarId) {
        GameState.playerData.currentAvatar = avatarId;
        savePlayerData();
        updateProfileUI();
        alert('Avatar equipped!');
    }

    function showLeaderboard() {
        const highScores = JSON.parse(localStorage.getItem('studyBrawlHighScores')) || [];
        UI.displays.highScores.innerHTML = highScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map((s, i) => `<li>${i === 0 ? '🏆' : `${i + 1}.`} ${s.name} <span>${s.score}</span></li>`)
            .join('') || '<li>No scores yet! Be the first!</li>';
        showScreen('leaderboard');
    }

    function use5050() {
        if (GameState.playerData.powerUps['5050'] > 0) {
            GameState.playerData.powerUps['5050']--;
            UI.sounds.powerUp.play();
            updateProfileUI();
            UI.buttons.powerUp5050.disabled = true;

            const currentQ = GameState.game.questions[GameState.game.currentQuestionIndex];
            const correctAnswer = decodeHtml(currentQ.correct);
            const incorrectAnswers = currentQ.answers.filter(a => decodeHtml(a) !== correctAnswer);
            
            const toRemove1 = incorrectAnswers.splice(Math.floor(Math.random() * incorrectAnswers.length), 1)[0];
            const toRemove2 = incorrectAnswers.splice(Math.floor(Math.random() * incorrectAnswers.length), 1)[0];

            const buttons = UI.displays.answerOptions.querySelectorAll('.answer-btn');
            buttons.forEach(btn => {
                if (decodeHtml(btn.textContent) === decodeHtml(toRemove1) || decodeHtml(btn.textContent) === decodeHtml(toRemove2)) {
                    btn.style.opacity = '0.3';
                    btn.disabled = true;
                }
            });
        }
    }

    function useHeal() {
        if (GameState.playerData.powerUps.heal > 0) {
            GameState.playerData.powerUps.heal--;
            UI.sounds.powerUp.play();
            GameState.game.playerHealth = Math.min(100, GameState.game.playerHealth + 25);
            UI.displays.playerHealth.style.width = `${GameState.game.playerHealth}%`;
            updateProfileUI();
            UI.buttons.powerUpHeal.disabled = true;
        }
    }

    // --- INITIALIZATION & EVENT LISTENERS ---
    function init() {
        loadPlayerData();
        updateProfileUI();
        fetchCategories();
        
        UI.buttons.start.addEventListener('click', startGame);
        UI.buttons.shop.addEventListener('click', showShop);
        UI.buttons.leaderboard.addEventListener('click', showLeaderboard);
        UI.buttons.playAgain.addEventListener('click', startGame);
        UI.buttons.mainMenu.addEventListener('click', () => showScreen('start'));
        UI.buttons.backToMenuShop.addEventListener('click', () => showScreen('start'));
        UI.buttons.backToMenuLeaderboard.addEventListener('click', () => showScreen('start'));

        UI.buttons.powerUp5050.addEventListener('click', use5050);
        UI.buttons.powerUpHeal.addEventListener('click', useHeal);

        showScreen('start');
    }
    
    init();
});