import "../assets/scss/ChangeProfileImage.scss";
import React, { useEffect, useState } from 'react';
import { serverPath } from "../utils/globalConst";
import { axiosGet, axiosPostImage, handleStateChange } from "../utils/globalFunc";

const ChangeProfileImage = ({ user_id }) => {
    const [state, setState] = useState({
        showModal: false,
        profileImage: "",

        uploadedImage: "",
    })

    const uploadImage = (e) => {
        const file = e.target.files[0];
        handleStateChange(setState, { uploadedImage: file })
    };

    const saveImage = () => {

        axiosPostImage('editImage', { user_id, image: state.uploadedImage })
            .then(res => {
                if (res.status === 'success') {
                    handleStateChange(setState, {
                        profileImage: res.filename,
                        showModal: false,
                        uploadedImage: ''
                    })
                }
            })

    }

    useEffect(() => {
        axiosGet(`getImage/${user_id}`)
            .then(res => {
                if (res.status === 'success') {
                    handleStateChange(setState, { profileImage: res.image })
                }
            })
    }, [user_id])

    return (
        <div className="ChangeProfileImage">
            <div className="ProfileImage" onClick={() => handleStateChange(setState, { showModal: true })}>
                <img src={`${serverPath}ProfileImage/${state.profileImage}`} alt="Profile" />
            </div>
            {state.showModal && (
                <div className="Modal">
                    <div className="ModalContent">
                        <div className="ModalHeader">
                            <h2>Change Profile Image</h2>
                            <button className="CloseButton" onClick={() => handleStateChange(setState, { showModal: false })}>×</button>
                        </div>
                        <div className="ModalBody">
                            {state.uploadedImage === '' ?
                                <div className="FileInputWrapper">
                                    <label htmlFor="fileInput" className="FileInputLabel">Choose an image</label>
                                    <input id="fileInput" type="file" onChange={uploadImage} />
                                </div>
                                :
                                <div className="ImagePreview">
                                    <img src={URL.createObjectURL(state.uploadedImage)} alt="Profile" />
                                </div>
                            }
                            {state.uploadedImage !== '' &&

                                <div className="text-center">
                                    <button className="ClearButton me-2" onClick={() => handleStateChange(setState, { uploadedImage: '' })}>Clear</button>
                                    <button className="SaveButton" onClick={saveImage}>Save</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default ChangeProfileImage;

