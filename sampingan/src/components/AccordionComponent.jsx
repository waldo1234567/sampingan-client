import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useLayout } from '../LayoutContext/LayoutContext';

const AccordionComponent = ({ onCategoriesChange }) => {
    const { categories, setCategories, isChecked, setIsChecked } = useLayout();
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategoriesChange = (categoryId) => {
        setSelectedCategories(prevSelectedCategories => (
            prevSelectedCategories.includes(categoryId) ?
                prevSelectedCategories.filter(id => id !== categoryId) :
                [...prevSelectedCategories, categoryId]
        ));
    }

    useEffect(() => {
        onCategoriesChange(selectedCategories);
    }, [selectedCategories, onCategoriesChange]);

    return (
        <>
            <div>
                <Accordion
                    sx={{
                        border: '1px solid grey',
                        borderRadius: 2,
                        marginBottom: 2,
                        '&:hover': {
                            boxShadow: '10px 13px 25px 0px rgba(128,125,128,0.59)'
                        }
                    }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Categories
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            categories.map((item) => (
                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            checked={selectedCategories.includes(item.id)}
                                            onChange={() => handleCategoriesChange(item.id)}
                                        />
                                    }
                                    label={<span style={{fontFamily :"Poppins, sans-serif"}}>{item.categories_name}</span>}
                                />
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    )
};

export default AccordionComponent;