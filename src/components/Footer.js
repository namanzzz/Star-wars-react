import { Box, Button, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import './Footer.css'

const Footer = ({currentPage, setCurrentPage}) => {
    const handleNext = () => {
        if(currentPage === 82){
            currentPage -= 1;
        }
        else{
        setCurrentPage(currentPage + 1);
        console.log(currentPage);
    }
}
    const handlePrev = () => {
        if(currentPage === 1){
            currentPage += 1;
        }
        else{
        setCurrentPage(currentPage - 1);
        console.log(currentPage);
        }
    }
    


    return (
    <div>
        <Box className='flex-container' style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
        <Button className='flex-item' colorScheme='blue' onClick={handlePrev}> <FaLongArrowAltLeft />
        </Button>
        <Button className='flex-item' colorScheme='blue' onClick={handleNext}><FaLongArrowAltRight /></Button>       
        </Box>
    </div>
    

)
}

export default Footer