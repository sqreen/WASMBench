all:

build: clean build-typescript build-assemblyscript

clean:
	rm -rf build

install:
	npm install
	cd src/typescript && npm install
	cd src/assemblyscript && npm install

build-typescript:
	cd src/typescript && npm run build

build-assemblyscript:
	cd src/assemblyscript && npm run build
