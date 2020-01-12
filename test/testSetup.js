import Enzyme, { ShallowWrapper, ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jsdom from 'jsdom'

const { JSDOM } = jsdom
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window
global.document = document
global.window = document.defaultView


Object.defineProperty(document, 'currentScript', {
    value: document.createElement('script'),
})

Enzyme.configure({ adapter: new Adapter() })

function assertLength(length) {
    return function $assertLength(selector) {
        let result = this.find(selector)
        expect(
            result
        ).toHaveLength(length)
        return result
    }
}

ReactWrapper.prototype.assertSingle = assertLength(1)
ShallowWrapper.prototype.assertSingle = assertLength(1)
