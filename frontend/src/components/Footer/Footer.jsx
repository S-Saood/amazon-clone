import React from 'react'
import './Footer.css';
import amazon from '../../assets/amazon.png'
import { Link } from "react-router-dom";


function Footer() {
  return (
    <div>
    <footer>
      <div className="footer-top">
        <p>Back to top</p>
      </div>
      <div className="footer-middle-container">
      <div className="footer-middle">
        <div className="footer-mid-text-a">
          <div className="box-1">
            <div className="box-grid">
              <h3 className="heading-f">Get to know Us</h3>
              <a className="hover-link">About</a>
              <a className="hover-link">About Amazon</a>
              <a className="hover-link">Careers </a>
              <a className="hover-link">Press Release</a>
              <a className="hover-link">Amazon Science</a>
            </div>
          </div>
        </div>
        <div className="footer-mid-text-b">
          <div className="box-2">
            <div className="box-grid">
              <h3 className="heading-f">Connect with Us</h3>
              <a className="hover-link">Facebook</a>
              <a className="hover-link">Twitter </a>
              <a className="hover-link">instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-mid-text-c">
          <div className="box-3">
            <div className="box-grid">
              <h3 className="heading-f">Make money with Us</h3>
              <a className="hover-link">Sell on Amazon</a>
              <a className="hover-link">Sell under Amazon Accelerator </a>
              <a className="hover-link">Protect and built Your brand</a>
              <a className="hover-link">Amazon Global Selling</a>
              <a className="hover-link">Supplu to Amazon</a>
              <a className="hover-link">Become an affilate</a>
              <a className="hover-link">FUlfillment by Amazon</a>
              <a className="hover-link">Advertise Your Product</a>
              <a className="hover-link">Amazon Pay on Merchants</a>
            </div>
          </div>
        </div>
        <div className="footer-mid-text-d">
          <div className="box-4">
            <div className="box-grid">
              <h3 className="heading-f">Let Us Help You</h3>
              <a className="hover-link">Your Account</a>
              <a className="hover-link">Returns Center </a>
              <a className="hover-link">Returns and Product Safety Alerts</a>
              <a className="hover-link">100% Purchase protection</a>
              <a className="hover-link">Amazon App Dowload</a>
              <a className="hover-link">Help</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-button-area">
        <div className="footer-button-logo">
          <img className="footer-logo" src={amazon}/>
          </div>
        <Link to="/admin"><button className="btn-footer-middle"><p>Admin</p></button>
        </Link>
        <button className="btn-footer-middle"><p>India</p></button>
      </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-text-a">
          <div className="footer-content">
              <a className="hover-link" href="#">
              <p className="bb">AbeBooks</p>
              <p>Books, art</p>
              <p>& collectibles</p>
              </a>
            </div>
          <div className="footer-content">
              <a className="hover-link" href="#">
              <p className="bb">Amazon Web Services</p>
              <p>Scable Cloud</p>
              <p>Computing Services</p>
              </a>
            </div>
        </div>
        <div className="footer-bottom-text-a">
          <div className="footer-content">
              <a className="hover-link" href="#">
              <p className="bb">Audible</p>
              <p>Download</p>
              <p>Audio Books</p>
              </a>
            </div>
            <div className="footer-content">
              <a className="hover-link" href="#">
              <p className="bb">IMDb</p>
              <p>Movies, TV</p>
              <p>& Celecrities</p>
              </a>
            </div>
        </div>
        <div className="footer-bottom-text-b">
          <div className="footer-content">
              <a className="hover-link" href="#">
              <p className="bb">Shopbob</p>
              <p>Designer</p>
              <p>Fashion Brande</p>
              </a>
            </div>
            <div className="footer-content">
              <a className="hover-link" href="#">
              <p className="bb">Amazon Business</p>
              <p>Everything For</p>
              <p>Your Business</p>
              </a>
            </div>
        </div>
        <div className="footer-bottom-text-b">
          <div className="footer-content">
              <a className="hover-link" href="#">
              <p className="bb">Prime Now</p>
              <p>2-Hour Delivery</p>
              <p>on Everyday Items</p>
              </a>
            </div>
            <div className="footer-content">
              <a className="hover-link" href="#">
              <p className="bb">Amazon Prime Music</p>
              <p>100 million songs, ad-free</p>
              <p>Over 15 million podcast episode</p>
              </a>
            </div>
        </div>
      </div>
      <div className="copy-right-area">
        <div className="footer-bottom-child-a">
              <a className="hover-link bb">Consitions of Use & Sales</a>
              <a className="hover-link bb">Privacy Notice</a>
              <a className="hover-link bb">Interest-BAsed Ads</a>
        </div>
        <div className="footer-bottom-child-b chil-b"><p className="copyright">&copy; 1996-2025, Amazon.com, Inc.or its affiliates</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer