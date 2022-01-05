import React ,{ useEffect, useState } from 'react'
import Tmdb from './Tmdb.js';
import MovieRow from './components/MovieRow.js'
import FeatureMovie from './components/FeaturesMovie.js'
import Header from './components/Header.js'
import './App.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      
      setMovieList(list);

      let originals = await list.filter(i=>i.slug === 'originals');

      let randomChosen = Math.floor(Math.random() * (originals[0].itens.results.length -1));

      let chosen = originals[0].itens.results[randomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id ,'tv');
      setFeatureData(chosenInfo)
    }
    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return(
    <div className='page'>
      <Header black={blackHeader}/>
      {featureData && 
        <FeatureMovie item={featureData} />
      }
      <section className="lists">
      {movieList.map((item,key) => (
        <MovieRow key={key} title={item.title} itens={item.itens}/>
      ))}
      </section>
      <footer>
        Feito com <span role="img" alt="coreção">❤️</span> por Isaque Ribeiro Ferreira <br />
        Direitos de imagem para a Netflix <br />
        Dados do Site pegos da Themoviedb.org
      </footer>
      {movieList.length <=0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />

        </div>
      }
    </div>
    
  );
}