mod lfi;

//use std::path::PathBuf;

fn main() {
    let res = lfi::pre("imgs/../secret.yml", vec!["../secret.yml"]);
    println!("{}", res);
/*    let mut path = PathBuf::new();
    path.push("a/bb//../c");
    let res = path.canonicalize();
    println!("{:?}", res)*/
}
