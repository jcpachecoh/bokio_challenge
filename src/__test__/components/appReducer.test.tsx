jest.unmock('redux-mock-store');
jest.unmock('redux');
import { createStore } from 'redux';
import { transactionsReducer, defaultTrasactions } from '../../reducers/transactionsReducers';
import { renderTransactionsData } from '../../actions/transactions/index';

const configureMockStore = require('redux-mock-store');

describe('Test User reducer', () => {
    const mockStore = configureMockStore();
    let defaultTrasactionsMock: any, store: any, storeActions: any, transactions: any, action: any;

    beforeEach(() => {
        transactions = [
            {
                'id': 1,
                'date': '2018-05-12T14:35:37.623Z',
                'text': 'ZARA company',
                'amount': 90
            },
            {
                'id': 2,
                'date': '2018-05-13T15:35:37.623Z',
                'text': 'ZARA company',
                'amount': 90
            },
        ];
        store = createStore(transactionsReducer);
        defaultTrasactionsMock = {
            transactions: [],
            transaction: {
                id: '',
                date: '2018-05-16T19:40:24.600Z',
                text: '',
                amount: ''
            },
            filterInput: ''
        };
        storeActions = mockStore(defaultTrasactionsMock);
    });
    describe('Test general actions reducer transactions', () => {
        it('Return initial state', () => {
            expect(defaultTrasactions).toEqual(defaultTrasactionsMock);
        });

        it('should call RenderTrasactionsData function', () => {
            storeActions.dispatch(renderTransactionsData(transactions));
            action = storeActions.getActions();
            expect(action[0].type).toBe('RenderTrasactionsData');
        });

        it('should change payload calling RenderTrasactionsData function', () => {
            storeActions.dispatch(renderTransactionsData(transactions));
            action = storeActions.getActions();
            expect(action[0].payload).toBe(transactions);
        });

        it('should change store transaction with RenderTrasactionsData', () => {
            store.dispatch(renderTransactionsData(transactions));
            store = store.getState();
            expect(store.transactions).toBe(transactions);
        });
    });
});