import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const param = useParams();

  useEffect(() => {
    let data =
      JSON.parse(localStorage.getItem("projectData")) || [];
    console.log(param.id);
    console.log(data);
    let filteredData = data.filter(
      (dt) => dt.createdAt === param.id
    );

    if (filteredData.length <= 0) {
      console.log("data not found");
    }
  }, []);
  // console.log(param);
  return <div>ProjectDetails</div>;
};

export default ProjectDetails;
