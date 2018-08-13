import * as React from "react";
import * as ReactDOM from "react-dom";

class FieldA extends React.Component {
    render() {
        return <input type="text"></input>
    }
}

class FieldB extends React.Component {
    render() {
        return <input type="text"></input>
    }
}

export const run = () => {
    ReactDOM.render(
        <form>
            <FieldA></FieldA>
            <FieldB></FieldB>
        </form>,
        document.getElementById("root")
    );
};