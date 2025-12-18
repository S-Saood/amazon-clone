import React from 'react'
import './PaymentSuccess.css'
import {useLocation } from 'react-router-dom'

function PaymentSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference")

  
  return (
    <div className="payment-success-continer">
      <div className="payment-success-card">
        <h1 className="payment-success-title">Payment Successful</h1>
        <p className="payment-success-message">Thank you for your payment, your transaction was successfull !</p>
        {
          reference && (
            <p className="payment-success-reference">
              <strong>Reference Id:</strong>{reference}
            </p>
          )
        }
      </div>
    </div>
  )
}

export default PaymentSuccess