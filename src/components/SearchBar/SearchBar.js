import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match",
    };
    this.initialState = { ...this.state };
    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count",
    };
  }

  getSortByClass = (sortByOption) => {
    if (this.state.sortBy === sortByOption) {
      return "active";
    } else {
      return "";
    }
  };
  handleSortByChange = (sortByOption) => {
    this.setState({ sortBy: sortByOption }, () => {
      if (!this.state.term || !this.state.location) return false;
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
    });
  };

  handleTermChange = (e) => {
    this.setState({ term: e.target.value });
  };

  handleLocationChange = (e) => {
    this.setState({ location: e.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (this.state.term && this.state.location)
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
  };

  renderSortByOptions = () => {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={this.getSortByClass(sortByOptionValue)}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  handleKeyPress = (e) => {
    e.preventDefault();
    if (
      e.key === "Enter" &&
      this.state.term &&
      this.state.location &&
      this.state.sortBy
    ) {
      this.props.searchYelp(
        this.state.term,
        this.state.location,
        this.state.sortBy
      );
    }
  };

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <div className="input-control">
            <input
              placeholder="Search term"
              onChange={this.handleTermChange}
              onKeyUp={this.handleKeyPress}
            />
          </div>
          <div className="input-control">
            <input
              placeholder="Where?"
              onChange={this.handleLocationChange}
              onKeyUp={this.handleKeyPress}
            />
          </div>
        </div>
        <div className="SearchBar-submit">
          <button onClick={this.handleSearch}>
            {this.props.isLoading ? "Loading..." : "Search Now"}
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
