import React, {useState} from "react";
import {useContractCall} from "@/hooks/contract/useContractRead";
import {formatWalletAddress} from "@/utils/utils";
import BlockiesSvg from "blockies-react-svg";
import {toast} from "react-toastify";
import {useAccount} from "wagmi";
import {Modal} from "react-responsive-modal";
import CreateSneaker from "@/components/form/create-sneaker";


interface SelectSwapSneakerProps {
    sneakers: any;
    selectSneaker: (id:string) => void;
}
const SelectSwapSneaker = ({sneakers, selectSneaker}: SelectSwapSneakerProps) => {
    return (
        <>
            <section
                className="course-area pt-115 pb-110 wow fadeInUp"
                data-wow-duration=".8s"
                data-wow-delay=".4s"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title mb-65">
                                <h2 className="tp-section-title mb-20">
                                   Select a sneaker to swap
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {sneakers ? sneakers.map((item: any) => (
                            <div key={item.id} className="col-xl-6 col-lg-6 col-md-6">
                                <div className="tpcourse mb-40">
                                    <div className="tpcourse__thumb p-relative w-img fix">
                                        <img src={item.imageUrl} alt="course-thumb" style={{
                                            height: '20rem',
                                        }
                                        } />

                                    </div>
                                    <div className="tpcourse__content">
                                        <div className="tpcourse__avatar d-flex align-items-start mb-20">
                                            <h4 className="tpcourse__title">
                                                <h4 >{item.name}</h4>
                                            </h4>
                                        </div>
                                        <div className="tpcourse__meta pb-15 mb-20">
                                            <ul className="d-flex align-items-center">
                                                <li>
                                                    <BlockiesSvg
                                                        address={item.owner}
                                                        size={4}
                                                        scale={10}
                                                        //caseSensitive={false}
                                                        className='classname'
                                                        style={{
                                                            borderRadius: 50,
                                                        }}
                                                    />
                                                    <span className={'pl-2'}>Owner: {formatWalletAddress(item.owner)}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tpcourse__category d-flex align-items-center justify-content-between">
                                            <ul className="tpcourse__price-list d-flex align-items-center">
                                                <button className="tp-btn w-100" onClick={() => selectSneaker(item.id)}>
                                                    Select
                                                </button>

                                            </ul>
                                            <h5 className="tpcourse__course-price">
                                                Size {item.size}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : <>Loading...</>}
                    </div>
                </div>
            </section>


        </>
    );
};

export default SelectSwapSneaker;
