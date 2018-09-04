import * as React from "react"
import * as ReactDOM from "react-dom"
import { compose } from "../../src/util/Compose"

type SubscribeChangeHandler = (value: any) => void

class DataStore {
    private store: Map<string, any> = new Map() //data store
    private handlerMap: Map<string, Array<SubscribeChangeHandler>> = new Map() //store subscribe change handler

    /**
     * update model value and boardcast change event
     * @param key 
     * @param value 
     */
    public update(key: string, value: any) {
        const convertedValue = value instanceof Object ? Object.create(value) : value
        this.store.set(key, convertedValue)
        let handlers = this.handlerMap.get(key)
        if (handlers) { handlers.forEach(h => h(convertedValue)) }
    }

    /**
     * subscribe one instance of data
     * @param key 
     */
    public subscribe(key: string, handler: SubscribeChangeHandler) {
        let handlers = this.handlerMap.get(key)
        if (!handlers) { this.handlerMap.set(key, handlers = new Array()) }
        handlers.push(handler)
        const value = this.store.get(key)
        if (value) { handler(value) } //update component data while subscribe succes
    }

    /**
     * unsubscribe
     * @param key 
     * @param handler 
     */
    public unsubscribe(key: string, handler: SubscribeChangeHandler) {
        let handlers = this.handlerMap.get(key)
        let index
        if (handlers && (index = handlers.indexOf(handler)) >= 0) { handlers.splice(index, 1) }
    }
}

const dataStore = new DataStore()

interface DataHandleProps {
    value: any
    update(value: any): void
}

/**
 * HOC:assign the data update method to Component
 * @param key 
 */
const dataHandle = (key: string) => (WrappedComponent: React.ComponentClass<DataHandleProps>) => {
    const update = (value: any) => dataStore.update(key, value)

    return class extends React.Component<{}, { value: any }> {
        static displayName = `DataHandle(${WrappedComponent.displayName || WrappedComponent.name})`

        state = {
            value: undefined
        }

        private subscribeChangeHandler = (value: any) => {
            this.setState({ value: value })
        }

        render() {
            return <WrappedComponent value={this.state.value} update={update} {...this.props}></WrappedComponent>
        }

        componentDidMount() {
            dataStore.subscribe(key, this.subscribeChangeHandler)
        }

        componentWillUnmount() {
            dataStore.unsubscribe(key, this.subscribeChangeHandler)
        }
    }
}

/**
 * A simple Component
 */
class Text extends React.Component<DataHandleProps, { value: any }>{
    input = React.createRef<HTMLInputElement>()

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        this.props.update(value)
    }

    componentDidUpdate() {
        const inputElem = this.input.current
        if (inputElem) { inputElem.value = this.props.value }
    }

    render() {
        return <input type="text" ref={this.input} onChange={this.handleChange}></input>
    }
}

/**
 * generate new Component with updater
 */
const BindText = compose(dataHandle("text"))(Text)

export const show = () => {
    ReactDOM.render(
        <React.Fragment> <BindText></BindText><BindText></BindText></React.Fragment>,
        document.getElementById("root")
    )
}

