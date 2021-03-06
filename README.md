# Eth Waitlist 


A simple, open source waitlist ÐApp. It’s designed to be used wherever resources are in short supply. By making resource distribution more transparent, we can help limit corruption and coercion, building a more egalitarian world for all.

Repo for the ethereum waitlist project (trustQ)

This project uses [Truffle](http://truffleframework.com/)
View the whitepaper: https://goo.gl/RURuvw 


# Dependencies

### npm v5.0+
### truffle (v 4.0.0 beta)
### ethereumjs-testrpc

```
npm install -g truffle@beta // required.
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
// Start the testrpc first
testrpc

// Runs Truffle's test suite for smart contract tests.
truffle test
```


# API

```
./node_modules/.bin/nodemon api/server.js
```
