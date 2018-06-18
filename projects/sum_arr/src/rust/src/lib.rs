#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[allow(non_snake_case)]
#[wasm_bindgen]
pub fn sum(a: Vec<i32>) -> i32 {

    a.iter().sum()
}

#[wasm_bindgen]
pub fn run() {
    for i in 0..10000 {
        sum(vec![1, 2, 3, 4, 5, 6, 7, 8, 9]);
    };
}
