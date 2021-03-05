start:
	NODE_ENV=development npx webpack
build:
	NODE_ENV=production npx webpack
lint:
	npx eslint --no-eslintrc --config .eslintrc.yml .
test:
	npm test
install:
	npm install
coverage:
	npx jest --coverage