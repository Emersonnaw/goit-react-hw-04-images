import { useState } from 'react';
import { Li, Img } from './ImageGalleryItem.styled';
import { Modal } from '../Modal';
import PropTypes from 'prop-types';
export const ImageGalleryItem =({webformatURL, tags, largeImageURL}) => {
    
    const [showModal, setShowModal] = useState(false);

    const  toggleModal = (e) => {
        setShowModal(showModal => !showModal);
    };

    return (
        <>
            <Li onClick={toggleModal}>
                <Img src={webformatURL} alt={tags} />
            </Li>
            {showModal && <Modal imgUrl={largeImageURL} alt={tags} onClose={toggleModal} />}
                
        </>
    );
}

ImageGalleryItem.propTypes = {
webformatURL: PropTypes.string.isRequired,
tags: PropTypes.string.isRequired,
largeImageURL:PropTypes.string.isRequired,
};

