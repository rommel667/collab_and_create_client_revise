import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const MenuItems = ({ open, setOpenTaskEdit, setOpenTaskDelete, setOpenTaskPersonalEdit, setOpenTaskPersonalDelete }) => {

    const location = useLocation()

    return (

        <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-20 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            >

                <Menu.Item>
                    {({ active }) => (
                        <div
                            className={classNames(
                                active ? 'bg-gray-100' : '',
                                'px-2 py-1 text-xs text-gray-700 cursor-pointer flex items-center gap-2'
                            )}
                            onClick={location.pathname.split('/')[2] === "personaltasks" ? setOpenTaskPersonalEdit : setOpenTaskEdit}
                        >
                            <FaEdit />
                            <p>Edit</p>
                        </div>
                    )}
                </Menu.Item>

                <Menu.Item>
                    {({ active }) => (
                        <div
                            className={classNames(
                                active ? 'bg-gray-100' : '',
                                'px-2 py-1 text-xs text-gray-700 cursor-pointer flex items-center gap-2'
                            )}
                            onClick={location.pathname.split('/')[2] === "personaltasks" ? setOpenTaskPersonalDelete : setOpenTaskDelete}
                        >
                            <FaTrashAlt />
                            <p>Delete</p>
                        </div>
                    )}
                </Menu.Item>

            </Menu.Items>
        </Transition>
    )
}

export default MenuItems
