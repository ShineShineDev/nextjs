### 001 Setting Up

###### Pre-Requisite 

-  Nodejs



##### Install Nextjs

```
npx create-next-app@latest
```



##### project-structure

https://nextjs.org/docs/app/getting-started/project-structure



###### Run

```cmd
npm run dev
```







```
my-next-app/
├── public/               # Static assets (images, fonts, etc.)
│   ├── assets/
│   └── favicon.ico
├── src/                  # Application source code
│   ├── components/       # Reusable components (Buttons, Layouts, etc.)
│   ├── pages/            # Next.js pages (automatic routing)
│   │   ├── api/          # API routes (server-side functions)
│   │   ├── _app.js       # App component (global styles and context)
│   │   └── index.js      # Main page or landing page
│   ├── styles/           # Global and component-specific styles
│   │   ├── globals.css   # Global CSS
│   │   ├── Home.module.css  # Example component styles (CSS modules)
│   ├── lib/              # Utility functions, custom hooks, and libraries
│   ├── hooks/            # Custom React hooks
│   ├── context/          # Contexts for global state (if needed)
│   ├── services/         # API calls or other services
│   ├── types/            # TypeScript types (if using TypeScript)
│   └── assets/           # Images, fonts, etc.
├── .gitignore            # Git ignore file
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration (if using TypeScript)
```









