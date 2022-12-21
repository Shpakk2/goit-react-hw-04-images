import PropTypes from 'prop-types';

import css from "components/Button/Button.module.css"

export const Button = ({ onClick}) => {
    return (
        <button className={css.Button} onClick={onClick} >Load More</button>
    )
}

Button.protoTypes = {
    onclick: PropTypes.func.isRequired
}