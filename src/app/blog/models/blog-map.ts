export interface BlogMapEntry {
  url: string;
  displayText: string;
  subentries?: BlogMapEntry[];
  date?: Date;
}

export const blogMap: Array<BlogMapEntry> = [
  {
    url: '/theology',
    displayText: 'Theology',
    subentries: [
      {
        url: '/believers-confession',
        displayText: "Believer's Confession",
        date: new Date('05/02/2025'),
      },
    ],
  },
];
