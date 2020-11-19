let starSeed;
let engine;
const { Engine, Composite, Render, World, Bodies, Body, Detector, Constraint, Sleeping } = Matter;
const hats = {};
const sounds = {};
const powerups = {};
let player;
let enemies = [];
let bullets = [];
let powerupList = [];
let emitters = [];
let lazord;
let lazdagger;
let axe;
let pistol;
let plasrifle;
let spoon;
let lance;
let railgun;
let harpoon;
let moonStaff;
let starImage;
let asteroidImage;
let moon;
let coin;
let levelNum;
let level;
let gameState = "start";
let maxLevelUnlocked = 0;
let currHat;
let currentWeapon;
let powerUpInfo = {
    healthSpawnRate: 0.001,
    strengthSpawnRate: 0.001,
    healthSpawnUpgrade: 20,
    strengthSpawnUpgrade: 20,
    healthPotency: 1,
    strengthPotency: 1,
    healthPotencyUpgrade: 20,
    strengthPotencyUpgrade: 20,
};
const powerupNames = {
    "health": "Heal Powerup",
    "strength": "Strength Powerup"
};
if (!localProxy.maxLevelUnlocked) {
    localProxy.maxLevelUnlocked = maxLevelUnlocked;
} else {
    maxLevelUnlocked = localProxy.maxLevelUnlocked;
}
let paused = false;
let coins = 0;
if (!localProxy.coins) {
    localProxy.coins = coins;
} else {
    coins = localProxy.coins;
}
let coinList = [];
if (!localProxy.healthUpgradeCost) {
    localProxy.healthUpgradeCost = 20;
}
if (!localProxy.damageUpgradeCost) {
    localProxy.damageUpgradeCost = 20;
}

if (!localProxy.healthMultiplier) {
    localProxy.healthMultiplier = 1;
}

if (!localProxy.damageMultiplier) {
    localProxy.damageMultiplier = 1;
}
if (!localProxy.unlockedWeapons) {
    localProxy.unlockedWeapons = [];
}
if (!localProxy.defaultWeapon) {
    localProxy.defaultWeapon = "lazord";
}
if (localProxy.musicVolume === undefined) {
    localProxy.musicVolume = 1;
}
if (localProxy.sfxVolume === undefined) {
    localProxy.sfxVolume = 1;
}
if (!localProxy.powerUpInfo) {
    localProxy.powerUpInfo = powerUpInfo;
}
if (!localProxy.waveRecord) {
    localProxy.waveRecord = 0;
}
if (localProxy.achievements === undefined) {
    localProxy.achievements = [];
}
if (localProxy.unlockedHats === undefined) {
    localProxy.unlockedHats = ["spaceHelmet"];
    localProxy.achievements.forEach((achievementName) => {
        const hatsUnlocked = achievementList.find(achievement => achievement.title === achievementName).hatsUnlocked;
        if (hatsUnlocked) {
            localProxy.unlockedHats = localProxy.unlockedHats.concat(hatsUnlocked);
        }
    })
}
if (localProxy.hat === undefined) {
    localProxy.hat = "spaceHelmet";
}

currHat = localProxy.hat;

const weapons = {
    "lazord": {
        weapon: () => lazord,
        display: "Laser Sword",
        unlocked: true,
        cost: 0
    },
    "pistol": {
        weapon: () => pistol,
        display: "Pistol",
        unlocked: false,
        cost: 50
    },
    "lance": {
        weapon: () => lance,
        display: "Laser Lance",
        unlocked: false,
        cost: 200
    },
    "railgun": {
        weapon: () => railgun,
        display: "Railgun",
        unlocked: false,
        cost: 400
    },
    "plasrifle": {
        weapon: () => plasrifle,
        display: "Plasma Rifle",
        unlocked: false,
        cost: 500
    },
    "harpoon": {
        weapon: () => harpoon,
        display: "Harpoon",
        unlocked: false,
        cost: 750
    }
}
localProxy.unlockedWeapons.forEach(weapon => {
    weapons[weapon].unlocked = true;
})

function preload() {
    coin = loadImage("assets/coin.png");
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
    lance = loadImage("assets/lance.png");
    lance.weaponWidth = 15;
    lance.weaponHeight = 150;
    spoon = loadImage("assets/spoon.png");
    spoon.weaponWidth = 30;
    spoon.weaponHeight = 180;
    plasrifle = loadImage("assets/plasrifle.png");
    plasrifle.weaponWidth = 30;
    plasrifle.weaponHeight = 130;
    railgun = loadImage("assets/railgun.png");
    railgun.weaponWidth = 30;
    railgun.weaponHeight = 100;
    harpoon = loadImage("assets/harpoon.png");
    harpoon.weaponWidth = 90;
    harpoon.weaponHeight = 150;
    moonStaff = loadImage("assets/moonStaff.png");
    moonStaff.weaponWidth = 85;
    moonStaff.weaponHeight = 150;
    starImage = loadImage("assets/stars.png");
    moon = loadImage("assets/moon.png");
    asteroidImage = loadImage("assets/asteroid.png");
    hats.spaceHelmet = loadImage("assets/spacehat.png");
    hats.spaceHelmet.xOffset = -25;
    hats.spaceHelmet.yOffset = -30;
    hats.spaceHelmet.customWidth = 50;
    hats.spaceHelmet.customHeight = 50;
    hats.spaceHelmet.sourceFile = "assets/spacehat.png";
    hats.evilHelmet = loadImage("assets/evilhelmet.png");
    hats.evilHelmet.xOffset = -25;
    hats.evilHelmet.yOffset = -30;
    hats.evilHelmet.customWidth = 50;
    hats.evilHelmet.customHeight = 50;
    hats.evilHelmet.sourceFile = "assets/evilhelmet.png";
    hats.swordHat = loadImage("assets/hats/swordHat.png");
    hats.swordHat.xOffset = -30;
    hats.swordHat.yOffset = -50;
    hats.swordHat.customWidth = 50;
    hats.swordHat.customHeight = 50;
    hats.swordHat.sourceFile = "assets/hats/swordHat.png";
    hats.waterBucket = loadImage("assets/hats/waterbucket.png");
    hats.waterBucket.xOffset = -25;
    hats.waterBucket.yOffset = -55;
    hats.waterBucket.customWidth = 50;
    hats.waterBucket.customHeight = 50;
    hats.waterBucket.sourceFile = "assets/hats/waterbucket.png";
    hats.baldEagle = loadImage("assets/hats/baldEagle.png");
    hats.baldEagle.xOffset = -50;
    hats.baldEagle.yOffset = -55;
    hats.baldEagle.customWidth = 100;
    hats.baldEagle.customHeight = 50;
    hats.baldEagle.sourceFile = "assets/hats/baldEagle.png";
    hats.table = loadImage("assets/hats/tableHat.png");
    hats.table.xOffset = -25;
    hats.table.yOffset = -30;
    hats.table.customWidth = 50;
    hats.table.customHeight = 50;
    hats.table.sourceFile = "assets/hats/tableHat.png";
    hats.ruby = loadImage("assets/hats/ruby.png");
    hats.ruby.xOffset = -25;
    hats.ruby.yOffset = -65;
    hats.ruby.customWidth = 50;
    hats.ruby.customHeight = 50;
    hats.ruby.sourceFile = "assets/hats/ruby.png";
    hats.four = loadImage("assets/hats/four.png");
    hats.four.xOffset = -32.5;
    hats.four.yOffset = -87.5;
    hats.four.customWidth = 50;
    hats.four.customHeight = 75;
    hats.four.sourceFile = "assets/hats/four.png";
    hats.whale = loadImage("assets/hats/whale.png");
    hats.whale.xOffset = -25;
    hats.whale.yOffset = -60;
    hats.whale.customWidth = 50;
    hats.whale.customHeight = 50;
    hats.whale.sourceFile = "assets/hats/whale.png";
    hats.redcross = loadImage("assets/hats/redcross.png");
    hats.redcross.xOffset = -25;
    hats.redcross.yOffset = -63;
    hats.redcross.customWidth = 50;
    hats.redcross.customHeight = 50;
    hats.redcross.sourceFile = "assets/hats/redcross.png";
    hats.dumbbells = loadImage("assets/hats/dumbbells.png");
    hats.dumbbells.xOffset = -25;
    hats.dumbbells.yOffset = -90;
    hats.dumbbells.customWidth = 50;
    hats.dumbbells.customHeight = 75;
    hats.dumbbells.sourceFile = "assets/hats/dumbbells.png";
    hats.stethoscope = loadImage("assets/hats/stethoscope.png");
    hats.stethoscope.xOffset = -34;
    hats.stethoscope.yOffset = -15;
    hats.stethoscope.customWidth = 50;
    hats.stethoscope.customHeight = 50;
    hats.stethoscope.sourceFile = "assets/hats/stethoscope.png";
    hats.temple = loadImage("assets/hats/temple.png");
    hats.temple.xOffset = -25;
    hats.temple.yOffset = -62.5;
    hats.temple.customWidth = 50;
    hats.temple.customHeight = 50;
    hats.temple.sourceFile = "assets/hats/temple.png";
    hats.clock = loadImage("assets/hats/clock.png");
    hats.clock.xOffset = -22.5;
    hats.clock.yOffset = -22.5;
    hats.clock.customWidth = 45;
    hats.clock.customHeight = 45;
    hats.clock.sourceFile = "assets/hats/clock.png";
    hats.donut = loadImage("assets/hats/donut.png");
    hats.donut.xOffset = -75 / 2;
    hats.donut.yOffset = -75 / 2;
    hats.donut.customWidth = 75;
    hats.donut.customHeight = 75;
    hats.donut.sourceFile = "assets/hats/donut.png";
    hats.brain = loadImage("assets/hats/brain.png");
    hats.brain.xOffset = -(45 * 4 / 3) / 2;
    hats.brain.yOffset = -22.5;
    hats.brain.customWidth = 45 * 4 / 3;
    hats.brain.customHeight = 45;
    hats.brain.sourceFile = "assets/hats/brain.png";
    hats.jeffBezos = loadImage("assets/hats/jeffBezos.png");
    hats.jeffBezos.xOffset = -22.5;
    hats.jeffBezos.yOffset = -22.5;
    hats.jeffBezos.customWidth = 45;
    hats.jeffBezos.customHeight = 65;
    hats.jeffBezos.sourceFile = "assets/hats/jeffBezos.png";
    hats.rockefeller = loadImage("assets/hats/rockefeller.png");
    hats.rockefeller.xOffset = -22.5;
    hats.rockefeller.yOffset = -22.5;
    hats.rockefeller.customWidth = 45;
    hats.rockefeller.customHeight = 55;
    hats.rockefeller.sourceFile = "assets/hats/rockefeller.png";
    hats.mansaMusa = loadImage("assets/hats/mansaMusa.png");
    hats.mansaMusa.xOffset = -22.5;
    hats.mansaMusa.yOffset = -22.5;
    hats.mansaMusa.customWidth = 45;
    hats.mansaMusa.customHeight = 62;
    hats.mansaMusa.sourceFile = "assets/hats/mansaMusa.png";
    hats.thatcher = loadImage("assets/hats/thatcher.png");
    hats.thatcher.xOffset = -25;
    hats.thatcher.yOffset = -55 / 2;
    hats.thatcher.customWidth = 50;
    hats.thatcher.customHeight = 55;
    hats.thatcher.sourceFile = "assets/hats/thatcher.png";
    hats.lunarRover = loadImage("assets/hats/lunarrover.png");
    hats.lunarRover.xOffset = -25;
    hats.lunarRover.yOffset = -57.5;
    hats.lunarRover.customWidth = 50;
    hats.lunarRover.customHeight = 50;
    hats.lunarRover.sourceFile = "assets/hats/lunarrover.png";
    hats.washington = loadImage("assets/hats/washington.png");
    hats.washington.xOffset = -25;
    hats.washington.yOffset = -25;
    hats.washington.customWidth = 50;
    hats.washington.customHeight = 50;
    hats.washington.sourceFile = "assets/hats/washington.png";
    hats.hamilton = loadImage("assets/hats/hamilton.png");
    hats.hamilton.xOffset = -25;
    hats.hamilton.yOffset = -25;
    hats.hamilton.customWidth = 50;
    hats.hamilton.customHeight = 50;
    hats.hamilton.sourceFile = "assets/hats/hamilton.png";
    hats.disguise = loadImage("assets/hats/disguise.png");
    hats.disguise.xOffset = -15;
    hats.disguise.yOffset = -12.5;
    hats.disguise.customWidth = 30;
    hats.disguise.customHeight = 30;
    hats.disguise.sourceFile = "assets/hats/disguise.png";
    hats.tophat = loadImage("assets/hats/tophat.png");
    hats.tophat.xOffset = -25;
    hats.tophat.yOffset = -25;
    hats.tophat.customWidth = 50;
    hats.tophat.customHeight = 25;
    hats.tophat.sourceFile = "assets/hats/tophat.png";
    hats.tinfoilhat = loadImage("assets/hats/tinfoilhat.png");
    hats.tinfoilhat.xOffset = -25;
    hats.tinfoilhat.yOffset = -25;
    hats.tinfoilhat.customWidth = 50;
    hats.tinfoilhat.customHeight = 25;
    hats.tinfoilhat.sourceFile = "assets/hats/tinfoilhat.png";
    hats.ben = loadImage("assets/hats/benfranklin.png");
    hats.ben.xOffset = -25;
    hats.ben.yOffset = -25;
    hats.ben.customWidth = 50;
    hats.ben.customHeight = 50;
    hats.ben.sourceFile = "assets/hats/benfranklin.png";
    hats.curie = loadImage("assets/hats/curie.png");
    hats.curie.xOffset = -25;
    hats.curie.yOffset = -25;
    hats.curie.customWidth = 50;
    hats.curie.customHeight = 50;
    hats.curie.sourceFile = "assets/hats/curie.png";
    hats.head = loadImage("assets/hats/head.png");
    hats.head.xOffset = -31 / 2;
    hats.head.yOffset = -45;
    hats.head.customWidth = 31;
    hats.head.customHeight = 30;
    hats.head.sourceFile = "assets/hats/head.png";
    hats.sweat = loadImage("assets/hats/sweat.png");
    hats.sweat.xOffset = 15;
    hats.sweat.yOffset = -25 / 2;
    hats.sweat.customWidth = 25;
    hats.sweat.customHeight = 25;
    hats.sweat.sourceFile = "assets/hats/sweat.png";
    powerups.heart = loadImage("assets/heart.png");
    powerups.heart.xOffset = 0;
    powerups.heart.yOffset = 2.5;
    powerups.heart.scale = 1;
    powerups.sword = loadImage("assets/sword.png");
    powerups.sword.xOffset = 0;
    powerups.sword.yOffset = -2;
    powerups.sword.scale = 0.9;
    sounds.laserSwing1 = loadSound("sounds/laserSwing1.wav");
    sounds.laserSwing2 = loadSound("sounds/laserSwing2.wav");
    sounds.laserSwing3 = loadSound("sounds/laserSwing3.wav");
    sounds.laserOnMetal = loadSound("sounds/laserOnMetal.wav");
    sounds.laserOnFlesh = loadSound("sounds/laserOnFlesh.wav");
    sounds.laserOnLaser = loadSound("sounds/laserOnLaser.wav");
    sounds.laserOnLaser2 = loadSound("sounds/laserOnLaser.wav");
    sounds.laserBlock = loadSound("sounds/laserBlock.wav");
    sounds.bulletOnFlesh = loadSound("sounds/bulletHit.mp3");
    sounds.bulletShot = loadSound("sounds/bulletShot.wav");
    sounds.railgunShot = loadSound("sounds/railgunShot.wav");
    sounds.hellfire = loadSound("sounds/hellfire.wav");
    sounds.asteroidHit = loadSound("sounds/asteroidHit.wav");
    sounds.pop = loadSound("sounds/pop.flac");
    sounds.track1 = loadSound("sounds/track1.mp3");
}
let moonX;
let moonY;

function setup() {
    createCanvas(600, 600);
    starSeed = floor(random(0, 1000));
    engine = Engine.create({
        enableSleeping: true
    });
    engine.world.gravity = { x: 0, y: 0 };
    currentWeapon = weapons[localProxy.defaultWeapon].weapon();
    player = Person({
        x: 0,
        y: 0,
        category: 2,
        weapon: currentWeapon,
        hat: currHat,
        strength: 2
    });
    //powerupList.push(heartPowerup(60, 60), damagePowerup(0, 0));
    moonX = player.head.position.x;
    moonY = player.head.position.y;
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
    });
    /*emitters.push(Emitter({
        x: 0,
        y: 0,
        minSize: 1,
        maxSize: 3,
        distributionSize: 0,
        colors: [
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255]
        ],
        rate: 1,
        startingParticles: 10,
        magnitude: 5,
        duration: 360,
        particleDuration: 60,
        minAngle: 180,
        maxAngle: 270,
        display: "line",
        lineSize: 2
    }))*/
    player.add();
    Engine.run(engine);
}

function clearGameState() {
    World.remove(engine.world, engine.world.bodies);
    player = Person({
        x: 0,
        y: 0,
        category: 2,
        weapon: currentWeapon,
        hat: currHat,
        strength: 2
    });
    enemies.forEach(enemy => {
        enemy.clearAsteroids();
    })
    enemies = [];
    bullets = [];
    coinList = [];
    powerupList = [];
    emitters = [];
    player.add();
    tick = 0;
    wave = 0;
    winState = undefined;
}
let tick = 0;
let wave = 0;
const settings = $("#settings");
let winState;

function reset() {
    noLoop();
    maxLevelUnlocked = 0;
    coins = 0;
    localStorage.clear();
    location.reload();
}

function draw() {
    coins = min(coins, 99999);
    coins = round(coins);
    localProxy.unlockedHats = Array.from(new Set(localProxy.unlockedHats));
    if (coins >= 999) {
        achievements.add(jeffBezos);
    }
    if (coins >= 9999) {
        achievements.add(johnDRockefeller);
    }
    if (coins >= 99999) {
        achievements.add(mansaMusa);
    }
    if (localProxy.achievements.length === achievementList.length - 1) {
        achievements.add(sweatlord);
    }
    localStorage.coins = coins;
    localStorage.maxLevelUnlocked = maxLevelUnlocked;
    background(0);
    image(coin, 450 + 80 - 11 * (coins.toString().length - 1), 10, 30, 30);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(coins, 495 + 80 - 4 * (coins.toString().length - 1), 35);
    sounds.track1.setVolume(localProxy.musicVolume);
    if (gameState === "play") {
        if (!sounds.track1.isPlaying()) {
            sounds.track1.loop();
        }
        if (enemies.length === 0 && tick > Math.max(...Object.keys(level).map(x => +x)) && !winState) {
            winState = "win";
            if (maxLevelUnlocked === levelNum) {
                maxLevelUnlocked++;
            }
            displayVictory();
        }
        settings.css("display", "inline-block");
        background(0, 255, 255);
        if (level[tick]) {
            level[tick].forEach(enemy => {
                const newEnemy = enemy();
                newEnemy.add()
                enemies.push(newEnemy);
            });
        }
        if (level.endless) {
            if (tick % 360 === 0 && !paused && !player.dead) {
                let totalEnemies = round(random(floor((wave + 1) / 5), 5 + floor((wave + 1) / 5)));
                totalEnemies = min(10, totalEnemies);
                if (enemies.length > 14) {
                    totalEnemies = 0;
                }
                let minStrength = 0.1;
                let maxStrength = 0.5;
                for (let i = 0; i < wave; i++) {
                    if (i < 10) {
                        minStrength += 0.025;
                        maxStrength += 0.05;
                    } else if (i < 20) {
                        minStrength += 0.025;
                        maxStrength += 0.04;
                    } else if (i < 30) {
                        minStrength += 0.025;
                        maxStrength += 0.03;
                    } else if (i < 40) {
                        minStrength += 0.015;
                        maxStrength += 0.02;
                    } else {
                        maxStrength += 0.01;
                    }
                }
                let totalPool = 0;
                endless.enemiesList.forEach(enemy => {
                    totalPool += endless.enemyPotency[enemy](wave);
                });
                endless.enemiesList.forEach(enemy => {
                    let amtToSpawn = round((endless.enemyPotency[enemy](wave) / totalPool) * totalEnemies);
                    if (enemy === "rangedRapid" && enemies.filter(enemy => enemy.type === "rangedRapid").length >= 2) {
                        amtToSpawn = 0;
                    }
                    for (let i = 0; i < amtToSpawn; i++) {
                        const e = endless.enemyCode[enemy](random(minStrength, maxStrength))();
                        e.add();
                        enemies.push(e);
                    }
                });
                if (wave === 1) {
                    achievements.add(georgeWashington);
                }
                if (wave === 5) {
                    achievements.add(theSenses);
                }
                if (wave === 10) {
                    achievements.add(alexanderHamilton);
                }
                if (wave === 21) {
                    achievements.add(allTheSenses);
                }
                if (wave === 50) {
                    achievements.add(tinPentecost);
                }
                if (wave === 100) {
                    achievements.add(benFranklin);
                }
                if (wave === 200) {
                    achievements.add(marieCurie);
                }
                wave++;
                if (wave > localProxy.waveRecord) {
                    localProxy.waveRecord = wave;
                }
            }
        }
        if (Math.random() < localProxy.powerUpInfo.healthSpawnRate && !player.dead && !paused) {
            powerupList.push(healthPowerup(player.head.position.x + random(100, 200) * (random() < 0.5 ? 1 : -1), player.head.position.y + random(100, 200) * (random() < 0.5 ? 1 : -1)));
        }
        if (Math.random() < localProxy.powerUpInfo.strengthSpawnRate && !player.dead && !paused) {
            powerupList.push(damagePowerup(player.head.position.x + random(100, 200) * (random() < 0.5 ? 1 : -1), player.head.position.y + random(100, 200) * (random() < 0.5 ? 1 : -1)));
        }
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
        imageMode(CENTER);
        let moonSize = max(2500 * (levelNum / 10) ** 4, 1);
        image(moon, 0, 0, moonSize, moonSize);
        imageMode(CORNER);
        strokeWeight(3);
        stroke(120);
        fill(60);
        rect(player.head.position.x - 298, player.head.position.y - 298, 100, 10);
        fill(255)
        noStroke();
        rect(player.head.position.x - 297, player.head.position.y - 296.5, 98 * player.getHealth(), 7);
        if (player.holdingRangedWeapon()) {
            strokeWeight(3);
            stroke(120);
            fill(60);
            rect(player.head.position.x - 298, player.head.position.y - 298 + 11, 100, 10);
            fill(0, 255, 255);
            noStroke();
            rect(player.head.position.x - 297, player.head.position.y - 296.5 + 11, 98 * player.cooldown, 7);
        }
        if (levelNum === 9) {
            const boss = enemies.find(e => e.boss);
            if (boss) {
                strokeWeight(3);
                stroke(120);
                fill(60);
                rect(player.head.position.x - 298 + 100, player.head.position.y - 298, 100, 10);
                fill(255, 0, 0)
                noStroke();
                rect(player.head.position.x - 297 + 100, player.head.position.y - 296.5, 98 * boss.getHealth(), 7);
            }
        } else if (levelNum === 10) {
            fill(255);
            textAlign(LEFT);
            textSize(15);
            text("Wave: " + wave, player.head.position.x - 294 + 100, player.head.position.y - 286);
            text("Wave Record: " + localProxy.waveRecord, player.head.position.x - 294 + 100, player.head.position.y - 266);
        } else {
            const maxTick = Math.max(...Object.keys(level));
            const progression = min(tick / maxTick, 1);
            strokeWeight(3);
            stroke(120);
            fill(60);
            rect(player.head.position.x - 298 + 100, player.head.position.y - 298, 100, 10);
            fill(0, 255, 0)
            noStroke();
            rect(player.head.position.x - 297 + 100, player.head.position.y - 296.5, 98 * progression, 7);
        }
        fill(255);
        image(coin, player.head.position.x + 170 - 11 * (coins.toString().length - 1), player.head.position.y - 290, 30, 30);
        textAlign(CENTER);
        textSize(30);
        text(coins, player.head.position.x + 200 - 4 * (coins.toString().length - 1), player.head.position.y - 290, 35);
        if (player.x < -2100 || player.x > 2100 || player.y < -2100 || player.y > 2100) {
            player.die();
        }
        powerupList.forEach(powerup => {
            powerup.draw();
        })
        player.draw();
        enemies.forEach(enemy => {
            enemy.draw();
            player.takeDamage(enemy);
            enemy.takeDamage(player);
            if (enemy.x < -2100 || enemy.x > 2100 || enemy.y < -2100 || enemy.y > 2100) {
                enemy.die();
            }
        });
        emitters.forEach(emitter => {
            emitter.draw();
        });
        bullets.forEach((bullet, i) => {
            if (!bullet.tick) {
                bullet.tick = 1;
            }
            bullet.tick++;
            fill(255, 0, 255);
            if (bullet.source === "player") {
                fill(0, 255, 0);
            }
            if (bullet.source === "railgun") {
                fill(255, 255, 0);
            }
            if (bullet.source === "hellfire") {
                fill(255, 165, 0);
            }
            drawVertices(bullet.vertices);
            player.takeDamage(bullet);
            enemies.forEach(enemy => {
                enemy.takeDamage(bullet);
            })
            if (bullet.position.x < -2300 || bullet.position.x > 2300 || bullet.position.y < -2300 || bullet.position.y > 2300 || bullet.tick > 180) {
                World.remove(engine.world, [bullet]);
                bullets.splice(i, 1);
            }
        });
        coinList.forEach(coinDisp => {
            coinDisp.draw();
        })
        achievements.render();
        tick++;
    } else {
        sounds.track1.pause()
        settings.css("display", "none");
        achievements.render();
    }
    if (paused) {
        engine.world.bodies.forEach(body => Sleeping.set(body, true));
    } else {
        engine.world.bodies.forEach(body => Sleeping.set(body, false));
    }
}
settings.click(() => {
    paused = true;
    settingsMenu();
})
const menu = $("#menu");
const mainMenu = () => {
    menu.html(`
    <h1 class="w3-text-white" style="margin-left:130px;font-size:80px;" class="graytext">Apollo X</h1>
        <br>
        <button id="selectLevel" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Level Select</button>
        <br>
        <br>
        <button id="shop" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Shop</button>
        <br>
        <br>
        <button id="achievements" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Achievements</button>
        <br>
        <br>
        <button id="hats" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Hats</button>
        <br>
        <br>
        <button id="instructions" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Instructions</button>
    `);
}
const levelSelectMenu = () => {
    menu.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 70px; font-size:80px;" class="graytext">Level Select</h1>`);
    const levelButtons = $("<div>");
    levelButtons.css("margin-left", "85px");
    levelButtons.css("text-align", "left");
    const startButton = $(`<button id="start" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Start</button>`);
    startButton.css("display", "none");
    const endlessButton = $(`<button id="endless" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Endless</button>`);
    const backButton = $(`<button id="back" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    let currLevel;
    Array(10).fill(undefined).forEach((_, i) => {
        levelButtons.append(`<button id="level${i}" class="w3-padding w3-margin w3-button w3-gray w3-xlarge w3-text-white w3-round" ${i <= maxLevelUnlocked ? "" : "disabled"}>${i + 1}</button>`);
        $(document).on("click", `#level${i}`, () => {
            currLevel = i;
            Array(10).fill(undefined).forEach((_, i) => {
                $(`#level${i}`).removeClass("w3-dark-gray");
                $(`#level${i}`).addClass("w3-gray");
            });
            $(`#level${i}`).addClass("w3-dark-gray");
            $(`#level${i}`).removeClass("w3-gray");
            startButton.css("display", "inline-block");
        });
        if (i === 4) {
            levelButtons.append("<br>");
            levelButtons.append("<br>");
        }
    });
    startButton.click(() => {
        gameState = "play";
        menu.html("");
        levelNum = currLevel;
        level = levels[levelNum];
    });
    endlessButton.click(() => {
        currLevel = 10;
        wave = 0;
        gameState = "play";
        menu.html("");
        levelNum = currLevel;
        level = levels[levelNum];
    })
    backButton.click(mainMenu);
    menu.append(levelButtons);
    menu.append("<br>");
    menu.append(startButton);
    menu.append("<br>");
    menu.append("<br>");
    if (maxLevelUnlocked === 10) {
        menu.append(endlessButton);
        menu.append("<br>");
        menu.append("<br>");
    }
    menu.append(backButton);
};
const settingsMenu = () => {
    menu.html(``)
    const exitButton = $(`<button id="start" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Exit</button>`);
    exitButton.click(() => {
        levelSelectMenu();
        paused = false;
        gameState = "start";
        clearGameState();
    });
    const resumeButton = $(`<button id="start" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Resume</button>`);
    resumeButton.click(() => {
        paused = false;
        menu.html(``);
    });
    const musicVolume = $(`<input style="position:relative;top:4px;margin-left:4px;" type="range" min="0" max="100" value="100">`);
    musicVolume.css("margin-top", "180px");
    const soundEffectsVolume = $(`<input style="position:relative;top:4px;margin-left:18px;" type="range" min="0" max="100" value="100">`);
    musicVolume.val(Math.round(localProxy.musicVolume * 100));
    soundEffectsVolume.val(Math.round(localProxy.sfxVolume * 100));
    musicVolume.on("input", () => {
        localProxy.musicVolume = musicVolume.val() / 100;
    });
    soundEffectsVolume.on("input", () => {
        localProxy.sfxVolume = soundEffectsVolume.val() / 100;
    });
    menu.append($(`<label style="margin-left: 185px;" class="w3-text-white">Music Volume:</label>`))
    menu.append(musicVolume);
    menu.append($("<br>"));
    menu.append($(`<label style="margin-left: 185px" class="w3-text-white">SFX Volume:</label>`))
    menu.append(soundEffectsVolume);
    menu.append($("<br>"));
    menu.append($("<br>"));
    menu.append(exitButton);
    menu.append($("<br>"));
    menu.append($("<br>"));
    menu.append(resumeButton);
}
const displayVictory = () => {
    if (player.getHealth() < 0.2) {
        achievements.add(clutchGod);
    }
    if (levelNum === 4) {
        achievements.add(ironResolve);
    }
    if (levelNum === 9) {
        achievements.add(moonLanding);
    }
    menu.html(``);
    const victoryMessage = $("<div>");
    victoryMessage.addClass("w3-animate-opacity");
    victoryMessage.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 140px; margin-top:200px; font-size:80px;" class="graytext">Victory!</h1>`);
    const backButton = $(`<button id="back" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    backButton.click(() => {
        levelSelectMenu();
        paused = false;
        gameState = "start";
        clearGameState();
    });
    victoryMessage.append(backButton);
    menu.append(victoryMessage);
}
const displayLoss = () => {
    menu.html(``);
    const victoryMessage = $("<div>");
    victoryMessage.addClass("w3-animate-opacity");
    victoryMessage.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 115px; margin-top:200px; font-size:80px;" class="graytext">You Died!</h1>`);
    const backButton = $(`<button id="back" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    backButton.click(() => {
        levelSelectMenu();
        paused = false;
        gameState = "start";
        clearGameState();
    });
    const restartButton = $(`<button id="restart" style="margin-left:185px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Restart</button>`);
    restartButton.click(() => {
        clearGameState();
        gameState = "play";
        menu.html("");
        level = levels[levelNum];
    })
    victoryMessage.append(restartButton);
    victoryMessage.append($("<br>"));
    victoryMessage.append($("<br>"));
    victoryMessage.append(backButton);
    menu.append(victoryMessage);
}
const openShop = () => {
    menu.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 175px; font-size:80px;" class="graytext">Shop:</h1>`);
    const shopButtons = $("<div>");
    shopButtons.css("text-align", "left");
    const backButton = $(`<button id="back" style="margin-left:180px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    backButton.click(mainMenu);
    const characterButton = $(`<button id="character" style="margin-left:180px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Character</button>`);
    characterButton.click(characterShop);
    const weaponButton = $(`<button id="weapons" style="margin-left:180px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Weapons</button>`);
    weaponButton.click(weaponShop);
    const powerupButton = $(`<button id="weapons" style="margin-left:180px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Power Ups</button>`);
    powerupButton.click(powerupShop)
    shopButtons.append(characterButton);
    shopButtons.append("<br>");
    shopButtons.append("<br>")
    shopButtons.append(weaponButton);
    shopButtons.append("<br>");
    shopButtons.append("<br>");
    shopButtons.append(powerupButton);
    shopButtons.append("<br>");
    shopButtons.append("<br>");
    shopButtons.append(backButton);
    menu.append(shopButtons);
}
const powerupShop = () => {
    menu.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 80px; font-size:80px;" class="graytext">Power Ups:</h1>`);
    const backButton = $(`<button id="back" style="margin-left:180px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    backButton.click(openShop);
    const shopButtons = $("<div>");
    Object.entries(powerupNames).forEach(([name, display]) => {
        const upgradeSpawnButton = $(`<button id="back" style="margin-left:60px;" class="w3-button w3-gray w3-text-white w3-round"><span id="${name}DisplayS" style="font-size:15px;">Upgrade ${display} spawn frequency for ${localProxy.powerUpInfo[name + "SpawnUpgrade"]} for coins.</span></button>`);
        const upgradePotencyButton = $(`<button id="back" style="margin-left:60px;" class="w3-button w3-gray w3-text-white w3-round"><span id="${name}DisplayP" style="font-size:15px;">Upgrade ${display} potency for ${localProxy.powerUpInfo[name + "PotencyUpgrade"]} for coins.</span></button>`);
        upgradeSpawnButton.click(() => {
            const cost = localProxy.powerUpInfo[name + "SpawnUpgrade"];
            if (coins >= cost) {
                coins -= cost;
                const temp = localProxy.powerUpInfo;
                temp[name + "SpawnRate"] = localProxy.powerUpInfo[name + "SpawnRate"] + 0.0005;
                temp[name + "SpawnUpgrade"] = round(localProxy.powerUpInfo[name + "SpawnUpgrade"] * 1.5);
                localProxy.powerUpInfo = temp;
                $(`#${name}DisplayS`).html(`Upgrade ${display} spawn frequency for ${localProxy.powerUpInfo[name + "SpawnUpgrade"]} for coins.`);
                achievements.add(tickSpeed);
            }
        })
        upgradePotencyButton.click(() => {
            const cost = localProxy.powerUpInfo[name + "PotencyUpgrade"];
            if (coins >= cost) {
                coins -= cost;
                const temp = localProxy.powerUpInfo;
                temp[name + "Potency"] = localProxy.powerUpInfo[name + "Potency"] + 0.25;
                temp[name + "PotencyUpgrade"] = round(localProxy.powerUpInfo[name + "PotencyUpgrade"] * 1.5);
                localProxy.powerUpInfo = temp;
                $(`#${name}DisplayP`).html(`Upgrade ${display} potency for ${localProxy.powerUpInfo[name + "PotencyUpgrade"]} for coins.`);
                if (name === "health") {
                    achievements.add(doctor);
                }
                if (name === "strength") {
                    achievements.add(hercules);
                }
            }
        })
        shopButtons.append(upgradeSpawnButton);
        shopButtons.append($("<br>"));
        shopButtons.append($("<br>"));
        shopButtons.append(upgradePotencyButton);
        shopButtons.append($("<br>"));
        shopButtons.append($("<br>"));
    })
    shopButtons.append(backButton);
    menu.append(shopButtons);
}
const weaponShop = () => {
    menu.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 110px; font-size:80px;" class="graytext">Weapons:</h1>`);
    const shopButtons = $("<div>");
    Object.entries(weapons).forEach(([weaponName, weapon]) => {
        const weaponButton = $(`<button id="weapon${weaponName}" style="margin-left:190px;" class="w3-button ${currentWeapon === weapon.weapon() ? "w3-dark-gray" : "w3-gray"}  w3-xlarge w3-text-white w3-round">${weapon.display}</button>`);
        if (!weapon.unlocked) {
            weaponButton.html(`Buy ${weapon.display} for ${weapon.cost} coins`);
        }
        weaponButton.click(() => {
            if (coins >= weapon.cost && !weapon.unlocked) {
                achievements.add(({
                    "pistol": spaceEagle,
                    "lance": roundTable,
                    "railgun": rubiedOn,
                    "plasrifle": fourthState,
                    "harpoon": mobyStar
                })[weaponName]);
                coins -= weapon.cost;
                weapon.unlocked = true;
                weaponButton.html(`${weapon.display}`);
                localProxy.unlockedWeapons = localProxy.unlockedWeapons.concat(weaponName);
            }
            if (weapon.unlocked) {
                localProxy.defaultWeapon = weaponName;
                weaponButton.removeClass('w3-gray');
                weaponButton.addClass("w3-dark-gray");
                Object.keys(weapons).filter(key => key !== weaponName).forEach(name => {
                    $(`#weapon${name}`).removeClass("w3-dark-gray");
                    $(`#weapon${name}`).addClass("w3-gray");
                })
                currentWeapon = weapon.weapon();
                /*player = Person({
                    x: 0,
                    y: 0,
                    category: 2,
                    weapon: currentWeapon,
                    hat: "spaceHelmet",
                    strength: 2
                });*/
            }

        })
        shopButtons.append(weaponButton);
        shopButtons.append("<br>");
        shopButtons.append("<br>");
    })
    const backButton = $(`<button id="back" style="margin-left:190px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    backButton.click(openShop);
    shopButtons.append(backButton);
    menu.append(shopButtons);
}
const characterShop = () => {
    menu.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 90px; font-size:80px;" class="graytext">Character:</h1>`);
    const shopButtons = $("<div>");
    const backButton = $(`<button id="back" style="margin-left:190px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    const upgradeHealth = $(`<button id="back" style="margin-left:60px;width:475px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Upgrade Your Health for ${localProxy.healthUpgradeCost} Coins</button>`);
    const upgradeDamage = $(`<button id="back" style="margin-left:60px;width:475px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Upgrade Your Damage for ${localProxy.damageUpgradeCost} Coins</button>`);
    upgradeHealth.click(() => {
        if (coins >= localProxy.healthUpgradeCost) {
            coins -= localProxy.healthUpgradeCost;
            localProxy.healthMultiplier = localProxy.healthMultiplier + 1 / 3;
            localProxy.healthUpgradeCost *= 1.5;
            localProxy.healthUpgradeCost = Math.round(localProxy.healthUpgradeCost);
            upgradeHealth.html(`Upgrade Your Health for ${localProxy.healthUpgradeCost} Coins`);
            if ((localProxy.healthMultiplier + localProxy.damageMultiplier - 2) > 5) {
                achievements.add(steroids);
            }
        }
    });
    upgradeDamage.click(() => {
        if (coins >= localProxy.damageUpgradeCost) {
            coins -= localProxy.damageUpgradeCost;
            localProxy.damageMultiplier = localProxy.damageMultiplier + 1 / 3;
            localProxy.damageUpgradeCost *= 1.5;
            localProxy.damageUpgradeCost = Math.round(localProxy.damageUpgradeCost);
            upgradeDamage.html(`Upgrade Your Damage for ${localProxy.damageUpgradeCost} Coins`);
            if ((localProxy.healthMultiplier + localProxy.damageMultiplier - 2) > 5) {
                achievements.add(steroids);
            }
        }
    });
    backButton.click(openShop);
    shopButtons.append(upgradeHealth);
    shopButtons.append("<br>");
    shopButtons.append("<br>");
    shopButtons.append(upgradeDamage);
    shopButtons.append("<br>");
    shopButtons.append("<br>");
    shopButtons.append(backButton);
    menu.append(shopButtons);
}
const achievementMenu = () => {
    menu.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 30px; font-size:80px;" class="graytext">Achievements:</h1>`);
    const achievementDisplay = $(`<div style="max-height:300px;width:600px;overflow:scroll;" class="w3-text-white">`);
    achievementList.forEach(a => {
        achievementDisplay.append(`
        <div style="padding: 4px; max-height: 100px; border: 2px solid white;" class="w3-text-white w3-gray">
        <h4 class="${localProxy.achievements.includes(a.title) ? "w3-text-white" : "graytext"}">${a.title}</h4>
        <p class="${localProxy.achievements.includes(a.title) ? "w3-text-white" : "graytext"}"><em>${a.desc}</em></p>
        </div>`);
    });
    const backButton = $(`<button id="back" style="margin-left:190px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    backButton.click(mainMenu);
    const group = $(`<div style="text-align:left;">`);
    group.append(achievementDisplay);
    group.append($("<br>"))
    group.append(backButton);
    menu.append(group);
};
const hatSelect = () => {
    menu.html(`<h1 class="w3-text-white" style="text-align: left; margin-left: 200px; font-size:80px;" class="graytext">Hats:</h1>`);
    const backButton = $(`<button id="back" style="margin-left:190px;width:200px" class="w3-button w3-gray w3-xlarge w3-text-white w3-round">Back</button>`);
    backButton.click(mainMenu);
    const group = $(`<div style="text-align:left;">`);
    const refinedHats = Object.fromEntries(Object.entries(hats).filter(([hatname, _]) => localProxy.unlockedHats.includes(hatname)));
    let currHatIndex = Object.keys(refinedHats).indexOf(currHat);
    const [hatname, hat] = Object.entries(refinedHats)[currHatIndex];
    currHat = hatname;
    clearGameState();
    const img = document.createElement("img");
    img.src = hat.sourceFile;
    const back = document.createElement("button");
    back.innerHTML = "<";
    const forward = document.createElement("button");
    forward.innerHTML = ">";
    back.style.marginLeft = "75px";
    img.width = 300;
    img.height = 300;
    img.style.border = "5px solid white";
    img.style.backgroundColor = "white";
    img.style.marginLeft = "50px";
    back.onclick = () => {
        currHatIndex -= 1;
        if (currHatIndex < 0) {
            currHatIndex = Object.values(refinedHats).length - 1;
        }
        img.src = Object.values(refinedHats)[currHatIndex].sourceFile;
        currHat = Object.keys(refinedHats)[currHatIndex];
        clearGameState();
        localProxy.hat = currHat;
    }
    forward.style.marginLeft = "32px";
    forward.onclick = () => {
        currHatIndex += 1;
        if (currHatIndex > Object.values(refinedHats).length - 1) {
            currHatIndex = 0;
        }
        img.src = Object.values(refinedHats)[currHatIndex].sourceFile;
        currHat = Object.keys(refinedHats)[currHatIndex];
        clearGameState();
        localProxy.hat = currHat;
    }
    group.append($(back));
    group.append($(img));
    group.append($(forward));
    group.append($(document.createElement("br")));
    group.append($(document.createElement("br")));
    group.append($(backButton));
    group.append(backButton);
    menu.append(group);

    menu.append(group);
}
$(document).on("click", "#selectLevel", levelSelectMenu);
$(document).on("click", "#shop", openShop);
$(document).on("click", "#achievements", achievementMenu);
$(document).on("click", "#hats", hatSelect);
$(document).on("click", "#instructions", () => {
    achievements.add(bigBrain);
    $("#instructionModal").css("display", "block");
})