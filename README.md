# My eCommerce Marketplace

## Introduction

This is an eCommerce application built in ReactJS which utilises Google Firestore for persistent backend data storage. It contains pages for products, favourites and a cart system. Users can favourite products, add items to the cart and change the quantity/remove products from the cart.

<img width="1024" alt="Marketplace Frontpage" src="https://user-images.githubusercontent.com/100544978/169759437-134d6867-b72f-43df-9e7f-95a443cc3aec.png">

## Implementation

I started this project by initially finding an API with dummy product info that I could populate my website with. Then I created functions to fetch the required data from the API and link it to my Firestore DB. Once I was able to successfully get the data in a usable format, I worked on building the first iteration of the design which simply rendered each product as a card in a grid.

After that, I worked on the featured products carousel which proved to be difficult initially. Fortunately, I found a useful resource for plain HTML carousels which I was able to refactor for React after some trouble-shooting. This process gave me a much greater understanding of the difference between basic HTML/JS and React. Next I built a basic product page where I utilised a URL parameter for the product ID.

I returned to the project a couple weeks after completing the MVP as I was eager to attempt the bonus of creating a functioning cart system and storing it's data in Firestore. This required me to plan out the logic beforehand so I could identify the steps and checks I needed for the cart to work as desired. Before I started, I decided to first implement a navbar with Font Awesome icons as well as a favourites page for added functionality.

Once I had a way to navigate through my site with the navbar, I was ready to tackle the cart page. First, I created an add-to-cart button on the product page with a size dropdown selector and then I was able to render the list of cart products. As I implemented more features, I created additional CRUD functions to interact with the DB to ensure the backend was synchronised. Lastly, I worked on the stock level of the products, which I stored as a value in the backend, and successfully added checks before increasing the quantity of an item in the cart. After completing the bonus, the project had finally reached a state of which I was satisfied with and proud of.

## Requirements

### MVP

Home Page

-   [x] Grid of products
-   [x] Carousel of featured products

Product Page

-   [x] Uses an ID parameter, allows adding to the cart and selecting product variants

All products should contain the following information:

-   [x] quantity
-   [x] variants (colors, sizes, etc)
-   [x] price per unit
-   [x] name
-   [x] image URL
-   [x] favourited or not

Backend

-   [x] All data should be stored in Firestore and fetched by the frontend, there should be no static product data in the React application.

### Bonus

-   [x] Use Firestore and React to create a cart system
-   [x] Create a cart page in your React app
-   [x] Add logic to prevent users from adding items to cart that are no longer in stock

The cart page should contain the following:

-   [x] List of products in cart
-   [x] Ability to change the quantity of products in cart
-   [x] Ability to remove items from cart

## Future of the Project

To extend this application further, I would add more variants for each product such as colour and fit as well as let the user select a specific quantity when adding items to the cart. I also wish to support additional types of products with a way to filter by different categories and implement a searchbar for the user to locate desired items.

Finally, I could simulate a checkout process by letting the user input address details and then generating an order number and providing user feedback that the order has successfully been placed. After that, the orders would be saved in the DB and a new page could be implemented to allow the user to view their previous order statuses.

## Resources

[Fake Store API](https://fakestoreapi.com/)

[Font Awesome Icons](https://fontawesome.com/)

[HTML Carousel](https://appcode.app/how-to-create-an-html-carousel/)
