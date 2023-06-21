import React from 'react';
import "./newsletter.css";
import news from "../../img/newsletter-black.png";

function Newsletter() {


  return (
    <section className="newsletter">
       <img src={news} height="80" width="80" />

      <p className="newsletter-text">
        If you wish to subsribe to our newsletter please enter your email in the
        form below!
      </p>
      <form className="newsletter_form" action="#" method="POST">
        <input
          className="input-secondary-white input-secondary input-secondary-big"
          type="email"
          placeholder="Please enter an email"
          name="email"
          id="email"
          required
        />

        <button className="btn-primary" type="submit" name="submit" id="submit">Submit</button>
        


      </form>
    </section>
  );
}

export default Newsletter;
