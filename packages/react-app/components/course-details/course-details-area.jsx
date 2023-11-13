import review_content from '@/data/review-data';
import VideoPopup from '@/modals/video-popup';
import Link from 'next/link';
import  {useState} from 'react';


const CourseDetailsArea = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
         <section className="c-details-area pt-120 pb-50 wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
         <div className="container">
            <div className="row">
               <div className="col-lg-8 col-md-12">
                  <div className="c-details-wrapper mr-25">
                     <div className="c-details-thumb p-relative mb-40">
                        <img src="/assets/img/course/c-details-bg-01.jpg" alt="details-bg" />
                        <div className="c-details-ava d-md-flex align-items-center">
                           <img src="/assets/img/course/c-details-ava-01.png" alt="avata" />
                           <span>By <a href="#">0x123454efdqdefsdad</a></span>
                        </div>
                     </div>
                     <div className="course-details-content mb-45">
                        <div className="tpcourse__ava-title mb-25">
                           <h4 className="c-details-title"><a href="#">Master Web Design in Adobe XD: Complete UI/UX Masterclass</a></h4>
                        </div>
                     </div>
                     <div className="c-details-about mb-40">
                        <h5 className="tp-c-details-title mb-20">About This Sneaker</h5>
                        <p>Synergistically foster 24/7 leadership rather than scalable platforms. Conveniently visualize installed base products before interactive results. Collaboratively restore corporate experiences and open-source applications. Proactively mesh cooperative growth strategies for covalent opportunities. Competently create efficient markets through best-of-breed potentialities.</p>
                        <p>Proactively initiate corporate vortals via bricks-and-clicks relationships. Dynamically envisioneer cutting-edge paradigms via client-centered relationships. Globally repurpose backward-compatible growth strategies and fully tested e-services. Energistically promote stand-alone models whereas effective solutions. Quickly target low-risk high-yield e-markets via web-enabled networks.</p>
                     </div>
               </div>
               </div>
               <div className="col-lg-4 col-md-12">
                  <div className="c-details-sidebar">

                     <div className="course-details-widget">
                        <div className="cd-video-price">
                           <h3 className="pricing-video text-center mb-15">$29.99</h3>
                           <div className="cd-pricing-btn text-center mb-30">
                              <Link className="tp-vp-btn-green" href="/sneaker-details">Purchase Now</Link>
                           </div>
                        </div>
                        <div className="cd-information mb-35">
                           <ul>
                              <li><i className="fa-light fa-calendars"></i> <label>Size</label> <span>36</span></li>
                              <li><i className="fi fi-rr-chart-pie-alt"></i> <label>Color</label> <span>Blue</span></li>
                              <li><i className="fi fi-rs-diploma"></i> <label>Brand</label> <span>Adidas</span></li>
                           </ul>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

        </>
    );
};

export default CourseDetailsArea;
