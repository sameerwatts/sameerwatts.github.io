// Contact rows. Entries without `href` render as plain text (Phone); `download`
// marks the résumé link. Spaces in the résumé path are intentional and match
// the file in public/docs — the browser URL-encodes them.
export const contacts = [
  {
    label: 'GitHub',
    text: 'github.com/sameerwatts',
    href: 'https://github.com/sameerwatts',
    external: true,
  },
  {
    label: 'Phone',
    text: '+919983420366',
  },
  {
    label: 'Email',
    text: 'sameer.watts00@gmail.com',
    href: 'mailto:sameer.watts00@gmail.com',
  },
  {
    label: 'Resume',
    text: 'Download',
    href: '/docs/Samir Watts - Senior software engineer.pdf',
    download: true,
  },
];
