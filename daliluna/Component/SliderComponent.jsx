import React, { useState, useEffect, useRef } from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Modal from 'react-modal';
import 'swiper/swiper-bundle.css';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
// Import your images
import im1 from "../img/gallery-1.jpg";
import im2 from "../img/gallery-2.jpg";
import im3 from "../img/gallery-3.jpg";
import im4 from "../img/gallery-4.jpg";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

// Set app element for react-modal
Modal.setAppElement('#__next'); // Adjust the selector based on your root element ID

function SliderComponent({ image }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);

  const modalStyles = {
    content: {
      marginTop: "75px",
      width: "440px",
      height: "460px",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '80%', // Adjust the maximum width
      position: "relative",
    },
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalIsOpen(true);
    swiperRef.current = null;
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < 3) { // Assuming you have 4 images, adjust this condition based on your actual number of images
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (modalIsOpen && swiperRef.current) {
      swiperRef.current.slideTo(currentIndex);
    }
  }, [modalIsOpen, currentIndex]);
  const direction = localStorage.getItem("lan") === "ar" 
  console.log(direction);
  return (
    <div className='row'>
      <div style={{ marginTop: "50px" }}>
     
        <div className='col-lg-12' dir={direction}>
          <Image className={`col-lg-3 col-md-3 col-sm-6 col-12 `} onClick={() => openModal(direction ? 0 : 3)} src={im1} width={300} height={300} alt="icons1" />
          <Image className={`col-lg-3 col-md-3 col-sm-6 col-12`} onClick={() => openModal(direction ? 1 : 2)} src={im2} width={300} height={300} alt="icons2" />
          <Image className={`col-lg-3 col-md-3 col-sm-6 col-12`} onClick={() => openModal(direction ? 2 : 1)} src={im3} width={300} height={300} alt="icons3" />
          <Image className={`col-lg-3 col-md-3 col-sm-6 col-12`} onClick={() => openModal(direction ? 3 : 0)} src={im4} width={300} height={300} alt="icons4" />
        </div>
      </div>

      <Modal
     dir={direction ? 'rtl' : 'ltr'}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={modalStyles}
      > 
        <Swiper

          pagination={{ clickable: true }}
          className="swiper-container"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          initialSlide={currentIndex}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        >
          <SwiperSlide>
            <Image src={im1} width={400} height={400} alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={im2} width={400} height={400} alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={im3} width={400} height={400} alt="Slide 3" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={im4} width={400} height={400} alt="Slide 4" />
          </SwiperSlide>
        </Swiper>
        <button style={{ marginBottom: "20px", position: "absolute", top: "200px", left: "20px", border: "none", padding: "2px 5px", borderRadius: "50%", fontWeight: "bold",zIndex:"100" }} onClick={goToPrevious}><GrPrevious /></button>
        <button style={{ marginBottom: "20px", position: "absolute", top: "200px", right: "30px", border: "none", padding: "2px 5px", borderRadius: "50%", fontWeight: "bold",zIndex:"100"  }} onClick={goToNext}><GrNext /></button>
        <button style={{ marginBottom: "20px", position: "absolute", top: "25px", right: "30px", border: "none", padding: "2px 5px", borderRadius: "50%",fontSize:"20px", fontWeight: "bold" ,zIndex:"100" }} onClick={closeModal}><IoIosClose /></button>
      </Modal>
    </div>
  );
}

export default SliderComponent;
