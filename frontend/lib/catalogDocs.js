export default [
  {
    disclaimer: `This is not a beginner's course, I want to be straight up about that.  To maximize the value of this course take a look at the crieria below to see if this course is for you.`,
    tabs: [
      {
        tab: 'JavaScript',
        text: `You should be comfortable with JavaScript's standard and ES6 features. We will be using arrow functions, classes, promises, async/await, destructuring, spread operators, default parameters, module import/export, template literals, ternary expressions, and the list goes on. If these terms sound like a foreign language, do a bit of studying before starting the course.`,
        links: [
          {
            text: 'ES6 Features',
            href:
              'https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond'
          }
        ]
      },
      {
        tab: 'Markdown',
        text:
          'Markdown is a light-weight markup language used to format simple text into HTML. You may have Markdown experience if you use Github.  We will use Markdown to enchance our blog app by parsing plain text input then transforming the output into rich, formatted HTML. Its easy to pick up and well documented.  Reference material below.',
        links: [
          {
            text: 'Markdown Wikipedia Page',
            href: 'https://en.wikipedia.org/wiki/Markdown'
          },
          {
            text: 'Markdown Cheat Sheet',
            href: 'https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'
          }
        ]
      },
      {
        tab: 'React',
        text: `React is a JavaScript library for creating user interfaces. You should have some experience using React. This includes basic understanding of state, props, events and JSX. We will also be covering advanced React topics like higher order components, context, render props and life-cycle methods. Knowledge in these areas advanced areas is a plus, but not a requirement.`,
        links: [
          {
            text: 'Official React Documentation',
            href: 'https://reactjs.org/'
          },
          {
            text: `Wes Bos' Beginner React Tutorial`,
            href: 'https://reactforbeginners.com/'
          }
        ]
      },
      {
        tab: 'Next',
        text: `Next.js is a React framework for server side rendering. If you have experience with Create React App the boilerplate will be different, but creating components will be largely the same.  You will learn the benefits of SSR and leverage them in this application. As long as you feel comfortable using React having no experience with Next is okay.`,
        links: [
          {
            text: 'Next Documentation',
            href: 'https://nextjs.org/'
          }
        ]
      },
      {
        tab: 'Node',
        text:
          'You should have some familiarity with creating servers with Node.  The concept of a client-server application should be familiar. If you have never used Node consider a beginner tutorial before taking on this project. If you do not have Node installed you can get it with the link below.',
        links: [
          {
            text: 'Node Documentation and Download',
            href: 'https://nodejs.org/en/'
          }
        ]
      },
      {
        tab: 'Apollo',
        text: `You will use Apollo Client and Apollo Server along with the GraphQL query language to build the data layer for this application. Again prior experience will help you, but it is not a requirement. This course will spend a fair amount of time explaining both Apollo Client and Apollo Server.`,
        links: [
          {
            text: 'Apollo Documentation',
            href: 'https://www.apollographql.com/'
          },
          {
            text: 'GraphQL Specification',
            href: 'https://graphql.org/'
          }
        ]
      },
      {
        tab: 'Prisma',
        text: `If you have never heard of Prisma, no worries. Prisma is a relatively new database technology that works hand-in-hand with GraphQL. We will be using Prisma Client and setting up a Demo server for development. Having a general understanding of databases such as MySQL or MongoDB will help you wrap your head around Prisma.`,
        links: [
          {
            text: 'Prisma Documentation',
            href: 'https://www.prisma.io/'
          }
        ]
      }
    ]
  },
  {
    disclaimer: 'TODO',
    tabs: [
      {
        tab: 'Basics',
        text: 'TODO'
      }
    ]
  }
]
