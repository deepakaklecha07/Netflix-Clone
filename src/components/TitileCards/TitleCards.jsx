import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGE1YTI1NDA4M2VjMTM5YjhmNjEyN2FmMjIwYWM3NCIsIm5iZiI6MTc0NzgzNDUzNy4zNiwic3ViIjoiNjgyZGQ2YTk0ZjE3Nzc3MjcyZTI1NmJkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pi1EITsAyHOylrNZjKhQxVVug_5TB22n99wHodfz9Yk'
  }
};



const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));

   cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
      
    </div>
  )
}

export default TitleCards
