# Eth Waitlist

Repo for the ethereum waitlist project

This project uses [Truffle](http://truffleframework.com/)


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


### To build the application for production, use the build command. A production build will be in the build_webpack folder.

```
npm run build
```

# Testing

```
// Runs Jest for component tests.
npm run test

// Runs Truffle's test suite for smart contract tests.
truffle test
```
