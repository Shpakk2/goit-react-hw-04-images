import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import css from "components/SearchBar/SearchBar.module.css";

export const SearchBar = ({onSubmit}) => {
    const [query, setQuery] = useState("")

    const onInputChange = e => {
        setQuery(e.currentTarget.value);
    };

    const handleSubmit = e => {
        e.preventDefault()
        query.trim() === "" && alert("Please enter some text")
        onSubmit(query)
        setQuery("")
    }    

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={css.button}>
                    <span className={css.label}>Search</span>
                </button>
                <input
                value={query}
                name="query"
                onChange={onInputChange}
                className={css.input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                />
            </form>
        </header>
        )
}

// export class SearchBar extends React.Component {

//     state = {
//         query: ''
//     }

//     onInputChange = e => {
//         const query = e.currentTarget.value;
//         this.setState({ query: query });
//     };

//     handleSubmit = e => {
//         e.preventDefault()

//         this.state.query.trim() === "" && alert("Please enter some text")
//         this.props.onSubmit(this.state)
//         this.setState({ query: "" })
//     }

//     render() {
//         return (
//             <header className={css.Searchbar}>
//                 <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//                     <button type="submit" className={css.button}>
//                         <span className={css.label}>Search</span>
//                     </button>
//                     <input
//                     value={this.state.query}
//                     name="query"
//                     onChange={this.onInputChange}
//                     className={css.input}
//                     type="text"
//                     autoComplete="off"
//                     autoFocus
//                     placeholder="Search images and photos"
//                     />
//                 </form>
//             </header>
//             )
//     }
// }

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};