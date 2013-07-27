MOCHA_OPTS = --check-leaks
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

.PHONY: test
