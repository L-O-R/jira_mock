import React from "react";

const ProjectOverview = () => {
  const projects = [
    {
      name: "Mobile Banking App",
      key: "MBA",
      type: "Team-managed software",
      lead: { initials: "LR", name: "Lokesh Rathi" },
    },
    {
      name: "TM",
      key: "TM",
      type: "Team-managed software",
      lead: { initials: "LR", name: "Lokesh Rathi" },
    },
  ];

  return (
    <div className="p-6 bg-background min-h-screen overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text">
          Projects
        </h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface text-text rounded-lg">
            Create project
          </button>
          <button className="px-4 py-2 bg-surface text-text rounded-lg border border-border">
            Templates
          </button>
        </div>
      </div>

      <table className="w-full border-collapse bg-surface rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-surface border-b border-border">
            <th className="p-3 text-left text-text">
              Name
            </th>
            <th className="p-3 text-left text-text">Key</th>
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
          {projects.map((project, idx) => (
            <tr
              key={idx}
              className="border-b border-border hover:bg-bacground text-text transition">
              <td className="p-3 text-primary cursor-pointer">
                {project.name}
              </td>
              <td className="p-3">{project.key}</td>
              <td className="p-3">{project.type}</td>
              <td className="p-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  {project.lead.initials}
                </div>
                {project.lead.name}
              </td>
              <td className="p-3 text-center">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectOverview;
