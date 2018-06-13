#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[allow(non_snake_case)]
#[wasm_bindgen]
pub fn count(max: i32) {

    let mut res = 0;
    for _i in 0..max {
        res = res + 1;
    };
}

#[wasm_bindgen]
pub fn run() {
    for i in 0..1000 {
        count(i);
    };
}
