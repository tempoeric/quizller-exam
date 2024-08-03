module.exports = {
  "!(*config).{ts,tsx,js}": [
    () => "yarn check-types",
    "yarn lint:fix",
    "prettier --write",
  ],
};
