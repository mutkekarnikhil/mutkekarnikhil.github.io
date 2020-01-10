import React from 'react'


export default class DataTable extends React.Component {
    render() {
        return (
            <div className="data-table">
                <div className="filter-container">
                    <select className="select-filter" onChange={(e) => this.props.onFilterColumnSelect(e.target)}>
                        <option value="" disabled selected label="Filter"></option>
                        <option value="title" label="Title"></option>
                        <option value="url" label="URL"></option>
                        <option value="albumId" label="Album ID"></option>
                    </select>
                    <input className="input-filter" type="text" placeholder={`Search ${this.props.filterColumn}`} onKeyUp={(e) => this.props.filterRowsBasedOnTitle(e.target.value)} />
                </div>
                {this.props.rows.length ? (
                    <Table
                        columns={this.props.columns}
                        rows={this.props.rows}
                        onRowClick={this.props.onRowClick}
                    />
                ) : (
                    <div className="no-records"> No records found </div>
                )}
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
                        {this.props.columns.map(column => (
                            <th className={`th-${column.id}`} align={column.numeric ? 'right' : 'left'}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {this.props.rows.map((row, i) => (
                        <tr className="table-row">
                            <td><input className="td-select-checkbox" type="checkbox" onClick={() => this.props.onRowClick(row, i)} /></td>
                            <td className="td-thumbnail"><img src={row.thumbnailUrl} alt="img" width="30px" height="30px" /></td>
                            <td className="td-title">{row.title}</td>
                            <td className="td-url">{row.url}</td>
                            <td className="td-albumId">{row.albumId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}