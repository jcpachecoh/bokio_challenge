import { mount } from 'enzyme';
import * as React from 'react';
import App from '../../components/App';

describe('>>>App Transactions List ', () => {
    let wrapper: any, transactions, mockFn;
    beforeEach(() => {
        transactions = [{
            'id': 1,
            'date': new Date(),
            'text': 'ZARA company',
            'amount': 90,
            'totalAmount': 9000
        },
        {
            'id': 2,
            'date': new Date(),
            'text': 'ZARA company',
            'amount': 90,
            'totalAmount': 9000
        },
        ];
        mockFn = jest.fn();
        wrapper = mount(
            <App
                transactions={transactions}
                renderTransactionsData={mockFn}
                filterData={mockFn}
            />
        );
    });

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('+++ contains blade content table', () => {
        expect(wrapper.find('table')).toHaveLength(1);
    });

    it('+++ contains blade content nav', () => {
        expect(wrapper.find('li')).toHaveLength(2);
    });

    it('Function getData have been called ones', () => {
        wrapper.instance().getData = jest.fn();
        wrapper.instance().getData();
        expect(wrapper.instance().getData).toHaveBeenCalledTimes(1);
    });

    it('Function getData have been called ones', () => {
        wrapper.instance().copyData = jest.fn();
        wrapper.instance().copyData();
        expect(wrapper.instance().copyData).toHaveBeenCalledTimes(1);
    });
});