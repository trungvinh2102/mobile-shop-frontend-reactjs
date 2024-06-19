import { useEffect, useState } from "react";
import { getAds } from "../../../services/Api";

const Sidebar = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getAds()
      .then((data) => {
        const sliders = data?.data?.ads.filter(ad => ad.ads_type === 'slider');
        setSlider(sliders);
      })
      .catch(error => {
        console.error('Error fetching ads:', error);
      });
  }, []);
  return (
    <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
      <div id="banner">
        {
          slider.map((ad, index) =>
            <div key={index} className="banner-item">
              <a href="/">
                <img className="img-fluid slider" src={ad.ads_image} alt={ad.ads_name} />
              </a>
            </div>
          )
        }


      </div>
    </div>
  );
};
export default Sidebar;
