# Cafe Cohort

## Business Overview
This app is intended to help small cafe owners better manage thier inventory and ultimately shop better by being more informed.  We aim to replace the humble clipboards and shpreadsheets used in routine inventory tasks and the construction shopping lists on paper and text messages.  The app will be equally usable on the laptop, tablet, or phone becase we want users to use whatever platform is available to them.

## MVP Scope
### Inventory Item
These are things that a cafe would want to keep track of on a regular basis, e.g. produce, ketchup bottles, paper cups, cleaning supplies.  An inventory item will store:
1. name
2. description
3. par amount
4. current stock level
5. a reference to a Product

### Product
A product is a universal representation of tangile item that can be purchased.  Wheareas an ketchup bottle may be an inventory item, an product will be a specific brand and size of ketchup bottle. Products have the following properties
1. name
2. brand
3. size or quanity count
4. sku number
5. price history

Price history is an array of maps used to detail the existing price of a product and track it's trending prices.  As such, a price history array element will contain the following:
1. price
2. date of price
3. who recorded the price
4. supplier where the price was observed

### Supplier
Prices are specific to a product and a supplier.  We use the Supplier document to describe who and where the supplier is.  This is important becasue prices can vary from location to location even between stores of the same brand.  Suppliers may also be specialty distributors because not all items at a cafe are puchased at a warehouse storefront.  As such, the supplier elements are summarized as:
1. name
2. description
3. nickname
2. address
3. contact information


### Funcationality overview
The MVP will focus on 2 primary use cases, the ability to manage inventory within a cafe and the ability to shop based on an inventory list.  All other functionally is created to support these 2 primary use cases. 



## Technology Overview
This is a serverless web app that uses React and Redux on the front end and Google's Authentication, Cloud Firestore, and Hosting on the back end.  We are also using Meterialize (https://materializecss.com) as a CSS framework.

## Installed libraries
- `npx create-react-app beankount-proto`
- `npm install react-router-dom`
- `npm install redux react-redux`
- `npm install redux-thunk`
- `npm install firebase`
- `npm install react-redux-firebase redux-firestore`
- `npm install moment` /* For timedate formatting */
- `npm install -g firebase-tools`


## To deploy app
1. Run the produciton build command, this will build an optimzed version of the site and put it in the `build` diretory
- `npm run-script build`
2. Initialize firebase with the following command.  Do this only when you set up firebase tools the first time or if you want to make a change to the configuration.
  - `firebase init`
  - Select the project option
  - Enter the deploy folder as "build"
  - Enter "y" for one page app URL rewrite
  - Enter "n" to overwrite the index.html
3. Run the following command to deploy the application
  `firebase deploy`
  