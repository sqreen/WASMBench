#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

pub mod lfi {
    const RELEVANT_INJECTED_SIZE: usize = 5;

    pub fn pre(file_path: &str, params: Vec<&str>) -> bool {
        for part in &params {
            if part.len() > RELEVANT_INJECTED_SIZE && file_path.contains(part) {
                if part.starts_with("/") && file_path.starts_with("/") && &file_path == part {
                    return true
                }

                if file_path.ends_with(part) {
                    // TODO normalize part
                    let current = part;
                    if current.contains("/..") || current.contains("../") {
                        return  true
                    }
                }
            }
        };
        false
    }
}

#[wasm_bindgen]
pub fn pre(a: &str, b: &str) -> bool {
    lfi::pre(a, b.split("|").collect())
}
