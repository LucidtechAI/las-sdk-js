CID := $(shell cat /tmp/prism.cid)

.PHONY: test
test:
	npm run test

.PHONY: prism-start
prism-start:
	@echo "Starting mock API..."
	docker run \
		--init \
		--detach \
		-p 4010:4010 \
		-h 0.0.0.0 \
		stoplight/prism:3.2.8 mock -d -h 0.0.0.0 \
		https://gist.githubusercontent.com/hexjelly/a24ef6bda9e161f590b7ff04f946060b/raw/e6d57af8113ac472a1fef20ff7b9c0ba0aa85f0a/oas.json > /tmp/prism.cid

.PHONY: prism-stop
prism-stop:
ifeq ("$(wildcard /tmp/prism.cid)","")
	@echo "Nothing to stop."
else
	docker stop $(CID)
endif

.PHONY: docs
docs:
	npx typedoc --options "typedoc.json" packages/las-sdk-core && npx concat-md --decrease-title-levels temp-docs > docs.md && npx rimraf temp-docs

