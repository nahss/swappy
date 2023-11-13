import React, {useEffect, useState} from "react";
import {useContractCall} from "@/hooks/contract/useContractRead";
import {formatWalletAddress} from "@/utils/utils";
import BlockiesSvg from "blockies-react-svg";
import {toast} from "react-toastify";
import {useAccount} from "wagmi";
import {Modal} from "react-responsive-modal";
import CreateSneaker from "@/components/form/create-sneaker";
import SelectSwapSneaker from "@/components/homes/home/select-swap-sneaker";
import {useContractSend} from "@/hooks/contract/useContractWrite";
import {useRouter} from "next/router";

const SneakersArea = () => {

  const router = useRouter()

  const {address} = useAccount()

  const [open, setOpen] = useState(false);

  // choose the sneaker out of my collection i want to trade with
  const [selectedSneakerToTradeWith, setSelectedSneakerToTradeWith] = useState(null);

  const [selectedSneakerToTradeFor, setSelectedSneakerToTradeFor] = useState(null);

  // Use the useContractCall hook to read how many rooms are in the marketplace contract
  const { data } = useContractCall("getListedSneakers", [], true);
  const { data: mySneakers } = useContractCall("getMySneakers", [], true, address);

  const {writeAsync: swapSneaker} = useContractSend("swapSneaker", [selectedSneakerToTradeWith, selectedSneakerToTradeFor?.owner, selectedSneakerToTradeFor?.id], address);

  console.log({mySneakers})
  useEffect(() => {

    if( !swapSneaker ) return
    console.log("initiating swap")
    initiateSwap()

  }, [swapSneaker]);


  const onSwapSneaker = async (sneaker) => {

    if(!sneaker) return
   try {
     setSelectedSneakerToTradeFor(sneaker)
     if(!mySneakers?.length){
       toast.warn('You do not have any sneakers to swap with. Please add a sneaker to your collection first.')
       return
     }
     const myListedSneakers = mySneakers.filter(sneaker => sneaker.listed)

     if(!myListedSneakers?.length){
       toast.warn('You must list atleast one of your sneakers')
       return
     }

     openModal()
   }catch (e) {
     console.log({e})
   }
  }

  const sneakersOwned = data?.filter(sneaker => sneaker.owner == address)
  const onCloseModal = () => {
    setOpen(false)
    setSelectedSneakerToTradeWith(null)
    setSelectedSneakerToTradeFor(null)
  }

  const openModal = () => setOpen(true);


  const initiateSwap = async () => {
    try {
      await toast.promise(swapSneaker(), {
        pending: "Swapping sneakers...",
        success: "Sneakers swapped successfully",
        error: "Something went wrong. Try again.",
      });

      router.push('/profile')

    } catch (e) {
      console.log({e})
    } finally {
      onCloseModal()
    }
  }
  const selectSneaker = async (sneakerId) => {
    setSelectedSneakerToTradeWith(sneakerId)
  }


  console.log({selectedSneakerToTradeFor})

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
                  Explore Popular Shoes To Swap
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {data ? data.map((item) => (
              <div key={item.id} className="col-xl-4 col-lg-6 col-md-6">
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
                        <button className="tp-btn w-100" onClick={() => onSwapSneaker(item)}>

                          {Number(selectedSneakerToTradeFor?.id) == item.id ? "Swapping" : address == item.owner ? "Belongs to you" : "Swap Sneaker"}
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

      <Modal open={open} onClose={onCloseModal} center>
        <SelectSwapSneaker sneakers={sneakersOwned} selectSneaker={selectSneaker} />
      </Modal>

    </>
  );
};

export default SneakersArea;
