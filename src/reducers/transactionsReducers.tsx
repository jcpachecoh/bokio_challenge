import { TransactionsActions } from '../actions/transactions';
import { RENDER_TRANSACTIONS_DATA, FILTER_DATA } from '../actions/transactions/index';
import { Transaction } from '../models/Transaction';

const newObject = (state: any, newData: any) => Object.assign({}, state, newData);

export const defaultTrasactions = {
    transactions: [],
    transaction: {
        id: '',
        date: new Date(),
        text: '',
        amount: ''
    },
    filterInput: ''
};

export const transactionsReducer = (state = defaultTrasactions, action: TransactionsActions) => {
    switch (action.type) {
        case RENDER_TRANSACTIONS_DATA:
            return newObject(
                state,
                {
                    transactions: action.payload,
                }
            );

        case FILTER_DATA:
            let transactionData = state.transactions.slice(),
                result = transactionData.filter((transaction: Transaction) => transaction.date === action.payload);

            return newObject(
                state,
                {
                    filterInput: action.payload,
                    transactions: result
                }
            );
        default:
            return state;
    }
};