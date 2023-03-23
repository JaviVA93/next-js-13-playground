## Take a look
https://next-js-13-playground-javiva93.vercel.app/

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Use of RAWG Video Games API

This project uses the RAWG Video games database API.

In order to be able to load the "videogames" page as expected, go to https://rawg.io/apidocs and create an API Key.
The key must be stored in a file named ".env.local" (must be created).
The content of that file should be:

``RAWG_API_KEY=<YOUR API KEY>``