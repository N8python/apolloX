let cache = {};

function stars(seed) {
    randomSeed(seed);
    if (!cache[seed]) {
        let stars = [];
        for (let i = 0; i < random(500 * 16, 1000 * 16); i++) {
            const size = map((random(1, 4) ** -1) * 2, 0.5, 2, 0, 4);
            const x = random(-1200, 1200);
            const y = random(-1200, 1200);
            if (dist(player.head.position.x, player.head.position.y, x, y) < 400) {
                let brightness = 1 - (4 - size) * 0.15; //random();
                noStroke();
                for (let i = 0; i < size; i++) {
                    fill(255, 255, 255, 150 * (1 - i / size));
                    circle(x, y, size + i + 1);
                }
                fill(255 * brightness);
                circle(x, y, size);
            }
            stars.push([x, y, size]);
        }
        cache[seed] = stars;
    } else {
        const stars = cache[seed];
        stars.forEach(([x, y, size]) => {
            if (dist(player.head.position.x, player.head.position.y, x, y) < 400) {
                let brightness = 1 - (4 - size) * 0.15; //random();
                noStroke();
                for (let i = 0; i < size; i++) {
                    fill(255, 255, 255, 150 * (1 - i / size));
                    circle(x, y, size + i + 1);
                }
                fill(255 * brightness);
                circle(x, y, size);
            }
        })
    }
    randomSeed(floor(random(0, 1000)));
}