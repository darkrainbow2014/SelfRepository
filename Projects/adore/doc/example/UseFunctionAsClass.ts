//炫技写法,没啥卵用,为毛不用class而用一个function去封装.
export const show = () => {
    const A = function (count: number) {
        const self = this;
        self.count = count;
    }

    console.info(new A(12)); //特殊语法,大意为创建一个以12为入参的该function的实例,返回对象为function
}
