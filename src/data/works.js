// Work cards + their popup detail. `thumb.label` (when present) renders the
// two-row image+caption layout; otherwise just the image. `containerClass`
// carries per-card modifier classes (e.g. D2DImg). `link.img` is the logo shown
// inside the popup. Some thumbs/links use external URLs; the rest are /images/*.
export const works = [
  {
    id: 'spark',
    title: 'Spark',
    containerClass: '',
    thumb: { src: '/images/spark-logo.svg', alt: 'Spark' },
    paragraphs: [
      'Spark is an inventory management tool, helps cloud kitchen user to manage their kitchen inventory.',
      'I have handled frontend of the Spark (Kitchen inventory management) project with another frontend engineer in a team of total 21 engineers. Worked on the various features in the GRN workflow, store transfers management and Reports. I have extensively used ReactJS, axios, formik, npm among others during my tenure. I have also had the opportunity to work across multiple teams and interfaced with multiple stakeholders in the organization.',
    ],
    link: {
      href: 'https://spark.faasos.io/login',
      img: {
        src: '/images/spark-logo.svg',
        width: 200,
        height: 50,
        alt: 'spark',
      },
    },
  },
  {
    id: 'albertsons',
    title: 'Albertsons',
    containerClass: '',
    thumb: {
      src: 'https://www.albertsons.com/content/dam/safeway/images/logos/Albertsons_RGB.svg',
      alt: 'albertsons',
    },
    paragraphs: [
      'Albertsons is one of the largest food and drug retailers in the United States.',
      'I have worked on various marketing campaigns like Monday Themes, cart abandonment, and transactional emails for their primary product and multiple subsidiaries like Safeway, Acme Market, Kings, Jewel-Osco etc.',
    ],
    link: {
      href: 'https://www.albertsons.com/',
      img: {
        src: 'https://www.albertsons.com/content/dam/safeway/images/logos/Albertsons_RGB.svg',
        width: 200,
        height: 50,
        alt: 'Albertsons',
      },
    },
  },
  {
    id: 'doortodumps',
    title: 'Door to dumps',
    containerClass: 'D2DImg',
    thumb: { src: '/images/D2DLogo.png', alt: 'Door to dumps logo' },
    paragraphs: [
      'Being the sole frontend developer, built customer application and website on React js single handedly. Contributed in UX and product decisions as well at multiple places.',
    ],
    link: {
      href: 'https://www.doortodumps.com/',
      img: {
        src: '/images/D2DLogo.png',
        width: 90,
        height: 80,
        alt: 'Door to dumps logo',
      },
    },
  },
  {
    id: 'aptihealth',
    title: 'Aptihealth',
    containerClass: '',
    thumb: { src: '/images/logo.svg', alt: 'aptihealth' },
    paragraphs: [
      'Aptihealth is a behavioural healthcare company working in b2c space.',
      'I worked on the consumer, doctor and internal application and developed features like onboarding, booking flow, video calling, scheduling using React/Redux and integrated with the backend APIs.',
    ],
    link: {
      href: 'https://www.aptihealth.com/',
      img: {
        src: '/images/logo.svg',
        width: 200,
        height: 50,
        alt: 'aptihealth',
      },
    },
  },
  {
    id: 'poweredx',
    title: 'PoweredX',
    containerClass: '',
    thumb: { src: '/images/poweredX-b-logo.svg', alt: 'poweredX' },
    paragraphs: [
      'PoweredX is a free program that allows entrepreneurs to get their tech-based ideas developed up to MVP level.',
      'I built the website end to end from scratch as an SPA using technologies HTML/CSS and Vanilla JS.',
    ],
    link: {
      href: 'https://poweredx.com/',
      img: {
        src: '/images/poweredX-b-logo.svg',
        width: 200,
        height: 50,
        alt: 'PoweredX',
      },
    },
  },
  {
    id: 'scopeworker',
    title: 'Scopeworker',
    containerClass: '',
    thumb: {
      src: '/images/Scopeworker-Favicon.webp',
      alt: 'scopeworker',
      label: 'Scopeworker',
    },
    paragraphs: [
      'Scopeworker is an enterprise B2B marketplace for critical infrastructure field services.',
      'I worked on various static and dynamic components across the website.',
    ],
    link: {
      href: 'https://www.scopeworker.com/',
      img: {
        src: '/images/Scopeworker-Favicon.webp',
        width: 100,
        height: 100,
        alt: 'scopeworker',
      },
    },
  },
  {
    id: 'neobeema',
    title: 'Neobeema',
    containerClass: '',
    thumb: { src: '/images/neobeema_logo.png', alt: 'Neobeema' },
    paragraphs: [
      'Neobeema aims to transform customer experiences in the insurance industry.',
      'I developed the whole web application from scratch using React and Vanilla JS.',
    ],
    link: {
      href: 'https://www.neobeema.com/',
      img: {
        src: '/images/neobeema_logo.png',
        width: 200,
        height: 50,
        alt: 'Neobeema',
      },
    },
  },
  {
    id: 'aviteur',
    title: 'Aviteur',
    containerClass: '',
    thumb: { src: '/images/aviteur-logo-orange-xl.png', alt: 'Aviteur' },
    paragraphs: [
      'Aviteur (a subsidiary of Gucci) is an e-commerce website specialising in luggage bags.',
      'I worked on the web application which was built using Liquid template language and Shopify.',
    ],
    link: {
      href: 'https://aviteur.com/',
      img: {
        src: '/images/aviteur-logo-orange-xl.png',
        width: 200,
        height: 25,
        alt: 'Aviteur',
      },
    },
  },
  {
    id: 'nickelfox',
    title: 'Nickelfox',
    containerClass: '',
    thumb: {
      src: '/images/nickelfox-black-logo-3-x.svg',
      alt: 'nickelfox logo',
      label: 'Nickelfox',
      width: 30,
      height: 30,
    },
    paragraphs: [
      'Worked on the company website and blog and developed various pages and components using HTML/CSS, Vanilla JS and custom Wordpress theme.',
    ],
    link: {
      href: 'https://nickelfox.com/',
      img: {
        src: '/images/nickelfox-black-logo-3-x.svg',
        width: 100,
        height: 100,
        alt: 'nickelfox logo',
      },
    },
  },
  {
    id: 'ratingfinder',
    title: 'Rating Finder',
    containerClass: '',
    thumb: {
      src: '/images/icon48.png',
      alt: 'Rating Finder',
      label: 'RatingFinder',
    },
    paragraphs: [
      "This Extension for Netflix, displays IMDB's rating of movies on thumbnail image. Built the whole extension single handedly as a side project.",
    ],
    link: {
      href: 'https://chrome.google.com/webstore/search/ratingfinder?hl=en',
      img: {
        src: '/images/icon128.png',
        width: 100,
        height: 100,
        alt: 'Rating Finder',
      },
    },
  },
];
