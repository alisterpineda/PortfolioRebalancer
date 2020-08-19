module.exports = {
    transform: {
        '^.+\\.svelte$': 'svelte-jester',
        '^.+\\.js$': 'babel-jest',
        "^.+\\.ts$": "ts-jest"
    },
    moduleFileExtensions: ['js', 'svelte', 'ts'],
    collectCoverage: true
}