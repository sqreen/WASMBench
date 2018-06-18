.PHONY: test
.PHONY: benchmark

all: install clean build test

build: build-typescript build-rust

clean:
	rm -rf build
	rm -rf src/rust/target

install:
	npm install
	cd src/typescript && npm install

build-typescript:
	cd src/typescript && npm run build

build-rust:
	cd src/rust && cargo build --target wasm32-unknown-unknown --release
	mkdir -p build/rust
	wasm-bindgen src/rust/target/wasm32-unknown-unknown/release/lib.wasm --nodejs --out-dir build/rust

test:
	npm test

benchmark:
	node benchmark/sum.js
	node benchmark/run.js
