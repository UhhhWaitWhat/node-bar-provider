BIN = ./node_modules/.bin

test: lint
	@$(BIN)/mocha --harmony --require must --require co-mocha

lint:
	@$(BIN)/eslint lib test

release-major: test
	@npm version major

release-minor: test
	@npm version minor

release-patch: test
	@npm version patch

publish: test
	git push --tags origin HEAD:master
	npm publish
