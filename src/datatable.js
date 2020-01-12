import React from 'react'

import Table from './table.js'

export default class DataTable extends React.Component {
    render() {
        return (
            <div className="data-table-container">
                <div className="filter-container">
                    <select 
                        className="select-filter" 
                        onChange={(e) => this.props.onFilterColumnSelect(e.target)}
                        defaultValue="filter"
                    >
                        <option key="filter" value="filter" disabled label="Filter"></option>
                        <option key="title" value="title" label="Title"></option>
                        <option key="url" value="url" label="URL"></option>
                        <option key="albumId" value="albumId" label="Album ID"></option>
                    </select>
                    <input className="input-filter" type="text" placeholder={`Search ${this.props.filterColumn}`} onKeyUp={(e) => this.props.onSelectionChange(e.target.value)} />
                </div>
                <Table
                    columns={this.props.columns}
                    rows={this.props.rows}
                    onRowClick={this.props.onRowClick}
                />
            </div>
        )
    }
}
