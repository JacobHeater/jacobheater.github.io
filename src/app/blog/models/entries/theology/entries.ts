import { BlogEntry } from "../../blog-entry";

export function theologyEntry(): BlogEntry {
  return {
    date: new Date('2025-05-02'),
    title: 'Theology',
    contentPath: '/blog/content/theology/content.md',
    tags: ['theology'],
  };
}

export function confessionEntry(): BlogEntry {
  return {
    date: new Date('05/02/2025'),
    title: "Believer's Confession",
    description: 'My confession of faith as a believer in Jesus Christ.',
    contentPath: '/blog/content/theology/believers-confession/content.md',
    tags: ['theology', 'faith', 'truth', 'belief', 'knowledge', 'philosophy'],
  };
}

export function rationalTheologyEntry(): BlogEntry {
  return {
    date: new Date('05/07/2025'),
    title: 'The Rational Basis for Theology',
    description: 'My apologetic for the rational basis for belief in God.',
    contentPath: '/blog/content/theology/rational-theology/content.md',
    tags: [
      'theology',
      'faith',
      'truth',
      'belief',
      'knowledge',
      'philosophy',
      'christianity',
      'aplogetics',
    ],
  };
}