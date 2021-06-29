import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery } from '@apollo/client';
import MyColleagues from './MyColleagues';
import { FaEdit } from "react-icons/fa";
import ModalComponent from '../../SharedComponents/ModalComponent'
import EditProfile from '../../Forms/EditProfile';
import MyInfo from './MyInfo';
import { EDIT_PROFILE } from '../../../graphql/gql/user/mutation';
import ColleaguesQuery from '../../../graphql/queries/dev/ColleaguesQuery';

const MyProfile = () => {

    const dispatch = useDispatch()
    const { myInfo } = useSelector(state => state.user)
    const { colleagues } = useSelector(state => state.dev)

    const [showEditProfile, setShowEditProfile] = useState(false)

    const [formState, setFormState] = useState({ name: myInfo.name, portfolio: myInfo.portfolio, skill: "" })

    const [photo, setPhoto] = useState(myInfo.photo)
    const [skills, setSkills] = useState([...myInfo.skills])

    

    const cancelEditProfile = () => {
        setShowEditProfile(false)
        setFormState({ name: myInfo.name, portfolio: myInfo.portfolio, skill: "" })
        setSkills(myInfo.skills)
        setPhoto(myInfo.photo)
    }


    const [editProfile, { data: newProfile, loading: editProfileLoading }] = useMutation(EDIT_PROFILE, {
        update(proxy, result) {
            cancelEditProfile()
            dispatch({ type: "EDIT_PROFILE", payload: { myInfo: result.data.editProfile } })
        },
        variables: {
            name: formState.name, photo, skills, portfolio: formState.portfolio
        },
        onError(err) {
            // setError(err.graphQLErrors[0].message.split(': ')[1]);
            console.log(err);
        }
    })

    const setImageHandler = (e) => {
        const data = new FormData()
        data.append('file', e.target.files[0])
        data.append('upload_preset', 'instagram')
        data.append('cloud_name', 'rommel')
        console.log(data);
        fetch(process.env.REACT_APP_CLOUDINARY_URI, {
            method: 'post',
            body: data
        })
            .then(res => res.json())
            .then(async data => {
                setPhoto(data.secure_url)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const addSkill = () => {
        if (formState.skill === "") return
        setSkills([...skills, formState.skill])
        setFormState({ ...formState, skill: "" })
    }

    const onChangeInput = (event) => {
        const { name, value } = event.target
        setFormState({ ...formState, [name]: value })
    }



    return (
        <div>
            <>
                <ColleaguesQuery />
            </>
            <div className="flex flex-row justify-between border-2 p-2">

                <MyInfo myInfo={myInfo} />
                <FaEdit
                    onClick={() => setShowEditProfile(true)}
                    size={21}
                    className="text-gray-500 cursor-pointer hover:text-gray-600"
                />
            </div>
            <div className="flex justify-between">
                <div>
                    <MyColleagues colleagues={colleagues} myInfo={myInfo} />
                </div>
                <div>
                    <p>Teams</p>
                </div>
            </div>

            <ModalComponent
                open={showEditProfile}
                onClose={cancelEditProfile}
                cancel={cancelEditProfile}
                modalTitle="Edit Profile"
                confirmButtonText="Save Changes"
                confirm={editProfile}
            >
                <EditProfile
                    formState={formState}
                    skills={skills}
                    addSkill={addSkill}
                    onChangeInput={onChangeInput}
                    photo={photo}
                    setImage={setImageHandler}
                />
            </ModalComponent>


        </div>
    )
}

export default MyProfile