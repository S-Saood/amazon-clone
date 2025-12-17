import React, { useState } from "react";
import "./Payment.css";

function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("upi");

  return (
    <div className="payment-wrapper">

      {/* HEADER */}
      <header className="payment-header">
        <h3 className="title">Complete Payment</h3>
      </header>

      <div className="payment-container">

        {/* LEFT SIDE → Payment Options */}
        <div className="payment-left">

          

          <div className="payment-options">

            {/* UPI */}
            <div 
              className={`option-box ${selectedMethod === "upi" ? "active" : ""}`}
              onClick={() => setSelectedMethod("upi")}
            >
              <div className="left">
                <span className="icon">🏦</span>
                <h4>UPI</h4>
                <p>Pay by any UPI app</p>
                <p className="green">Get upto ₹50 cashback • 4 offers available</p>
              </div>
            </div>

            {/* CARD */}
            <div 
              className={`option-box ${selectedMethod === "card" ? "active" : ""}`}
              onClick={() => setSelectedMethod("card")}
            >
              <div className="left">
                <span className="icon">💳</span>
                <h4>Credit / Debit / ATM Card</h4>
                <p>Add and secure cards as per RBI guidelines</p>
                <p className="green">Get upto 5% cashback • 2 offers available</p>
              </div>
            </div>

            {/* COD */}
            <div 
              className={`option-box ${selectedMethod === "cod" ? "active" : ""}`}
              onClick={() => setSelectedMethod("cod")}
            >
              <div className="left">
                <span className="icon">📦</span>
                <h4>Cash on Delivery</h4>
              </div>
            </div>

            {/* GIFT */}
            <div 
              className={`option-box ${selectedMethod === "gift" ? "active" : ""}`}
              onClick={() => setSelectedMethod("gift")}
            >
              <div className="left">
                <span className="icon">🎁</span>
                <h4>Have a Flipkart Gift Card?</h4>
              </div>
            </div>

            {/* EMI */}
            <div className="option-box disabled">
              <div className="left">
                <span className="icon">📅</span>
                <h4>EMI</h4>
              </div>
              <p className="disabled-text">Unavailable</p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE → UPI / Details + Summary */}
        <div className="payment-right">

          {/* Dynamic Right Box */}
          <div className="right-box">

            {selectedMethod === "upi" && (
              <>
                <h4>Add new UPI ID</h4>
                <label>UPI ID</label>
                <div className="upi-input">
                  <input type="text" placeholder="Enter your UPI ID" />
                  <button className="verify-btn">Verify</button>
                </div>
                <button className="pay-btn">Pay ₹288</button>
              </>
            )}

            {selectedMethod === "card" && (
              <>
                <h4>Enter Card Details</h4>
                <input type="text" placeholder="Card Number" />
                <input type="text" placeholder="MM/YY" />
                <input type="text" placeholder="CVV" />
                <button className="pay-btn">Pay ₹288</button>
              </>
            )}

            {selectedMethod === "cod" && (
              <>
                <h4>Cash on Delivery</h4>
                <p>Pay when your order arrives.</p>
                <button className="pay-btn">Place Order</button>
              </>
            )}

            {selectedMethod === "gift" && (
              <>
                <h4>Redeem Gift Card</h4>
                <input type="text" placeholder="Enter Gift Card Code" />
                <button className="pay-btn">Apply</button>
              </>
            )}

          </div>

          {/* Summary */}
          <div className="price-card">
            <h4>Price (1 item)</h4>
            <p className="row"><span>Item Price</span> <span>₹281</span></p>
            <p className="row"><span>Platform Fee</span> <span>₹7</span></p>

            <hr />

            <p className="row total">
              <span>Total Amount</span> 
              <span>₹288</span>
            </p>

            <div className="cashback-box">
              <p className="green">5% Cashback</p>
              <p className="small">Claim now with payment offers</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
