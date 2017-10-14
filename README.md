# Eth Waitlist

Repo for the ethereum waitlist project

This project uses [Truffle](http://truffleframework.com/)

Initially set up with the command:

```
truffle unbox react
```

Info here: http://truffleframework.com/boxes/react

# Dependencies

### npm v5.0+
### truffle (v 3.0.5+)
### ethereumjs-testrpc

```
npm install -g truffle // required.
npm install -g ethereumjs-testrpc
```


# Set up

### Install npm dependencies

```
npm install
```

### Compile and migrate contracts

```
truffle compile
truffle migrate
```

### Run the webpack server for front-end hot reloading. For now, smart contract changes must be manually recompiled and migrated.

```
npm run start
```

### Jest is included for testing React components and Truffle's own suite is incldued for smart contracts. Be sure you've compile your contracts before running jest, or you'll receive some file not found errors.

```
// Runs Jest for component tests.
npm run test

// Runs Truffle's test suite for smart contract tests.
truffle test
```

### To build the application for production, use the build command. A production build will be in the build_webpack folder.

```
npm run build
```
