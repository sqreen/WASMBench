.PHONY: test benchmark

all: install clean build

build: build-typescript build-assemblyscript build-rust

clean:
	rm -rf build
	rm -rf src/rust/target

install:
	npm install
	cd src/typescript && npm install
	cd src/assemblyscript && npm install

build-typescript:
	cd src/typescript && npm run build

build-assemblyscript:
	cd src/assemblyscript && npm run build

build-rust:
	cd src/rust && cargo build --target wasm32-unknown-unknown --release
	mkdir -p build/rust
	wasm-bindgen src/rust/target/wasm32-unknown-unknown/release/lib.wasm --nodejs --out-dir build/rust

benchmark:
	node benchmark/index.js
