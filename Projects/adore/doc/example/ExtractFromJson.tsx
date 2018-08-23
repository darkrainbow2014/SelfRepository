export function show() {
    const prop = { a: "a", b: "b", c: "c", d: "d" }
    const { a, ...others } = prop;
    console.info(a, others);
}