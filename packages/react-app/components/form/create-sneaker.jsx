import React, {useState} from "react";
import {useContractSend} from "@/hooks/contract/useContractWrite";
import {toast} from "react-toastify";


const CreateSneaker = ({closeModal}) => {


    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [size, setSize] = useState(42);
    const [loading, setIsLoading] = useState(false);

    const {writeAsync: createSneaker, isLoading} = useContractSend("createSneaker", [name, imageUrl, color, size]);


    const handleCreateSneaker = async () => {
        const createTx = await createSneaker();
        console.log({createTx})

    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {

            // Display a notification while the sneaker is being added to the marketplace
            await toast.promise(handleCreateSneaker(), {
                pending: "Creating sneaker...",
                success: "Sneaker created successfully",
                error: "Something went wrong. Try again.",
            });
            toast.success('Sneaker created successfully')
            closeModal?.()
        } catch (e) {
            console.log({e})
        }finally {
            console.log("hit finally")

            setIsLoading(false)
        }
    }
    return (<>
            <div className="postbox__comment-form">
                <h3 className="postbox__comment-form-title">Create a sneaker</h3>
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <div className="postbox__comment-input">
                                <input onChange={(e) => setName(e.target.value)} type="text" required={true}
                                       placeholder="Sneaker Name"/>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-6 col-lg-6">
                            <div className="postbox__comment-input">
                                <input onChange={(e) => setImageUrl(e.target.value)} type="text" required={true}
                                       placeholder="Sneaker Image"/>
                            </div>
                        </div>
                        <div className="col-xxl-12">
                            <div className="postbox__comment-input">
                                <input onChange={(e) => setColor(e.target.value)} type="text" required={true}
                                       placeholder="Sneaker Color"/>
                            </div>
                        </div>
                        <div className="col-xxl-12">
                            <div className="postbox__comment-input">
                                <input onChange={(e) => setSize(e.target.value)} type="number" required={true}
                                       placeholder="Sneaker Size"/>
                            </div>
                        </div>
                        <div className="col-xxl-12">
                            <div className="postbox__comment-btn">
                                <button disabled={loading} type="submit" className="tp-btn">
                                    {loading ? 'Creating...' : 'Create Sneaker'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>);
};

export default CreateSneaker;
