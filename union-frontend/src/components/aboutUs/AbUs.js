import {React} from "react";
import "./AboutUs.css";
import ring1 from "../../img/ring1.jpg";

function AbUs() {

  const style = {
    background: "linear-gradient(to bottom, #fed5cf 60vh , white 40vh)",
    minHeight: "100vh",
  };

  return (
    <div style={style}>
      <div className="about-us-container">
        <section className="aboutush">
          <div className="about-us-header">
            <h1>About Us</h1>
            <h2>Here to help you get married</h2>
            <br></br>
          </div>
          <center>
            <img src={ring1} alt="About Us" className="about-us-image" />
          </center>
        </section>
        <div className="about-us-text">
          <center>
            <p className="about-us-text">
              Welcome to our online civil marriage website, where we help
              couples from different countries to legally and officially tie the
              knot. Our platform is designed to make the process of getting
              married between different countries as smooth and easy as
              possible, so you can focus on what really matters: your love and
              commitment to each other.
            </p>
            <p className="about-us-text">
              Our mission is to make civil marriage accessible and inclusive for
              everyone, regardless of their nationality, gender, or cultural
              background. We believe that love knows no borders, and we are
              committed to making it possible for couples to celebrate their
              love and commitment in a meaningful and legally recognized way.
            </p>
            <p className="about-us-text">
              At our core, we are a team of passionate and experienced
              professionals who are dedicated to providing the best possible
              service to our clients. We understand the complexities and
              challenges of cross-border marriage, and we are here to guide and
              support you every step of the way.
            </p>
            <p className="about-us-text">
              Our platform is built using the latest technology, including
              ReactJS, to ensure that our website is fast, reliable, and
              user-friendly. We have also prioritized security and privacy, so
              you can trust that your personal information is safe and secure.
            </p>
            <p className="about-us-text">
              We are proud to be a part of the global movement towards greater
              inclusivity and acceptance, and we are committed to making civil
              marriage more accessible and equitable for all. Thank you for
              considering us for your civil marriage needs, and we look forward
              to helping you start your new life together.
            </p>
            <p className="about-us-text">
              Sincerely,
              <br />
              The Union Team
            </p>
          </center>
        </div>
      </div>
    </div>
  );
}

export default AbUs;
