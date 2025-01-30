/**
 * Clientside helper functions
 */

$(document).ready(function() {
  const stripe = Stripe("pk_test_51QkuCwFSYQio1CHoeN3Ijafdbnq2W08a969LrjuxOHla2D65wNYYs7CkVa8AhkD42ShBIbkYBr0C1qER8f8jrWOg00J5UjvAz4");
  
  var amounts = document.getElementsByClassName("amount");

  // iterate through all "amount" elements and convert from cents to dollars
  for (var i = 0; i < amounts.length; i++) {
    amount = amounts[i].getAttribute('data-amount') / 100;  
    amounts[i].innerHTML = amount.toFixed(2);
  }

  if($("#payment-status").length) initializeComplete();

  if($("#payment-form").length) { initializeCheckout();}
  
   function initializeCheckout() {
    // The items the customer wants to buy

    let elements;

    initialize();

    document
      .querySelector("#payment-form")
      .addEventListener("submit", handleSubmit);    

    // Fetches a payment intent and captures the client secret
    async function initialize() {
      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId : $("#itemPriceId").val() }),
      });
      const { clientSecret } = await response.json();

      const appearance = {
        theme: 'stripe',
      };
      elements = stripe.elements({ appearance, clientSecret });

      const paymentElementOptions = {
        layout: "accordion",
      };

      const paymentElement = elements.create("payment", paymentElementOptions);
      paymentElement.mount("#payment-element");
    }

    async function handleSubmit(e) {
      e.preventDefault();
      setLoading(true);
    
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/complete",
        },
      });
    
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        showMessage(error.message);
      } else {
        showMessage("An unexpected error occurred.");
      }
    
      setLoading(false);
    }

    // ------- UI helpers -------
    function showMessage(messageText) {
      const messageContainer = document.querySelector("#payment-message");

      messageContainer.classList.remove("hidden");
      messageContainer.textContent = messageText;

      setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
      }, 4000);
    }

    // Show a spinner on payment submission
    function setLoading(isLoading) {
      if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("#submit").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
      } else {
        document.querySelector("#submit").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
      }
    }

  }

  function initializeComplete(){
    // ------- UI Resources -------
    const SuccessIcon = 
    `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z" fill="white"/>
    </svg>`;

    const ErrorIcon = 
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z" fill="white"/>
    </svg>`;

    const InfoIcon = 
    `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 7C5.25 6.58579 5.58579 6.25 6 6.25H7.25C7.66421 6.25 8 6.58579 8 7V10.5C8 10.9142 7.66421 11.25 7.25 11.25C6.83579 11.25 6.5 10.9142 6.5 10.5V7.75H6C5.58579 7.75 5.25 7.41421 5.25 7Z" fill="white"/>
      <path d="M5.75 4C5.75 3.31075 6.31075 2.75 7 2.75C7.68925 2.75 8.25 3.31075 8.25 4C8.25 4.68925 7.68925 5.25 7 5.25C6.31075 5.25 5.75 4.68925 5.75 4Z" fill="white"/>
    </svg>`;

    // ------- UI helpers -------
    function setPaymentDetails(intent) {
      let statusText = "Something went wrong, please try again.";
      let iconColor = "#DF1B41";
      let icon = ErrorIcon;

      
      if (!intent) {
        setErrorState();
        return;
      }

      switch (intent.status) {
        case "succeeded":
          statusText = "Payment succeeded";
          iconColor = "#30B130";
          icon = SuccessIcon;
          break;
        case "processing":
          statusText = "Your payment is processing.";
          iconColor = "#6D6E78";
          icon = InfoIcon;
          break;
        case "requires_payment_method":
          statusText = "Your payment was not successful, please try again.";
          break;
        default:
          break;
      }
      
      document.querySelector("#status-icon").style.backgroundColor = iconColor;
      document.querySelector("#status-icon").innerHTML = icon;
      document.querySelector("#status-text").textContent= statusText;
      document.querySelector("#intent-id").textContent = intent.id;
      document.querySelector("#intent-status").textContent = intent.status;
      document.querySelector("#view-details").href = `https://dashboard.stripe.com/payments/${intent.id}`;
    }

    function setErrorState() {
      document.querySelector("#status-icon").style.backgroundColor = "#DF1B41";
      document.querySelector("#status-icon").innerHTML = ErrorIcon;
      document.querySelector("#status-text").textContent= "Something went wrong, please try again.";
      document.querySelector("#details-table").classList.add("hidden");
      document.querySelector("#view-details").classList.add("hidden");
    }

    checkStatus();

    // Fetches the payment intent status after payment submission
    async function checkStatus() {
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
    
      if (!clientSecret) {
        setErrorState();
        return;
      }
    
      const { paymentIntent } = await   (clientSecret);
    
      setPaymentDetails(paymentIntent);
    }
  }
})

