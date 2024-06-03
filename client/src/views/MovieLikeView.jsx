import React from 'react';
import Title from '@/components/layout/Title'
import MovieLikeSection from '@/components/movie/MovieLikeSection'


const MovieLikeView = () => {

    return (
        <div className="row">
            <Title title="My Like Movie" />
            <MovieLikeSection />
        </div>
    );
};

export default MovieLikeView;