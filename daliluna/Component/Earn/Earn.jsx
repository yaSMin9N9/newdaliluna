import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from "./Earn.module.css";
import { useRouter } from 'next/router';
import Header from './Header';
import useTranslation from 'next-translate/useTranslation';
import Im from './Im';
import ButtonSection from './ButtonSection';
function Earn() {
  const { t } = useTranslation('common');
  const [showSelector, setShowSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedsubcat, setSelectedsubcat] = useState('');
  const [clas, setClas] = useState([]);
  const [cc, setCc] = useState([]);
  const router =useRouter()
  const handleCountrySelection = async (e) => {
    setSelectedCategory(e.target.value);
    console.log(selectedCategory);
    try {
      const response = await axios.get(`https://daliluna.ltd/api/classifieds/${selectedCategory}/class-deps`, {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'country': 'SY'
        }
      });
      setCc((prevCc) => [...prevCc, ...response.data.data]);

      console.log(cc);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubSelection = async (e) => {
    setSelectedsubcat(e.target.value);
    console.log(selectedsubcat);
    
    
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://daliluna.ltd/api/class-deps/${selectedsubcat}/fields`, {
            headers: {
              'Accept': 'application/json',
              'Accept-Language': "en",
              'country': 'SY'
            }
          });
          console.log(response.data.data)
        router.push(`/addNewPost/${selectedsubcat}`)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
   
  };
  const handlePostButtonClick = () => {
    setShowSelector(!showSelector); // Toggle the visibility of the selector
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://daliluna.ltd/api/classifieds', {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': 'en',
            'country': 'SY'
          }
        });
        setClas(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);

  return (
  
           <Header>
              <div className={`col-lg-7 `}>
                <div className="cta-content">
                  <h3 style={{ color: "#2b294e", fontWeight: "bolder", fontSize: "40px" }}>{t("eheader")}</h3>
                  <p className={style['p']} style={{ marginBottom: "50px" }}>{t("emessage")}</p>
                 <ButtonSection
                   showSelector={showSelector}
                   handlePostButtonClick={handlePostButtonClick}
                   selectedCategory={selectedCategory}
                   handleCountrySelection={handleCountrySelection}
                   clas={clas}
                   handlesubSelection={handlesubSelection}
                   cc={cc}
                 />
                </div>
              </div>
              <div className="col-lg-5">
              <Im/>
              </div>
              </Header>
          
  );
}

export default Earn;
