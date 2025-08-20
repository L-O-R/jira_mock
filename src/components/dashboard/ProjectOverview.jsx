import React, { useEffect } from "react";
import ModelPortal from "../UI/ModelPortal";
import { Link } from "react-router-dom";

const ProjectOverview = () => {
  const [openPortal, setOpenPortal] = React.useState(false);
  const [projects, setProjects] = React.useState([]);

  const handleClick = () => setOpenPortal(true);

  useEffect(() => {
    let data =
      JSON.parse(localStorage.getItem("projectData")) || [];
    setProjects(data);
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));

  // ✅ show projects where user is owner OR member
  let filterData = projects.filter((pr) => {
    if (pr.userId === user.id) return true;
    if (
      pr.members &&
      pr.members.some((m) => m.userId === user.id)
    )
      return true;
    return false;
  });

  return (
    <div className="p-6 bg-background min-h-screen overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text">
          Projects
        </h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-surface text-text rounded-lg"
            onClick={handleClick}>
            Create project
          </button>
        </div>
      </div>

      {openPortal && (
        <ModelPortal onClose={() => setOpenPortal(false)} />
      )}

      <table className="w-full border-collapse bg-surface rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-surface border-b border-border">
            <th className="p-3 text-left text-text">
              Name
            </th>
            <th className="p-3 text-left text-text">
              Type
            </th>
            <th className="p-3 text-left text-text">
              Lead
            </th>
            <th className="p-3 text-left text-text">
              Project URL
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData.length > 0 ? (
            filterData.map((project, idx) => (
              <tr
                key={idx}
                className="border-b border-border hover:bg-surface/70 text-text transition">
                <td className="p-3 text-primary cursor-pointer">
                  {project.name}
                </td>
                <td className="p-3">{project.type}</td>
                <td className="p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center text-sm font-medium">
                    {project.name[0].toUpperCase()}
                  </div>
                  {project.name} Lead
                </td>
                <td className="p-3 text-center">
                  <Link
                    to={`/Dashboard/${project.createdAt}`}>
                    http://localhost:5173/Dashboard/
                    {project.createdAt}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center text-text p-5">
                NO DATA FOUND
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectOverview;
