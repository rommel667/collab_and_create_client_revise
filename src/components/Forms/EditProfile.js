import React from 'react'
import { FaPlus } from "react-icons/fa";

import Input from '../SharedComponents/Input';

const EditProfile = ({ formState, skills, addSkill, onChangeInput, photo, setImage }) => {

    return (
        <div>

            <div className="flex relative w-max cursor-pointer">
                <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={photo}
                    alt=""
                />
                <div className="absolute top-2/3 left-2/3 text-gray-500">
                    <input id="file-input" type="file" name="photo" onChange={setImage} style={{ display: 'none' }} />
                    <label htmlFor="file-input" style={{ border: 'none' }}><FaPlus size={18} /></label>
                </div>
            </div>

            <div className="mt-5">
                <Input
                    value={formState.name}
                    onChange={onChangeInput}
                    label="Username"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="text"
                    placeholder="Username"
                />
            </div>
            <div className="mt-5">
                <Input
                    value={formState.portfolio}
                    onChange={onChangeInput}
                    label="Portfolio Link"
                    id="portfolio"
                    name="portfolio"
                    type="text"
                    autoComplete="text"
                    placeholder="Portfolio Link"
                />
            </div>
            <div className="mt-5">
                {skills.map((s, i) => {
                    console.log("SKILLS", s)
                    return (
                        <p key={`${s}${i}`}>{`${i + 1}. ${s}`}</p>
                    )
                })}
                <div className="flex flex-row items-center justify-between gap-3">
                    <Input
                        value={formState.skill}
                        onChange={onChangeInput}
                        id="skill"
                        name="skill"
                        type="text"
                        autoComplete="text"
                        placeholder="Add Skill"
                    />
                    <FaPlus onClick={addSkill} className="text-gray-500 cursor-pointer" size={17} />
                </div>

            </div>

        </div>

    )
}

export default EditProfile