function getRandomArbitrary(min, max) {
    // pseudo-random
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = getRandomArbitrary