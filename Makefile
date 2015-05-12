BIN = ./node_modules/.bin

test: lint
	@$(BIN)/mocha --harmony --require must --require co-mocha

lint:
	@$(BIN)/eslint lib test

release-major: test
	@$(BIN)/bump --major

release-minor: test
	@$(BIN)/bump --minor

release-patch: test
	@$(BIN)/bump --patch

publish:
	git push --tags origin HEAD:master
	npm publish
