import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'
import styled from 'styled-components'
import Title from '@/components/layout/Title'
import MovieSearch from '@/components/movie/MovieSearch'
import MovieTag from '@/components/movie/MovieTag'
import MovieSection from '@/components/movie/MovieSection'
import Pagination from '@/components/layout/Pagination'

const MovieViewBlock = styled.div``

const MovieView = () => {

    const id = '64ed394366c7282a2d002b595b1b9954'
    const totalItems = useRef(1)
    const itemsPerPage = 20
    const [currentPage, setCurrentPage] = useState(1)

    const [keyword, setKeyword] = useState("")

    const [movies, setMovies] = useState([])

    const [changeType, setChangeType] = useState({name:"인기 영화", media:"movie", type:"popular"})

    const onSearch = (subject, page)=>{
        if (page==1) {
            setKeyword(subject)
            setChangeType({name:"", media:"", type:""})
        }
        setCurrentPage(page)
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${id}&language=ko-KR&query=${subject}&page=${page}`)
        .then(response=>{
            console.log("키워드검색 결과 : ", response.data)
            totalItems.current = response.data.total_results
            setMovies(response.data.results)
        })
    }

    const onClick = (payload, page)=>{
        if (page==1) {
            setChangeType(payload)
            setKeyword("")
        }
        setCurrentPage(page)
        let {media, type} = payload
        axios.get(`https://api.themoviedb.org/3/${media}/${type}?api_key=${id}&language=ko-KR&page=${page}`)
        .then(response=>{
            console.log(response.data)
            totalItems.current = response.data.total_results
            setMovies(response.data.results)
        })
    }

    const firstData = ()=>{
        setChangeType({name:"인기 영화", media:"movie", type:"popular"})
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${id}&language=ko-KR&page=1`)
        .then(response=>{
            console.log(response.data)
            totalItems.current = response.data.total_results
            setMovies(response.data.results)
        })
    }

    useEffect(()=>{
       firstData()
    }, [])

    return (
        <MovieViewBlock className="row">
            <Title title="Movie" />
            <MovieSearch onSearch={onSearch} />
            <MovieTag onClick={onClick} changeType={changeType} />
            <MovieSection movies={movies} />
            <Pagination currentPage={currentPage} totalItems={totalItems.current} itemsPerPage={itemsPerPage} changeType={changeType} onClick={onClick} onSearch={onSearch} keyword={keyword} />
        </MovieViewBlock>
    );
};

export default MovieView;