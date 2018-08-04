/**
 * used to specifie extending supported intrinsic elements,usually unnecessary cause react-provided jsx.
 */
declare namespace JSX {
    interface IntrinsicElements {
        foo: { bar?: boolean, text?: string, index?: number }
    }
    interface ElementClass {

    }
    interface ElementAttributesProperty {
        // props:{};
    }
}

<div>
    <h1>Hello</h1>
</div>;

//use a outside props
var props = { text: "bar" };
<foo {...props} />; // ok

<foo bar text="text" index={10} />; // ok
{/* <bar />; // error */ }

class MyComponent extends React.Component<{ a?: string }>  {

}

//cannot use the class extends,deprecated.
function MyFactoryFunction() {
    return { render: () => { } }
}

<MyComponent a="aa" />; // ok
{/* <MyFactoryFunction />; // ok */ }

class NotAValidComponent { }
function NotAValidFactoryFunction() {
    return {};
}

{/* <NotAValidComponent />; // error
<NotAValidFactoryFunction />; // error */}


//override children type,maybe can limited the children options?
interface PropsType {
    children?: JSX.Element;
    name?: string;
}

class Component extends React.Component<PropsType, {}> {

}

<Component>
    <MyComponent />
</Component>

var a = <div>
    {["foo", "bar"].map(i => <span>{i.length / 2}</span>)}
</div>