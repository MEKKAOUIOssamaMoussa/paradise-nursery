# 🌿 Paradise Nursery

**Paradise Nursery** is a front-end shopping application for an online houseplant store — *where green meets serenity*. Users can browse a curated collection of houseplants, add them to a shopping cart, adjust quantities, and review the total cost before checkout.

Built with **React**, **Redux Toolkit** and **Vite**, and deployed with **GitHub Pages**.

## ✨ Features

### Landing page
- Full-screen background image
- Company name and tagline
- Paragraph about the company (`AboutUs` component)
- **Get Started** button that opens the product listing page

### Product listing page
- 19 unique houseplants grouped into **3 categories**:
  - Air Purifying Plants
  - Aromatic Fragrant Plants
  - Low Maintenance Plants
- Each plant shows a thumbnail, name, description and price
- **Add to Cart** button that is disabled once the plant is in the cart
- Sticky header with navigation to **Home**, **Plants** and **Cart**
- Cart icon with a badge that shows the total number of items, updated live

### Shopping cart page
- Total number of plants and total cart amount
- For every plant type: thumbnail, name, unit price and subtotal
- **+ / −** buttons to change quantities (updates every total and the header badge)
- **Delete** button to remove a plant type
- **Checkout** button (shows a *Coming Soon* message)
- **Continue Shopping** button that returns to the product listing page

## 🗂️ Project structure

```
src/
├── App.jsx          # Landing page + switch to product listing
├── App.css          # Landing page styles (background image)
├── AboutUs.jsx      # Company description
├── ProductList.jsx  # Navbar, plant catalogue, add-to-cart
├── CartItem.jsx     # Shopping cart page
├── CartSlice.jsx    # Redux slice: addItem, removeItem, updateQuantity
├── store.js         # Redux store
└── main.jsx         # App entry, wraps <App /> in the Redux <Provider>
```

## 🚀 Getting started

```bash
npm install
npm run dev        # start the dev server
npm run build      # production build
npm run deploy     # build and publish to GitHub Pages
```

## 🛠️ Tech stack

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)
- [Vite](https://vite.dev/)
- [gh-pages](https://github.com/tschaub/gh-pages)

## 📸 Image credits

Some plant photos are from [Pixabay](https://pixabay.com/) and [Unsplash](https://unsplash.com/) under their free-to-use licenses. The rest were AI-generated for this project.
