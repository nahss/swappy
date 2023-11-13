import React, {useState} from "react";
import {useContractCall} from "@/hooks/contract/useContractRead";
import BlockiesSvg from "blockies-react-svg";
import {formatWalletAddress} from "@/utils/utils";
import 'react-tiny-fab/dist/styles.css';
import {Fab} from "react-tiny-fab";
import { PlusIcon} from "@heroicons/react/24/outline";
import { Modal } from 'react-responsive-modal';
import CreateSneaker from "@/components/form/create-sneaker";
import {useAccount} from "wagmi";
import {useContractSend} from "@/hooks/contract/useContractWrite";
import SneakerCard from "@/components/sneakerCard";

const MySneakersArea = () => {

    const {address} = useAccount();
    const { data, isLoading} = useContractCall("getMySneakers", [], true, address);

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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
                                    My Sneaker
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {data?.length ? data.map((item) => (

                            <SneakerCard key={item.id}  sneaker={item} />
                        )) : isLoading ?  <>Loading...</> : <>No Sneakers</> }
                    </div>
                </div>

                {typeof window !== 'undefined' && (
                    <Fab
                        // mainButtonStyles={mainButtonStyles}
                        icon={<PlusIcon width={40} />}
                        alwaysShowTitle={true}
                        onClick={onOpenModal}
                        event="click"
                    >
                    </Fab>

                )

                }

                <Modal open={open} onClose={onCloseModal} center>
                   <CreateSneaker closeModal={onCloseModal} />
                </Modal>


            </section>
        </>
    );
};

export default MySneakersArea;
