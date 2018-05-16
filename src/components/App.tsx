import * as React from 'react';
import '../css/app.css';
import logo from '../bokio_logo_inverted.svg';
import { Transaction } from '../models/Transaction';
import { Table, Row, Grid, Nav, Navbar, NavItem, Glyphicon, Label } from 'react-bootstrap';
import { formatDate } from '../js/index';
import * as jsPDF from 'jspdf';

export interface AppProps {
  transactions: Transaction[];
  renderTransactionsData: Function;
  filterInput: string;
  filterData: Function;
}

interface AppState {
  copied: boolean;
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      copied: false
    };
  }

  public componentDidMount() {
    this.getData();
  }

  public getData() {
    fetch('http://bokiotestbankapi.azurewebsites.net/api/Bokio/Transactions', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      this.props.renderTransactionsData(data);
    });
  }
  copyData() {
    let range, sel,
      el = document.getElementById('table-transactions') as HTMLElement;

    if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
        range.selectNodeContents(el);
        sel.addRange(range);
      } catch (e) {
        range.selectNode(el);
        sel.addRange(range);
      }
      document.execCommand('copy');
      this.setState({ copied: true});
      setTimeout(() => {this.setState({ copied: false}); }, 2000);
    }
  }
  generateReport() {
    var doc = new jsPDF({
      orientation: 'landscape'
    });
    doc.text('Date' + ' | ' + 'Transactions' + ' | ' + 'Ammount', 20, 40);
    this.props.transactions.forEach((transaction, i) => {
      doc.text(formatDate(transaction.date) + ' | ' + transaction.text + ' |  -' + transaction.amount, 20, 50 + (i * 10),
      );
    });

    doc.save('reportClientBokio.pdf');
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Grid>
          <Row className="show-grid">
            <Navbar>
              <Nav>
                <NavItem eventKey={1} href="#" onClick={() => this.generateReport()}>
                  <Glyphicon glyph="align-left" /> Generate Report
                </NavItem>

                <NavItem eventKey={1} href="#" onClick={() => this.copyData()}>
                  <Glyphicon glyph="copy" /> Copy {this.state.copied &&
                    <Label>Copied</Label>
                  }
                </NavItem>
              </Nav>
            </Navbar>
            <Table striped={true} bordered={true} condensed={true} hover={true} id="table-transactions">
              <thead>
                <tr>
                  <th>Transaction Date</th>
                  <th>Text</th>
                  <th>Ammount</th>
                  <th>Total Debit</th>
                </tr>
              </thead>
              <tbody>
                {this.props.transactions &&
                  this.props.transactions.map((item, index) =>
                    <tr key={index}>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.text}</td>
                      <td>-{item.amount}</td>
                      <td>{item.totalAmount}</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </Row >
        </Grid >
      </div >
    );
  }
}

export default App;
