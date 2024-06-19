const Footer = () => {
  return (
    <>
      <div id="footer-top">
        <div className="container">
          <div className="row">
            <div id="logo-2" className="col-lg-3 col-md-6 col-sm-12">
              <h2>
                <a href="/">
                  <img alt="img" className="img-fluid" src="images/logo-header.jpg" />
                </a>
              </h2>
              <p>
                MobileShop cung cấp những sản phẩm chất lượng và chất lượng
                dịch vụ tuyệt vời. Giao hàng cẩn thận và nhanh chóng. Giải
                quyết những vấn đề nhanh gọn và hiệu quả.
              </p>
            </div>
            <div id="address" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Địa chỉ</h3>
              <p>15/85 Ngõ Gốc Đề, Hoàng Văn Thụ, Hoàng Mai, Hà Nội</p>
            </div>
            <div id="service" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Dịch vụ</h3>
              <p>Bảo hành rơi vỡ, ngấm nước Care Diamond</p>
              <p>Bảo hành Care X60 rơi vỡ ngấm nước vẫn Đổi mới</p>
            </div>
            <div id="hotline" className="col-lg-3 col-md-6 col-sm-12">
              <h3>Hotline</h3>
              <p>Phone Sale: (+84) 961995171</p>
              <p>Email: trungvinhh21202@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      {/*	Footer	*/}
      <div id="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p>
                2024 © MobileShop. All rights reserved. Developed by
                Nguyen Trung Vinh
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*	End Footer	*/}
    </>
  );
};
export default Footer;
