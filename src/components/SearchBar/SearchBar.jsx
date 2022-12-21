import React from "react";
import PropTypes from 'prop-types';
import css from "components/SearchBar/SearchBar.module.css";

export class SearchBar extends React.Component {

    state = {
        query: ''
    }

    onInputChange = e => {
        const query = e.currentTarget.value;
        this.setState({ query: query });
    };

    handleSubmit = e => {
        e.preventDefault()

        this.state.query.trim() === "" && alert("Please enter some text")
        this.props.onSubmit(this.state)
        this.setState({ query: "" })
    }

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.button}>
                        <span className={css.label}>Search</span>
                    </button>
                    <input
                    value={this.state.query}
                    name="query"
                    onChange={this.onInputChange}
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};