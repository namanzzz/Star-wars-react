import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Icon, IconButton, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { FaExternalLinkSquareAlt } from "react-icons/fa";

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

const HomePage = ({ peopleData }) => {
    const [search,setSearch]=useState('');

    //used to copy peopleData to be used for searching purposes...
    const[peopleData2,setPeopleData2]=useState([]);

    //perform search logic by setting result data to peopleData2 (similarly to App.js loadPeople())
    const handleSearch= async (e)=>{
        e.preventDefault();
        await axios.get(`https://swapi.dev/api/people/?search=${search}`)
          .then((response)=>{
            var peopleCopy = response.data.results;
            let promises = [];
            for(let person of peopleCopy){
              promises.push(
                //homeworld call
                axios.get(person.homeworld)
                  .then((response)=>{
                    person.homeworld = response.data.name;
                  }),
                //species call 
                person.species.length > 0 ?
                  axios.get(person.species[0])
                    .then((response)=>{
                      person.species = response.data.name;
                    })
                : person.species = 'Human'
              )
            }
            Promise.all(promises).then(() => {setPeopleData2(peopleCopy)});
          })
          .catch((error)=>{
            alert('error loading data')
          })
    }
    
    //transfers peopleData content to peopleData2 for searching purposes in the homepage...
    useEffect(()=>{
        setPeopleData2(peopleData)
    },[peopleData]);
    
    return (
        <div style={{marginBottom:'80px'}}>
            <p className='homepage-text'>All Characters {'>'} <span className='header-text-span'>Select a character</span></p>

            <div className='main-search-box'>
                <form onSubmit={handleSearch}>
                    <div className='search-box'>
                        <input type='text' className='search-input' placeholder='Search....' onChange={(e)=>setSearch(e.target.value)}/>
                        {/* <img className='search-image' alt='icon' src={require('../resources/Interview Assets/Search.svg').default} onClick={handleSearch} height={16} width={16}/> */}
                        <FaSearch style={{cursor: 'pointer'}} onClick={handleSearch} height={16} width={16}/>
                    </div>
                </form>
                
            </div>

            <div className='main-card-box'>
                {/*GENERATING CARDS*/}
                {peopleData2.length>0 ?
                    peopleData2.map((person)=>(

                        <li key={person.name} style={{listStyleType:'none'}}>
                             <br/>
                            <SimpleGrid columns={3} spacing={10}>
                                <Box className='card-box'>
                                    <Card maxWidth='md'>
                                        <CardHeader>
                                        <Heading size='md'> <Link to={`/${person.name}`}>{person.name} <IconButton icon={ <FaExternalLinkSquareAlt />}/> </Link>
                                        </Heading>
                                        </CardHeader>

                                        <Image objectFit='contain' src='https://images4.alphacoders.com/814/81446.jpg'/>

                                        <CardBody>
                                            <Text>Specie: {person.species}</Text>
                                            <Text>Homeworld: {person.homeworld}</Text>
                                            <Text>Vehicles: {person.vehicles.length}</Text>
                                            <Text>Starships: {person.starships.length}</Text>
                                            <Text>Gender: {person.gender} </Text>
                                        </CardBody>
                                        <CardFooter>
                                        <Button>Add to fav</Button>
                                        </CardFooter>
                                    </Card>
                                </Box>
                            </SimpleGrid>
                           
                        </li>


                    ))
                    :
                    /*to inform user that data is loading/info is not available (if it takes too long to load)*/
                    <p className='load-text'>Loading characters...</p>
                }
            </div>
        </div>
    )
}

export default HomePage