const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    color: 'green',
};

const bullets = [];
const enemies = [];
let score = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    bullets.forEach((bullet) => {
        ctx.fillStyle = 'white';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function drawEnemies() {
    enemies.forEach((enemy) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

function moveEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }
    });
}

function detectCollisions() {
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
                score++;
            }
        });
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer();
    moveBullets();
    moveEnemies();
    detectCollisions();
    drawPlayer();
    drawBullets();
    drawEnemies();
    requestAnimationFrame(update);
}

function handleKeyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        player.dy = player.speed;
    } else if (e.key === ' ') {
        bullets.push({
            x: player.x + player.width / 2 - 2.5,
            y: player.y,
            width: 5,
            height: 10,
            speed: 7,
        });
    }
}

function handleKeyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        player.dx = 0;
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = 0;
    } else if (e.key === 'ArrowUp' || e.key === 'w') {
        player.dy = 0;
    } else if (e.key === 'ArrowDown' || e.key === 's') {
        player.dy = 0;
    }
}

function spawnEnemies() {
    setInterval(() => {
        const x = Math.random() * (canvas.width - 50);
        enemies.push({
            x,
            y: -50,
            width: 50,
            height: 50,
            speed: 2,
        });
    }, 1000);
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

update();
spawnEnemies();
