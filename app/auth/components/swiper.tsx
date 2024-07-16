import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import exampleImage from "@/public/image1.png";
import exampleImage1 from "@/public/image2.png";
import exampleImage2 from "@/public/image3.png";
export default function SwiperTest() {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  const images = [
    exampleImage2,
    exampleImage2,
    exampleImage2,
    exampleImage2,
    exampleImage2,
    exampleImage2,
    exampleImage2,
  ];
  return (
    <>
      <Swiper
        centeredSlides={true} //가운데 정렬
        loop={true} // 슬라이드 루프
        spaceBetween={20} // 슬라이스 사이 간격
        slidesPerView={3} // 보여질 슬라이스 수
        navigation={true} // prev, next button
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="">
              {/* 고정된 크기 설정 */}
              <Image
                src={image}
                alt="example"
                loading="eager"
                width={400}
                height={0}
                className="object-cover w-full" // object-cover와 크기 설정
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
