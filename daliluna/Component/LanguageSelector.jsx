import React, { useContext, useState } from 'react';
import isoLangs from 'iso-639-1';
import LanguageContext from '../context/languageContext';
import { useRouter } from 'next/router';
import Link from "next/link"

const LanguageSelector = () => {
  const [language, setLanguage] = useState(typeof window !== 'undefined' ? localStorage.getItem("lan") : "ar"); // Initialize language state with value from localStorage
  const router = useRouter();
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const handleLanguageChange = (selectedLanguage) => {
    localStorage.setItem("lan", selectedLanguage); 
    setLanguage(selectedLanguage);
    console.log(isoLangs.getAllCodes());
  };

  const languageOptions = isoLangs.getAllNames().map((langName, index) => {
    const langCode = isoLangs.getCode(langName);

    return (
      <option key={index} value={langCode}>
        {langName}
      </option>
    );
  });

  return (
    <div dir={direction}>
      <Link href={router.asPath} locale={language}>
        <select
          style={{
            backgroundColor: "#2b294e",
            color: "#fff",
            border: "none"
          }}
          value={language} 
          onChange={(e) => {
            const selectedLanguage = e.target.value;
            handleLanguageChange(selectedLanguage);
          }}
        >
          {languageOptions}
        </select>
      </Link>
    </div>
  );
};

export default LanguageSelector;
