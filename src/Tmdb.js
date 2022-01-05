const APIKEY ='aaa736589c7f9165cf636c86f57137d0';
const API_BASE ='https://api.themoviedb.org/3';


const baseFetch = async (endpoint) => {

    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getHomeList: async () => {   
        return [
            {
                slug:'originals',
                title:'Originais da Netflix',
                itens: await baseFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${APIKEY}`)
            },
            {
                slug:'trending',
                title:'Recomendados para Você',
                itens: await baseFetch(`/trending/all/week?language=pt-BR&api_key=${APIKEY}`)
            },
            {
                slug:'toprated',
                title:'Em Alta',
                itens: await baseFetch(`/movie/top_rated?language=pt-BR&api_key=${APIKEY}`)
            },
            {
                slug:'action',
                title:'Ação',
                itens: await baseFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${APIKEY}`)
            },
            {
                slug:'comedy',
                title:'Comédia',
                itens: await baseFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${APIKEY}`)
            },
            {
                slug:'horror',
                title:'Terror',
                itens: await baseFetch(`/discover/movie?with_genres=29&language=pt-BR&api_key=${APIKEY}`)
            },
            {
                slug:'romance',
                title:'Romance',
                itens: await baseFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${APIKEY}`)
            },
            {
                slug:'documentary',
                title:'Documentários',
                itens: await baseFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${APIKEY}`)
            }
            
        ];
    },
    getMovieInfo: async (movieId, type) =>{
        let info = {};

        if (movieId){
            switch(type){
                case 'movie':
                    info = await baseFetch(`/movie/${movieId}?language=pt-BR&api_key=${APIKEY}`);
                break;
                case 'tv':
                    info = await baseFetch(`/tv/${movieId}?language=pt-BR&api_key=${APIKEY}`);
                break;
                default:
                break;
            }
        }
        return info;
    },
}