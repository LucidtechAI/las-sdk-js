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
		https://raw.githubusercontent.com/LucidtechAI/cradl-docs/master/static/oas.json > /tmp/prism.cid

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

