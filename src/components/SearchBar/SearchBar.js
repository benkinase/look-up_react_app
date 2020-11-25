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
              placeholder="Enter term"
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

//   const [term, setTerm] = useState("");
//   const [location, setLocation] = useState("");
//   const [sortBy, setSortBy] = useState("best_match");
//   console.log(sortBy);

//   const sortByOptions = {
//     "Best Match": "best_match",
//     "Highest Rated": "rating",
//     "Most Reviewed": "review_count",
//     "Closest To Me": "distance",
//   };

//   function getSortByClass(sortByOption) {
//     if (sortBy === sortByOption) {
//       return "active";
//     } else {
//       return "";
//     }
//   }
//   function handleSortByChange(sortByOption) {
//     setSortBy(sortByOption, () => {
//       console.log(sortByOption);
//       props.searchYelp(term, location, sortBy);
//     });
//   }

//   // const handleTermChange = (e) => {
//   //   setState({ ...state, term: e.target.value });
//   // };

//   // const handleLocationChange = (e) => {
//   //   setState({ ...state, location: e.target.value });
//   // };

//   function handleSearch(e) {
//     e.preventDefault();
//     if (term && location) props.searchYelp(term, location, sortBy);
//     setTerm("");
//     setLocation("");
//   }

//   function renderSortByOptions() {
//     return Object.keys(sortByOptions).map((sortByOption) => {
//       let sortByOptionValue = sortByOptions[sortByOption];
//       return (
//         <li
//           key={sortByOptionValue}
//           className={getSortByClass(sortByOptionValue)}
//           onClick={handleSortByChange.bind(this, sortByOptionValue)}
//         >
//           {sortByOption}
//         </li>
//       );
//     });
//   }

//   const handleKeyPress = (e) => {
//     e.preventDefault();
//     if (e.key === "Enter" && term && location) {
//       props.searchYelp(term, location, sortBy);
//       setTerm("");
//       setLocation("");
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
//             value={term}
//             onChange={(e) => setTerm(e.target.value)}
//             onKeyUp={handleKeyPress}
//           />
//         </div>
//         <div className="input-control">
//           <input
//             placeholder="Where?"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
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
