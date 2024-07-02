import './App.css';
import Header from "./components/Header";
import './components/Header.css';
import HomePage from './components/HomePage';
import './components/HomePage.css';
import CardPage from './components/CardPage';
import './components/CardPage.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Footer from './components/Footer';



function App() {

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);


  //api data for all the cards
  const [peopleData,setPeopleData] = useState([]);


  const loadAllPeople= async ()=>{
    await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then((response)=>{
        var peopleCopy = response.data.results;
        let promises = [];
        for(let person of peopleCopy){
          promises.push(
            //homeworld call (get the names from given api call)
            axios.get(person.homeworld)
              .then((response)=>{
                person.homeworld = response.data.name;
              }),
            //species call (get the names from given api call)
            person.species.length > 0 ?
              axios.get(person.species[0])
                .then((response)=>{
                  person.species = response.data.name;
                })
            : person.species = 'Human'
          )
        }
        //waits until all http requests have been loaded properly one by one
        Promise.all(promises).then(() => {
          setPeopleData(peopleCopy);
        }
        );
      })
      .catch((error)=>{
        alert('error loading data');
      })
  }

  //loads the card data when app is launched and updates the homeworld and species names then set the data to peopleData state
  // dependency array, page reload when page changes
  useEffect(()=>{
    loadAllPeople();
  },[currentPage]);
  
  
  return (

    <ChakraProvider>

    <BrowserRouter>
      <div className='page-body'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage peopleData={peopleData}/>}/>
          <Route path="/:id" element={<CardPage peopleData={peopleData}/>} />
          <Route path='/favs'/>
        </Routes>   
        <Footer currentPage = {currentPage} setCurrentPage = {setCurrentPage}/>
      </div> 
    </BrowserRouter>

    </ChakraProvider>
  );
}

export default App;
