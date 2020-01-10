import React from 'react'
import ReactDOM from 'react-dom'

import DataTable from './datatable'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            rowData: [],
            filterColumn: {label: 'Title', value: 'title'}
        }
        this.allData = []
        this.filterRowsBasedOnTitle = this.filterRowsBasedOnTitle.bind(this)
        this.onFilterColumnSelect = this.onFilterColumnSelect.bind(this)
    }

    componentWillMount() {
        fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => {
            if (response.status !== 200) {
                console.log(`Oops! There was problem fetching data from API. Status Code: ${response.status}`)
                return null
            }
            return response.json()
        })
        .then((responseData) => {
            if (!responseData) return
            this.allData = responseData.slice(0,100)
            this.setState({ rowData: this.allData })
        })
    }

    getColumnObject() {
        return [{
            id: 'select-checkbox',
            label: '',
            numeric: false
        },{
            id: 'thumbnail',
            label: '',
            numeric: false,
        }, {
            id: 'title',
            label: 'Title',
            numeric: false
        }, {
            id: 'url',
            label: 'URL',
            numeric: false
        }, {
            id: 'albumId',
            label: 'Album ID',
            numeric: true
        }]
    }

    filterRowsBasedOnTitle(value) {
        this.filteredText = value
        if(this.filteredText) {
            this.setState({
                rowData: this.allData.filter(row => row[this.state.filterColumn.value].toString().includes(this.filteredText))
            })
        } else {
            this.setState({
                rowData: this.allData
            })
        }
    }

    onFilterColumnSelect(selectedColumn) {
        this.setState({ 
            filterColumn: {
                value: selectedColumn.value,
                label: selectedColumn.selectedOptions[0].label
            }
        }, () => {
            this.filterRowsBasedOnTitle(this.filteredText)
        })
    }

    onRowClick(rowData, rowIndex) {
        console.log(rowData, rowIndex)
    }

    render() {
        return (
            <DataTable
                columns={this.getColumnObject()}
                rows={this.state.rowData}
                filterRowsBasedOnTitle={this.filterRowsBasedOnTitle}
                onRowClick={this.onRowClick}
                filterColumn={this.state.filterColumn.label}
                onFilterColumnSelect={this.onFilterColumnSelect}
            />
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
