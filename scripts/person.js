function vecTo(x1, y1, x2, y2, mag = 1) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    let direction;
    if (xDist > 0 && yDist > 0) {
        direction = degrees(Math.atan(yDist / xDist));
    } else if (xDist > 0 && yDist < 0) {
        direction = 360 + degrees(Math.atan(yDist / xDist));
    } else {
        direction = 180 + degrees(Math.atan(yDist / xDist));
    }
    return { x: Math.cos(radians(direction)) * mag, y: Math.sin(radians(direction)) * mag };
}

function directionCalc(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    let direction;
    if (xDist > 0 && yDist > 0) {
        direction = degrees(Math.atan(yDist / xDist));
    } else if (xDist > 0 && yDist < 0) {
        direction = 360 + degrees(Math.atan(yDist / xDist));
    } else {
        direction = 180 + degrees(Math.atan(yDist / xDist));
    }
    return radians(direction);
}

function Person({
    x,
    y,
    color = [225, 225, 225],
    weapon,
    category,
    cowardice = 0,
    puppet = false,
    hat,
    type,
    strength = 1,
    coinAmount = 1,
    coinValue = 1,
    boss = false,
    backgroundPerson = false
}) {
    let target;
    let targetTick;
    if (backgroundPerson) {
        targetTick = 0;
        target = { x: random(0, 1000), y: random(700) }
    }
    const LASER_WEAPONS = [lazord, lazdagger, lance, axe, plasrifle, harpoon, moonStaff];
    hat = hats[hat];
    let weaponWidth = weapon.weaponWidth;
    let weaponHeight = weapon.weaponHeight;
    const myGroup = Body.nextGroup(false);
    const myMask = 7 - category;
    const myCategory = category;
    let deadBodyParts = [];
    const torso = Bodies.rectangle(x, y, 10, 40, {
        collisionFilter: {
            mask: myMask,
            group: myGroup,
            category: myCategory
        },
        restitution: 0.5,
        friction: 1,
        frictionAir: 0.1
    });
    const head = Bodies.circle(x, y - 25, 15, {
        collisionFilter: {
            mask: myMask,
            group: Body.nextGroup(false),
            category: myCategory
        },
        frictionAir: 0.1,
    });
    const distanceFromCenter = 0;
    const legWidth = 10;
    const l3 = Body.nextGroup(false);
    const l4 = Body.nextGroup(false);
    const upperArm1 = Bodies.rectangle(x, y - 5, legWidth, 20, {
        collisionFilter: {
            mask: myMask,
            group: l3,
            category: myCategory
        },
        /*frictionAir: 0.1,*/
    });
    const upperArm2 = Bodies.rectangle(x, y - 5, legWidth, 20, {
        collisionFilter: {
            mask: myMask,
            group: l4,
            category: myCategory
        },
        frictionAir: 0.1,
        /*frictionAir: 0.1,*/
    });
    const lowerArm1 = Bodies.rectangle(x, y + 5, legWidth, 30, {
        collisionFilter: {
            mask: myMask,
            group: l3,
            category: myCategory
        },
        frictionAir: 0.1,
        /*frictionAir: 0.1,*/
    });
    const lowerArm2 = Bodies.rectangle(x, y + 5, legWidth, 30, {
        collisionFilter: {
            mask: myMask,
            group: l4,
            category: myCategory
        },
        frictionAir: 0.1,
        /*frictionAir: 0.1,*/
    });
    let weaponBox = Bodies.rectangle(x, y + 5, weaponWidth, weaponHeight, {
        collisionFilter: {
            mask: myMask,
            group: Body.nextGroup(false),
            category: myCategory
        },
        frictionAir: 0.1,
        density: (() => {
            switch (weapon) {
                /*case axe:
                    return 0.005;
                case sword:
                    return 0.0025;
                case dagger:
                    return 0.001;*/
                case plasrifle:
                case harpoon:
                case flamethrower:
                case bomb:
                    return 0.0015;
                case pistol:
                    return 0.0005;
                case lazord:
                    return 0.001;
                case lance:
                    return 0.001;
                case railgun:
                    return 0.001;
                case lazdagger:
                    return 0.0005;
                case axe:
                case spoon:
                    return 0.0025;
                case moonStaff:
                    return 0.0015;
                case undefined:
                    return 0.0000001;
            }
        })()
    });
    const l1 = Body.nextGroup(false);
    const l2 = Body.nextGroup(false);
    const upperLeg1 = Bodies.rectangle(x + distanceFromCenter, y + 45, legWidth, 30, {
        collisionFilter: {
            mask: myMask,
            group: l1,
            category: myCategory
        },
        frictionAir: 0.1
    });
    const upperLeg2 = Bodies.rectangle(x - distanceFromCenter, y + 45, legWidth, 30, {
        collisionFilter: {
            mask: myMask,
            group: l2,
            category: myCategory
        },
        frictionAir: 0.1
    });
    let death = false;
    let healthLost = 0;
    const s = 1;
    const u = 2.5;
    const l = 2.5;
    const shoulder1 = Constraint.create({
        bodyA: torso,
        bodyB: upperArm1,
        length: 0,
        pointA: {
            x: distanceFromCenter,
            y: -10
        },
        pointB: {
            x: 0,
            y: -10
        },
        damping: 0.1,
        stiffness: 1,
        frictionAir: 0.1,
        /*angleAStiffness: s,
        angleAMin: -Math.PI / u,
        angleAMax: Math.PI / u,*/
        /*angleBMin: -Math.PI / u,
        angleBMax: Math.PI / u,
        angleBStiffness: s,
        damping: 0.1*/
    })
    const shoulder2 = Constraint.create({
        bodyA: torso,
        bodyB: upperArm2,
        length: 0,
        pointA: {
            x: -distanceFromCenter,
            y: -10
        },
        pointB: {
            x: 0,
            y: -10
        },
        damping: 0.1,
        stiffness: 1,
        frictionAir: 0.1,

        /*angleAStiffness: s,
        angleAMin: -Math.PI / u,
        angleAMax: Math.PI / u,*/
        /*angleBMin: -Math.PI / u,
        angleBMax: Math.PI / u,
        angleBStiffness: s,
        damping: 0.1*/
    });
    const elbow1 = Constraint.create({
        bodyA: upperArm1,
        bodyB: lowerArm1,
        length: 0,
        pointA: {
            x: distanceFromCenter,
            y: 10
        },
        pointB: {
            x: 0,
            y: -15
        },
        damping: 0.1,
        stiffness: 1,
        frictionAir: 0.1,
        /*angleAStiffness: s,
        angleAMin: -Math.PI / u,
        angleAMax: Math.PI / u,*/
        /*angleBMin: -Math.PI / 2,
        angleBMax: Math.PI / 2,
        angleBStiffness: s,
        damping: 0.1*/
    })
    const elbow2 = Constraint.create({
        bodyA: upperArm2,
        bodyB: lowerArm2,
        length: 0,
        pointA: {
            x: distanceFromCenter,
            y: 10
        },
        pointB: {
            x: 0,
            y: -15
        },
        damping: 0.1,
        stiffness: 1,
        frictionAir: 0.1,
        /*angleAStiffness: s,
        angleAMin: -Math.PI / u,
        angleAMax: Math.PI / u,*/
        /*angleBMin: -Math.PI / 2,
        angleBMax: Math.PI / 2,
        angleBStiffness: s,
        damping: 0.1*/
    });
    let weaponAttachment = Constraint.create({
        bodyA: lowerArm1,
        bodyB: weaponBox,
        length: 0,
        pointA: {
            x: distanceFromCenter,
            y: 10
        },
        pointB: {
            x: 0,
            y: -weaponHeight / 2
        },
        damping: 0.1,
        stiffness: weapon === harpoon ? 0.05 : 1,
        frictionAir: 0.1,
        /*angleAStiffness: s,
        angleAMin: -Math.PI / u,
        angleAMax: Math.PI / u,*/
        /*angleBMin: -Math.PI / u,
        angleBMax: Math.PI / u,
        angleBStiffness: s,
        damping: 0.1*/
    });
    const hipJoint1 = Constraint.create({
        bodyA: torso,
        bodyB: upperLeg1,
        length: 0,
        pointA: {
            x: distanceFromCenter,
            y: 20
        },
        pointB: {
            x: 0,
            y: -15
        },
        /*angleAStiffness: s,
        angleAMin: -Math.PI / (u * 2),
        angleAMax: Math.PI / (u * 2),*/
        angleBMin: -Math.PI,
        angleBMax: Math.PI,
        angleBStiffness: s,
        damping: 0.1
    })
    const hipJoint2 = Constraint.create({
        bodyA: torso,
        bodyB: upperLeg2,
        length: 0,
        pointA: {
            x: -distanceFromCenter,
            y: 20
        },
        pointB: {
            x: 0,
            y: -15
        },
        /*angleAStiffness: s,
        angleAMin: -Math.PI / (u * 2),
        angleAMax: Math.PI / (u * 2),*/
        angleBMin: -Math.PI,
        angleBMax: Math.PI,
        angleBStiffness: s,
        damping: 0.1
    })
    const lowerLeg1 = Bodies.rectangle(x + distanceFromCenter, y + 75, legWidth, 30, {
        collisionFilter: {
            mask: myMask,
            group: l1,
            category: myCategory
        },
        restitution: 1,
        frictionAir: 0.1
            /*angleAStiffness: s,
            angleAMin: -Math.PI / l,
            angleAMax: Math.PI / l,*/
    });
    const lowerLeg2 = Bodies.rectangle(x - distanceFromCenter, y + 75, legWidth, 30, {
        collisionFilter: {
            mask: myMask,
            group: l2,
            category: myCategory
        },
        restitution: 1,
        frictionAir: 0.1
            /*angleAStiffness: s,
            angleAMin: -Math.PI / l,
            angleAMax: Math.PI / l,*/
    });
    const foot1 = Bodies.rectangle(x - 10, y + 85, 12, 10, {
        collisionFilter: {
            mask: myMask,
            group: myGroup,
            category: myCategory
        }
    })
    const foot2 = Bodies.rectangle(x + 10, y + 85, 12, 10, {
        collisionFilter: {
            mask: myMask,
            group: myGroup,
            category: myCategory
        }
    })
    const ankle1 = Constraint.create({
        bodyA: lowerLeg1,
        bodyB: foot1,
        pointA: {
            x: 0,
            y: 15
        },
        pointB: {
            x: 0,
            y: -5
        },
        length: 0
    })
    const ankle2 = Constraint.create({
        bodyA: lowerLeg2,
        bodyB: foot2,
        pointA: {
            x: 0,
            y: 15
        },
        pointB: {
            x: 0,
            y: -5
        },
        length: 0
    })
    const knee1 = Constraint.create({
        bodyA: upperLeg1,
        bodyB: lowerLeg1,
        length: 0,
        pointA: {
            x: 0,
            y: 15
        },
        pointB: {
            x: 0,
            y: -15
        },
        angleBMin: -Math.PI,
        angleBMax: Math.PI,
        angleBStiffness: s,
    })
    const knee2 = Constraint.create({
        bodyA: upperLeg2,
        bodyB: lowerLeg2,
        length: 0,
        pointA: {
            x: 0,
            y: 15
        },
        pointB: {
            x: 0,
            y: -15
        },
        angleBMin: -Math.PI,
        angleBMax: Math.PI,
        angleBStiffness: s,
    })

    const neck = Constraint.create({
        bodyA: torso,
        bodyB: head,
        pointA: {
            x: 0,
            y: -20
        },
        pointB: {
            x: 0,
            y: 15
        },
        length: 0,
        angleBMax: 0,
        angleBMin: 0,
        angleBStiffness: 1
    });
    const r = 25;
    const hipConstraint1 = Constraint.create({
        bodyA: torso,
        pointA: { x: -r, y: 0 },
        bodyB: upperLeg1,
        pointB: { x: -r, y: 0 },
        stiffness: 0,
        length: r
    });
    const hipConstraint2 = Constraint.create({
        bodyA: torso,
        pointA: { x: r, y: 0 },
        bodyB: upperLeg2,
        pointB: { x: r, y: 0 },
        stiffness: 0,
        length: r
    });
    const ankleConstraint1 = Constraint.create({
        bodyA: upperLeg1,
        pointA: { x: -r, y: 0 },
        bodyB: lowerLeg1,
        pointB: { x: -r, y: 0 },
        stiffness: 0,
        length: r
    });
    const ankleConstraint2 = Constraint.create({
        bodyA: upperLeg2,
        pointA: { x: r, y: 0 },
        bodyB: lowerLeg2,
        pointB: { x: r, y: 0 },
        stiffness: 0,
        length: r
    });
    let healthMultiplier = !type ? localProxy.healthMultiplier : 1;
    let asteroids;
    if (boss) {
        asteroids = [];
        healthMultiplier = 3;
    }
    head.health = 50 * strength * healthMultiplier;
    head.maxHealth = 50 * strength * healthMultiplier;
    torso.health = 100 * strength * healthMultiplier;
    torso.maxHealth = 100 * strength * healthMultiplier;
    [upperArm1, lowerArm1, upperArm2, lowerArm2, upperLeg1, lowerLeg1, upperLeg2, lowerLeg2].forEach(x => {
        x.health = 30 * strength * healthMultiplier;
        x.maxHealth = 30 * strength * healthMultiplier;
    })
    let inGame = false;
    let timeSurvived = 0;
    let torsoHeight = 0;
    let anklePenalty = 0;
    let movingLegs = 0;
    let bombStarted = false;
    let bombTick = 0;
    let step = 0;
    let speed = 0;
    let dead = false;
    let prevCollidedBodies = [];
    let hurtCooldown = 0;
    let deadTimer = 255;
    let tempDamageBoost = 1;
    let timeSinceHeal = 1;

    function setVelocity(body, vec) {
        if (!deadBodyParts.includes(body)) {
            Body.setVelocity(body, vec);
        }
    }
    let puppetHealth = 1;
    let cooldown = 1;
    let oldStage;
    let ticksSinceHellfire = 0;
    return {
        get inGame() {
            return inGame;
        },
        get cooldown() {
            return cooldown;
        },
        get tempDamageBoost() {
            return tempDamageBoost;
        },
        holdingRangedWeapon() {
            return weapon === pistol || weapon === plasrifle || weapon === railgun || weapon === flamethrower;
        },
        add() {
            inGame = true;
            World.add(engine.world, [head, neck, torso, /*arm1, arm2,*/ upperLeg1, upperLeg2, lowerLeg1, lowerLeg2, hipJoint1, hipJoint2, knee1, knee2, upperArm1, upperArm2, shoulder1, shoulder2, lowerArm1, lowerArm2, elbow1, elbow2, weaponBox, weaponAttachment /*foot1, foot2, ankle1, ankle2 hipConstraint1, hipConstraint2, ankleConstraint1, ankleConstraint2*/ ]);
        },
        remove() {
            inGame = false;
            World.remove(engine.world, [head, neck, torso, /*arm1, arm2,*/ upperLeg1, upperLeg2, lowerLeg1, lowerLeg2, hipJoint1, hipJoint2, knee1, knee2, upperArm1, upperArm2, shoulder1, shoulder2, lowerArm1, lowerArm2, elbow1, elbow2, weaponBox, weaponAttachment /*foot1, foot2, ankle1, ankle2 hipConstraint1, hipConstraint2, ankleConstraint1, ankleConstraint2*/ ]);
        },
        hellfire() {
            ticksSinceHellfire = 0;
            if (boss) {
                for (let i = 0; i < floor(random(3, 5)); i++) {
                    const offset = radians(random(-25, 25));
                    const weaponVec = {
                        x: Math.cos(weaponBox.angle + Math.PI / 2 + offset),
                        y: Math.sin(weaponBox.angle + Math.PI / 2 + offset)
                    };
                    const bullet = Bodies.rectangle(weaponBox.position.x + weaponVec.x * 80, weaponBox.position.y + weaponVec.y * 80, 20, 3, {
                        frictionAir: 0,
                        angle: weaponBox.angle + Math.PI / 2 + offset
                    });
                    /* bullet.velocity.x = toMouseWeapon.x * 3000;
                     bullet.velocity.y = toMouseWeapon.y * 3000;*/
                    Body.setVelocity(bullet, { x: weaponVec.x * 25, y: weaponVec.y * 25 });
                    bullets.push(bullet);
                    bullet.strength = 0.1;

                    bullet.source = "hellfire";
                    World.add(engine.world, [bullet]);
                }
                if (!sounds.railgunShot.isPlaying()) {
                    sounds.railgunShot.setVolume(0.5 * localProxy.sfxVolume);
                    sounds.railgunShot.play();
                }
            }
        },
        asteroidStorm() {
            for (let i = 0; i < round(random(3, 7)); i++) {
                const asteroid = Asteroid({
                    x: this.head.position.x + random(-120, 120),
                    y: this.head.position.y + random(-120, 120),
                    begin: 160 + i * 20
                })
                asteroid.add();
                asteroids.push(asteroid);
            }
        },
        clearAsteroids() {
            if (boss) {
                asteroids.forEach(asteroid => {
                    asteroid.remove();
                });
                asteroids = [];
            }
        },
        draw() {
            if (this === player && weapon !== currentWeapon) {
                weapon = currentWeapon;
                weaponWidth = weapon.weaponWidth;
                weaponHeight = weapon.weaponHeight;
                World.remove(engine.world, [weaponBox, weaponAttachment]);
                weaponBox = Bodies.rectangle(this.x, this.y + 5, weaponWidth, weaponHeight, {
                    collisionFilter: {
                        mask: myMask,
                        group: Body.nextGroup(false),
                        category: myCategory
                    },
                    frictionAir: 0.1,
                    density: (() => {
                        switch (weapon) {
                            /*case axe:
                                return 0.005;
                            case sword:
                                return 0.0025;
                            case dagger:
                                return 0.001;*/
                            case plasrifle:
                            case harpoon:
                            case flamethrower:
                            case bomb:
                                return 0.0015;
                            case pistol:
                                return 0.0005;
                            case lazord:
                                return 0.001;
                            case lance:
                                return 0.001;
                            case lazdagger:
                                return 0.0005;
                            case railgun:
                                return 0.001;
                            case axe:
                            case spoon:
                                return 0.0025;
                            case moonStaff:
                                return 0.0015;
                            case undefined:
                                return 0.0000001;
                        }
                    })()
                });
                weaponAttachment = Constraint.create({
                    bodyA: lowerArm1,
                    bodyB: weaponBox,
                    length: 0,
                    pointA: {
                        x: distanceFromCenter,
                        y: 10
                    },
                    pointB: {
                        x: 0,
                        y: -weaponHeight / 2
                    },
                    damping: 0.1,
                    stiffness: weapon === harpoon ? 0.05 : 1,
                    frictionAir: 0.1,
                    /*angleAStiffness: s,
                    angleAMin: -Math.PI / u,
                    angleAMax: Math.PI / u,*/
                    /*angleBMin: -Math.PI / u,
                    angleBMax: Math.PI / u,
                    angleBStiffness: s,
                    damping: 0.1*/
                });
                World.add(engine.world, [weaponBox, weaponAttachment]);
                //weaponBox.width = weaponWidth;
                //weaponBox.height = weaponHeight;
            }
            if (dead && !paused) {
                deadTimer--;
            }
            if (deadTimer === 0) {
                this.remove();
                if (enemies.includes(this)) {
                    enemies.splice(enemies.indexOf(this), 1);
                } else {
                    winState = "loss";
                    displayLoss();
                }
            }
            if (deadTimer === 254) {
                if (type) {
                    achievements.add(firstBlood);
                    for (let i = 0; i < coinAmount * max(round(strength / 0.5), 1); i++) {
                        coinList.push(Coin({
                            x: this.x + random(-30, 30),
                            y: this.y + random(-30, 30),
                            value: coinValue * max(round(strength / 0.2), 1) * 2
                        }));
                    }
                } else {
                    achievements.add(secondBlood);
                }
                emitters.push(Emitter({
                    x: this.x,
                    y: this.y,
                    minSize: 3,
                    maxSize: 9,
                    distributionSize: 0,
                    colors: [
                        color
                    ],
                    rate: Infinity,
                    startingParticles: 15,
                    magnitude: 1,
                    duration: 120,
                    particleDuration: 120,
                    minAngle: 0,
                    maxAngle: 360,
                    display: "circle"
                }));
            }
            if (this.deadBodyParts.includes(lowerArm1) && dist(this.x, this.y, player.x, player.y) > 600 && !boss) {
                dead = true;
            }
            hurtCooldown--;
            this.bodyParts.forEach(part => {
                if (deadBodyParts.includes(part)) {
                    part.restitution = 0;
                }
            });
            enemies.forEach(enemy => {
                if (enemy.deadBodyParts.includes(enemy.head) && Detector.collisions([
                        [weaponBox, enemy.head]
                    ], engine).length > 0 && (abs(enemy.head.velocity.x) > 5 || abs(enemy.head.velocity.y) > 5)) {
                    achievements.add(headsUp);
                }
            })
            this.deadBodyParts.forEach(part => {
                    part.frictionAir = 0;
                })
                /*if (steve.deadBodyParts.includes(steve.head) && Detector.collisions([
                        [weaponBox, steve.head]
                    ], engine).length > 0 && (abs(steve.head.velocity.x) > 5 || abs(steve.head.velocity.y) > 5)) {
                    achievements.add(headsUp);
                }*/
            if (inGame) {
                tempDamageBoost *= 0.999;
                tempDamageBoost = max(tempDamageBoost, 1);
                timeSinceHeal *= 0.99;
                timeSinceHeal = max(timeSinceHeal, 1);
                if (type) {
                    if (this.getHealth() > 0.75) {
                        cowardice = 0.9;
                    } else if (this.getHealth() > 0.5) {
                        cowardice = 0.95;
                    } else if (this.getHealth() > 0.375) {
                        cowardice = 0.975;
                    } else if (this.getHealth() > 0.25) {
                        cowardice = 0.99;
                    } else {
                        cowardice = 0.995;
                    }
                    if (boss || enemies.filter(enemy => !enemy.dead).length < 2 || type === "meleeBomber") {
                        cowardice = 0;
                    }
                }
                if (weaponBox.angularSpeed > 0.1 || Math.hypot(weaponBox.velocity.x, weaponBox.velocity.y) > 15) {
                    if (LASER_WEAPONS.includes(weapon)) {
                        const chosenSound = sounds["laserSwing" + floor(random(1, 4))];
                        if (!chosenSound.isPlaying()) {
                            chosenSound.setVolume(Math.random() * 0.3 * localProxy.sfxVolume);
                            chosenSound.play();
                        }
                    }
                    //sounds.out.setVolume(Math.random() * 0.3);
                    //sounds.out.play();
                }
                this.bodyParts.forEach(part => {
                    if (part.damageCooldown === undefined) {
                        part.damageCooldown = 0;
                    } else {
                        part.damageCooldown--;
                    }
                })
                if (!type) {
                    enemies.forEach(enemy => {
                        if (Detector.collisions([
                                [this.weapon, enemy.weapon]
                            ], engine).length > 0) {
                            if (LASER_WEAPONS.includes(weapon) && LASER_WEAPONS.includes(enemy.weapon.weaponImage)) {

                                const chosenSound = Math.random() < 0.5 ? sounds.laserOnLaser : sounds.laserOnLaser2;
                                if (!chosenSound.isPlaying()) {
                                    chosenSound.setVolume((this.weapon.angularSpeed + enemy.weapon.angularSpeed) * 4 * localProxy.sfxVolume);
                                    chosenSound.play();
                                }
                            } else {
                                const chosenSound = sounds.laserOnMetal;
                                if (!chosenSound.isPlaying()) {
                                    chosenSound.setVolume((this.weapon.angularSpeed + enemy.weapon.angularSpeed) * 4 * localProxy.sfxVolume);
                                    chosenSound.play();
                                }
                            }
                        }
                    });
                    bullets.forEach(bullet => {
                        if (bullet.source !== "railgun" && bullet.source !== "hellfire") {
                            if (Detector.collisions([
                                    [this.weapon, bullet]
                                ], engine).length > 0) {
                                if (!sounds.laserBlock.isPlaying()) {
                                    sounds.laserBlock.setVolume(random(0.3, 0.6) * localProxy.sfxVolume);
                                    sounds.laserBlock.play();
                                }
                            }
                        }
                    })
                }
                /*if (Detector.collisions([
                        [steve.weapon, steveio.weapon],
                    ], engine).length > 0) {
                    if (Math.random() < 0.5) {
                        if (!sounds.clash.isPlaying()) {
                            sounds.clash.setVolume((steve.weapon.angularSpeed + steveio.weapon.angularSpeed) * 2);
                            sounds.clash.rate(random(1, 2));
                            sounds.clash.play();
                        }
                    } else {
                        if (!sounds.swing.isPlaying()) {
                            sounds.swing.setVolume((steve.weapon.angularSpeed + steveio.weapon.angularSpeed) * 2);
                            sounds.swing.rate(random(1, 2));
                            sounds.swing.play();
                        }
                    }
                }
                if (Detector.collisions([
                        [weaponBox, ground],
                        [weaponBox, ceiling],
                        [weaponBox, leftWall],
                        [weaponBox, rightWall],
                    ], engine).length > 0 && Math.abs(weaponBox.velocity.y) > 1) {
                    if (weapon === axe) {
                        sounds.thud.rate(1);
                        sounds.thud.setVolume(Math.abs(weaponBox.velocity.y) / 25);
                        if (!sounds.thud.isPlaying()) {
                            sounds.thud.play();
                        }
                    } else {
                        sounds.thud.rate(2.5);
                        sounds.thud.setVolume(Math.abs(weaponBox.velocity.y) / 50);
                        if (!sounds.thud.isPlaying()) {
                            sounds.thud.play();
                        }
                    }
                }*/
                if (speed > 0.025) {
                    if (step % 60 < 30) {
                        setVelocity(lowerLeg1, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x + 50, torso.position.y + 75, 2));
                        if (!deadBodyParts.includes(lowerLeg1)) {
                            lowerLeg1.velocity.x += 1;
                        }
                        if (step > 30) {
                            setVelocity(lowerLeg2, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x - 50, torso.position.y + 75, 2));
                        }
                        setVelocity(lowerLeg1, { x: lowerLeg1.velocity.x + speed, y: lowerLeg1.velocity.y })
                    } else {
                        setVelocity(lowerLeg1, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x - 50, torso.position.y + 75, 2));
                        setVelocity(lowerLeg2, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x + 50, torso.position.y + 75, 2));
                        setVelocity(lowerLeg2, { x: lowerLeg2.velocity.x + speed, y: lowerLeg2.velocity.y })
                    }
                    if (abs(torso.velocity.y) < 9) {
                        setVelocity(torso, vecTo(torso.position.x, torso.position.y, torso.position.x + 0.001, torso.position.y - 15, 2));
                    }
                } else if (speed < -0.025) {
                    if (step % 60 < 30) {
                        setVelocity(lowerLeg1, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x - 50, torso.position.y + 75, 2));
                        if (!deadBodyParts.includes(lowerLeg1)) {
                            lowerLeg1.velocity.x += 1;
                        }
                        if (step > 30) {
                            setVelocity(lowerLeg2, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x + 50, torso.position.y + 75, 2));
                        }
                        setVelocity(lowerLeg1, { x: lowerLeg1.velocity.x + speed, y: lowerLeg1.velocity.y })
                    } else {
                        setVelocity(lowerLeg1, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x + 50, torso.position.y + 75, 2));
                        setVelocity(lowerLeg2, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x - 50, torso.position.y + 75, 2));
                        setVelocity(lowerLeg2, { x: lowerLeg2.velocity.x + speed, y: lowerLeg2.velocity.y })
                    }
                    if (abs(torso.velocity.y) < 9) {
                        setVelocity(torso, vecTo(torso.position.x, torso.position.y, torso.position.x + 0.001, torso.position.y - 15, 2));
                    }
                } else {
                    setVelocity(lowerLeg1, vecTo(lowerLeg1.position.x, lowerLeg1.position.y, torso.position.x + 0.01, torso.position.y + 75, 2));
                    setVelocity(lowerLeg2, vecTo(lowerLeg2.position.x, lowerLeg2.position.y, torso.position.x + 0.01, torso.position.y + 75, 2));
                    if (abs(torso.velocity.y) < 9) {
                        setVelocity(torso, vecTo(torso.position.x, torso.position.y, torso.position.x + 0.001, torso.position.y - 15, 2));
                    }
                }
                healthLost *= cowardice;
                if (keyIsPressed && key === " " && this === player && !paused) {
                    const mx = mouseX - (500 - player.head.position.x); //+ (500 - player.head.position.x);
                    const my = mouseY - (350 - player.head.position.y); //+ (350 - player.head.position.y);
                    const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, mx, my, 1);
                    const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, mx, my, 1);
                    const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, mx, my, 2);
                    setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                    setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                    setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                    if (deadBodyParts.includes(weaponBox)) {
                        const toMouseHead = vecTo(head.position.x, head.position.y, mx, my, 1);
                        setVelocity(head, { x: head.velocity.x + toMouseHead.x, y: head.velocity.y + toMouseHead.y });
                        speed += toMouseHead.x * 0.1;
                    } else {
                        speed += toMouse1.x * 0.1;
                    }
                }
                if (this === player && !dead && (weapon === pistol || weapon === plasrifle || weapon === railgun || weapon === flamethrower) && mouseIsPressed && cooldown === 1 && !paused) {
                    cooldown = 0;
                    const fireX = Math.cos(weaponBox.angle + Math.PI / 2);
                    const fireY = Math.sin(weaponBox.angle + Math.PI / 2);
                    let offsetMultiplier;
                    switch (weapon) {
                        case pistol:
                            offsetMultiplier = 1;
                            break;
                        case plasrifle:
                            offsetMultiplier = 2;
                            break;
                        case railgun:
                            offsetMultiplier = 3.5;
                            break;
                        case flamethrower:
                            offsetMultiplier = 10;
                            break;
                    }
                    if (weapon !== flamethrower) {
                        const bullet = Bodies.rectangle(weaponBox.position.x + fireX * 10 * offsetMultiplier, weaponBox.position.y + fireY * 10 * offsetMultiplier, 20 + (weapon === plasrifle ? 20 : 0), 6, {
                            frictionAir: 0,
                            angle: weaponBox.angle + Math.PI / 2
                        });
                        /* bullet.velocity.x = toMouseWeapon.x * 3000;
                         bullet.velocity.y = toMouseWeapon.y * 3000;*/
                        bullet.strength = 5;
                        if (weapon === plasrifle) {
                            bullet.strength = 20;
                        }
                        if (weapon === railgun) {
                            bullet.strength = 0.25;
                        }
                        bullet.source = "player";
                        Body.setVelocity(bullet, { x: fireX * 25, y: fireY * 25 });
                        bullets.push(bullet);
                        World.add(engine.world, [bullet]);
                    } else {
                        sounds.bulletShot.setVolume(random(0.2, 0.4) * localProxy.sfxVolume);
                        sounds.bulletShot.rate(random(0.5, 1.5));
                        sounds.bulletShot.play();
                        explodables.push(Explodable({
                            x: weaponBox.position.x + fireX * 10 * offsetMultiplier,
                            y: weaponBox.position.y + fireY * 10 * offsetMultiplier,
                            color: [255, 125, 0],
                            size: 12.5,
                            xVel: fireX * 25,
                            yVel: fireY * 25,
                            fireballRadius: 100,
                            powerRadius: 200,
                            decayRate: 2,
                            minDamage: 40,
                            maxDamage: 60
                        }));
                    }
                    if (weapon === pistol) {
                        emitters.push(Emitter({
                            x: weaponBox.position.x + fireX * 10,
                            y: weaponBox.position.y + fireY * 10,
                            minSize: 3,
                            maxSize: 9,
                            distributionSize: 0,
                            colors: [
                                [255, 255, 255]
                            ],
                            rate: Infinity,
                            startingParticles: 7,
                            magnitude: 1,
                            duration: 120,
                            particleDuration: 120,
                            minAngle: degrees(bullet.angle) - 45,
                            maxAngle: degrees(bullet.angle) + 45,
                            display: "circle",
                            overlay: true
                        }));
                    } else if (weapon === plasrifle) {
                        emitters.push(Emitter({
                            x: weaponBox.position.x + fireX * 10 * offsetMultiplier,
                            y: weaponBox.position.y + fireY * 10 * offsetMultiplier,
                            minSize: 3,
                            maxSize: 6,
                            distributionSize: 0,
                            colors: [
                                [125, 0, 255]
                            ],
                            rate: Infinity,
                            startingParticles: 20,
                            magnitude: 2,
                            duration: 120,
                            particleDuration: 120,
                            minAngle: degrees(bullet.angle) - 22.5,
                            maxAngle: degrees(bullet.angle) + 22.5,
                            display: "circle",
                            overlay: true
                        }));
                    } else if (weapon === railgun) {
                        if (tick % 1 === 0) {
                            emitters.push(Emitter({
                                x: weaponBox.position.x + fireX * 10 * offsetMultiplier,
                                y: weaponBox.position.y + fireY * 10 * offsetMultiplier,
                                minSize: 1,
                                maxSize: 9,
                                distributionSize: 0,
                                colors: [
                                    [255, 255, 0]
                                ],
                                rate: Infinity,
                                startingParticles: 1,
                                magnitude: 3,
                                duration: 60,
                                particleDuration: 60,
                                minAngle: degrees(bullet.angle) - 60,
                                maxAngle: degrees(bullet.angle) + 60,
                                display: "circle",
                                overlay: true
                            }));
                        }
                    }
                    if (weapon !== railgun) {
                        sounds.bulletShot.setVolume(random(0.2, 0.4) * localProxy.sfxVolume);
                        sounds.bulletShot.rate(random(0.5, 1.5));
                        sounds.bulletShot.play();
                    } else {
                        if (!sounds.railgunShot.isPlaying()) {
                            sounds.railgunShot.setVolume(0.5 * localProxy.sfxVolume);
                            sounds.railgunShot.play();
                        }
                    }
                }
                if (this === player && weapon === pistol && !paused) {
                    cooldown = min(1, cooldown + 0.05);
                }
                if (this === player && weapon === plasrifle && !paused) {
                    cooldown = min(1, cooldown + 0.01);
                }
                if (this === player && weapon === flamethrower && !paused) {
                    cooldown = min(1, cooldown + 0.01);
                }
                if (this === player && weapon === railgun && !paused) {
                    cooldown = min(1, cooldown + 1);
                }
                if (this === player && (weapon === harpoon || weapon === moonStaff || weapon === flamethrower) && !dead && mouseIsPressed && !paused && !deadBodyParts.includes(lowerArm1)) {
                    const mx = mouseX - (500 - player.head.position.x);
                    const my = mouseY - (350 - player.head.position.y);
                    const angleToMousePointer = directionCalc(weaponBox.position.x, weaponBox.position.y, mx, my);
                    let mouseAngle = angleToMousePointer % (Math.PI * 2);
                    let boxAngle = (weaponBox.angle + Math.PI / 2) % (Math.PI * 2);
                    if (boxAngle > radians(270) && mouseAngle < radians(90)) {
                        mouseAngle += radians(360);
                    }

                    if (boxAngle < mouseAngle) {
                        Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity + 0.01);
                    } else if (boxAngle > mouseAngle) {
                        Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity - 0.01);
                    }
                }
                if (typeof type === "string" && type.startsWith("melee") && !player.deadBodyParts.includes(player.head) && !paused) {
                    if (!this.deadBodyParts.includes(lowerArm1)) {
                        let c = healthLost > 10 ? -1 : 1;
                        if (type === "meleeHarpoon") {
                            c *= 1.5;
                        }
                        const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.head.position.x, player.head.position.y, c);
                        const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.head.position.x, player.head.position.y, c);
                        const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.head.position.x, player.head.position.y, c);
                        setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                        setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                        setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                        if (type === "meleeHeavy") {
                            if (!this.deadBodyParts.includes(weaponBox)) {
                                if (dist(this.x, this.y, player.x, player.y) < 200) {
                                    Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity + 0.01);
                                }
                            }
                        } else if (type === "meleeRanged") {
                            if (!this.deadBodyParts.includes(weaponBox)) {
                                if (dist(this.x, this.y, player.x, player.y) < 250) {
                                    if (tick % 60 < 30) {
                                        Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity + 0.01);
                                    } else {
                                        Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity - 0.01);
                                    }
                                }
                            }
                            if (dist(player.weapon.position.x, player.weapon.position.y, head.position.x, head.position.y) < 100) {
                                const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.weapon.position.x, player.weapon.position.y, 2);
                                const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.weapon.position.x, player.weapon.position.y, 2);
                                const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.weapon.position.x, player.weapon.position.y, 3);
                                //setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                                //setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                                setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });

                            }
                        } else if (type === "meleeHarpoon") {
                            let c = healthLost > 10 ? -1 : 1;
                            const mx = player.head.position.x;
                            const my = player.head.position.y;
                            const angleToMousePointer = directionCalc(weaponBox.position.x, weaponBox.position.y, mx, my);
                            let mouseAngle = angleToMousePointer % (Math.PI * 2);
                            let boxAngle = (weaponBox.angle + Math.PI / 2) % (Math.PI * 2);
                            if (boxAngle > radians(270) && mouseAngle < radians(90)) {
                                mouseAngle += radians(360);
                            }

                            if (boxAngle < mouseAngle) {
                                Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity + 0.01);
                            } else if (boxAngle > mouseAngle) {
                                Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity - 0.01);
                            }
                            if (dist(player.weapon.position.x, player.weapon.position.y, head.position.x, head.position.y) < 100) {
                                const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.weapon.position.x, player.weapon.position.y, 2 * c);
                                const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.weapon.position.x, player.weapon.position.y, 2 * c);
                                const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.weapon.position.x, player.weapon.position.y, 3 * c);
                                //setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                                //setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                                setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });

                            }
                            if (!this.deadBodyParts.includes(weaponBox)) {
                                if (dist(this.x, this.y, player.x, player.y) < 250) {
                                    if (tick % 60 < 30) {
                                        Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity + 0.01);
                                    } else {
                                        Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity - 0.01);
                                    }
                                }
                            }
                        } else if (type === "meleeBomber") {
                            if (dist(this.x, this.y, player.x, player.y) < 200) {
                                bombStarted = true;
                                bombTick++;
                                if (bombTick === 60) {
                                    explodables.push(Explodable({
                                        x: weaponBox.position.x,
                                        y: weaponBox.position.y,
                                        color: [255, 255, 255],
                                        size: 12.5,
                                        explode: true,
                                        xVel: 0,
                                        yVel: 0,
                                        fireballRadius: 75,
                                        powerRadius: 150,
                                        decayRate: 3,
                                        minDamage: 40 * strength,
                                        maxDamage: 60 * strength,
                                        fromPlayer: false
                                    }));
                                    sounds.explosion.setVolume(random(0.15, 0.3) * localProxy.sfxVolume);
                                    sounds.explosion.rate(random(1.5, 2.5));
                                    sounds.explosion.play();
                                    World.remove(engine.world, [weaponBox])
                                }
                            } else {
                                bombStarted = false;
                                bombTick = 0;
                            }
                        }
                    } else {
                        if (x < player.x) {
                            speed = -5;
                        }
                        if (x > player.x) {
                            speed = 5;
                        }
                        if (y > player.y && y < 300) {
                            this.down();
                        }
                        if (y < player.y && y > 100) {
                            if (Math.random() < 0.2) {
                                this.jump();
                            }
                        }
                    }
                }
                if (typeof type === "string" && type.startsWith("ranged") && !player.deadBodyParts.includes(player.head) && !paused) {
                    if (!this.deadBodyParts.includes(lowerArm1)) {
                        const distToPlayer = dist(this.x, this.y, player.x, player.y);
                        let c = 0;
                        if (distToPlayer < 150 || healthLost > 10) {
                            c = -2;
                        }
                        if (distToPlayer > 300) {
                            c = 1;
                        }
                        const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.head.position.x, player.head.position.y, c);
                        const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.head.position.x, player.head.position.y, c);
                        const weaponVec = {
                            x: Math.cos(weaponBox.angle + Math.PI / 2),
                            y: Math.sin(weaponBox.angle + Math.PI / 2) - (weapon === plasrifle ? radians(3.5) : 0)
                        };
                        const magnitude = Math.hypot(weaponVec.x * 25, weaponVec.y * 25);
                        const dtp = dist(weaponBox.position.x, weaponBox.position.y, player.head.position.x, player.head.position.y);
                        const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.head.position.x + (weapon === railgun ? 0 : player.head.velocity.x * dtp / magnitude), player.head.position.y + (weapon === railgun ? 0 : player.head.velocity.y * dtp / magnitude), healthLost > 10 ? -1 : 1);
                        if (Math.random() < (weapon === railgun ? 1 : 0.02) && distToPlayer < (weapon === plasrifle ? Infinity : 600)) {
                            const weaponVec = {
                                x: Math.cos(weaponBox.angle + Math.PI / 2),
                                y: Math.sin(weaponBox.angle + Math.PI / 2) - (weapon === plasrifle ? radians(3.5) : 0)
                            };
                            const bullet = Bodies.rectangle(weaponBox.position.x + weaponVec.x * ((weapon === railgun) ? 45 : 15), weaponBox.position.y + weaponVec.y * ((weapon === railgun) ? 35 : 15), (weapon === plasrifle || weapon === railgun) ? 20 : 10, weapon === plasrifle ? 3 : 3, {
                                frictionAir: 0,
                                angle: weaponBox.angle + Math.PI / 2
                            });
                            /* bullet.velocity.x = toMouseWeapon.x * 3000;
                             bullet.velocity.y = toMouseWeapon.y * 3000;*/
                            const bulletAngle = createVector(player.head.position.x - weaponBox.position.x, player.head.position.y - weaponBox.position.y).heading();
                            const degreeDiff = degrees(Math.abs((weaponBox.angle + Math.PI / 2) - bulletAngle)) % 360;
                            Body.setVelocity(bullet, { x: weaponVec.x * 25, y: weaponVec.y * 25 });
                            bullets.push(bullet);
                            if (weapon !== railgun) {
                                sounds.bulletShot.setVolume(random(0.2, 0.4) * localProxy.sfxVolume);
                                sounds.bulletShot.rate(random(0.5, 1.5));
                                sounds.bulletShot.play();
                            } else {
                                if (!sounds.railgunShot.isPlaying()) {
                                    sounds.railgunShot.setVolume(0.5 * localProxy.sfxVolume);
                                    sounds.railgunShot.play();
                                }
                            }
                            if (weapon === plasrifle) {
                                bullet.strength = 5;
                            }
                            if (weapon === railgun) {
                                bullet.strength = 0.25;
                            }
                            if (weapon === railgun) {
                                bullet.source = "railgun";
                            }
                            World.add(engine.world, [bullet]);
                        }
                        let moveToward = true;
                        if (type === "rangedMelee" || type === "rangedRapid") {
                            if (dist(player.weapon.position.x, player.weapon.position.y, head.position.x, head.position.y) < 100) {
                                const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.weapon.position.x, player.weapon.position.y, 2);
                                const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.weapon.position.x, player.weapon.position.y, 2);
                                const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.weapon.position.x, player.weapon.position.y, 3);
                                //setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                                //setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                                setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                            }
                            if (!this.deadBodyParts.includes(weaponBox)) {
                                if (dist(this.x, this.y, player.x, player.y) < 250) {
                                    if (tick % 60 < 30) {
                                        Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity + 0.01);
                                    } else {
                                        Body.setAngularVelocity(weaponBox, weaponBox.angularVelocity - 0.01);
                                    }
                                }
                            }
                            if (this.getHealth() <= (1 / 3) && dist(this.x, this.y, player.x, player.y) < 300) {
                                const headAway = vecTo(head.position.x, head.position.y, player.head.position.x, player.head.position.y, -1);
                                const torsoAway = vecTo(torso.position.x, head.position.y, player.head.position.x, player.head.position.y, -1);
                                //moveToward = false;
                                setVelocity(head, { x: head.velocity.x + headAway.x, y: head.velocity.y + headAway.y });
                                setVelocity(torso, { x: torso.velocity.x + torsoAway.x, y: torso.velocity.y + torsoAway.y });
                                /*setVelocity(lowerArm1, { x: lowerArm1.velocity.x - toMouse1.x * 2, y: lowerArm1.velocity.y - toMouse1.y * 2 });
                                setVelocity(lowerArm2, { x: lowerArm2.velocity.x - toMouse2.x * 2, y: lowerArm2.velocity.y - toMouse2.y * 2 });
                                setVelocity(weaponBox, { x: weaponBox.velocity.x - toMouseWeapon.x * 2, y: weaponBox.velocity.y - toMouseWeapon.y * 2 });*/
                            }
                        }
                        if (moveToward) {
                            setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                            setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                            setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                        }
                    } else {
                        if (x < player.x) {
                            speed = -5;
                        }
                        if (x > player.x) {
                            speed = 5;
                        }
                        if (y > player.y && y < 300) {
                            this.down();
                        }
                        if (y < player.y && y > 100) {
                            if (Math.random() < 0.2) {
                                this.jump();
                            }
                        }
                    }
                }
                if (type) {
                    enemies.forEach(enemy => {
                        if (dist(this.x, this.y, enemy.x, enemy.y) < 200 && !dead && !enemy.dead && !(enemy === this) && (type !== "meleeBomber" || (type === "meleeBomber" && enemy.type === "meleeBomber"))) {
                            const away = vecTo(this.x, this.y + 0.0001, enemy.x, enemy.y, -2 * ((200 - dist(this.x, this.y, enemy.x, enemy.y)) / 200));
                            setVelocity(lowerArm1, { x: lowerArm1.velocity.x + away.x, y: lowerArm1.velocity.y + away.y });
                            setVelocity(lowerArm2, { x: lowerArm2.velocity.x + away.x, y: lowerArm2.velocity.y + away.y });
                            setVelocity(weaponBox, { x: weaponBox.velocity.x + away.x, y: weaponBox.velocity.y + away.y });
                            //setVelocity(torso, { x: torso.velocity.x + away.x, y: torso.velocity.y + away.y });
                            const angle = enemy.torso.angle;
                            if (angle < torso.angle) {
                                Body.setAngularVelocity(torso, torso.angularVelocity + 0.1)
                            } else {
                                Body.setAngularVelocity(torso, torso.angularVelocity - 0.1)
                            }
                        }
                        const totemPole = [lazdagger, pistol, lance, axe, railgun, plasrifle];
                        const aiTypes = ["melee", "ranged", "meleeRanged", "meleeHeavy", "rangedRapid", "rangedMelee"];
                        if (dist(this.x, this.y, enemy.weapon.position.x, enemy.weapon.position.y) < 400 && enemy.deadBodyParts.includes(enemy.weapon) && !(enemy === this) && !enemy.weapon.hide && !deadBodyParts.includes(lowerArm1) && !boss && !dead && enemy.weapon.weaponImage !== harpoon && enemy.weapon.weaponImage !== flamethrower) {
                            if (totemPole.indexOf(enemy.weapon.weaponImage) > totemPole.indexOf(weapon) && totemPole.indexOf(enemy.weapon.weaponImage) > -1 && totemPole.indexOf(weapon) > -1) {
                                if (dist(lowerArm1.position.x, lowerArm1.position.y, enemy.weapon.position.x, enemy.weapon.position.y) < 50) {
                                    type = aiTypes[totemPole.indexOf(enemy.weapon.weaponImage)];
                                    World.remove(engine.world, [enemy.weapon, enemy.weaponAttachment]);
                                    enemy.weapon.hide = true;
                                    weapon = enemy.weapon.weaponImage;
                                    weaponWidth = weapon.weaponWidth;
                                    weaponHeight = weapon.weaponHeight;
                                    World.remove(engine.world, [weaponBox, weaponAttachment]);
                                    weaponBox = Bodies.rectangle(this.x, this.y + 5, weaponWidth, weaponHeight, {
                                        collisionFilter: {
                                            mask: myMask,
                                            group: Body.nextGroup(false),
                                            category: myCategory
                                        },
                                        frictionAir: 0.1,
                                        density: (() => {
                                            switch (weapon) {
                                                /*case axe:
                                                    return 0.005;
                                                case sword:
                                                    return 0.0025;
                                                case dagger:
                                                    return 0.001;*/
                                                case plasrifle:
                                                case harpoon:
                                                case flamethrower:
                                                case bomb:
                                                    return 0.0015;
                                                case pistol:
                                                    return 0.0005;
                                                case lazord:
                                                    return 0.001;
                                                case lance:
                                                    return 0.001;
                                                case lazdagger:
                                                    return 0.0005;
                                                case railgun:
                                                    return 0.001;
                                                case axe:
                                                case spoon:
                                                    return 0.0025;
                                                case moonStaff:
                                                    return 0.0015;
                                                case undefined:
                                                    return 0.0000001;
                                            }
                                        })()
                                    });
                                    weaponAttachment = Constraint.create({
                                        bodyA: lowerArm1,
                                        bodyB: weaponBox,
                                        length: 0,
                                        pointA: {
                                            x: distanceFromCenter,
                                            y: 10
                                        },
                                        pointB: {
                                            x: 0,
                                            y: -weaponHeight / 2
                                        },
                                        damping: 0.1,
                                        stiffness: weapon === harpoon ? 0.05 : 1,
                                        frictionAir: 0.1,
                                        /*angleAStiffness: s,
                                        angleAMin: -Math.PI / u,
                                        angleAMax: Math.PI / u,*/
                                        /*angleBMin: -Math.PI / u,
                                        angleBMax: Math.PI / u,
                                        angleBStiffness: s,
                                        damping: 0.1*/
                                    });
                                    World.add(engine.world, [weaponBox, weaponAttachment]);
                                } else {
                                    const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, enemy.weapon.position.x, enemy.weapon.position.y, 4);
                                    const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, enemy.weapon.position.x, enemy.weapon.position.y, 4);
                                    const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, enemy.weapon.position.x, enemy.weapon.position.y, 4);
                                    setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                                    setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                                    setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                                }
                            }
                        }
                    });
                    let borderAvoidStrength = 2.5;
                    if (this.x > 1800) {
                        const scale = (100 - (1900 - this.x)) / 100;
                        setVelocity(lowerArm1, { x: lowerArm1.velocity.x - borderAvoidStrength * scale, y: lowerArm1.velocity.y });
                        setVelocity(lowerArm2, { x: lowerArm2.velocity.x - borderAvoidStrength * scale, y: lowerArm2.velocity.y });
                        setVelocity(weaponBox, { x: weaponBox.velocity.x - borderAvoidStrength * scale, y: weaponBox.velocity.y });
                    } else if (this.x < -1800) {
                        const scale = (100 + (-1900 - this.x)) / 100;
                        setVelocity(lowerArm1, { x: lowerArm1.velocity.x + borderAvoidStrength * scale, y: lowerArm1.velocity.y });
                        setVelocity(lowerArm2, { x: lowerArm2.velocity.x + borderAvoidStrength * scale, y: lowerArm2.velocity.y });
                        setVelocity(weaponBox, { x: weaponBox.velocity.x + borderAvoidStrength * scale, y: weaponBox.velocity.y });
                    }
                    if (this.y > 1800) {
                        const scale = (100 - (1900 - this.y)) / 100;
                        setVelocity(lowerArm1, { x: lowerArm1.velocity.x, y: lowerArm1.velocity.y - borderAvoidStrength * scale });
                        setVelocity(lowerArm2, { x: lowerArm2.velocity.x, y: lowerArm2.velocity.y - borderAvoidStrength * scale });
                        setVelocity(weaponBox, { x: weaponBox.velocity.x, y: weaponBox.velocity.y - borderAvoidStrength * scale });
                    } else if (this.y < -1800) {
                        const scale = (100 + (-1900 - this.y)) / 100;
                        setVelocity(lowerArm1, { x: lowerArm1.velocity.x, y: lowerArm1.velocity.y + borderAvoidStrength * scale });
                        setVelocity(lowerArm2, { x: lowerArm2.velocity.x, y: lowerArm2.velocity.y + borderAvoidStrength * scale });
                        setVelocity(weaponBox, { x: weaponBox.velocity.x, y: weaponBox.velocity.y + borderAvoidStrength * scale });
                    }
                }
                if (boss && !paused) {
                    ticksSinceHellfire++;
                    const stage = ceil(this.getHealth() / (1 / 3));
                    if (oldStage !== stage) {
                        enemies.forEach(enemy => {
                            if (enemy !== this) {
                                enemy.die();
                            }
                        })
                    }
                    oldStage = stage;
                    if (stage === 3) {
                        if (dist(this.x, this.y, player.x, player.y) > 400) {
                            const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.head.position.x, player.head.position.y, 1.5);
                            const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.head.position.x, player.head.position.y, 1.5);
                            const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.head.position.x, player.head.position.y, 1.5);
                            setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                            setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                            setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                        } else if (dist(this.x, this.y, player.x, player.y) < 250) {
                            const headAway = vecTo(head.position.x, head.position.y, player.head.position.x, player.head.position.y, -1);
                            const torsoAway = vecTo(torso.position.x, head.position.y, player.head.position.x, player.head.position.y, -1);
                            setVelocity(head, { x: head.velocity.x + headAway.x, y: head.velocity.y + headAway.y });
                            setVelocity(torso, { x: torso.velocity.x + torsoAway.x, y: torso.velocity.y + torsoAway.y });
                            const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.head.position.x, player.head.position.y, 1.5);
                            setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                            if (Math.random() < 0.1 && !deadBodyParts.includes(lowerArm1)) {
                                this.hellfire();
                            }
                        }
                        if (dist(player.weapon.position.x, player.weapon.position.y, head.position.x, head.position.y) < 100) {
                            const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.weapon.position.x, player.weapon.position.y, 2);
                            const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.weapon.position.x, player.weapon.position.y, 2);
                            const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.weapon.position.x, player.weapon.position.y, 3);
                            //setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                            //setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                            setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                        }
                        if (enemies.length < 10) {
                            if (tick % 540 === 0) {
                                let newEnemies = [];
                                if (Math.random() < 0.5) {
                                    for (let i = 0; i < round(random(3, 5)); i++) {
                                        newEnemies.push(melee(random(0.25, 0.5))())
                                    }
                                    for (let i = 0; i < round(random(2, 4)); i++) {
                                        newEnemies.push(ranged(random(0.25, 0.5))())
                                    }
                                } else {
                                    for (let i = 0; i < round(random(1, 2)); i++) {
                                        newEnemies.push(melee(random(0.25, 0.5))())
                                    }
                                    for (let i = 0; i < round(random(2, 3)); i++) {
                                        newEnemies.push(ranged(random(0.25, 0.5))())
                                    }
                                    newEnemies.push(meleeHeavy(0.5)())
                                }
                                newEnemies.forEach(enemy => {
                                    enemy.add();
                                });
                                enemies.push(...newEnemies);
                            }
                        }
                    }
                    if (stage === 2) {
                        if (dist(this.x, this.y, player.x, player.y) > 300) {
                            const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.head.position.x, player.head.position.y, 1.5);
                            const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.head.position.x, player.head.position.y, 1.5);
                            const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.head.position.x, player.head.position.y, 1.5);
                            setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                            setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                            setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                        } else if (dist(this.x, this.y, player.x, player.y) < 150) {
                            const headAway = vecTo(head.position.x, head.position.y, player.head.position.x, player.head.position.y, -1);
                            const torsoAway = vecTo(torso.position.x, head.position.y, player.head.position.x, player.head.position.y, -1);
                            setVelocity(head, { x: head.velocity.x + headAway.x, y: head.velocity.y + headAway.y });
                            setVelocity(torso, { x: torso.velocity.x + torsoAway.x, y: torso.velocity.y + torsoAway.y });
                            const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.head.position.x, player.head.position.y, 1.5);
                            setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                        }
                        if (dist(this.x, this.y, player.x, player.y) < 250) {
                            if (Math.random() < 0.25 && !deadBodyParts.includes(lowerArm1)) {
                                this.hellfire();
                            }
                        }
                        if (tick % 480 === 0 && !dead) {
                            this.asteroidStorm();
                        }
                        if (dist(player.weapon.position.x, player.weapon.position.y, head.position.x, head.position.y) < 100) {
                            const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, player.weapon.position.x, player.weapon.position.y, 2);
                            const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, player.weapon.position.x, player.weapon.position.y, 2);
                            const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, player.weapon.position.x, player.weapon.position.y, 3);
                            //setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                            //setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                            setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                        }
                        if (enemies.length < 15) {
                            if (tick % 540 === 0) {
                                let newEnemies = [];
                                let seed = Math.random();
                                if (seed < 0.4) {
                                    for (let i = 0; i < round(random(1, 3)); i++) {
                                        newEnemies.push(melee(random(0.25, 0.75))())
                                    }
                                    for (let i = 0; i < round(random(2, 4)); i++) {
                                        newEnemies.push(ranged(random(0.25, 0.75))())
                                    }
                                    for (let i = 0; i < round(random(1, 3)); i++) {
                                        newEnemies.push(meleeRanged(random(0.3, 0.75))())
                                    }
                                    newEnemies.push(rangedRapid(random(0.3, 0.75))());
                                } else if (seed < 0.8) {
                                    for (let i = 0; i < round(random(1, 2)); i++) {
                                        newEnemies.push(melee(random(0.25, 0.75))())
                                    }
                                    for (let i = 0; i < round(random(2, 3)); i++) {
                                        newEnemies.push(ranged(random(0.25, 0.75))())
                                    }
                                    for (let i = 0; i < round(random(1, 2)); i++) {
                                        newEnemies.push(rangedMelee(random(0.4, 0.8))())
                                    }
                                    newEnemies.push(meleeHeavy(0.6)())
                                } else {
                                    for (let i = 0; i < round(random(1, 3)); i++) {
                                        newEnemies.push(meleeRanged(random(0.3, 0.75))())
                                    }
                                    for (let i = 0; i < round(random(1, 2)); i++) {
                                        newEnemies.push(rangedMelee(random(0.4, 0.8))())
                                    }
                                    newEnemies.push(rangedRapid(random(0.3, 0.75))());
                                }
                                newEnemies.forEach(enemy => {
                                    enemy.add();
                                });
                                enemies.push(...newEnemies);
                            }
                        }
                    }
                    if (stage === 1) {
                        type = "meleeHarpoon";
                        if (!deadBodyParts.includes(lowerArm1)) {
                            this.hellfire();
                        }
                        if (tick % 480 === 0 && !dead) {
                            this.asteroidStorm();
                        }
                    }
                    if (ticksSinceHellfire > 30) {
                        sounds.hellfire.pause();
                    }
                    asteroids.forEach((asteroid, i) => {
                        player.takeDamage(asteroid.body);
                        asteroid.advanceTick();
                        asteroid.draw();
                        if (asteroid.tick < asteroid.begin) {
                            if (dist(head.position.x, head.position.y, asteroid.body.position.x, asteroid.body.position.y) > 100) {
                                Body.setVelocity(asteroid.body, {
                                    x: asteroid.body.velocity.x + (this.head.position.x - asteroid.body.position.x) / 100,
                                    y: asteroid.body.velocity.y + (this.head.position.y - asteroid.body.position.y) / 100
                                });
                            }
                            asteroids.forEach(asteroid2 => {
                                if (dist(asteroid2.body.position.x, asteroid2.body.position.y, asteroid.body.position.x, asteroid.body.position.y) < 100) {
                                    Body.setVelocity(asteroid.body, {
                                        x: asteroid.body.velocity.x - (asteroid2.body.position.x - asteroid.body.position.x) / 100,
                                        y: asteroid.body.velocity.y - (asteroid2.body.position.y - asteroid.body.position.y) / 100
                                    });
                                }
                            })
                        }
                        if (asteroid.tick > asteroid.begin && asteroid.tick < asteroid.begin + 30) {
                            const toPlayer = vecTo(asteroid.body.position.x, asteroid.body.position.y, player.head.position.x, player.head.position.y, 1);
                            Body.setVelocity(asteroid.body, {
                                x: asteroid.body.velocity.x + toPlayer.x,
                                y: asteroid.body.velocity.y + toPlayer.y
                            });
                        }
                        if (asteroid.tick > 60 * 10) {
                            asteroid.remove();
                            asteroids.splice(i, 1);
                        }
                    });
                    /*this.hellfire();
                    asteroids.forEach((asteroid, i) => {
                        player.takeDamage(asteroid.body);
                        asteroid.advanceTick();
                        asteroid.draw();
                        if (asteroid.tick < asteroid.begin) {
                            if (dist(head.position.x, head.position.y, asteroid.body.position.x, asteroid.body.position.y) > 100) {
                                Body.setVelocity(asteroid.body, {
                                    x: asteroid.body.velocity.x + (this.head.position.x - asteroid.body.position.x) / 100,
                                    y: asteroid.body.velocity.y + (this.head.position.y - asteroid.body.position.y) / 100
                                });
                            }
                            asteroids.forEach(asteroid2 => {
                                if (dist(asteroid2.body.position.x, asteroid2.body.position.y, asteroid.body.position.x, asteroid.body.position.y) < 100) {
                                    Body.setVelocity(asteroid.body, {
                                        x: asteroid.body.velocity.x - (asteroid2.body.position.x - asteroid.body.position.x) / 100,
                                        y: asteroid.body.velocity.y - (asteroid2.body.position.y - asteroid.body.position.y) / 100
                                    });
                                }
                            })
                        }
                        if (asteroid.tick > asteroid.begin && asteroid.tick < asteroid.begin + 30) {
                            const toPlayer = vecTo(asteroid.body.position.x, asteroid.body.position.y, player.head.position.x, player.head.position.y, 1);
                            Body.setVelocity(asteroid.body, {
                                x: asteroid.body.velocity.x + toPlayer.x,
                                y: asteroid.body.velocity.y + toPlayer.y
                            });
                        }
                        if (asteroid.tick > 60 * 10) {
                            asteroid.remove();
                            asteroids.splice(i, 1);
                        }
                    });
                    if (tick % 360 === 0) {
                        this.asteroidStorm();
                    }*/
                }
                if (backgroundPerson && target) {
                    targetTick++;
                    /*if (target.type === "wave") {
                        //const toMouse1 = vecTo(upperArm2.position.x, upperArm2.position.y, head.position.x + 50, head.position.y + (45 * Math.sin(targetTick / 10)), 3);
                        //const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, head.position.x + 50, head.position.y + (45 * Math.sin(targetTick / 10)), 2);
                        //setVelocity(upperArm2, { x: upperArm2.velocity.x + toMouse1.x, y: upperArm2.velocity.y + toMouse1.y });
                        //setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                        Body.setAngularVelocity(upperArm2, upperArm2.angularVelocity + Math.sin(targetTick / 10) * 0.05);
                        Body.setAngularVelocity(lowerArm2, lowerArm2.angularVelocity + Math.sin(targetTick / 10) * 0.05);
                        Body.setAngularVelocity(upperArm1, -upperArm1.angle / 1000);
                        Body.setAngularVelocity(lowerArm1, -lowerArm1.angle / 1000);
                        Body.setAngularVelocity(weaponBox, -weaponBox.angle / 1000);
                    } else {*/
                    const toMouse1 = vecTo(lowerArm1.position.x, lowerArm1.position.y, target.x, target.y, 0.25);
                    const toMouse2 = vecTo(lowerArm2.position.x, lowerArm2.position.y, target.x, target.y, 0.25);
                    const toMouseWeapon = vecTo(weaponBox.position.x, weaponBox.position.y, target.x, target.y, 0.5);
                    setVelocity(lowerArm1, { x: lowerArm1.velocity.x + toMouse1.x, y: lowerArm1.velocity.y + toMouse1.y });
                    setVelocity(lowerArm2, { x: lowerArm2.velocity.x + toMouse2.x, y: lowerArm2.velocity.y + toMouse2.y });
                    setVelocity(weaponBox, { x: weaponBox.velocity.x + toMouseWeapon.x, y: weaponBox.velocity.y + toMouseWeapon.y });
                    if (dist(weaponBox.position.x, weaponBox.position.y, target.x, target.y) < 30) {
                        //if (Math.random() < 0) {
                        target = { x: random(1000), y: random(700) };
                        /*} else {
                            target = { type: 'wave' };
                        }*/
                    }
                    //}
                }
                //Body.setAngularVelocity(lowerLeg2, -0.1)
                if (!deadBodyParts.includes(torso)) {
                    Body.setAngularVelocity(torso, -torso.angle / 10);
                }
                setVelocity(torso, { x: torso.velocity.x + speed, y: torso.velocity.y - 0.2 });
                setVelocity(torso, { x: min(max(-10, torso.velocity.x), 10), y: torso.velocity.y });
                //Body.setAngle(weaponBox, lowerLeg1.angle);
                stroke(0);
                strokeWeight(1);
                let myColor = color.concat(deadTimer);
                if (timeSinceHeal > 1) {
                    myColor = [255, 255 + (255 * (1 - timeSinceHeal)), 255 + (255 * (1 - timeSinceHeal))].concat(deadTimer);
                }
                fill(...myColor);
                drawVertices(torso.vertices);
                /*drawVertices(arm1.vertices);
                drawVertices(arm2.vertices);*/
                drawVertices(upperLeg1.vertices);
                drawVertices(upperLeg2.vertices);
                drawVertices(lowerLeg1.vertices);
                drawVertices(lowerLeg2.vertices);
                if (tempDamageBoost > 1) {
                    fill(255 + (255 * (1 - tempDamageBoost)), 255, 255);
                }
                drawVertices(upperArm1.vertices);
                drawVertices(lowerArm1.vertices);
                fill(...myColor);
                drawVertices(upperArm2.vertices);
                drawVertices(lowerArm2.vertices);
                stroke(255);
                strokeWeight(3);
                if (weapon === harpoon && !deadBodyParts.includes(lowerArm1)) {
                    drawConstraint(weaponAttachment);
                }
                strokeWeight(1);
                stroke(0);
                /*fill(255, 0, 0);
                drawVertices(weaponBox.vertices);*/
                if (weapon && !weaponBox.hide) {
                    push();
                    translate(weaponBox.position.x, weaponBox.position.y);
                    rotate(Math.PI / 2 + weaponBox.angle);
                    imageMode(CENTER);
                    //tint(255, deadTimer);
                    if (!bombStarted) {
                        image(weapon, 0, 0, weaponHeight, weaponWidth);
                    } else {
                        if (bombTick < 60) {
                            if (dead || bombTick % 15 < 7) {
                                let scale = ((7 - (bombTick % 15)) / 7) * 0.25 + 1;
                                if (bombTick < 8) {
                                    scale = 1;
                                }
                                image(bomb, 0, 0, weaponHeight * scale, weaponWidth * scale);
                            } else {
                                const scale = (((bombTick % 15) - 7) / 7) * (bombTick > 52 ? 0.75 : 0.25) + 1;
                                image(deadTimer < 255 ? bomb : flashbomb, 0, 0, weaponHeight * scale, weaponWidth * scale);
                            }
                        }
                    }
                    //noTint();
                    pop();
                }
                /*drawVertices(foot1.vertices);
                drawVertices(foot2.vertices);*/
                fill(255);
                drawCircle(head);
                push();
                noFill();
                const headX = head.position.x;
                const headY = head.position.y;
                const xOffset = constrain(head.velocity.x, -2, 2);
                const yOffset = constrain(head.velocity.y, -2, 2);
                translate(headX, headY);
                rotate(head.angle);
                fill(255);
                circle(-7, -2, 10);
                circle(7, -2, 10);
                fill(0);
                circle(-7 + xOffset, -2 + yOffset, 5);
                circle(7 + xOffset, -2 + yOffset, 5);
                pop();
                if (hat) {
                    push();
                    translate(head.position.x, head.position.y);
                    rotate((![hats.swordHat, hats.disguise, hats.tophat, hats.tinfoilhat, hats.sweat, hats.table, hats.four, hats.lunarRover, hats.temple].includes(hat)) && !this.deadBodyParts.includes(head) ? torso.angle : head.angle);
                    //tint(255, deadTimer);
                    image(hat, hat.xOffset, hat.yOffset, hat.customWidth ? hat.customWidth : 60, hat.customHeight ? hat.customHeight : 60);
                    //noTint();
                    pop();
                }
                /*if (this === steveio) {
                    noStroke();
                    fill(255, 255, 255, 255 - step * 2);
                    textAlign(CENTER);
                    textSize(20);
                    text("You", head.position.x, head.position.y - 20);
                    stroke(0);
                }*/
                /*stroke(255, 0, 0);
                drawConstraint(neck);
                drawConstraint(hipJoint1);
                drawConstraint(hipJoint2);
                drawConstraint(knee1);
                drawConstraint(knee2);
                stroke(0);*/
                /*stroke(255);
                drawConstraint(hipConstraint1);
                stroke(0);*/
                step += 1;
                //image(weapon, x, y, 300, 100);
            }
        },
        get x() {
            return torso.position.x;
        },
        get y() {
            return torso.position.y;
        },
        get speed() {
            return speed;
        },
        set speed(val) {
            speed = val;
        },
        get weapon() {
            if (weapon === harpoon && !type) {
                weaponBox.isHarpoon = true;
            }
            weaponBox.weaponImage = weapon;
            return weaponBox;
        },
        get weaponAttachment() {
            return weaponAttachment;
        },
        jump() {
            setVelocity(torso, { x: torso.velocity.x, y: torso.velocity.y - 10 });
        },
        down() {
            setVelocity(torso, { x: torso.velocity.x, y: torso.velocity.y + 10 });
        },
        touchingGround() {
            return Detector.collisions([
                [lowerLeg1, ground],
                [lowerLeg2, ground],
                [upperLeg1, ground],
                [upperLeg2, ground],
                [torso, ground],
                [head, ground]
            ], engine).length !== 0;
        },
        getHealth() {
            if (puppet) {
                return puppetHealth;
            }
            const healths = this.bodyParts.slice(0, -1).map(x => (x.health / x.maxHealth) * x.maxHealth ** (x === head ? 2.5 : 2));
            const maxes = this.bodyParts.slice(0, -1).map(x => x.maxHealth ** (x === head ? 2.5 : 2));
            return max(min(healths.reduce((t, v) => t + v) / maxes.reduce((t, v) => t + v), 1), 0) ** 2;
        },
        get bodyParts() {
            return [head, torso, upperArm1, lowerArm1, upperArm2, lowerArm2, upperLeg1, lowerLeg1, upperLeg2, lowerLeg2, weaponBox];
        },
        get head() {
            return head;
        },
        get torso() {
            return torso;
        },
        get type() {
            return type;
        },
        get deadBodyParts() {
            return deadBodyParts;
        },
        get strength() {
            return strength;
        },
        get isPlayer() {
            return !type && !backgroundPerson;
        },
        get dead() {
            return dead;
        },
        collisionPoints() {
            return Detector.collisions(this.opponent.bodyParts.map(x => [x, this.weapon]).concat(this.bodyParts.map(x => [this.weapon, x])), engine).map(x => x.bodyA === this.weapon ? ({...x.bodyB.position, body: x.bodyB }) : ({...x.bodyA.position, body: x.bodyA }));
        },
        applyEffect(effect) {
            if (effect === "heal") {
                achievements.add(medic);
                this.bodyParts.forEach(part => {
                    if (part.health && !this.deadBodyParts.includes(part)) {
                        const toAdd = 0.025 * ((localProxy.powerUpInfo.healthPotency - 1) / 0.25);
                        const boost = random(0.05 + toAdd, 0.1 + toAdd) * part.maxHealth;
                        part.health += boost;
                        part.health = min(part.health, part.maxHealth)
                    }
                });
                timeSinceHeal = 1.75;
            } else if (effect === "strength") {
                achievements.add(bodyBuilder);
                tempDamageBoost = 1.25 + (0.125 * ((localProxy.powerUpInfo.strengthPotency - 1) / 0.25));
            }
        },
        takeDamage(opponent) {
            this.opponent = opponent;
            if (bullets.includes(opponent) || opponent.asteroid) {
                this.opponent.weapon = opponent;
                if (!this.opponent.strength) {
                    this.opponent.strength = 1;
                }
            }
            Detector.collisions(this.bodyParts.map(x => [this.opponent.weapon, x]).concat(this.bodyParts.map(x => [x, this.opponent.weapon])), engine).forEach(x => {
                const body = x.bodyA === this.opponent.weapon ? x.bodyB : x.bodyA;
                if (body !== weaponBox && !deadBodyParts.includes(body) && !dead && !prevCollidedBodies.includes(body) && hurtCooldown < 0) {
                    if (LASER_WEAPONS.includes(this.opponent.weapon.weaponImage)) {
                        if (!sounds.laserOnFlesh.isPlaying()) {
                            sounds.laserOnFlesh.setVolume(0.5 * localProxy.sfxVolume);
                            sounds.laserOnFlesh.rate(random(0.5, 2));
                            sounds.laserOnFlesh.play();
                            hurtCooldown = random(30, 60);
                        }
                    } else if (opponent.asteroid || this.opponent.weapon.weaponImage === flamethrower) {
                        if (!sounds.asteroidHit.isPlaying()) {
                            sounds.asteroidHit.setVolume(2.5 * localProxy.sfxVolume);
                            sounds.asteroidHit.rate(random(0.5, 1));
                            if (this.opponent.weapon.weaponImage === flamethrower) {
                                sounds.asteroidHit.rate(random(0.4, 0.8));
                            }
                            sounds.asteroidHit.play();
                            hurtCooldown = 0;
                        }
                    }
                }
                if (body.health) {
                    if (body.damageCooldown < 0) {
                        emitters.push(Emitter({
                            x: body.position.x,
                            y: body.position.y,
                            minSize: 1,
                            maxSize: 1,
                            distributionSize: 0,
                            colors: [
                                color
                            ],
                            rate: Infinity,
                            startingParticles: 15,
                            magnitude: 1,
                            duration: 30,
                            particleDuration: 30,
                            display: "line",
                            lineSize: 8
                        }));
                        body.damageCooldown = 60;
                    }
                    if (!bullets.includes(opponent) && !opponent.asteroid) {
                        const damageMultiplier = this.opponent.isPlayer ? localProxy.damageMultiplier : 1;
                        const multiplier = (this.opponent.weapon.isHarpoon ? 1 : 5);
                        const boost = this.opponent.tempDamageBoost ? this.opponent.tempDamageBoost : 1;
                        body.health -= this.opponent.weapon.angularSpeed * multiplier * this.opponent.strength * damageMultiplier * boost;
                        healthLost += this.opponent.weapon.angularSpeed * multiplier * this.opponent.strength * damageMultiplier * boost * (1 / strength);
                    } else {
                        const velocity = Math.hypot(body.velocity.x, body.velocity.y);
                        const debuff = opponent.asteroid ? 0.1275 : 1;
                        body.health -= velocity * 0.5 * debuff * this.opponent.strength;
                        healthLost += velocity * 0.5 * debuff * this.opponent.strength * (1 / strength);
                    }
                    if (body.health < 0) {
                        if (!((boss || (!type && levelNum === 9)) && (body === lowerArm1 || body == upperArm1))) {
                            deadBodyParts.push(body);
                        }
                        switch (body) {
                            case head:
                                World.remove(engine.world, [neck]);
                                deadBodyParts.push(torso);
                                dead = true;
                            case torso:
                                deadBodyParts.push(head);
                                deadBodyParts.push(upperArm1);
                                deadBodyParts.push(upperArm2);
                                deadBodyParts.push(upperLeg1);
                                deadBodyParts.push(upperLeg2);
                                deadBodyParts.push(lowerArm1);
                                deadBodyParts.push(lowerArm2);
                                deadBodyParts.push(lowerLeg1);
                                deadBodyParts.push(lowerLeg2);
                                deadBodyParts.push(weaponBox);
                                World.remove(engine.world, [neck, shoulder1, shoulder2, elbow1, elbow2, hipJoint1, hipJoint2, knee1, knee2, weaponAttachment]);
                                dead = true;
                                break;
                            case upperArm1:
                                if (!(boss || (!type && levelNum === 9))) {
                                    deadBodyParts.push(lowerArm1);
                                    deadBodyParts.push(weaponBox);
                                    World.remove(engine.world, [shoulder1, elbow1]);
                                }
                                break;
                            case upperArm2:
                                deadBodyParts.push(lowerArm2);
                                World.remove(engine.world, [shoulder2, elbow2]);
                                break;
                            case lowerArm1:
                                if (!(boss || (!type && levelNum === 9))) {
                                    deadBodyParts.push(weaponBox);
                                    World.remove(engine.world, [elbow1]);
                                    break;
                                }
                            case lowerArm2:
                                World.remove(engine.world, [elbow2]);
                                break;
                            case upperLeg1:
                                deadBodyParts.push(lowerLeg1);
                                World.remove(engine.world, [hipJoint1, knee1]);
                                break;
                            case upperLeg2:
                                deadBodyParts.push(lowerLeg2);
                                World.remove(engine.world, [hipJoint2, knee2]);
                                break;
                            case lowerLeg1:
                                World.remove(engine.world, [knee1]);
                                break;
                            case lowerLeg2:
                                World.remove(engine.world, [knee2]);
                                break;
                        }
                    }
                    if (bullets.includes(opponent)) {
                        World.remove(engine.world, [opponent]);
                        bullets.splice(bullets.indexOf(opponent), 1);
                    }
                }
            });
            prevCollidedBodies = Detector.collisions(this.bodyParts.map(x => [this.opponent.weapon, x]).concat(this.bodyParts.map(x => [x, this.opponent.weapon])), engine).map(x => x.bodyA === this.opponent.weapon ? x.bodyB : x.bodyA);
        },
        tickDamage() {
            this.bodyParts.forEach(body => {
                if (body.health < 0) {
                    if (!((boss || (!type && levelNum === 9)) && (body === lowerArm1 || body == upperArm1))) {
                        deadBodyParts.push(body);
                    }
                    switch (body) {
                        case head:
                            World.remove(engine.world, [neck]);
                            deadBodyParts.push(torso);
                            dead = true;
                        case torso:
                            deadBodyParts.push(head);
                            deadBodyParts.push(upperArm1);
                            deadBodyParts.push(upperArm2);
                            deadBodyParts.push(upperLeg1);
                            deadBodyParts.push(upperLeg2);
                            deadBodyParts.push(lowerArm1);
                            deadBodyParts.push(lowerArm2);
                            deadBodyParts.push(lowerLeg1);
                            deadBodyParts.push(lowerLeg2);
                            deadBodyParts.push(weaponBox);
                            World.remove(engine.world, [neck, shoulder1, shoulder2, elbow1, elbow2, hipJoint1, hipJoint2, knee1, knee2, weaponAttachment]);
                            dead = true;
                            break;
                        case upperArm1:
                            if (!(boss || (!type && levelNum === 9))) {
                                deadBodyParts.push(lowerArm1);
                                deadBodyParts.push(weaponBox);
                                World.remove(engine.world, [shoulder1, elbow1]);
                            }
                            break;
                        case upperArm2:
                            deadBodyParts.push(lowerArm2);
                            World.remove(engine.world, [shoulder2, elbow2]);
                            break;
                        case lowerArm1:
                            if (!(boss || (!type && levelNum === 9))) {
                                deadBodyParts.push(weaponBox);
                                World.remove(engine.world, [elbow1]);
                                break;
                            }
                        case lowerArm2:
                            World.remove(engine.world, [elbow2]);
                            break;
                        case upperLeg1:
                            deadBodyParts.push(lowerLeg1);
                            World.remove(engine.world, [hipJoint1, knee1]);
                            break;
                        case upperLeg2:
                            deadBodyParts.push(lowerLeg2);
                            World.remove(engine.world, [hipJoint2, knee2]);
                            break;
                        case lowerLeg1:
                            World.remove(engine.world, [knee1]);
                            break;
                        case lowerLeg2:
                            World.remove(engine.world, [knee2]);
                            break;
                    }
                }
            })
        },
        get boss() {
            return boss;
        },
        get asteroids() {
            return asteroids;
        },
        getVelocities() {
            return this.bodyParts.map(part => ({ x: part.velocity.x, y: part.velocity.y }));
        },
        getPositions() {
            return this.bodyParts.map(part => ({ x: part.position.x, y: part.position.y }));
        },
        getAngles() {
            return this.bodyParts.map(part => part.angle);
        },
        getAngleVels() {
            return this.bodyParts.map(part => part.angularVelocity);
        },
        setVelocities(data) {
            this.bodyParts.forEach((part, i) => {
                Body.setVelocity(part, data[i])
            });
        },
        setPositions(data) {
            this.bodyParts.forEach((part, i) => {
                Body.setPosition(part, data[i])
            });
        },
        setAngles(data) {
            this.bodyParts.forEach((part, i) => {
                Body.setAngle(part, data[i]);
            });
        },
        setAngleVels(data) {
            this.bodyParts.forEach((part, i) => {
                Body.setAngularVelocity(part, data[i]);
            });
        },
        setHealth(hp) {
            puppetHealth = hp;
        },
        removeJoints(remove) {
            const toRemove = remove.map(body => ({
                "neck": neck,
                "shoulder1": shoulder1,
                "shoulder2": shoulder2,
                "elbow1": elbow1,
                "elbow2": elbow2,
                "hipJoint1": hipJoint1,
                "hipJoint2": hipJoint2,
                "knee1": knee1,
                "knee2": knee2,
                "weaponAttachment": weaponAttachment
            })[body]);
            World.remove(engine.world, toRemove);
        },
        die() {
            deadBodyParts.push(head);
            deadBodyParts.push(torso);
            deadBodyParts.push(upperArm1);
            deadBodyParts.push(upperArm2);
            deadBodyParts.push(upperLeg1);
            deadBodyParts.push(upperLeg2);
            deadBodyParts.push(lowerArm1);
            deadBodyParts.push(lowerArm2);
            deadBodyParts.push(lowerLeg1);
            deadBodyParts.push(lowerLeg2);
            deadBodyParts.push(weaponBox);
            World.remove(engine.world, [neck, shoulder1, shoulder2, elbow1, elbow2, hipJoint1, hipJoint2, knee1, knee2, weaponAttachment]);
            dead = true;
        }
    }
}
const melee = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: lazdagger,
    hat: "spaceHelmet",
    type: "melee",
    strength: strength,
    color: [255, 0, 0],
    coinAmount: 1,
    coinValue: 1
});

const ranged = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: pistol,
    hat: "spaceHelmet",
    type: "ranged",
    strength: strength,
    color: [255, 0, 255],
    coinAmount: 1,
    coinValue: 2
});

const meleeHeavy = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: axe,
    hat: "spaceHelmet",
    type: "meleeHeavy",
    strength: strength,
    color: [0, 255, 255],
    coinAmount: 2,
    coinValue: 2
});

const meleeRanged = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: lance,
    hat: "spaceHelmet",
    type: "meleeRanged",
    strength: strength,
    color: [0, 255, 0],
    coinAmount: 2,
    coinValue: 1
});

const rangedMelee = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: plasrifle,
    hat: "spaceHelmet",
    type: "rangedMelee",
    strength: strength,
    color: [125, 0, 255],
    coinAmount: 2,
    coinValue: 2
});

const rangedRapid = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: railgun,
    hat: "spaceHelmet",
    type: "rangedRapid",
    strength: strength,
    color: [255, 255, 0],
    coinAmount: 3,
    coinValue: 2
});
const bomber = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: bomb,
    hat: "spaceHelmet",
    type: "meleeBomber",
    strength: strength,
    color: [255, 125, 0],
    coinAmount: 2,
    coinValue: 2
});

const meleeHarpoon = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: harpoon,
    hat: "spaceHelmet",
    type: "meleeHarpoon",
    strength: strength,
    color: [255, 0, 125],
    coinAmount: 5,
    coinValue: 3
});

const boss = (strength) => () => Person({
    x: player.head.position.x + random(400, 600) * (random() < 0.5 ? 1 : -1),
    y: player.head.position.y + random(400, 600) * (random() < 0.5 ? 1 : -1),
    category: 4,
    weapon: moonStaff,
    hat: "evilHelmet",
    type: "boss",
    strength: strength,
    color: [125, 125, 125],
    coinAmount: 10,
    coinValue: 10,
    boss: true
});

const endless = {
    enemiesList: ["melee", "ranged", "meleeRanged", "rangedMelee", "rangedRapid", "bomber", "meleeHarpoon"],
    enemyCode: {
        melee: melee,
        ranged: ranged,
        meleeRanged: meleeRanged,
        rangedMelee: rangedMelee,
        rangedRapid: rangedRapid,
        meleeHarpoon: meleeHarpoon,
        bomber: bomber
    },
    enemyPotency: {
        melee: (wave) => 1.15 ** (-wave),
        ranged: (wave) => (1 / (1 + Math.exp(-30 * (wave - 8) ** -2))) * 2 - 1,
        meleeRanged: (wave) => Math.max((1 / (1 + Math.exp(-100 * (wave - 10) ** -2))) * 2 - 1, 0.25),
        rangedMelee: (wave) => 1 / (1 + Math.exp(-0.1 * (wave - 30))),
        rangedRapid: (wave) => 0.5 / (1 + Math.exp(-0.2 * (wave - 30))),
        bomber: (wave) => 0.5 / (1 + Math.exp(-0.25 * (wave - 25))),
        meleeHarpoon: (wave) => 1 / (1 + Math.exp(-0.25 * (wave - 35)))
    }
}