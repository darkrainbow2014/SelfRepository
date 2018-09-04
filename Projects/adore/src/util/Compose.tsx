

 type  Converter = (input: any) => any

const composeTwoFunction = (next: Converter, origin: Converter) => (input: any) => next(origin(input))

/**
 * 将多个方法的compose封装成单一function:A(B(C(n))可以改写为compose(A,B,C)(n)
 * @param converters Array<{input: any) => any}>
 */
export const compose = (...converters: Array<Converter>) => {
    let converter
    let composedConverter
    while ((converter = converters.pop())) {
        if (!composedConverter) {
            composedConverter = converter
        } else {
            composedConverter = composeTwoFunction(converter, composedConverter)
        }
    }
    return composedConverter || (() => { })
}