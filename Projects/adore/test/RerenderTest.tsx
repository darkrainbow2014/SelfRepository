import React from "react";
import ReactDOM from "react-dom";

class Button extends React.Component<{ lovely?: boolean }> {

    componentDidMount() {
        console.info("mount")
    }

    componentWillReceiveProps() {
        console.info("receiveProps")
    }

    componentDidUpdate() {
        console.info("update")
    }

    componentWillUnmount() {
        console.info("unmount")
    }

    render() {
        return <button></button>
    }
}

export const run = () => {
    ReactDOM.render(<Button lovely></Button>, document.getElementById("root"))
    ReactDOM.render(<Button></Button>, document.getElementById("root"))

    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
}