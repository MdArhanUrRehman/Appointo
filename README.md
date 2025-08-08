# What is ESM?
ESM stands for ECMAScript Modules — it is the official JavaScript module system, introduced in ES6 (2015).

Before ESM, Node.js (and most tools) used CommonJS (require, module.exports) to structure code.
But browsers had no built-in module system. So ESM was introduced to:
Work natively in browsers
Allow static analysis (faster bundling, tree shaking, better tooling)
Be the standard module system going forward

| Feature             | ESM (`import`)            | CommonJS (`require`)         |
| ------------------- | ------------------------- | ---------------------------- |
| Syntax              | `import` / `export`       | `require` / `module.exports` |
| File extension rule | `.js` must be specified   | Automatically resolved       |
| Execution           | Asynchronous (hoisted)    | Synchronous                  |
| Supported in        | Modern Node.js & Browsers | Node.js only                 |
| Tree-shaking        | ✅ Yes                     | ❌ No                         |
| Top-level await     | ✅ Yes                     | ❌ No (not supported)         |

# So how can you use CommonJS (require) in the browser?
You must use a bundler (like Webpack, Vite, Parcel) before shipping to the browser.
For example:
If you write:
const lodash = require('lodash');
Then Webpack will bundle it into something the browser can understand — converting it to ESM or browser-safe JavaScript.

#  What does this line do?
This line initializes Multer with the storage engine you defined earlier (in this case, diskStorage). It returns a middleware function (upload) that you can use in your Express routes to handle file uploads.

⚙️ What is storage?
const storage = multer.diskStorage({ ... });
This defines how and where the uploaded files should be stored. You can configure:

destination: folder where the file is stored (e.g., "uploads/")

filename: how the file should be named when saved (e.g., with a timestamp)

#  What Multer Does (Step-by-Step):
Intercepts File Data from Form-Data
When a client (e.g. Postman or a frontend form) sends a file using multipart/form-data, Express does not handle this format natively.
👉 Multer parses this format and extracts the file.
Uses Your Storage Engine Configuration
Based on your config (e.g. diskStorage), it decides:
Where to store the file (e.g., folder path like 'uploads/')
How to name the file (originalname, timestamp, etc.)
Stores the File (or Keeps in Memory)
If using diskStorage, it writes the file to disk
If using memoryStorage, it keeps it in memory (like a buffer)
Adds Metadata to req.file
Once stored, Multer adds a file object to your request:

{
  fieldname: 'image',
  originalname: 'photo.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'uploads/',
  filename: 'photo.png',
  path: 'uploads/photo.png',
  size: 12345
}

# CORS stands for Cross-Origin Resource Sharing.

It’s a security feature implemented by web browsers to control how web pages can request resources from a different domain (origin).
When your frontend tries to call the API (like fetch('http://myapi.com/data')), the browser blocks it unless the backend (myapi.com) explicitly allows it using CORS.

CORS adds HTTP headers to responses to tell browsers:
"Hey, it’s okay for this frontend (origin) to access my data."
A common header:
Access-Control-Allow-Origin: http://myfrontend.com

When CORS is Needed:
Frontend and backend are on different domains, ports, or protocols.
Example:
localhost:3000 (frontend) → localhost:5000 (backend) → different ports = different origins.
https://yourapp.com → https://api.yourapp.com = different subdomains = different origins.

# What Does minimize: false Do?
By default, Mongoose removes (minimizes) empty objects when saving documents. If you want to preserve empty objects, you must set:

# LocalStorage is Frontend Only
localStorage lives inside the browser, not on the server.

The server cannot read it directly — ever.
so for local storage data from front end we need to req from server

| Item             | Who controls it?               | Explanation                                        |
| ---------------- | ------------------------------ | -------------------------------------------------- |
| Token expiration | 🔐 **Backend (JWT)**           | You set it with `expiresIn` when signing the JWT   |
| Token storage    | 🧠 **Frontend (localStorage)** | Just keeps the token, doesn't know if it's expired |
| Timeout behavior | 👥 **Frontend + Backend**      | Frontend reads the token; backend validates it     |


Storing JWT in localStorage after login.
Reading it from localStorage to send in headers for protected routes.
Backend uses JWT to authorize requests.


# React Router

1. What Problem Does React Router Solve?
React builds Single Page Applications (SPAs).

In an SPA, you only load one index.html.

After that, React dynamically shows different components when the URL changes, without reloading the page.

React Router is the library that lets you:

Change the browser URL (e.g. /about, /doctors/123)

Show different components based on that URL

Do it all on the client side, smoothly.

Without React Router, if you use <a href="/about">, the browser reloads the page.
With React Router’s <Link to="/about">, the URL changes but the page stays loaded.

2. How It Works (Under the Hood)
React Router uses:

HTML5 History API (pushState, popstate)

Context in React to track the current location

Routes you define to decide which component to show

Flow:

User clicks a <Link>.

React Router intercepts the click (prevents full reload).

React Router updates the URL in the browser using pushState.

React re-renders the correct component for the new URL.

If the user refreshes, the server must return index.html (so React can reload and re-render).

3. <BrowserRouter>
Wraps your app.
It listens to URL changes and provides routing context to the entire React tree.

4. <Routes> and <Route>
<Routes>: Container for all your routes.
<Route>: Defines a single URL path and the component to render.
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>

5. <Link>
A special anchor tag that does not reload the page.

<Link to="/about">Go to About</Link>




3. Core Components
<BrowserRouter>
Wraps your app.
It listens to URL changes and provides routing context to the entire React tree.

import { BrowserRouter } from "react-router-dom";

<BrowserRouter>
  <App />
</BrowserRouter>
<Routes> and <Route>
<Routes>: Container for all your routes.

<Route>: Defines a single URL path and the component to render.

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
<Link>
A special anchor tag that does not reload the page.

<Link to="/about">Go to About</Link>
<Outlet>
Used for nested routes.
Parent route defines a layout; <Outlet /> is where child routes will render.

useNavigate() Hook
Programmatic navigation:

import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/about")}>Go</button>;
};
4. Nested Routes Example

<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="doctors">
      <Route index element={<DoctorsList />} />
      <Route path=":id" element={<DoctorDetails />} />
    </Route>
  </Route>
</Routes>
In Layout.jsx:

jsx
Copy
Edit
<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
</nav>
<Outlet /> {/* Renders the child */}
5. Dynamic Routes (Parameters)
If you define /doctors/:id, you can read the id in your component:

import { useParams } from "react-router-dom";

function DoctorDetails() {
  const { id } = useParams();
  return <h1>Doctor ID: {id}</h1>;
}
URL /doctors/123 → prints Doctor ID: 123.



# useContext

useContext is a React Hook that allows you to consume values from a React Context without needing to use a <Context.Consumer> component. It's commonly used for global state management (like theme, authentication, language settings, etc.) so that data can be accessed by deeply nested components without prop drilling.

# Prop drilling
Imagine you have a value (e.g., user info) in a parent component and a deeply nested component (5 levels down) needs it.
Without context, you'd have to pass the value through every intermediate component as props—even if those components don’t use it. This is called prop drilling, and it makes your code harder to maintain.

Why useContext?
useContext allows you to:

Avoid prop drilling – You don’t need to manually pass props through many layers.

Share global data – Data like theme, user info, language, etc., can be accessed anywhere in your component tree.

Simplify state management – For smaller apps, it can replace external libraries (Redux, Zustand) for global state.

# All components that use useContext(UserContext) subscribe to that value.

If you change that value (e.g., with setState),

React re-renders all components that consume that context,

So they all get the latest value automatically.


# props.children

In React, props.children is a special property that represents whatever you put between a component’s opening and closing tags.

return (
    <Wrapper>
      <h1>Hello</h1>
      <p>This content goes inside Wrapper</p>
    </Wrapper>
);

# Why do we use it?
It allows a component to wrap other components or JSX and render them inside.
This is how Context Providers, Layouts, Cards, Modals, etc. work.

props.children is not fixed.
It just means:

“Whatever components (any components) you put between <Provider> ... </Provider> will be placed here.”

So it’s not limited to Navbar or Footer.

props.children is dynamic – not a fixed list

All those children components (whatever they are) can use useContext() to access the shared data


# useEffect
First effect: Always fetch doctors on page load.

Second effect: Only fetch user profile if a token exists, and refetch whenever the token changes.

# NAVLINK BOOLEAN

That’s precisely how <NavLink> works in React Router:
All NavLinks are rendered every time the route changes.
React Router compares each link’s to="..." with the current URL.
The one that matches becomes isActive: true, and all the others automatically get isActive: false.