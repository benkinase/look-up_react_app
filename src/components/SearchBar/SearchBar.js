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
      "Closest To Me": "distance",
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
    if (e.key === "Enter" && this.state.term && this.state.location) {
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
              placeholder="Search Businesses"
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

// import React, { useState } from "react";
// import "./SearchBar.css";

// const SearchBar = (props) => {
//   const initialState = {
//     term: "",
//     location: "",
//     sortBy: "best_match",
//   };

//   const [state, setstate] = useState(initialState);
//   console.log(state.sortBy);

//   const sortByOptions = {
//     "Best Match": "best_match",
//     "Highest Rated": "rating",
//     "Most Reviewed": "review_count",
//     "Closest To Me": "distance",
//   };

//   const getSortByClass = (sortByOption) => {
//     if (state.sortBy === sortByOption) {
//       return "active";
//     } else {
//       return "";
//     }
//   };
//   const handleSortByChange = (sortByOption) => {
//     setstate({ sortBy: sortByOption }, () => {
//       props.searchYelp(state.term, state.location, state.sortBy);
//     });
//   };

//   const handleTermChange = (e) => {
//     setstate({ ...state, term: e.target.value });
//   };

//   const handleLocationChange = (e) => {
//     setstate({ ...state, location: e.target.value });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (state.term && state.location)
//       props.searchYelp(state.term, state.location, state.sortBy);
//     setstate({ term: "", location: "" });
//   };

//   const renderSortByOptions = () => {
//     return Object.keys(sortByOptions).map((sortByOption) => {
//       //console.log(sortByOption);
//       let sortByOptionValue = sortByOptions[sortByOption];
//       return (
//         <li
//           key={sortByOptionValue}
//           className={getSortByClass(sortByOptionValue)}
//           onClick={() => handleSortByChange(sortByOptionValue)}
//         >
//           {sortByOption}
//         </li>
//       );
//     });
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && state.term && state.location) {
//       props.searchYelp(state.term, state.location, state.sortBy);
//       e.preventDefault();
//     }
//   };

//   return (
//     <div className="SearchBar">
//       <div className="SearchBar-sort-options">
//         <ul>{renderSortByOptions()}</ul>
//       </div>
//       <div className="SearchBar-fields">
//         <div className="input-control">
//           <input
//             placeholder="Search Businesses"
//             onChange={handleTermChange}
//             onKeyUp={handleKeyPress}
//           />
//         </div>
//         <div className="input-control">
//           <input
//             placeholder="Where?"
//             onChange={handleLocationChange}
//             onKeyUp={handleKeyPress}
//           />
//         </div>
//       </div>
//       <div className="SearchBar-submit">
//         <button onClick={handleSearch}>
//           {props.isLoading ? "Loading..." : "Search Now"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
