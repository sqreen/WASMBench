// The entry file of your WebAssembly module.
import "allocator/arena";

export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export const arr: string[] = ['hello', 'world'];
