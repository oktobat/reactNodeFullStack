import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components';

const KakaoMapBlock = styled.div`
.map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif; font-size:14px;}
.map_wrap {position:relative; width:100%; height:500px;}
#menu_wrap {position:absolute;top:0;left:0;bottom:0;
    width:250px;
    margin:10px 0 30px 10px;
    padding:10px;
    overflow-y:auto;
    background:rgba(255, 255, 255, 1);
    z-index: 1;
    border-radius: 10px;
    .option { border-bottom:1px solid #000; padding-bottom:10px; 
        div {
            form {
                display:flex; 
                input { flex:1; padding-left:0.5em; height:25px;  }
                button { font-size:12px; width:35px; height:25px; margin-left:5px}
            }
        }
    }
    #placesList {
        margin-top:10px; 
        li {
            position:relative; overflow: hidden; cursor: pointer;
            line-height:1.5em;
            &:hover { color:#f00; }
        }
    }
    #pagination {
        margin-top:20px; text-align:center; 
        a { padding:2px 5px; background:#ddd; margin:0 3px; border-radius:3px;
            &.on { background:#333; color:#fff }
        }
    }
}
`

const KakaoMap = () => {
    let kakao = window.kakao;
    const mapRef = useRef(null)
    const pageRef = useRef(null)
    const [markers, setMarkers] = useState([]);
    const [myMap, setMyMap] = useState(null);
    const [places, setPlaces] = useState([]);
    const [pagination, setPagination] = useState({});
    const [infowindow, setInfowindow] = useState(null);
    const [keyword, setKeyword] = useState("")

    const searchPlaces = ()=>{
        if (!keyword) {
            alert("키워드를 입력해주세요!!")
            return false;
        }
        let ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            console.log(data)
            setPlaces(data)
            displayPlaces(data);
            console.log(pagination)
            // 페이지 번호를 표출합니다
            setPagination(pagination)
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
        }); 
    }

    const removeMarker = () => {
        markers.forEach(marker => {
            marker.setMap(null);
        });
        setMarkers([]);
    }

    const displayPlaces = (placesData) => {
        removeMarker();
        let bounds = new kakao.maps.LatLngBounds();
        placesData.forEach((place, index) => {
            let placePosition = new kakao.maps.LatLng(place.y, place.x);
            let marker = addMarker(placePosition, index);
            bounds.extend(placePosition);
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, place.place_name);
            });
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });
        });
        myMap.setBounds(bounds);
    };

    const addMarker = (position, idx) => {
        let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', 
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

        marker.setMap(myMap); // 지도 위에 마커를 표출합니다
        setMarkers(prevMarkers => [...prevMarkers, marker]);  // 배열에 생성된 마커를 추가합니다
        return marker;
    }

    function displayInfowindow(marker, title){
        let content = '<div style="padding:5px; z-index:1">' + title + '</div>';
        infowindow.setContent(content);
        infowindow.open(myMap, marker);
    }

    const handleClick = (e, page)=>{
        e.preventDefault(); 
        removeMarker()
        pagination.gotoPage(page);
    }

    useEffect(()=>{
        let mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567),
            level: 7
        }
        let mapContainer = mapRef.current;
        let mapInstance = new kakao.maps.Map(mapContainer, mapOption)
        let infowindowInstance = new kakao.maps.InfoWindow({ zIndex: 1 });
        setMyMap(mapInstance)
        setInfowindow(infowindowInstance)
    }, [keyword])

    return (
        <KakaoMapBlock>
            <div className="map_wrap">
                <div id="map" ref={mapRef} style={{width:'100%', height:'100%', overflow:'hidden'}}></div>
                <div id="menu_wrap" className="bg_white">
                    <div className="option">
                        <div>
                            <form onSubmit={(e)=>{ e.preventDefault(); searchPlaces()}}>
                                <input type="text" id="keyword" placeholder="영화관을 검색하세요." onChange={(e)=>setKeyword(e.target.value)} value={keyword} />  
                                <button type="submit">검색</button> 
                            </form>
                        </div>
                    </div>
                    <ul id="placesList">
                        {
                            places.map((item, index)=>(
                                <li 
                                key={index} 
                                onMouseOver={ ()=>{ displayInfowindow(markers[index], item.place_name) } }
                                onMouseOut={ ()=>infowindow.close() }
                                >
                                    {item.place_name}
                                </li>
                            ))
                        }
                    </ul>
                    <div id="pagination" ref={pageRef}>
                        {
                            Array.from(Array(pagination.last).keys()).map((page)=>(
                                <a href="#" key={page} className={ page+1==pagination.current && "on" } onClick={ (e)=>{ handleClick(e, page+1) } }>
                                    <span>{page+1}</span>
                                </a>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </KakaoMapBlock>
    );
};

export default KakaoMap;