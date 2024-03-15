import React from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div>
      <Link to={`/borrowedBook`}> BorrowedBook</Link>
      <br />
      <Link to={`/allBook`}> Available Books</Link>
    </div>
  );
};

export default Dashboard;
