const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20; // Tamanho de cada "bloco" da cobrinha e da comida
const rows = canvas.height / tileSize;
const columns = canvas.width / tileSize;

let snake = [{ x: 10, y: 10 }]; // Posição inicial da cobrinha
let food = { x: 5, y: 5 }; // Posição inicial da comida
let direction = { x: 0, y: 0 }; // Direção inicial
let score = 0;

// Função para desenhar a cobrinha
function drawSnake() {
    ctx.fillStyle = "#00a8ff";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = "#ff4757";
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// Função para atualizar o jogo
function update() {
    // Movimenta a cobrinha
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Verifica colisão com as paredes
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows) {
        alert("Game Over! Pontuação: " + score);
        resetGame();
        return;
    }

    // Verifica colisão com o próprio corpo
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert("Game Over! Pontuação: " + score);
        resetGame();
        return;
    }

    // Adiciona a nova cabeça da cobrinha
    snake.unshift(head);

    // Verifica se a cobrinha comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").textContent = score;
        placeFood();
    } else {
        // Remove a cauda da cobrinha se não comeu a comida
        snake.pop();
    }
}

// Função para posicionar a comida em um local aleatório
function placeFood() {
    food.x = Math.floor(Math.random() * columns);
    food.y = Math.floor(Math.random() * rows);

    // Verifica se a comida não foi colocada em cima da cobrinha
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        placeFood();
    }
}

// Função para reiniciar o jogo
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById("score").textContent = score;
    placeFood();
}

// Função principal do jogo
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    update();
}

// Controle de direção com as teclas
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Inicia o jogo
placeFood();
setInterval(gameLoop, 100);