import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'


const BottomLeft = () => {

    const location = useLocation()
    const { newTaskColumn } = useSelector(state => state.form)
    const { verifiedTeams } = useSelector(state => state.team)

    const path1 = location.pathname.split('/')[1]
    const path2 = location.pathname.split('/')[2]

    const { projects } = useSelector(state => state.project)
    console.log("PROJECTS", projects);
    console.log("PROJECT ID", newTaskColumn.projectId);
    const projectInfo = projects?.find(project => project._id === newTaskColumn.projectId)
    console.log("PROJECT", projectInfo);

    return (
        <div className="flex flex-col justify-start">
            {path1 === "projects" &&
                <div className="py-2">
                    <div className="flex items-center gap-1">
                        <h1 className="text-xl font-semibold text-gray-800 leading-tight">
                            {!path2 ? "Ongoing" : `${path2.charAt(0).toUpperCase() + path2.slice(1)}`}
                        </h1>
                        <h1 className="text-xl font-semibold text-gray-800 leading-tight">
                            {`${path1.charAt(0).toUpperCase() + path1.slice(1)}`}
                        </h1>
                    </div>
                </div>}

            {path1 === "tasks" &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                            {/* {`${path.charAt(0).toUpperCase() + path.slice(1)} for ${projectData?.projectName}`} */}
                            {projectInfo && `Tasks for ${projectInfo?.projectName}`}
                        </h1>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                        {projectInfo?.confirmedMembers.map(member => {
                            return (
                                <img
                                    key={member._id}
                                    className="h-5 w-5 rounded-full object-cover border-2 border-white -ml-3"
                                    src={member.photo} alt="profile" />
                            )
                        })}
                    </div>
                </div>}

                {path1 === "myprofile" &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                            My Profile
                        </h1>
                    </div>
                </div>}

                {path2 === "personaltasks" &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                            My Personal Tasks
                        </h1>
                    </div>
                </div>}

                {path2 === "assignedtome" &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                            Tasks Assigned to Me
                        </h1>
                    </div>
                </div>}

                {(path1 === "tasks" && path2 === "createdbyme") &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                            Tasks Created by Me
                        </h1>
                    </div>
                </div>}

                {path2 === "personalnotes" &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                            My Personal Notes
                        </h1>
                    </div>
                </div>}

                {(path1 === "notes" && path2 === "createdbyme") &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                            Notes Created by Me
                        </h1>
                    </div>
                </div>}

                {path2 === "teams" &&
                <div>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 leading-tight">
                            {`Teams (${verifiedTeams.length})`}
                        </h1>
                    </div>
                </div>}

        </div>
    )
}

export default BottomLeft