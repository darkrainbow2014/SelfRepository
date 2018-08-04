import * as React from "react";
import * as ReactDOM from "react-dom";
import "./Table.scss";

class Table extends React.Component<{ headData: Array<string>, bodyData: Array<Array<string>> }> {
	render() {
		return <table cellPadding={4} cellSpacing={0} className="custom-table">
			<TableRow data={this.props.headData} colspan={1} head ></TableRow>
			<TableRow data={["字段名称", "字段值"]} colspan={2} head></TableRow>
			{
				this.props.bodyData.map(data => <TableRow data={data} colspan={2}></TableRow>)
			}
		</table>;
	}
}

class TableRow extends React.Component<{ data: Array<string>, colspan: number, head?: boolean }> {
	render() {
		const content = this.props.data.map(data => this.props.head ?
			<th colSpan={this.props.colspan}>{data}</th> : <td colSpan={this.props.colspan}>{data}</td>);
		return <tr>{content}</tr>;
	}
}

export const tableTest = () => {
	const headData = ["交易码", "1123123", "交易名称", "我也不知道什么名称好"];
	const bodyData = [
		["姓名", "啦啦啦"], ["年龄", "32"]
	]
	ReactDOM.render(
		<Table headData={headData} bodyData={bodyData}>
		</Table>, document.getElementById("root"));
}