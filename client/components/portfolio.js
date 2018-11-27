import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllStock, buyNewStock } from "../store";
import axios from "axios";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      stock: "",
      cash: props.state.user.cash
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getStock(this.props.state.user.id);
  }
  handleChange(evt) {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
      }
    );
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const { amount, stock } = this.state;
    const result = this.props.handleSubmit(
      evt,
      amount,
      stock,
      this.props.state.user.id
    );
    if (result.data) {
      this.setState({
        cash: result.data.cash
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>You have ${this.state.cash}</h1>
        <form onSubmit={this.handleSubmit} name="stock">
          <label htmlFor="Amount">
            <small>Amount</small>
          </label>
          <input name="amount" type="number" onChange={this.handleChange} />
          <label htmlFor="Stock">
            <small>Stock</small>
          </label>
          <input name="stock" type="text" onChange={this.handleChange} />
          <button type="submit">Buy</button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {
    state: state,
    id: state.id,
    cash: state.user.cash
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, amount, stock, id) {
      evt.preventDefault();
      dispatch(buyNewStock(amount, stock, id));
    },
    getStock: id => dispatch(getAllStock(id))
  };
};
export default connect(mapState, mapDispatch)(Portfolio);
