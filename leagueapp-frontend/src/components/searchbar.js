import React from 'react';

const SearchBar = (props) => {
  const BarStyling = {width:"12rem",background:"#F2F1F9", border:"none", padding:"1.0rem"};
  return (
    <input 
     style={BarStyling}
     key="random1"
     value={props.keyword}
     placeholder={"Search Champions"}
     onChange={(e) => props.setKeyword(e.target.value)}
    />
  );
}

export default SearchBar