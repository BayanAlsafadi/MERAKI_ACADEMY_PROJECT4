import react from "react";
import poor from "./poorChild.jpeg"

const About = () => {
  return (
    <div>
      <div className="about">
        <div className="aboutImg">
          <img src={poor}></img>
        </div>
      </div>
    </div>
  );
};

export default About;