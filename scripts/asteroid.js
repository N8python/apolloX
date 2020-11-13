function Asteroid({
    x,
    y,
    size = 45 / 2,
    category = 4,
    begin = 180
}) {
    const myMask = 7 - category;
    const myCategory = category;
    let asteroidBody = Bodies.circle(x, y, size, {
        collisionFilter: {
            mask: myMask,
            group: Body.nextGroup(false),
            category: myCategory
        }
    });
    asteroidBody.asteroid = true;
    let tick = 0;
    return {
        add() {
            setTimeout(() => {
                sounds.pop.setVolume(2 * localProxy.sfxVolume);
                sounds.pop.play();
            }, random(0, 1000))
            World.add(engine.world, [asteroidBody]);
        },
        remove() {
            World.remove(engine.world, [asteroidBody]);
        },
        draw() {
            const scale = min(tick / 30, 1);
            image(asteroidImage, asteroidBody.position.x, asteroidBody.position.y, size * 2 * scale, size * 2 * scale);
        },
        advanceTick() {
            tick++;
        },
        get tick() {
            return tick;
        },
        get body() {
            return asteroidBody;
        },
        begin
    }
}