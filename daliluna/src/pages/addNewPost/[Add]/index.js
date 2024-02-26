import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import style from "./add.module.css"
import LanguageContext from '../../../../context/languageContext';
import index from '@/pages/AboutUs';
import useTranslation from 'next-translate/useTranslation'
function NewPost() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { Add } = router.query;
  const [data, setData] = useState([]);
  const context = useContext(LanguageContext);
  const [selectedFile, setSelectedFile] = useState({});
  const [name, setName] = useState('');
  const [facebook, setFacebook] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setFiles(fileList);
  };
  const handleMobile1Change = (event) => {
    setMobile1(event.target.value);
  };

  const handleMobile2Change = (event) => {
    setMobile2(event.target.value);
  };

  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    FaceBook: "",
    Address: "",
    images:[],
    content:[]
  });
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://daliluna.ltd/new_daliluna/public/api/classified-departments/7/classified-department-fields`,
          {
            headers: {
              'Accept': 'application/json',
              'Accept-Language': localStorage.getItem("lan"),
              'country': 'SY'
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (fieldName, value, event) => {
    const checked = event.target.checked;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: checked
        ? [...(prevData[fieldName] || []), value]
        : (prevData[fieldName] || []).filter((item) => item !== value),
    }));
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      content: prevData.content.map((item) =>
        item.classified_department_field_name === name
          ? { ...item, answer: value }
          : item
      ),
    }));
  };
  

  const handleButtonClick = async () => {
    const dynamicContentArray = data.map((item,index  )=> {
      if (item.type === 'text') {
        return {classified_department_field_id:index+20, answer: formData[item.name] || '' };
      } else if (item.type === 'checkbox') {
        const selectedValues = item.values.filter(value => formData[item.name] && formData[item.name].includes(value));
        return {  answer: selectedValues.join(', ') };
      }
    });
    const formDataToSend = new FormData();
    if(!selectedFile){
      console.log("no file choose");
    }
    if(selectedFile){
      console.log(selectedFile);
    }
  
    
    // Append simple key-value pairs
    formDataToSend.append("name", name);
    formDataToSend.append('mobiles[0][number]', mobile1);
    formDataToSend.append('mobiles[1][number]', mobile2);
    formDataToSend.append("title","title");
    formDataToSend.append("city_id", 1);
    formDataToSend.append("currency_id", 1); 
    formDataToSend.append("Email", email);
    formDataToSend.append("FaceBook", facebook);
    formDataToSend.append("Address", address);
    formDataToSend.append("price", 200);
   
    for (let i = 0; i < files.length; i++) {
      formDataToSend.append(`images[${i}]`, files[i]);
    }
    const contentArray = [];
    for (let i = 21; i <= 26; i++) {
      const item = {
        classified_department_field_id: i,
        answer: formData.content[i - 21]?.answer 
      };
      contentArray.push(item);
    }
    
    contentArray.forEach((item, index) => {
      formDataToSend.append(`content[${index}][classified_department_field_id]`, item.classified_department_field_id);
      formDataToSend.append(`content[${index}][answer]`, item.answer);
    });
    
    try {
      const response = await fetch(
        "https://daliluna.ltd/new_daliluna/public/api/classified-departments/7/posts",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Accept-Language': localStorage.getItem("lan"),
            'country': 'SY'
          },
          body: formDataToSend,
        }
      );
    
      const responseData = await response.json();
    
      if (response.ok) {
        console.log("Data successfully posted:", responseData);
      } else {
        console.error("Failed to post data:", responseData);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }}
  
  return (
<div><div className="main-wrapper" style={{marginTop:"100px"}}>
    
    <div className={style["breadcrumb-barr"]}>
      <div className="container" style={{paddingRight:"calc(var(--bs-gutter-x) * .5)",
         paddingLeft: "calc(var(--bs-gutter-x) * .5)"}}>
        <div className="row align-items-center text-center">
          <div className="col-md-12 col-12">
            <h2 className="breadcrumb-title" style={{color:"white"}}>{t("add")}</h2>
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div className="dashboard-content">
      <div className="container">
        
        <div className="profile-content">
          <div className={style["messages-form"]}>
          <div className={style["card"]}>
              <div className="card-header">
                <h3 style={{fontWeight:"bolder",marginBottom:"30px",display:"flex",alignItems:"center"}}><FaLocationDot />{t("personal")}</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label className={style["col-form-label"]}>{t("name")}</label>
                  <input type="text" className="form-control pass-input"  name='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group formlast-input">
                      <label className={style["col-form-label"]}  >{t("mobile1")}</label>
                      <input  type="text"
  className="form-control select"
  id="mobile1"
  name="mobile1"
  value={mobile1}
        onChange={handleMobile1Change}
   />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6" style={{marginBottom:"20px"}}>
                  <div className="form-group formlast-input">
                      <label className={style["col-form-label"]}>{t("mobile1")}</label>
                      <input type="text"
  className="form-control select"
  id="mobile2"
  name="mobile2"
  value={mobile2}
        onChange={handleMobile2Change}
   />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className={style["col-form-label"]}>{t("email")}</label>
                  <input type="text" className="form-control pass-input" 
                  name='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
              
                </div>
                <div className="row">
                <div className="col-lg-6 col-md-6">
                      <label className={style["col-form-label"]}>Facebook</label>
                      <div className="pass-group group-img">
                        <span className="lock-icon"><i className="fab fa-facebook-f" /></span>
                        <input type="text" className="form-control" 
                        name='FaceBook' value={facebook} onChange={(e)=>{setFacebook(e.target.value)}}  />
                      </div>
                    </div>
                  <div className="col-lg-6 col-md-6" style={{marginBottom:"20px"}}>
                  <div className="form-group formlast-input">
                      <label className={style["col-form-label"]}>{t("address")}</label>
                      <input type="text" className="form-control select"
                       name='Address' value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style["card"]}>
              <div className="card-header">
                <h3 style={{fontWeight:"bolder",marginBottom:"30px",display:"flex",alignItems:"center"}}><FaLocationDot />{t("post")}</h3>
              </div>
              <div className="card-body">
         
              <div className="row">
              {data?.map((item) =>
  item.type === 'text' && (
    <div className="col-lg-6 col-md-6" key={item.id}>
      <label className={style["col-form-label"]}>
        <GoDotFill color="grey" />
        {item.name}
      </label>
      <input
        name={item.name}
        style={{ marginLeft: '20px' }}
        value={formData[item.name]}
        onChange={(e) => handleInputChange(e)}
        maxLength={item.max_length}
        minLength={item.min_length}
        type={item.type}
        className="form-control pass-input"
        placeholder={item.placeholder !== null ? item.placeholder : ''}
      />
    </div>
  )
)}

     </div>
              </div>
            </div>
            <div className={style["card"]}>
              <div className="card-header">
                <h3 style={{fontWeight:"bolder",marginBottom:"30px",display:"flex",alignItems:"center"}}><FaLocationDot />{t("basic")}</h3>
              </div>
              <div className="card-body">
                <div className="row">
                 
                {data?.map((item) =>
  item.type === 'checkbox' && (
    <div key={item.name}>
      <label className={style["col-form-label"]}>{item.name}</label>
      {item.values.map((value) => (
        <div key={value}>
          <input
            type="checkbox"
            checked={formData[item.name] && formData[item.name].includes(value)}
            onChange={(e) => handleCheckboxChange(item.name, value, e)}
          />
          {value}
        </div>
      ))}
    </div>
  )
)}

                  </div>
                 
                </div>
            </div>
            <div className={style["card"]}>
              <div className="card-header">
                <h3 style={{fontWeight:"bolder",marginBottom:"30px",display:"flex",alignItems:"center"}}><FaLocationDot />{t("media")}</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-md-6 featured-img1">
                    <div className="media-image ">
                      <img src="assets/img/mediaimg-2.jpg" alt />
                    </div>
                    <div className="settings-upload-btn">
                      <input type="file" accept="image/*" multiple
        onChange={handleFileChange} name="image"className={style["custom-file-input"]} id="file" />
                      
                    </div>
                  </div>
                 
                </div>
            
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="progress-wrap active-progress" style={{display:"flex",justifyContent:"flex-end",margin:"50px"}}>
  <button class={style["button-30"]} onClick={handleButtonClick} role="button">{t("submit")}</button>

  </div></div>

  )
}

export default NewPost