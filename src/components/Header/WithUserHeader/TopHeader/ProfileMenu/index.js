import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import Badge from './Badge'
import MenuItems from './MenuItems'
import ModalComponent from '../../../../SharedComponents/ModalComponent'
import MyProfile from './MyProfile'

const ProfileMenu = () => {

    const [openProfile, setOpenProfile] = useState(false)

    return (
        <Menu as="div" className="ml-3 relative">
            {({ open }) => (
                <>
                    <Badge open={open} />
                    <MenuItems open={open} setOpenProfile={() => setOpenProfile(true)} />
                    <ModalComponent
                        open={openProfile}
                        onClose={() => setOpenProfile(false)}
                        cancel={() => setOpenProfile(false)}
                        modalTitle="My Profile"
                    >
                        <MyProfile />
                    </ModalComponent>
                </>
            )}

        </Menu>
    )
}

export default ProfileMenu