import { useEffect, useState } from "react";
import style from "./Register.module.css"
import axios from "axios";
import useTranslation from 'next-translate/useTranslation';
import { IoAddCircleOutline } from "react-icons/io5";
function Register() {
  const { t } = useTranslation('register');
  const [formData, setFormData] = useState({
    name :" ",
    first_name: '',
    father_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    birthday: '',
    city: "",
    income_tax:" ",
    attachments: [],
    contract_signed:null
  });
  const [data,setData]=useState([{fname:"",lname:""}])
  const handleClick=()=>{
    setData([...data,{fname:"",lname:""}])
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "attachmentName" || name === "attachmentFile") {
      // Handling dynamic keys for attachments
      const attachmentIndex = Number(name.split("_")[1]); // Extracting the index from the name
      setFormData((prevState) => {
        const updatedAttachments = [...prevState.attachments];
        updatedAttachments[attachmentIndex] = {
          ...updatedAttachments[attachmentIndex],
          [name.includes("Name") ? "name" : "file"]: value,
        };
        return {
          ...prevState,
          attachments: updatedAttachments,
          role_id: "representative",
          
        };
      });
    } else {
      // Handling regular form fields
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        role_id: "representative",
        
      }));
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)
    try {
      const response = await fetch('https://daliluna.ltd/api/register', {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': "en",
          'country': "sy"
        },
      });
      const data = await response.json();
      console.log('Registration successful!', data);
      // Handle success (redirect, show a success message, etc.)
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle error (show an error message, retry logic, etc.)
    }
  };
  const [selectedPro,setSelectedPro]=useState([])
  const [countries, setCountries] = useState([]);
const [selectedCountry, setSelectedCountry] = useState('');
const [selectedProvince, setSelectedProvince] = useState('');
const [provinces,setProvinces]= useState([])
const[pro,setPro]=useState([])
useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://daliluna.ltd/api/main-countries', {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en',
          'country': 'SY'
        }
      });
      setCountries(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchCountries();
}, []);

// Event handler for country selection
const handleCountrySelection = async (event) => {
  const countryCode = event.target.value;
  setSelectedCountry(countryCode);

  try {
    const response = await axios.get(`https://daliluna.ltd/api/main-countries/${countryCode}/countries`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en',
        'country': 'SY'
      }
    });
    setProvinces(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
const handleFileInputChange = (e, i) => {
  const files = e.target.files;

  setFormData((prevState) => {
    const updatedAttachments = [...prevState.attachments];
    updatedAttachments[i] = {
      ...updatedAttachments[i],
      file: files[0], // Assuming you only want to handle one file per input
    };
    return {
      ...prevState,
      attachments: updatedAttachments,
      contract_signed: files[0],
      role_id: "representative",
    };
  });
};

const handleProvinceSelection = async (event,countryCode) => {
  const selectedCountryCode = event.target.value;
  setSelectedProvince(selectedCountryCode);
  try {
    const response = await axios.get(`https://daliluna.ltd/api/main-countries/${selectedCountryCode}/countries/${selectedProvince}/cities`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en',
        'country': 'SY'
      }
    });
    const fetchedProvinces = response.data.data; 
    setPro(fetchedProvinces); 
  } catch (error) {
    console.log(error);
  }
};
const handleprev =()=>{
  setSelectedPro(selectedProvince)
  console.log(selectedProvince)
}

 
  return (
    <div> <div style={{position:"relative"}}>
    <div className="breadcrumb-bar" >

  <div className="row align-items-center text-center">
    <div className="col-md-12 col-lg-12">
    <div className="login-content" >
<div className="container">
<div className="row">
    <div className="col-md-6 col-lg-9 mx-auto"  >
      <div className="login-wrap" >
        <div className="login-header">
          <h3 style={{fontWeight:"bolder",margin:"10px"}}>{t("reg")}</h3>
        </div>
        <form onSubmit={handleSubmit} >
        <div className="form-group group-img">
            <div className="group-img">
              <i className="feather-mail" />
              <label className={style['left-label']} for="cars">{t("fname")}</label>
              <input name="first_name"
          value={formData.first_name}
          onChange={handleInputChange} 
          type="text" className="form-control"
           placeholder="First name" />
            </div>
          </div>

          <div className="form-group group-img">
            <div className="group-img">
              <i className="feather-mail" />
              <label className={style['left-label']} for="cars">{t("ffname")}</label>
              <input type="text" className="form-control" placeholder="Father name" name="father_name"
                value={formData.father_name}
               onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group group-img">
            <div className="group-img">
              <i className="feather-mail" />
              <label className={style['left-label']} for="cars">{t("lname")}</label>
              <input type="text" className="form-control" placeholder="Last name" 
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}/>
            </div>
          </div>
          <div className="form-group group-img">
            <div className="group-img">
              <i className="feather-mail" />
              <label className={style['left-label']} for="cars">{t("uname")}</label>
              <input type="text" className="form-control" placeholder="Last name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}/>
            </div>
          </div>
          <div className="form-group group-img">
            <div className="group-img">
              <i className="feather-mail" />
              <label className={style['left-label']} for="cars">{t("email")}</label>
              <input type="text" className="form-control" placeholder="Email Address" name="email"
              value={formData.email}
              onChange={handleInputChange}/>
            </div>
          </div>
          <div className="form-group group-img">
            <div className="group-img">
              <i className="feather-mail" />
              <label className={style['left-label']} for="cars">{t("mobile")}</label>
              <input type="text" className="form-control" placeholder="mobile" name="phone"
              value={formData.phone}
              onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group">
              <div className="pass-group group-img">
                <i className="feather-lock" />
                <label className={style['left-label']} for="cars">{t("Password")}</label>
                <input type="password" className="form-control pass-input" placeholder="Password" name="password"
              value={formData.password}
              onChange={handleInputChange}/>
                <span className="toggle-password feather-eye" />
              </div>
            </div>
            <div className="form-group">
              <div className="pass-group group-img">
                <i className="feather-lock" />
                <label className={style['left-label']} for="cars">{t("Confirm")}</label>
                <input type="password" className="form-control pass-input" placeholder="Confirm password" 
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}/>
                <span className="toggle-password feather-eye" />
              </div>
            </div>
            <div className="form-group group-img">
            <div className="group-img">
              <i className="feather-mail" />
              <label className={style['left-label']} for="cars">{t("tax")}</label>
              <input type="text" className="form-control" placeholder="tax" 
              name="income_tax"
              value={formData.income_tax}
              onChange={handleInputChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="pass-group group-img" >
            <label className={style['left-label']} >{t("Birthday")}</label>
             <input type="date"className="form-control" id="birthday" name="birthday"
             value={formData.birthday}
             onChange={handleInputChange}/>
            </div>
          </div>
          <div className="form-group">
            <div className="pass-group group-img">
            <label className={style['left-label']} for="cars">{t("Country")}</label>
            <select
      value={selectedCountry}
      onChange={handleCountrySelection}
      style={{
        padding: '8px',
        marginBottom: '8px',
        width: '250px',
        borderRadius: '10px'
      }}
    >
      <option value="">{t("SC")}</option>
      {countries.map((country, index) => (
        <option key={index} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
            </div>
          </div>
          <div className="form-group">
            <div className="pass-group group-img">
            <label className={style['left-label']} for="cars">{t("Province")}</label>
            <select
      value={selectedProvince}
      onChange={handleProvinceSelection}
      style={{
        padding: '8px',
        marginBottom: '8px',
        width: '250px',
        borderRadius: '10px'
      }}
    >
      <option value="">{t("SP")}</option>
      {provinces.map((province, index) => (
        <option key={index} value={province.id}>
          {province.name}
        </option>
      ))}
    </select>
            </div>
          </div>
          <div className="form-group">
            <div className="pass-group group-img">
            <label className={style['left-label']} for="cars">{t("City")}</label>
            <select
      value={selectedPro}
name="city"
      onChange={handleprev}
      style={{
        padding: '8px',
        marginBottom: '8px',
        width: '250px',
        borderRadius: '10px'
      }}
    >
      <option value="">{t("SCC")}</option>
      {pro.map((country, index) => (
        <option key={index} value={country.id}>
          {country.name}
        </option>
      ))}
    </select>
            </div>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px",marginBottom:"20px"}}>
                <h6 style={{color:"#0d233e",fontWeight:"bold"}}>{t("attachments")}</h6>
                <IoAddCircleOutline  onClick={handleClick} style={{fontSize:"30px",color:"#0d233e"}}/>
              </div>
              {
  data.map((val, i) => (
    <div style={{ display: "flex", justifyContent: "space-between" }} key={i}>
      <input
        name={`attachments_name`}
        type="text"
        placeholder="name"
        value={formData.attachments.attachments_name}
        onChange={(e) => handleInputChange(e)}
      />
      <input
        name={`attachments_file`}
        type="file"
        
        onChange={(e) => handleFileInputChange(e, i)}
      />
    </div>
  ))
}


            </div>
            <div style={{display:"flex", justifyContent:"space-between" ,marginTop:"20px",marginBottom:"20px"}}>
               <h6 style={{color:"#0d233e",fontWeight:"bold"}}>{t("contract")}</h6>
            <button style={{padding:"2px 20px", backgroundColor:"#b31411",color:"#fff",fontWeight:"bolder",borderRadius:"5px", border:"none"}}>{t("show")}</button>
            </div>
            
              <h6 style={{color:"#0d233e",fontWeight:"bold",marginBottom:"10px",display:"flex",justifyContent:"start"}}>{t("The")}</h6>
              <input name="contract_signed" value={formData.contract_signed} style={{display:"flex",justifyContent:"start", marginBottom:"20px"}} type="file"  />
              <div style={{display:"flex",justifyContent:"space-between"}}>
              <h6 style={{color:"#0d233e",fontWeight:"bold",marginBottom:"10px"}}>{t("are")}</h6>
              <input  className={style["input"]} style={{fontSize:"50px"}} type="checkbox"/> 
              </div>
          
          </div>
        
          <div className="row">
          </div>
          <button className="btn btn-primary w-100 login-btn" style={{backgroundColor:"#b31313"}} type="submit">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
    </div>
  </div>

</div>


  </div></div>
  )
}

export default Register