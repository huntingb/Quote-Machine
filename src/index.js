import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './images/tweet.png';
import $ from 'jquery';

class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quote: "",
      author: ""
    };
    this.getNewQuote = this.getNewQuote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const that = this;
    const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    $.getJSON(url, function(data) {
      const quotes = data.quotes;
      const i = Math.floor(Math.random() * quotes.length);
      that.setState({
        "quotes": quotes,
        "quote": quotes[i].quote,
        "author": quotes[i].author
      });
    });
  }

  handleClick() {
    document.getElementById("quote-box").classList.add("transparent");
    setTimeout(this.getNewQuote, 1010);
  }

  getNewQuote() {
    const quotes = this.state.quotes;
    const i = Math.floor(Math.random() * quotes.length);
    this.setState({
      "quote": quotes[i].quote,
      "author": quotes[i].author
    });
    document.getElementById("quote-box").classList.remove("transparent");
  }

  render() {
    return (
      <div id="quote-box">
        {/* Should put a upside down quotation mark image here */}
        <h1 id="text">{this.state.quote}</h1>
        <h2 id="author">- {this.state.author}</h2>
        <div id="buttons">
          <button id="new-quote" onClick={this.handleClick}>new quote</button>
          <a href={`https://www.twitter.com/intent/tweet?text="${this.state.quote}" -${this.state.author}`} id="tweet-quote"><img id="logo" src={logo} alt="tweet"/></a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
    <QuoteMachine />,
  document.getElementById('root')
);

