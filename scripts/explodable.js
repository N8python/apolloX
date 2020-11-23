function Explodable({
    x,
    y,
    color,
    xVel,
    yVel,
    size,
    explode = false,
    fireballRadius,
    powerRadius,
    decayRate,
    minDamage,
    maxDamage,
    fromPlayer = true
}) {
    const projectile = Bodies.circle(x, y, size);
    Body.setVelocity(projectile, { x: xVel, y: yVel });
    World.add(engine.world, projectile);
    let projectileDead = false;
    let explosionTick = 0;
    let explosionCenter;
    let explosionStarted = false;
    let damagedParts = [];
    return {
        draw() {
            if (!projectileDead) {
                fill(...color);
                drawCircle(projectile);
            }
            if (explode && !explosionStarted) {
                projectileDead = true;
                explosionStarted = true;
                explosionCenter = { x: projectile.position.x, y: projectile.position.y };
                World.remove(engine.world, projectile);
            }
            if (explosionStarted) {
                if (explosionTick === 0) {
                    if (currentWeapon === flamethrower && fromPlayer) {
                        sounds.fireball.setVolume(0.3 * localProxy.sfxVolume);
                        sounds.fireball.rate(random(1.5, 2.5));
                        sounds.fireball.play();
                    }
                }
                explosionStarted = true;
                explosionTick++;
                const progression = min(explosionTick * 8 / 255, 1);
                const opacity = max(255 - explosionTick * 8, 0);
                const explosionRim = explosionTick * 8 / 255 * powerRadius;
                const explosionRimOpacity = 255 / (decayRate ** (explosionRim / powerRadius));
                if (explosionRimOpacity < 10) {
                    explodables.splice(explodables.indexOf(this), 1);
                }
                const explosionRimWeight = (explosionRimOpacity / 255) * 10;
                noStroke();
                fill(...color.concat(opacity));
                circle(explosionCenter.x, explosionCenter.y, size + (fireballRadius - size) * progression);
                fill(...color.concat(opacity * 0.75));
                circle(explosionCenter.x, explosionCenter.y, size + (powerRadius - size) * progression);
                stroke(255, 255, 255, explosionRimOpacity);
                strokeWeight(explosionRimWeight);
                noFill();
                circle(explosionCenter.x, explosionCenter.y, explosionRim);
                noStroke();
                enemies.concat(fromPlayer ? [] : player).forEach(enemy => {
                    enemy.bodyParts.filter(part => !damagedParts.includes(part)).forEach(part => {
                        const partDistance = dist(explosionCenter.x, explosionCenter.y, part.position.x, part.position.y);
                        if (partDistance < fireballRadius) {
                            part.health -= random(minDamage, maxDamage);
                            damagedParts.push(part);
                            enemy.tickDamage();
                        } else if (partDistance < explosionRim) {
                            part.health -= random(minDamage, maxDamage) / (decayRate ** (partDistance / powerRadius));
                            damagedParts.push(part);
                            enemy.tickDamage();
                        }
                    })
                });
            }
            enemies.concat(fromPlayer ? [] : player).forEach(enemy => {
                enemy.bodyParts.forEach(part => {
                    if (Detector.collisions([
                            [projectile, part]
                        ], engine).length > 0) {
                        projectileDead = true;
                        explosionStarted = true;
                        explosionCenter = { x: projectile.position.x, y: projectile.position.y };
                        World.remove(engine.world, projectile);
                    }
                })
            });
        }
    }
}