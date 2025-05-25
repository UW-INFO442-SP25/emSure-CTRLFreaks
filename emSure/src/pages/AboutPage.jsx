import React from 'react';

const AboutPage = () => {
  const team = [
    { name: "Simran Gupta", role: "Lead Researcher & Database", img: "/imgs/simran.jpg" },
    { name: "Jason Cabusao", role: "Lead UX Designer & Developer", img: "/imgs/member2.jpg" },
    { name: "Maryory Ajpop", role: "Lead Developer", img: "/imgs/member3.jpg" },
    { name: "Dawn Nguyen", role: "Lead PM", img: "/imgs/dawn.jpg" },
    { name: "Lei Ann Dela Cruz", role: "Lead UX Designer & Developer", img: "/imgs/member5.jpg" },
  ];

  return (
    <div>
      <div className="aboutpage-main-passage">
        <div className="aboutpage-mission">
          <div className="aboutpage-mission-text">
            <h1>Our mission</h1>
            <p>
              How might we support newly employed individuals in confidently understanding and selecting healthcare insurance plans, so they feel secure in their coverage? 
              We focused on SDG Goal 3: Good Health and Well-Being, specifically with the hope of increasing access to “quality health services without facing financial hardship.” 
              Through empowering individuals to navigate employer-based healthcare options with clarity, we aim to reduce these barriers, build confidence, and promote equitable, informed 
              decision-making in accessing these health services.
            </p>
          </div>
          <div className="aboutpage-mission-img"></div>
        </div>

        <div className="aboutpage-team"> 
          <h2>Meet the team behind emSured</h2>
          <div className="aboutpage-team-members">
            {team.map((member, index) => (
                <div className="aboutpage-member" key={index}>
                <div className="aboutpage-member-photo">
                  <img src={member.img} alt={member.name} />
                </div>
                <strong>{member.name}</strong>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;