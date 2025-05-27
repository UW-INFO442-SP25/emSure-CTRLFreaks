import React from 'react';

const AboutPage = () => {
  const team = [
    { name: "Maryory Ajpop", role: "Developer", img: "/imgs/maryory-pfp.JPG" },
    { name: "Jason Cabusao", role: "UX Designer & Developer", img: "/imgs/simran-pfp.png" },
    { name: "Lei Ann Dela Cruz", role: "UX Designer & Developer", img: "/imgs/simran-pfp.png" },
    { name: "Simran Gupta", role: "Researcher", img: "/imgs/simran-pfp.png" },
    { name: "Dawn Nguyen", role: "Project Manager", img: "/imgs/dawn-pfp.png" }
  ];

  return (
    <div className='bg-container about'>
      <div className='bg-gradient'></div>
      <div className="aboutpage-main-passage">
        <div className="aboutpage-mission">
          <div className="aboutpage-mission-text">
            <h1>Our mission</h1>
            <p>
              How might we support newly employed individuals in confidently understanding and selecting healthcare insurance plans, so they feel secure in their coverage? 
            </p>
            <br />
            <p>
              We focused on tackling SDG Goal 3: Good Health and Well-Being, with the hope of increasing access to “quality health services without facing financial hardship.” 
           
              Through empowering individuals to navigate employer-based healthcare options with clarity, we aim to reduce these barriers, build confidence, and promote equitable, informed decision-making in accessing these health services.
            </p>
          </div>
          <div className="aboutpage-mission-video">
            <iframe 
              // width="560" 
              // height="315" 
              src="https://www.youtube.com/embed/_J8lkDUStAw?si=7DuneENoUKeFQvhp&amp;start=1" 
              title="YouTube video player"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen>
            </iframe>
          </div>
        </div>

        <div className="aboutpage-team"> 
          <h2>Meet the team behind <span className='emsured'>emSured</span></h2>
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