import React, { useState, useEffect } from "react";
import "./UserList.css";
import SearchIcon from "../Images/SearchIcon.png";
import rightarrow from "../Images/rightarrow.png";
import filter from "../Images/filter.png";
import NotificationBell from "../Images/NotificationBell.png";
import UserLogo from "../Images/UserLogo.png";
import { UserData } from "../UserData"; // Ensure correct path

const UserList = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    departments: [],
    statuses: [],
  });
  const [showFilter, setShowFilter] = useState(false);
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false); // Added
  const [showStatusFilter, setShowStatusFilter] = useState(false); // Added
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setData(UserData);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (type, value) => {
    setFilterCriteria((prev) => {
      const updatedFilters = [...prev[type]];
      if (updatedFilters.includes(value)) {
        updatedFilters.splice(updatedFilters.indexOf(value), 1); // Remove if already selected
      } else {
        updatedFilters.push(value); // Add if not selected
      }
      return { ...prev, [type]: updatedFilters };
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = data
    .filter((user) =>
      user["Teacher Name"].toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) =>
      filterCriteria.departments.length === 0
        ? true
        : filterCriteria.departments.includes(user.Department)
    )
    .filter((user) =>
      filterCriteria.statuses.length === 0
        ? true
        : filterCriteria.statuses.includes(user.Status)
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Helper function to display status with colored dot
  const renderStatusWithDot = (status) => {
    let dotColor;
    switch (status) {
      case "Active":
        dotColor = "🟢";
        break;
      case "Inactive":
        dotColor = "🟡";
        break;
      case "Blocked":
        dotColor = "🔴";
        break;
      case "Suspended":
        dotColor = "🟠";
        break;
      default:
        dotColor = "";
    }
    return (
      <span>
        {status} <span className="status-dot">{dotColor}</span>
      </span>
    );
  };

  return (
    <div className="mainContent">
      <header>
        <nav className="navbar">
          <ul className="navicons">
            <li>
              <h2>Welcome, User!</h2>
            </li>
            <li>
              <span className="SearchBar">
                <img
                  src={SearchIcon}
                  alt="Search Icon"
                  className="searchIcon"
                />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="searchInput"
                  onChange={handleSearch}
                  value={searchQuery}
                />
                <img
                  id="search-arrow"
                  src={rightarrow}
                  alt="Right Arrow"
                  className="searchArrow"
                />
              </span>
            </li>
            <li
              className="filterContainer"
              onClick={() => setShowFilter(!showFilter)}
            >
              <img src={filter} alt="Filter Icon" />
            </li>
            <li className="navIcon Bell">
              <img
                src={NotificationBell}
                alt="Notification Bell"
                className="navIcon"
                id="BellIcon"
              />
            </li>
            <li id="Userli">
              <img src={UserLogo} alt="User Logo" className="navIcon" />
            </li>
            <i id="user-arrow" className="bi bi-chevron-down"></i>
          </ul>
        </nav>

        <div className="UserTable">
          <ul className="TopHeader">
            <li>Record ID</li>
            <li>Teacher Name</li>
            <li>Teacher Id.</li>
            <li>Department</li>
            <li>Student</li>
            <li>Status</li>
            <li>All Details</li>
          </ul>

          <div className="DataContainer">
            {currentItems.length > 0 ? (
              currentItems.map((user) => (
                <ul key={user["Teacher Id"]} className="DataRow">
                  <li>{user["Record ID"]}</li>
                  <li>{user["Teacher Name"]}</li>
                  <li>{user["Teacher Id"]}</li>
                  <li>{user["Department"]}</li>
                  <li>{user["Student"]}</li>
                  <li>
                    {renderStatusWithDot(user["Status"])}
                    <i className="bi bi-chevron-down"></i>
                  </li>
                  <li className="ViewMore">View More &gt;</li>
                </ul>
              ))
            ) : (
              <p>No matching users found.</p> // Added message when no data
            )}
          </div>

          <div className="btnContainer">
            {/* Previous Page Button */}
            <button
              className="btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const startPage = Math.max(1, currentPage - 1);
              const endPage = Math.min(totalPages, currentPage + 1);

              if (page >= startPage && page <= endPage) {
                return (
                  <button
                    key={page}
                    className={`btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              }

              return null;
            })}

            {/* Next Page Button */}
            <button
              className={`btn ${currentPage === totalPages ? "inactive" : ""}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Filter UI - Toggles when filter icon is clicked */}
        {showFilter && (
          <div className="filterBox">
            <h3>Data Filters</h3>
            <hr />
            <div
              className="filterSection"
              onClick={() => setShowDepartmentFilter(!showDepartmentFilter)}
            >
              <h4>
                Department<i className="bi bi-chevron-down"></i>
              </h4>
              {showDepartmentFilter && (
                <div>
                  {["Finance", "Engineer", "Art"].map((dept) => (
                    <label key={dept}>
                      <input
                        type="checkbox"
                        checked={filterCriteria.departments.includes(dept)}
                        onChange={() => handleFilterChange("departments", dept)}
                      />
                      {dept}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div
              className="filterSection"
              onClick={() => setShowStatusFilter(!showStatusFilter)}
            >
              <h4>
                Status<i className="bi bi-chevron-down"></i>
              </h4>
              {showStatusFilter && (
                <div>
                  {["Active", "Inactive", "Blocked", "Suspended"].map(
                    (status) => (
                      <label key={status}>
                        <input
                          type="checkbox"
                          checked={filterCriteria.statuses.includes(status)}
                          onChange={() =>
                            handleFilterChange("statuses", status)
                          }
                        />
                        {status}
                      </label>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default UserList;
