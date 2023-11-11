install:
	npm install
# build:
# 	npm run build
test:
	npm test
lint:
	npx eslint .
test-coverage:
	npm test -- --coverage --coverageProvider=v8
publish:
	npm publish --dry-run