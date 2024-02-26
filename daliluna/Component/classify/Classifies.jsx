import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import style from '../../src/styles/classifies.module.css';
import LanguageContext from '../../context/languageContext';
import CountryContext from '../../context/countryContext';
import useTranslation from 'next-translate/useTranslation';
import Header from './Hrader';
import Head from './Head';
import Row from './Row';
import { IoClose } from 'react-icons/io5';
import { DotLoader } from 'react-spinners';
import Image from 'next/image';



function CombinedComponent() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common');
  const [category, setCategory] = useState([]);
  const [popupData, setPopupData] = useState([]);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [fetchingPopupData, setFetchingPopupData] = useState(false);
  const context = useContext(LanguageContext);
  const con = useContext(CountryContext);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
       
        const response = await axios.get(process.env.API_URL + "/classifieds", {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': localStorage.getItem("lan"),
            'country': con.country,
          }
        });
        console.log('API data:', response.data.data);
        setCategory(response.data.data);
        console.log(category);
      } catch (error) {
        console.log('Error fetching categories:', error);
      } 
    };

    fetchCategories();
  }, [context.language]);

  const handlePopup = useCallback(async (itemId) => {
    try {
      setLoading(true);
      setFetchingPopupData(true)
      const response = await axios.get(
        process.env.API_URL + `/classifieds/${itemId}/class-deps`,
        {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': localStorage.getItem("lan"),
            'country': con.country
          }
        }
      );
     
      console.log(response);
      setPopupData(response.data.data);
      setPopupIsOpen(true);
      setSelectedItemId(itemId);
     setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetchingPopupData(false);
      
    }
  }, [context.language, con.country]);

  const closePopup = () => {
    setPopupIsOpen(false);
    setSelectedItemId(null);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handle =() =>{
    setFetchingPopupData(true)
  }
  return (
    <Header onClick={closePopup}>
      <Head>
        <h2 style={{ marginTop: '30px', marginBottom: '20px', position: "relative", zIndex: "2" }}>
          <span className={style['title-left']} style={{ backgroundColor: '#b31313', zIndex: "-1", color: '#fff', borderRadius: '50%', width: "70px", height: "70px", padding: '15px 10px', position: "absolute" }}>
          </span> {t('cheader')}
        </h2>
        <p style={{
          marginBottom: "30px",
          color: "gray",
          fontWeight: "700"
        }}>{t('cmessage')}</p>
      </Head>
      <Row>
        {
          category.map((item) => (
            <div className='col-lg-2 col-md-3 col-sm-6' key={item.id}>
              <div className='categories-content'>
                <div className={style['category-links']}>
                  <h5 style={{fontWeight:"bold"}}>{item.name}</h5>
                  <Image onClick={() => handlePopup(item.id)} className={style['img']} width={100} height={100} src={`${item.icon}`} alt='icons' />
                </div>
              </div>
            </div>
          ))
        }
      </Row> { loading || fetchingPopupData &&(
                <div style={{ display: 'flex', justifyContent: 'center', zIndex:"100",alignItems: 'center', height: '100px' }}>
                  <DotLoader color="#000" />
                </div>
)}
      {popupIsOpen && (
        <div className={style['popup-overlay']} style={{zIndex:"100"}}>
          <div ref={popupRef} className={style['popup']} style={{marginTop:"200px"}}>
            <div className={style['popup-content']} style={{ zIndex: '88' }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                
                <h2 style={{ color: '#b31313' }}>{category.find(item => item.id === selectedItemId)?.name}</h2>
                <IoClose className={style['close']} onClick={closePopup} />
              </div>
             {
                popupData.map((popupItem, index) => (
                  <Link key={index} style={{ zIndex: '88' ,textDecoration:"none"}} onClick={handle} href={`/classify/${popupItem.id}`} className='linkStyle'>
                    <h5 style={{display:"flex",alignItems:"center",justifyContent:"start"}}>
                      <h5 style={{display:"flex",backgroundColor:"#fff",color:"#000",marginTop:"10px",marginRight:"10px",padding:"3px 7px",borderRadius:"50%"}}>{popupItem["count posts"]}</h5>
                      {popupItem.name}
                    </h5>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      )}
    </Header>
  );
}

export default CombinedComponent;
