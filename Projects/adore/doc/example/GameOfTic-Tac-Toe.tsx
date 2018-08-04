import * as ReactDom from "react-dom";
import * as React from "react";

class Board extends React.Component {
    renderSquare(i: number) {
        return <Square value={i} />;
    }
}

interface SquareProps {
    value: number;
}

class Square extends React.Component<SquareProps> {
    public state = {
        value: null
    };
    public render() {
        return (
            <button className="square"
                onClick={() => this.setState({ value: "X" })}
            >
                {this.state.value}
            </button>
        );
    }
}