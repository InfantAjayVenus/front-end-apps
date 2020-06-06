import {MDB_KEY} from '../../env.json';

export const fetchListProperty = propertyName =>
    async pageNumber =>
        await fetch(`https://api.themoviedb.org/3/movie/${propertyName}?api_key=${process.env.MDB_KEY}&language=en-US&page=${pageNumber}`);

export const searchByName = name =>
    async pageNumber =>
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MDB_KEY}&query=${encodeURIComponent(name)}&page=${pageNumber}`);
