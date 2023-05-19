import React, { Component } from 'react';
import { Li, Img } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';
import PropTypes from 'prop-types';
export class ImageGalleryItem extends Component{
    state = {
        showModal: false
    }

    toggleModal = (e) => {
       
    this.setState(({ showModal }) => ({
    showModal: !showModal,
    })); 
    };

    render() {
        const { webformatURL, tags, largeImageURL } = this.props;
        const { showModal } = this.state;
        return(
            <>
                <Li onClick={this.toggleModal}>
                    <Img src={webformatURL} alt={tags} />
                </Li>
                {showModal && <Modal imgUrl={largeImageURL} alt ={tags} onClose={this.toggleModal} />}
                
            </>
        );
    }
}

ImageGalleryItem.propTypes = {
    showModal: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL:PropTypes.string.isRequired,
        
    }))
};