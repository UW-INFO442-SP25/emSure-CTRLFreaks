import React from 'react';
import '../index.css';

const team = [
    { name: "Simran Gupta", role: "UX Researcher", img: "/images/member1.jpg" },
    { name: "Name Two", role: "UI Designer", img: "/images/member2.jpg" },
    { name: "Name Three", role: "Frontend Developer", img: "/images/member3.jpg" },
    { name: "Name Four", role: "Backend Developer", img: "/images/member4.jpg" },
    { name: "Name Five", role: "Project Manager", img: "/images/member5.jpg" },
  ];

const AboutPage = () => {
  return (
    <div>
      <div className="main-passage">
        <div className="mission">
          <div className="mission-text">
            <h1>Our mission</h1>
            <p>
              How might we support newly employed individuals in confidently understanding and selecting healthcare insurance plans, so they feel secure in their coverage? 
              We focused on SDG Goal 3: Good Health and Well-Being, specifically with the hope of increasing access to “quality health services without facing financial hardship.” 
              Through empowering individuals to navigate employer-based healthcare options with clarity, we aim to reduce these barriers, build confidence, and promote equitable, informed 
              decision-making in accessing these health services.
            </p>
          </div>
          <div className="mission-img"></div>
        </div>

        <div className="team information"> 
          <h2>Meet the team behind emSured</h2>
          <div className="team-members">
            {team.map((member, index) => (
                <div className="member" key={index}>
                <div className="member-photo">
                  <img src={member.img} alt={member.name} />
                </div>
                <strong>member name</strong>
                <p>member role</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;