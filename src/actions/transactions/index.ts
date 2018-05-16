import { Action } from '../actions';
import { Transaction } from '../../models/Transaction';

export const RENDER_TRANSACTIONS_DATA = 'RenderTrasactionsData';
export type RENDER_TRANSACTIONS_DATA = typeof RENDER_TRANSACTIONS_DATA;
export const FILTER_DATA = 'FilterData';
export type FILTER_DATA = typeof FILTER_DATA;

export class RenderTransactionsData implements Action {
    type: RENDER_TRANSACTIONS_DATA;
    payload: Transaction[];
}

export function renderTransactionsData(transactions: Transaction[]): RenderTransactionsData {
    return {
        type: RENDER_TRANSACTIONS_DATA,
        payload: transactions
    };
}

export class FilterData implements Action {
    type: FILTER_DATA;
    payload: Date;
}

export function filterData(input: Date): FilterData {
    return {
        type: FILTER_DATA,
        payload: input
    };
}

export type TransactionsActions =
    RenderTransactionsData
    | FilterData;