import React from "react";
import "./Sidebar.css";
import Group937 from "../Images/Group937.png";
import Group598 from "../Images/Group598.png";
import Group939 from "../Images/Group939.png";
import Group940 from "../Images/Group940.png";

const Sidebar = () => {
  return (
    <div className="leftSide">
      <ul className="logoContainer">
        <li className="logo">
          <img
            src="https://s3-alpha-sig.figma.com/img/c934/4e71/502cb7d9ce56851160e1de494892bacc?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P5cdMGeT4YtuBKNYpkp4xrbHujd0j26nCwhtgeGY7TIgBYTyA6LSw5aYm203hMaZWxLS4WbReVAV7pVAvFl0bhWxsZ2E3xPOF9JjsFsy4JPuNUpA81~gIXG55wMwXb92E8Z0UrNsD8fa3wB1m0QFXt3Li3WMIIexTciAFTeLpL0Q3Fi5bC6~fOuohJv~rd78KStJYZ5eRsISaSCov9JizeZPJQPLbZ0e2g1v45Mk6ctULUf0BQHnwS7pOJBFw235Oj8MUTQ88px~86nXvg3DQzXjDuBirVj2E15KlJt4y7C1hH-v2YDsTl-hpv7un1XbMzzXxS7gwRffuOwq3O6bqg__"
            alt=""
            height="50"
            width="50"
            className="white-filter"
          />
        </li>
        <li className="logo">
          <p>QMS</p>
        </li>
        <i id="hamburgerIcon" className="bi bi-list"></i>
      </ul>

      <div className="leftCategory">
        <ul className="categoryLogos">
          <li>
            <img src={Group937} alt="Group 937" />
            Teachers
          </li>
          <li>
            <img src={Group939} alt="Group 938" />
            Department
          </li>
          <li>
            <img src={Group940} alt="Group 939" />
            Library
          </li>
          <li>
            <img src={Group598} alt="Group 940" />
            Add Teacher
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
