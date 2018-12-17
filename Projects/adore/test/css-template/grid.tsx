import "./__grid.scss";
import * as React from "react";

export class GridTemplate extends React.Component {
    render() {
        return <div>
            <div className="container">
                <div className="item-a" style={{ backgroundColor: "#F89427" }} />
                <div className="item-b" style={{ backgroundColor: "#3DBFE6" }} />
                <div className="item-c" style={{ backgroundColor: "#EC7272" }} />
                <div className="item-d" style={{ backgroundColor: "#74C576" }} />
            </div>
            <div className="container">
                <div className="item-e" style={{ backgroundColor: "#F89427" }} />
                <div className="item-f" style={{ backgroundColor: "#3DBFE6" }} />
            </div>
        </div>
    }
}