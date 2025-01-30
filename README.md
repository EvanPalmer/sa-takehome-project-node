# Evan's Stripe SA Assignment
This is Evan's application for the take home SA Assignmenet for Stripe

## How to build, configure and run
- Add products in dashboard
- Add products in code
- Set envronment variables
- Confirm port and localhost

## The Solution
### How it works

### Whick APIs

### How is it architected

## My Approach
### How did you approach this problem? 
1. Read requirements from Izzy
 - Selected Node because of the lanugages supported I'm most familiar with JavaScript
 - I considered building with .Net and C#
 - Noted that I'll need to keep track of a few things, like my approach and considerations for production, so started taking notes as I went along.

2. Read GitHub Instrucstions
 - Noting I'll need to familiarise myself with Express Framework and the Stripe SDK

3. I forked, cloned and installed from the git repo

4. Open in VS Code
 - Update keys form my dashboard
 - Installed **nodemon** and **dotenv**
 - Have a glance at the source code structure, which looks straight forward with app.js and some views.
		
5. Run application
 - I just wanted to get an understanding of the base state I'm working with
 - The site is super clear regarding what needs to be done

6. Review Stripe install docs
 - Discovered and installed Stripe for Visual Studio Code
 - Installed CLI
 - This was really because I was interested in the developer tooling, and was impressed by the quality I found!
 - Noted that there are several ways to implement this. I'll try a few, but suspect I'll land on Embedded form. 
	- Low code
  - Stripe Hosted Page
	- Embedded Form
	- Advanced integration
 - Decided to start with the most basic method and iterate. So I built it with Low Code, which was trivial. Then the Stripe Hosted-Page. Then the Embedded Form, Then I used Stripe Elements. 
 - ** According to the instructions I need to build this using <ins>Stipe Elements</ins>. I didn't realise ths was a proper noun! So started looking into each different way to build this with Stripe.

7. Review Express Framework
 - Super simple, but I just quickly checked in on the basics.

8. Review Dashboard, in particular Product Calalog and Pricing

### Which docs did you use to complete the project? 

1. Low Code: https://docs.stripe.com/no-code
2. Stripe Hosted: https://docs.stripe.com/checkout/quickstart
3. Embedded Form: https://docs.stripe.com/checkout/embedded/quickstart
4. Stripe Elements: https://docs.stripe.com/payments/payment-element

### What challenges did you encounter?
- Major challenge was having a baby in the middle of my prep! But that was a good challenge and not unexpected :)
- I've written production JavaScript in my life as a developer, so comfortable with the syntax, but I've never professionally built back end Node applications, so there was a slight learning curve.
  - For example, I wasn't sure of the best way to attach associate the client side code with a Handlebars template or route. I'm still note sure I followed best practice here.
- When I realised I needed to build with Stripe Elements, I had to take a step back and understand the payment intent API as I didn't use that for other builds.

## Productionize and TODO
_How you might extend this if you were building a more robust instance of the same application._

My build is clearly not production ready. I'll break this up into two sections: Productionize and TODO.

1. Productionize
This is work that would be required or highly recommened for a real build, but I wouldn't set this up for the assignment.

- Deploy pipeline
- ERP/Caltalog integration
- Unit and functional test coverage
- Production banking etc details in Stripe dashboard
- SSL

2. TOO
This is work that I would like to do if I had a little more time. 
- Better responses for success and cancel
	- could be a single page
- Better styling
- Better error handling eg: on the query string
- CLient side code is a bit naff. I mentioned earlier that I'm not sure I followed best practice, so I'd proably ask for a peer review from someone with more experience here.
- customise look and feel

## How to build, configure and run
You'll receive these in email.

## Application overview
This demo is written in Javascript (Node.js) with the [Express framework](https://expressjs.com/). You'll need to retrieve a set of testmode API keys from the Stripe dashboard (you can create a free test account [here](https://dashboard.stripe.com/register)) to run this locally.

We're using the [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/) CSS framework. It's the most popular CSS framework in the world and is pretty easy to get started with — feel free to modify styles/layout if you like. 

To simplify this project, we're also not using any database here, either. Instead `app.js` includes a simple switch statement to read the GET params for `item`. 

To get started, clone the repository and run `npm install` to install dependencies:

```
git clone https://github.com/mattmitchell6/sa-takehome-project-node && cd sa-takehome-project-node
npm install
```

Rename `sample.env` to `.env` and populate with your Stripe account's test API keys

Then run the application locally:

```
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the index page.
