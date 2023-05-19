import { ButtonLoadMore } from './Button.styled'
import PropTypes from 'prop-types';

export const Button = ({onClick}) => {
    return (
        <>
            <ButtonLoadMore ButtonLoadMore type='button' onClick={onClick}>
                Load more
            </ButtonLoadMore>
        </>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired
}