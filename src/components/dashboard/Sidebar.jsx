import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    {
      id: 1,
      name: "Summary",
      icon: "📊",
      path: "/Dashboard",
    },
    {
      id: 2,
      name: "Projects",
      icon: "📁",
      path: "/Dashboard/overview",
    },
  ];

  return (
    <aside className=" bg-surface text-text border-r border-border h-full">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold">
          Navigation Panel
        </h2>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className=" flex items-center px-4 py-3 rounded-lg hover:bg-background transition-colors group">
                <span className="mr-3 text-lg">
                  {item.icon}
                </span>
                <span className="group-hover:text-primary">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
