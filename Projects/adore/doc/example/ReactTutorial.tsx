import * as ReactDOM from "react-dom";
import * as React from "react";

const elementRender = () => {
    const element = <h1>Hello, world</h1>;
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

const frequentlyElementRender = () => {
    function tick() {
        const element = (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
        ReactDOM.render(element, document.getElementById('root'));
    }
    setInterval(tick, 1000);
}

const componentRender = () => {
    //fucntional component,deprecated for lack of many react-component functions
    const WelcomeFC = (props: { name: string }) => <h1>Hello, {props.name}</h1>;
    //class component
    class WelcomeCC extends React.Component<{ name: string }>{
        render() {
            return <h1>Hello, {this.props.name}</h1>;
        }
    }

    const element =
        <div>
            <WelcomeFC name="functional component" />
            <WelcomeCC name="class component" />
        </div>;

    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

const stateExample = () => {
    class Clock extends React.Component<{}, { date: Date }>{
        timerID: number | undefined = undefined;
        state = { date: new Date() };

        componentDidMount() {
            this.timerID = window.setInterval(
                () => this.tick(),
                1000
            );
        }

        componentWillUnmount() {
            clearInterval(this.timerID);
        }

        tick() {
            this.setState({
                date: new Date()
            });
        }


        render() {
            return (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }

    function tick() {
        ReactDOM.render(
            <Clock />,
            document.getElementById('root')
        );
    }

    setInterval(tick, 1000);
}

stateExample();
