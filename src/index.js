import React from 'react'
import ReactDOM from 'react-dom'

import DataTable from './datatable'

export default class App extends React.Component {
    render(){
        return <DataTable />
    }
}

ReactDOM.render(<App/>, document.querySelector('#root'))