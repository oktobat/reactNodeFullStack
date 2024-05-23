import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {useDispatch} from 'react-redux'
import { ImSpinner } from "react-icons/im";

const LoadingBlock = styled.div`
    height:100vh;
    display:flex; justify-content:center; align-items:center;
    .loadIcon {
        font-size : 80px; 
        animation : loadSpin 5s linear infinite;
    }
    @keyframes loadSpin {
        0% { transform : rotate(0deg) }
        100% { transform : rotate(3turn) }
    }
`

const Layout = () => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        dispatch(fetchProducts())
        setTimeout(()=>{ setLoading(true) }, 2000)
    }, [])

    if (!loading) {
        return (
            <div>
                <LoadingBlock>
                    <ImSpinner className="loadIcon" />
                </LoadingBlock>
           </div>
        );
    } 
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;