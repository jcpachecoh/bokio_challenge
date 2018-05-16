import { connect, Dispatch } from 'react-redux';
import { AppProps } from '../components/App';
import { TransactionsActions, renderTransactionsData, filterData } from '../actions/transactions/index';
import App from '../components/App';
import { Transaction } from '../models/Transaction';

type ConnectedStateProps = Pick<AppProps, 'transactions' >;

export function mapStateToProps({ transactionsReducer: { transactions, filterInput } }: any): ConnectedStateProps {
    return {
        transactions,
    };
}

type ConnectedDispatchProps = Pick<AppProps,
    'renderTransactionsData' | 'filterData'>;

export function mapDispatchToProps(dispatch: Dispatch<TransactionsActions>): ConnectedDispatchProps {
    return {
        renderTransactionsData: (transactions: Transaction[]) => dispatch(renderTransactionsData(transactions)),
        filterData: (input: Date) => dispatch(filterData(input)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);