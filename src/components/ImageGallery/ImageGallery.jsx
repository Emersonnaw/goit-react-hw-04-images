import { ImageGalleryItem } from 'components/ImageGalleryItem';
import {Ul} from './ImageGallery.styled';
import PropTypes from 'prop-types';
export const ImageGallery = ({finishRenderList}) => {
    return (
            <Ul>
                {finishRenderList.map(({ id, webformatURL, tags, largeImageURL }) => (
                            <ImageGalleryItem
                                key={id}
                                webformatURL={webformatURL}
                                tags={tags}
                                largeImageURL={largeImageURL}
                    />
                ))} 
            </Ul >  
    );
};

ImageGallery.propTypes = {
    finishRenderList: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL:PropTypes.string.isRequired,
        id:PropTypes.number.isRequired,
    }))
};