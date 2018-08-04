import * as React from "react";
import "./Hello.scss";

export interface HelloProps { compiler: string; framework: string; }

// export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;

export const SayHi = () => { alert("hi"); }

export class Hello extends React.Component<HelloProps> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}