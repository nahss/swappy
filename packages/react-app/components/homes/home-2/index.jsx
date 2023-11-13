import BrandArea from "@/common/brand-area";
import CounterArea from "@/common/counter-area";
import InstructorArea from "@/common/instructor-area";
import SuitableArea from "@/common/suitable-area";
import React from "react";
import AboutArea from "./about-area";
import BlogArea from "./blog-area";
import CategoryArea from "./category-area";
import ChooseArea from "../../../common/choose-area";
import CourseArea from "./course-area";
import HeroSlider from "./hero-slider";
import TestimonialAreaTwo from "./testimonial-area-2";
import VideoArea from "../../../common/video-area";

const HomeTwo = () => {
  return (
    <>
      <HeroSlider />
      <BrandArea style_2={true} />
      <AboutArea />
      <CategoryArea />
      <CourseArea />
      <CounterArea style_counter={true} />
      <ChooseArea style_2={true} />
      <InstructorArea style_2={true} />
      <TestimonialAreaTwo />
      <SuitableArea  style_2={true} />
      <BlogArea />
    </>
  );
};

export default HomeTwo;
