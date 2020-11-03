let starSeed;
let engine;
const { Engine, Composite, Render, World, Bodies, Body, Detector, Constraint } = Matter;
const hats = {};
let player;
let enemies = [];
let bullets = [];
let lazord;
let lazdagger;
let axe;
let pistol;
let starImage;

function preload() {
    lazord = loadImage("assets/lazord.png");
    lazord.weaponWidth = 15;
    lazord.weaponHeight = 90;
    lazdagger = loadImage("assets/lazdagger.png");
    lazdagger.weaponWidth = 15;
    lazdagger.weaponHeight = 75;
    pistol = loadImage("assets/pistol.png");
    pistol.weaponWidth = 30;
    pistol.weaponHeight = 30;
    axe = loadImage("assets/axe.png");
    axe.weaponWidth = 45;
    axe.weaponHeight = 90;
    starImage = loadImage("assets/stars.png");
    hats.spaceHelmet = loadImage("assets/spacehat.png");
    hats.spaceHelmet.xOffset = -25;
    hats.spaceHelmet.yOffset = -30;
    hats.spaceHelmet.customWidth = 50;
    hats.spaceHelmet.customHeight = 50;
}

function setup() {
    createCanvas(600, 600);
    starSeed = floor(random(0, 1000));
    engine = Engine.create();
    engine.world.gravity = { x: 0, y: 0 }
    player = Person({
        x: 0,
        y: 0,
        category: 2,
        weapon: lazord,
        hat: "spaceHelmet"
    });
    enemies = [
        /*Person({
                x: -100,
                y: 0,
                category: 4,
                weapon: lazord,
                hat: "spaceHelmet",
                type: "melee",
                strength: 0.2
            }), Person({
                x: 100,
                y: 0,
                category: 4,
                weapon: lazord,
                hat: "spaceHelmet",
                type: "melee",
                strength: 0.2
            })*/
    ]
    enemies.forEach(enemy => {
        enemy.add();
    })
    player.add();
    Engine.run(engine);
}
let tick = 0;

function draw() {
    if (tick % 60 === 0 && tick < 1) {
        for (let i = 0; i < 3; i++) {
            const newEnemy = Person({
                x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
                y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
                category: 4,
                weapon: pistol,
                hat: "spaceHelmet",
                type: "ranged",
                strength: 0.2,
                color: [255, 0, 255]
            });
            newEnemy.add()
            enemies.push(newEnemy);
        }
        for (let i = 0; i < 4; i++) {
            const newEnemy = Person({
                x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
                y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
                category: 4,
                weapon: lazdagger,
                hat: "spaceHelmet",
                type: "melee",
                strength: 0.2,
                color: [255, 0, 0]
            });
            newEnemy.add()
            enemies.push(newEnemy);
        }
        for (let i = 0; i < 1; i++) {
            const newEnemy = Person({
                x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
                y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
                category: 4,
                weapon: axe,
                hat: "spaceHelmet",
                type: "meleeHeavy",
                strength: 0.3,
                color: [0, 255, 255]
            });
            newEnemy.add()
            enemies.push(newEnemy);
        }
    }
    background(0, 255, 255);
    translate(300 - player.head.position.x, 300 - player.head.position.y);
    noStroke();
    fill(0, 225, 225);
    rect(-2000, -2000, 4000, 4000);
    fill(0, 200, 200);
    rect(-1900, -1900, 3800, 3800);
    fill(0, 175, 175);
    rect(-1800, -1800, 3600, 3600);
    fill(0, 150, 150);
    rect(-1800, -1800, 3600, 3600);
    fill(0, 125, 125);
    rect(-1700, -1700, 3400, 3400);
    fill(0, 100, 100);
    rect(-1600, -1600, 3200, 3200);
    fill(0, 75, 75);
    rect(-1500, -1500, 3000, 3000);
    fill(0, 50, 50);
    rect(-1400, -1400, 2800, 2800);
    fill(0, 25, 25);
    rect(-1300, -1300, 2600, 2600);
    fill(0);
    rect(-1200, -1200, 2400, 2400);
    //stars(starSeed);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            image(starImage, -1200 + i * 600, -1200 + j * 600, 600, 600);
        }
    }
    strokeWeight(3);
    stroke(120);
    fill(60);
    rect(player.head.position.x - 298, player.head.position.y - 298, 100, 10);
    fill(255)
    noStroke();
    rect(player.head.position.x - 297, player.head.position.y - 296.5, 98 * player.getHealth(), 7);
    if (player.x < -2100 || player.x > 2100 || player.y < -2100 || player.y > 2100) {
        player.die();
    }
    player.draw();
    enemies.forEach(enemy => {
        enemy.draw();
        player.takeDamage(enemy);
        enemy.takeDamage(player);
        if (enemy.x < -2100 || enemy.x > 2100 || enemy.y < -2100 || enemy.y > 2100) {
            enemy.die();
        }
    });
    bullets.forEach(bullet => {
        fill(255, 0, 255);
        drawVertices(bullet.vertices);
        player.takeDamage(bullet);
        enemies.forEach(enemy => {
            enemy.takeDamage(bullet);
        })
    })
    tick++;
}