import React from 'react'
import Logo from '../../SharedComponents/Logo'
import MenuGroup from './MenuGroup'
import { FaTimes, FaChevronLeft } from "react-icons/fa";
import { useDispatch } from 'react-redux';

const menuArray = [
  {
    groupText: "Projects",
    menus: [
      { text: "Ongoing", path: "/projects/ongoing" },
      { text: "Finished", path: "/projects/finished" },
      { text: "Cancelled", path: "/projects/cancelled" },
    ],
  },
  {
    groupText: "Tasks",
    menus: [
      { text: "Personal Tasks", path: "/tasks/personaltasks" },
      { text: "Assigned to me", path: "/tasks/assignedtome" },
      { text: "Created by me", path: "/tasks/createdbyme" },
    ]
  },
  {
    groupText: "Notes",
    menus: [
      { text: "Personal Notes", path: "/notes/personalnotes" },
      { text: "Created by me", path: "/notes/createdbyme" },
    ]
  },
  {
    groupText: "Devs",
    menus: [
      { text: "My Colleagues", path: "/devs/colleagues" },
      { text: "My Teams", path: "/devs/teams" },
    ]
  },
]

const MenuList = () => {

  const dispatch = useDispatch()

  return (
    <div className="w-auto bg-gray-100 px-8 py-4 overflow-auto">
      <div className="flex items-center justify-between">
        <Logo />
        <FaChevronLeft onClick={() => dispatch({ type: "TOGGLE_DRAWER" })} className="cursor-pointer md:hidden" size={25} />
      </div>

      <nav className="mt-8">
        {menuArray.map((group, index) => {
          return (
            <MenuGroup
              key={index}
              menuGroupText={group.groupText}
              menus={group.menus}
            />
          )
        })}
      </nav>
    </div>
  )
}

export default MenuList