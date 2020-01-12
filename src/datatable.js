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
                <Table
                    columns={this.props.columns}
                    rows={this.props.rows}
                    onRowClick={this.props.onRowClick}
                />
            </div>
        )
    }
}

class Table extends React.Component {
    constructor() {
        super()
        this.state = {
            begin: 0,
            end: 100,
            increment: 50,
            updateScroll: false
        }
    }
    componentDidUpdate() {
        if (this.state.updateScroll) {
            this.adjustScroll()
            this.state.updateScroll = false
        }
        if(this.props.rows.length === 0) {
            this.state.begin = 0
            this.state.end = 100
        }
    }

    adjustScroll() {
        let tableBody = document.querySelector('#data-table tbody')
        let indexToView = Math.floor((this.state.end - this.state.begin) / 2)
        if (tableBody) {
            const elementToView = tableBody.rows[indexToView]
            if (elementToView) {
                elementToView.scrollIntoView(false)
            }
        }
    }

    scrollHandler() {
        let tableBody = document.querySelector('#data-table tbody')
        let scrollDirection = ''
        // Return immediately if there isn't enough content for a scrollbar
        if (!tableBody || tableBody.scrollHeight <= tableBody.clientHeight || this.props.rows.length <= this.state.increment) {
            return
        }

        // Detect if table is scrolled all the way to bottom or top. If not, return
        if (tableBody.scrollHeight - tableBody.scrollTop
            <= tableBody.clientHeight + 2) {
            scrollDirection = 'down'
        } else if (tableBody.scrollTop <= 2) {
            scrollDirection = 'up'
        } else {
            return
        }
        if (scrollDirection === 'down') {
            if (this.state.end === this.props.rows.length) {
                return
            }
            if ((this.state.end + this.state.increment) < (this.props.rows.length)) {
                this.state.end = this.state.end + this.state.increment
                this.state.begin = this.state.begin + this.state.increment
            } else {
                this.state.begin = this.state.begin + (this.props.rows.length - this.state.end)
                this.state.end = this.props.rows.length
            }
        } else if (scrollDirection === 'up') {
            if (this.state.begin === 0) {
                return
            }
            if ((this.state.begin - this.state.increment) >= 0) {
                this.state.begin = this.state.begin - this.state.increment;
                this.state.end = this.state.end - this.state.increment;
            } else {
                this.state.end = this.state.end - this.state.begin
                this.state.begin = 0
            }
        }
        this.state.updateScroll = true
        this.setState(this.state)
    }

    render() {
        let end = this.state.end
        if(end > this.props.rows.length) {
            end = this.props.rows.length
        }
        const content = this.props.rows.slice(this.state.begin, end)
        return (
            <table className="table-content" id="data-table">
                <thead>
                    <tr className="table-row">
                        {this.props.columns.map(column => (
                            <th className={`th-${column.id}`} align={column.numeric ? 'right' : 'left'}>{column.label}</th>
                        ))}
                    </tr>
                </thead>
                {content.length ? (
                    <React.Fragment>
                        <tbody onScroll={() => this.scrollHandler()}>
                            {content.map((row, i) => (
                                <tr className="table-row">
                                    <td><input className="td-select-checkbox" type="checkbox" onClick={() => this.props.onRowClick(row, i)} /></td>
                                    <td className="td-thumbnail"><img src={row.thumbnailUrl} alt="img" width="30px" height="30px" /></td>
                                    <td className="td-title">{row.title}</td>
                                    <td className="td-url">{row.url}</td>
                                    <td className="td-albumId">{row.albumId}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            {`Showing ${this.state.begin + 1} - ${end} of ${this.props.rows.length}`}
                        </tfoot>
                    </React.Fragment>
                ) : (
                    <div className="no-records">No records found</div>
                )}
            </table>
        )
    }
}
