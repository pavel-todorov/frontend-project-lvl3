start:
	NODE_ENV=development npx webpack
build:
	NODE_ENV=production npx webpack
lint:
	npx eslint ./src/index.js
test:
	npm test
install:
	npm install
coverage:
	npx jest --coverage