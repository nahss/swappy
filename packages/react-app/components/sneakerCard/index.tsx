

import React from 'react';
import BlockiesSvg from "blockies-react-svg";
import {formatWalletAddress} from "@/utils/utils";
import {useContractSend} from "@/hooks/contract/useContractWrite";
import {toast} from "react-toastify";

interface SneakerCardProps {
    sneaker: {
        id: string;
        name: string;
        color: string;
        imageUrl: string;
        owner: string;
        size: string;
        listed: boolean;
    }
}

const SneakerCard = ({ sneaker }: SneakerCardProps) => {

    const {writeAsync: listSneaker, isLoading: isListingSneaker} = useContractSend("listSneaker", [sneaker.id]);

    const onListSneaker = async () => {

        if(!listSneaker || !sneaker) return;
        try {

            // Display a notification while the sneaker is being added to the marketplace
            await toast.promise(listSneaker(), {
                pending: "Listing sneaker...",
                success: "Sneaker listed successfully. Head over to the marketplace to see it.",
                error: "Something went wrong. Try again.",
            });
            toast.success('Sneaker listed successfully')
        } catch (e) {
            console.log({e})
        }
    }


    return (
        <div key={sneaker.id} className="col-xl-4 col-lg-6 col-md-6">
            <div className="tpcourse mb-40">
                <div className="tpcourse__thumb p-relative w-img fix">
                    <img src={sneaker.imageUrl} alt="course-thumb" style={{
                        height: '20rem',
                    }
                    } />

                </div>
                <div className="tpcourse__content">
                    <div className="tpcourse__avatar d-flex align-items-start mb-20">
                        <h4 className="tpcourse__title">
                            <h4 >{sneaker.name}</h4>
                        </h4>
                    </div>
                    <div className="tpcourse__meta pb-15 mb-20">
                        <ul className="d-flex align-items-center">
                            <li>
                                <BlockiesSvg
                                    address={sneaker.owner}
                                    size={4}
                                    scale={10}
                                    //caseSensitive={false}
                                    className='classname'
                                    style={{
                                        borderRadius: 50,
                                    }}
                                />
                                <span className={'pl-2'}>Owner: {formatWalletAddress(sneaker.owner)}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="tpcourse__category d-flex align-items-center justify-content-between">
                        <ul className="tpcourse__price-list d-flex align-items-center">
                            <button className="tp-btn w-100"  disabled={sneaker.listed || !listSneaker} onClick={() => onListSneaker()}>

                                {isListingSneaker ? 'Listing...' :
                                sneaker.listed? 'Listed' : 'List Sneaker'}
                            </button>

                        </ul>
                        <h5 className="tpcourse__course-price">
                            Size {sneaker.size}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SneakerCard;
