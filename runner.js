const ts = require('./build_ts/lfi.pure');
const ts_asm = require('./lib/lfi');
const rs_asm = require('./rust_lfi/target/nodejs/rust_lfi_bg');

const runAntTime = function (fct) {
    const t0 = process.hrtime();
    fct();
    return process.hrtime(t0);
};


console.log('  ts_js', runAntTime(() => ts.run()));
// console.log('ts_wasm', runAntTime(() => ts_asm.asmModule.run()));
console.log('rs_wasm', runAntTime(() => rs_asm.run()));

