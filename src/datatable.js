import React from 'react'


export default class DataTable extends React.Component {
    render() {
        return (
            <div className="data-table">
                <input className="filter-input" type="text" placeholder="Search Title" />
                <Table />
            </div>
        )
    }
}

class Table extends React.Component {
    render() {
        return (
            <table className="table-content">
                <thead>
                    <tr className="table-row">
                        <th className="th-thumbnail"></th>
                        <th className="th-title">Title</th>
                        <th className="th-url">URL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-row">
                        <td className="td-thumbnail"></td>
                        <td className="td-title">React</td>
                        <td className="td-url">1.0</td>
                    </tr>
                    <tr className="table-row">
                        <td className="td-thumbnail"></td>
                        <td className="td-title">Angular</td>
                        <td className="td-url">178.0</td>
                    </tr>
                    <tr className="table-row">
                        <td className="td-thumbnail"></td>
                        <td className="td-title">React-Native</td>
                        <td className="td-url">109.0</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}