import { BlogEntry } from '../../blog-entry';

export function theologyEntry(): BlogEntry {
  return {
    date: { year: 2025, month: 5, day: 2 },
    title: 'Theology',
    path: '/theology',
    contentPath: '/blog/content/theology/content.md',
    tags: ['theology'],
  };
}

export function confessionEntry(): BlogEntry {
  return {
    date: { year: 2025, month: 5, day: 2 },
    title: "Believer's Confession",
    path: '/theology/believers-confession',
    description: 'My confession of faith as a believer in Jesus Christ.',
    contentPath: '/blog/content/theology/believers-confession/content.md',
    tags: ['theology', 'faith', 'truth', 'belief', 'knowledge', 'philosophy'],
  };
}

export function rationalTheologyEntry(): BlogEntry {
  return {
    date: { year: 2025, month: 5, day: 7 },
    title: 'The Rational Basis for Theology',
    path: '/theology/rational-theology',
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
      'apologetics',
    ],
  };
}

export function canHumansInventGodEntry(): BlogEntry {
  return {
    date: { year: 2025, month: 5, day: 9 },
    title: 'Can Humans Invent God?',
    path: '/theology/can-humans-invent-god',
    description:
      'Exploring the accusation that God is a product of the human mind and dismantling it.',
    contentPath: '/blog/content/theology/can-humans-invent-god/content.md',
    tags: [
      'theology',
      'faith',
      'belief',
      'christianity',
      'apologetics',
      'philosophy',
      'knowledge',
      'truth',
    ],
  };
}
