import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './CardPage.css';

const CardPage = ({ peopleData }) => {
    //the states with the vehicles and starships data for the card
    const [vehicles,setVehicles]=useState([]);
    const [starships,setStarships]=useState([]);
    const [films, setFilms] = useState([]);
    //finding the card that user wants to look at
    const cardId = useLocation().pathname.slice(1);
    const specificCard = peopleData.find((person)=>person.name===decodeURI(cardId));
    
    //function to load vehicle names from the array containing vehicle api calls
    const getVehicles = useCallback(async () =>{
        let promises=[];
        let vehicles=[];
        if(specificCard){
            for(let vehicle of specificCard.vehicles){
                promises.push(
                    await axios.get(vehicle)
                        .then((response)=>{
                            vehicles.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(()=>setVehicles(vehicles))
        } 
    },[specificCard])

    //function to load starships names from the array containing starships api calls
    const getStarships = useCallback(async () =>{
        let promises=[];
        let starships=[];
        if(specificCard){
            for(let starship of specificCard.starships){
                promises.push(
                    await axios.get(starship)
                        .then((response)=>{
                            starships.push(response.data.name);
                        })
                )
            }
            Promise.all(promises).then(()=>setStarships(starships))
        }        
    },[specificCard])

    // function to load movies for individual character
    const getMovies = useCallback(async () => {
     let promises = [];
     let films = [];
     if(specificCard){
        for(let film of specificCard.films){
            promises.push(
                await axios.get(film).then((response)=>{
                    films.push(response.data);
                })
            )
        }
        Promise.all(promises).then(()=>setFilms(films));
     }
    }, [specificCard])



    //loads vehicle and starship data as the user clicks on a card
    useEffect(()=>{
        getVehicles();
        getStarships();
        getMovies();
    },[peopleData,getVehicles,getStarships, getMovies])

    return (
        <div>
            {specificCard ? 
                <>
                
                <p className='homepage-text' style={{marginBottom:'32px'}}><Link to="/" style={{ textDecoration:'none' }}>All Characters</Link> {'>'} <span className='header-text-span'>{specificCard.name} Details</span></p>
                    <SimpleGrid columns={2} spacing={10}>
                    
                                <Box className='card-box card-class'>
                                    <Card maxWidth='md'>
                                        <CardHeader>
                                        <Heading size='xl'>{specificCard.name}
                                        </Heading>
                                        </CardHeader>

                                        {/* <Image objectFit='contain' src='https://images4.alphacoders.com/814/81446.jpg'/> */}

                                        <CardBody>
                                            <Text> <span style={{fontWeight:'bold'}}>Specie:</span>  {specificCard.species}</Text>
                                            <Text><span style={{fontWeight:'bold'}}>Height: </span>  {specificCard.height}</Text>
                                            <Text><span style={{fontWeight:'bold'}}>Mass: </span> {specificCard.mass}</Text>
                                            <Text><span style={{fontWeight:'bold'}}>Skin color: </span>  {specificCard.skin_color}</Text>
                                            <Text><span style={{fontWeight:'bold'}}>Birth Year: </span>  {specificCard.birth_year} </Text>
                                 
                                        <Text style={{fontWeight:'bold'}} size='md'>Vehicles: </Text> 
                                         {
                                            specificCard.vehicles.length > 0 ? vehicles.map((vehicle)=>(
                                                <Text key={vehicle}> &nbsp; {vehicle}</Text>
                                            )) : <Text>No vehicles</Text>
                                           }
                                        <Text style={{fontWeight:'bold'}} size='md'>Starships: </Text>
                                        {
                                            specificCard.starships.length > 0 ? starships.map((starship)=>(
                                                <Text key={starship}>&nbsp; {starship}</Text>
                                            )) : <Text>No starships</Text> 
                                        }
                                        </CardBody>
                                        <CardFooter>
                                        </CardFooter>
                                    </Card>
                                </Box>

                                <Box className='card-box card-class'>
                                    <Card maxWidth='md'>
                                        <CardHeader>
                                        <Heading size='lg'>Movie Appearances
                                        </Heading>
                                        </CardHeader>

                                        <CardBody>
                                       
                                        <Text style={{ fontStyle:'italic'}} size='md'> Starwars character <span style={{fontWeight:'bold'}}>{specificCard.name}</span> has appeared in total {films.length} films</Text><br/> 
                                         {
                                            specificCard.films.length > 0 ? films.map((film)=>(
                                                <Text key={film}> &nbsp; <b>{film.title}:</b>  {film.release_date}</Text>
                                                
                                            )) : <Text>No Movies</Text>
                                           }
                                        
                                        </CardBody>
                                        <CardFooter>
                                        </CardFooter>
                                    </Card>
                                </Box>
                            </SimpleGrid>
                        
                </>
                
                :
                /*loading screen logic or if user clicks on card not in the data*/
                <p className='load-text'>Loading Character Data.....<br/><br/></p>
            }
            
        </div>
    )
}

export default CardPage