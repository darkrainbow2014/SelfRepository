import React, { ChangeEvent } from "react"
import ReactDOM, { render } from "react-dom"
class A extends React.Component<{}, { value: string }> {
    private ref = React.createRef<HTMLInputElement>()
    state = {
        value: ""
    }

    render() {
        return <input type="text" ref={this.ref} value={this.state.value} onChange={this.handleChange} />
    }

    private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            { value: e.target.value }
        )
        console.info(this.ref.current.value)
    }
}

class B extends React.Component {
    ref = React.createRef<A>()

    render() {
        return <A ref={this.ref}></A>
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            { value: e.target.value }
        )
    }

}

