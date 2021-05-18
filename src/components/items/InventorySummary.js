import React from 'react';
import { Link } from 'react-router-dom';

const ProjectSummary = ({ item }) => {
  return (
    <tr>
      <td>
        <Link to={'/item/' + item.id} key={item.id}>
          {item.name}
        </Link>
      </td>
      <td>{item.par}</td>
    </tr>
  );
};

export default ProjectSummary;
