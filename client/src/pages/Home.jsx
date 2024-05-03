import { Analytics } from "../components/Analytics"

export const Home=()=>{
    return (
        <>
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p className="herop1">We are the best World IT company</p>
                        <h1>Welcome to Tech Solutions Inc.</h1>

                        <p className="herop">
                            Are you ready to take your business to the next level with cutting edge IT solutions? 
                            Look  no further! At thapa technical we specilaize  in providing innovative IT services &
                            solutions tailored to meet your unique needs.

                        </p>
                        <div className="btnhome">
                            <a href="/contact">
                                <button className="btn">
                                    Connect Now
                                </button>
                            </a>
                            <a href="/service">
                                <button className="secondary-btn">
                                    Learn more
                                </button>
                            </a>
                        </div>
                    </div>
                    {/* hero images */}
                    <div className="hero-image">
                        <img src="/images/home.png" className="hero-img" alt="coding together" width="400 " height="500"/>
                    </div>
                </div>
            </section>
            {/* 2nd section */}
            <Analytics/>
            {/* <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>50+</h2>
                        <p>registered companies</p>
                    </div>
                    <div className="div1">
                        <h2>100,00+</h2>
                        <p>Happy clients</p>
                    </div>
                    <div className="div1">
                        <h2>500+</h2>
                        <p>Well known developers</p>
                    </div>
                    <div className="div1">
                        <h2>24/7</h2>
                        <p>services</p>
                    </div>
                    
                </div>
            </section> */}

            {/* 3rd section  */}
      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/design.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p className="herop">We are here to help you</p>
            <h1>Get Started Today</h1>
            <p className="herop">
              Ready to take the first step towards a more efficient and secure
              IT infrastructure? Contact us today for a free consultation and
              let's discuss how Thapa Technical can help your business thrive in
              the digital age.
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/service">
                <button className="secondary-btn ">learn more</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    
        </main>
        </>
    )
}