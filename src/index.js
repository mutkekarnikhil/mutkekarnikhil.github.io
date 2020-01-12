import React from 'react'
import ReactDOM from 'react-dom'

import DataTable from './datatable'
import Spinner from './spinner'


export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            rowData: [],
            filterColumn: { label: 'Title', value: 'title' },
            loadingOpen: false,
        }
        this.allData = []
    }

    componentWillMount() {
        this.setState({ loadingOpen: true})
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
            this.allData = responseData
            this.setState({
                rowData: this.allData,
                loadingOpen: false
            })
        })
    }
    
    getColumnObject = () => {
        return [{
            id: 'select-checkbox',
            label: '',
            numeric: false
        }, {
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

    onSelectionChange = (value) => {
        this.filteredText = value
        if (this.filteredText) {
            this.setState({
                rowData: this.allData.filter(row => row[this.state.filterColumn.value].toString().includes(this.filteredText))
            })
        } else {
            this.setState({
                rowData: this.allData
            })
        }
    }

    onFilterColumnSelect = (selectedColumn) => {
        this.setState({
            filterColumn: {
                value: selectedColumn.value,
                label: selectedColumn.selectedOptions[0].label
            }
        }, () => {
            this.onSelectionChange(this.filteredText)
        })
    }
    
    onRowClick = (rowData, rowIndex) => {
        console.log(`Selected Row Data:`, rowData, `Row Index: ${rowIndex}`)
    }

    render() {
        return (
            !this.state.loadingOpen ? (
                <DataTable
                    columns={this.getColumnObject()}
                    rows={this.state.rowData}
                    onSelectionChange={this.onSelectionChange}
                    onRowClick={this.onRowClick}
                    filterColumn={this.state.filterColumn.label}
                    onFilterColumnSelect={this.onFilterColumnSelect}
                    />
            ) : (
                <Spinner />
            )
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'))
