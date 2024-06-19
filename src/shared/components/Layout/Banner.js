import { useEffect, useState } from "react";
import { getAds } from "../../../services/Api";

const Banner = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    getAds()
      .then((data) => {
        const banners = data?.data?.ads.filter(ad => ad.ads_type === 'banner');
        setBanner(banners);
      })
      .catch(error => {
        console.error('Error fetching ads:', error);
      });
  }, []);

  return (
    <>
      {/* Slider */}
      <div id="slide" className="carousel" data-ride="carousel">
        {/* Indicators */}
        <ul className="carousel-indicators">
          {banner.map((ad, index) => (
            <li
              key={index}
              data-target="#slide"
              data-slide-to={index}
              className={index === 0 ? "active" : ""}
            />
          ))}
        </ul>
        {/* The slideshow */}
        <div className="carousel-inner ">
          {banner.map((ad, index) => (
            <div
              key={index}
              className={`carousel-item  ads ${index === 0 ? "active" : ""}`}
            >
              <img className="ads-image" src={ad.ads_image} alt={ad.ads_name} />
            </div>
          ))}
        </div>
        {/* Left and right controls */}
        <a className="carousel-control-prev" href="#slide" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#slide" data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>
      </div>
      {/* End Slider */}
    </>
  );
};

export default Banner;
