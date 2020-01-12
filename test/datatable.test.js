import React from "react";
import Enzyme, { shallow } from 'enzyme'

import DataTable from '../src/datatable'
import Table from '../src/table'

const fakeList = [
    {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
        "albumId": 1,
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "url": "https://via.placeholder.com/600/771796",
        "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
        "albumId": 1,
        "id": 3,
        "title": "officia porro iure quia iusto qui ipsa ut modi",
        "url": "https://via.placeholder.com/600/24f355",
        "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
];

const columns = [{
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

const expectedFilterOptions = [
    'Filter',
    'Title',
    'URL',
    'Album ID'
]

describe('<DataTable />', () => {
    it('Should be defined', () => {
        expect(DataTable).toBeDefined()
    })

    it('Should Render Datatable and props are passed on to Table component', () => {
        const tree = shallow(
            <DataTable
                columns={columns}
                rows={fakeList}
                filterColumn="Title"
                onRowClick={() => { }}
            />
        );
        expect(tree.exists('.data-table-container')).toBe(true)

        const table = tree.children().find('Table')
        expect(table).toBeDefined()

        // Verify data is being relayed to Table component
        expect(table.props().columns).toBe(columns)
        expect(table.props().rows).toBe(fakeList)

        // Verify Filter options
        const filterOptions = tree.children().find('.filter-container select option')
        filterOptions.forEach((filter, i) => {
            expect(filter.props().label).toBe(expectedFilterOptions[i])
        })
    });

    it('Should render Table and Verify table content', () => {
        const tree = shallow(
            <Table
                columns={columns}
                rows={fakeList}
                onRowClick={() => { }}
            />
        )
        expect(tree.exists('#data-table')).toBe(true)

        // Verify Rows and Column information from rendered DOM
        const rows = tree.find('#data-table .table-row')
        expect(rows.length).toBe(fakeList.length)
        const columnRow = tree.find('#data-table .table-header-row th')
        columnRow.forEach((column, i) => {
            expect(column.text()).toBe(columns[i].label)
        })

        rows.forEach((row, i) => {
            const title = row.find('.td-title').text()
            expect(title).toBe(fakeList[i].title)
            const url = row.find('.td-url').text()
            expect(url).toBe(fakeList[i].url)
            const albumId = row.find('.td-albumId').text()
            expect(Number(albumId)).toBe(fakeList[i].albumId)
        })

        // Verify Footer information
        const footerText = tree.find('#data-table tfoot tr td')
        expect(footerText.text()).toBe(`Showing 1 - 3 of 3`)
    })
})
