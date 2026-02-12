import React, { useState } from "react";
import "./Profile.css";

const creators = [
  { id:1, name:"Riya Sharma", followers:"128K", niche:"Fashion & Lifestyle", price:5000, posts:420, img:"https://i.pravatar.cc/300?img=5" },
  { id:2, name:"Aman Verma", followers:"210K", niche:"Tech Reviews", price:8000, posts:610, img:"https://i.pravatar.cc/300?img=12" },
  { id:3, name:"Neha Kapoor", followers:"95K", niche:"Beauty & Skincare", price:4500, posts:300, img:"https://i.pravatar.cc/300?img=25" },
  { id:4, name:"Karan Mehta", followers:"300K", niche:"Fitness", price:9000, posts:520, img:"https://i.pravatar.cc/300?img=15" },
  { id:5, name:"Simran Kaur", followers:"150K", niche:"Travel Vlogs", price:7000, posts:480, img:"https://i.pravatar.cc/300?img=32" },
  { id:6, name:"Rahul Jain", followers:"80K", niche:"Food Reviews", price:4000, posts:260, img:"https://i.pravatar.cc/300?img=45" },
];

const Profile = ({ onBook }) => {

  const [page,setPage] = useState(0);
  const creatorsPerPage = 3;

  const start = page * creatorsPerPage;
  const visibleCreators = creators.slice(start, start + creatorsPerPage);

  const nextPage = () => {
    if((page+1)*creatorsPerPage < creators.length)
      setPage(page+1);
  };

  const prevPage = () => {
    if(page>0)
      setPage(page-1);
  };

  return (
    <div className="profile-page">

      <div className="marketplace-box">

        <h1 className="marketplace-title">Choose an Influencer</h1>
        <p className="marketplace-sub">
          Compare creators and start a secure escrow campaign
        </p>

        {/* CREATOR GRID */}
        <div className="creator-grid">

          {visibleCreators.map((creator)=>(
            <div className="creator-card" key={creator.id}>

              <div className="creator-cover"></div>

              <img src={creator.img} className="creator-avatar" alt="" />

              <h2 className="creator-name">{creator.name}</h2>
              <p className="creator-niche">{creator.niche}</p>

              <div className="creator-stats">
                <span>{creator.posts} Posts</span>
                <span>{creator.followers} Followers</span>
                <span>4.8★</span>
              </div>

              <div className="creator-price">
                ₹{creator.price}
              </div>

              <button className="book-btn" onClick={onBook}>
                Book Now
              </button>

            </div>
          ))}

        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button onClick={prevPage} disabled={page===0}>← Previous</button>
          <button onClick={nextPage} disabled={(page+1)*creatorsPerPage>=creators.length}>
            Next →
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;
