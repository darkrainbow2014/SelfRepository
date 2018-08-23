
/**
 * 试着抽象一个数据源,进行数据变更事件的dispatch
 */
class DataSource {
    private static ChangeListenerSet: Array<Listener> = new Array();
    public static addChangeListener(listener: Listener) {
        if (listener) { this.ChangeListenerSet.push(listener); }
    }

    public static removeChangeListener(listener: Listener) {
        let index: number;
        if (listener && (index = this.ChangeListenerSet.indexOf(listener)) >= 0) {
            this.ChangeListenerSet.splice(index, 1);
        }
    }

    public static notifyChange() {
        this.ChangeListenerSet.forEach(listener => listener());
    }
}

type Listener = () => void;

//方法接受单个Component作为参数,selectData作为从对应数据集中根据参数检出相关数据的方法
function withSubscription(WrappedComponent, selectData) {
    //利用Compositing的概念返回一个匿名组件
    class WithSubscription extends React.Component<{}, { data }> {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }

        componentDidMount() {
            DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render() {
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
    return WithSubscription;
}