module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": [
            "off"
        ]
    }
};