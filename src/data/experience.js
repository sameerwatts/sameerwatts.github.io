// Experience/company cards. `serviceClass` and `logoClass` carry the exact
// modifier classes from the old markup; `white` toggles the light-on-dark text;
// `icon` is used instead of `logo` when a company has no image (Freelancing).
export const companies = [
  {
    name: 'Arintra',
    serviceClass: 'arintra-service',
    logoClass: 'arintra-logo',
    logo: '/images/Arintra.png',
    alt: 'Arintra',
    blurb:
      'Arintra is a holistic solution for fully automating the coding workflow and streamlining the revenue cycle with Seamless and secure integration, Consistent, accurate and error-free results, Zero human intervention',
    white: false,
    hasLink: true,
  },
  {
    name: 'Rebel Foods',
    serviceClass: 'rebel-service bg-cyanLight',
    logoClass: 'rebel-logo',
    logo: '/images/Rebel-Foods.svg',
    alt: 'Rebel Foods',
    blurb:
      'Rebel Foods is a cloud kitchen, who operates multiple cloud brand such as Faasos, Behrouz Biryani, Oven Story, Mandarin Oak, Lunch Box, Sweet Truth, The Good Bowl, The Biryani Life, Firangi Bake, and Slay Coffee etc.',
    white: true,
    hasLink: true,
  },
  {
    name: 'Publicis Sapient',
    serviceClass: 'bg-cyanLight ps-service',
    logoClass: 'sapient-logo',
    logo: '/images/Sapient.png',
    alt: 'Sapient logo',
    blurb: 'Publicis Sapient is an American digital consulting company.',
    white: true,
    hasLink: true,
  },
  {
    name: 'Nickelfox',
    serviceClass: 'nickelfox-service',
    logoClass: '',
    logo: '/images/nickelfox-black-logo-3-x.svg',
    alt: 'nickelfox logo',
    blurb: 'Nickelfox is B2C company, who design and develop products.',
    white: false,
    hasLink: false,
  },
  {
    name: 'Freelancing',
    serviceClass: 'freelance-service',
    logoClass: '',
    icon: 'icon-chemistry',
    alt: '',
    blurb:
      'Handled several web projects with multiple clients using HTML, JS and CSS technologies.',
    white: false,
    hasLink: false,
  },
  {
    name: 'Door to Dumps',
    serviceClass: 'd2d-service bg-cyanLight',
    logoClass: 'd2d-logo',
    logo: '/images/D2DLogo.png',
    alt: 'Door to dumps logo',
    blurb:
      'Door to Dumps is a tech waste management company that provides waste collection and segregation and smart city solutions to customers and governments.',
    white: true,
    hasLink: false,
  },
];
