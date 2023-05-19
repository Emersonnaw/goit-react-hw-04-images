
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch} from "react-icons/im";
import { Header, FormCastom, Button, Span, FieldCastom } from './Searchbar.styled';
import PropTypes from 'prop-types';

let initialValue = {
    search:''
};

export const Searchbar = ({onFormData}) => {
    const handleSubmit = ({search}, { resetForm }) => {
        if (search.trim() === '') {
            toast.error(`Request cannot contain an empty string`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored",
            });  
            return;
       }
        onFormData(search);
        resetForm();
    }
    
    return (
       <Header > 
            <Formik initialValues={initialValue} onSubmit={handleSubmit}>
                <FormCastom autoComplete="off">
                    <Button type="submit" >
                        <ImSearch/>
                        <Span>Search</Span>
                    </Button>

                    <FieldCastom
                        autoFocus
                        type="text"
                        name="search"
                        placeholder="Search images and photos"
                    />
                </FormCastom>
            </Formik>
        </Header>
        
    );
};

Searchbar.propTypes = {
    onFormData: PropTypes.func.isRequired,

};