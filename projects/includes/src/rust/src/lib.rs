#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[allow(non_snake_case)]
#[wasm_bindgen]
pub fn includes(a: &str, b: &str) -> bool {

    a.contains(b)
}

#[wasm_bindgen]
pub fn run() {
    for _i in 0..10000 {
        includes("hello", "llo");
    };
}
