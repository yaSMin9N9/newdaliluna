import React, { useEffect, useState, useContext } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from "../../../styles/classifyId.module.css";
import CountryContext from '../../../../context/countryContext';
import Filter from '../../../../Component/filter/Filter';
import Card from '../../../../Component/Card/Card';
import { DotLoader } from 'react-spinners';
import Button from '../../../../Component/ui/Button';
import TwoSubHeader from '../../../../Component/classify/TwoSubHeader';
import Col from '../../../../Component/classify/Col';
import Col7 from '../../../../Component/classify/Col7';
import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
const Cars = React.memo(() => {
  const { t } = useTranslation('newp');
  const axios = require("axios");
  const [data, setData] = useState([]);
  const router = useRouter();
  const context = useContext(CountryContext);
  const con = context.country;
  const [loading, setLoading] = useState(true);
  const { ClassifyId } = router.query;

  const handleButton = useCallback(() => {
    router.push(`/addNewPost/${ClassifyId}`)
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://daliluna.ltd/api/class-deps/${ClassifyId}/posts`, {
          headers: {
            'Accept': 'application/json',
            'Accept-Language': localStorage.getItem("lan"),
            'country': con
          }
        });
        console.log(response.data.data);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [con, ClassifyId]);

  return (
    <div className={`col-lg-12 ${style["all"]}`}>
      <Filter className="col-lg-4" />
      <Col7>
        <Col>
          <TwoSubHeader />
          <div className={`col-lg-4 col-sm-4 ${style["ll"]}`}>
            <Button style={{ textDecoration: "none", marginLeft: "70px", padding: "10px 10px", color: "#fff", borderRadius: "5px", border: "none", backgroundColor: "#b31313", fontWeight: "700px" }} onClick={handleButton}>
              <IoMdAddCircle style={{ fontSize: "20px" }} />
              {t('add')}
            </Button>
          </div>
        </Col>
        <div className={`row ${style["row"]}`}>
          {loading ? (
            <div className="spinner-wrapper" style={{ marginTop: "100px", marginLeft: "320px", textAlign: "center", height: "100vh" }}>
              <DotLoader color="#b31313" />
            </div>
          ) : (
            data?.map((item, index) => (
              <Link key={index} href={`/classify/${ClassifyId}/posts/${item.id}`} className="col-lg-5 col-md-6 col-sm-3" style={{ margin: "20px", textDecoration: "none", color: "inherit" }}>
                <Card item={item} />
              </Link>
            ))
          )}
        </div>
      </Col7>
    </div>
  );
});

export default Cars;
