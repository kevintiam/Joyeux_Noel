// --- ANIMATION DE LA NEIGE ---
      const canvas = document.getElementById("snow");
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const snowflakes = [];
      class Snowflake {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 0.4 - 0.2;
          this.speedY = Math.random() * 1 + 0.4;
          this.opacity = Math.random() * 0.4 + 0.3;
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.y > canvas.height) { this.y = 0; this.x = Math.random() * canvas.width; }
          if (this.x > canvas.width || this.x < 0) this.x = Math.random() * canvas.width;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.fill();
        }
      }

      for (let i = 0; i < 180; i++) snowflakes.push(new Snowflake());
      const animateSnow = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(f => { f.update(); f.draw(); });
        requestAnimationFrame(animateSnow);
      };
      animateSnow();

      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      // --- NOUVELLE LOGIQUE D'ANIMATION ---
      const revealMessages = () => {
        const clickMe = document.getElementById("click-me");
        const giftBox = document.querySelector(".gift-box");
        const giftContainer = document.querySelector(".gift-container");
        const footer = document.querySelector("footer");
        const cards = document.querySelectorAll(".card");
        const message = document.getElementById("message");

        // 1. Cacher le texte "cliquez-moi" et désactiver le curseur
        clickMe.style.opacity = "0";
        giftContainer.style.cursor = "default";
        giftContainer.onclick = null; // Empêcher de re-cliquer

        // 2. Transformer le cadeau
        giftBox.textContent = "🕯️";
        giftBox.style.filter = "drop-shadow(0 0 40px rgba(212, 175, 55, 1))";
        giftBox.style.transform = "scale(1.2)";

        // 3. Animation en cascade (Séquençage)
        
        // Faire apparaître les cartes une par une
        let delay = 300; // Délai initial
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("show");
          }, delay + (index * 250)); // +250ms pour chaque carte suivante
        });

        // Calculer quand les cartes ont fini d'apparaître pour lancer le message
        const messageDelay = delay + (cards.length * 250) + 300;
        
        setTimeout(() => {
          message.classList.add("show-message");
        }, messageDelay);

        // Enfin, le footer
        setTimeout(() => {
          footer.classList.add("show-footer");
        }, messageDelay + 800);
      }
        document.querySelector(".gift-container").onclick = revealMessages;

      // --- CONTRÔLE AUDIO ---
      const audioToggle = document.getElementById("audio-toggle");
      const backgroundMusic = document.getElementById("background-music");
      let isPlaying = false;

      audioToggle.addEventListener("click", () => {
        if (isPlaying) {
          backgroundMusic.pause();
          audioToggle.innerHTML = '<i class="fas fa-music"></i>';
          audioToggle.classList.remove("playing");
          audioToggle.classList.add("muted");
        } else {
          backgroundMusic.play();
          audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
          audioToggle.classList.add("playing");
          audioToggle.classList.remove("muted");
        }
        isPlaying = !isPlaying;
      });
