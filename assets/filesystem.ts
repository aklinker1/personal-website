export const files: VirtualFileSystem = [
  {
    type: 'folder',
    name: 'projects',
    children: [
      {
        type: 'folder',
        name: 'miasma',
        children: [
          {
            type: 'file',
            name: 'readme.md',
            content: 'GLHF!',
          },
          {
            type: 'link',
            name: 'github',
            to: 'https://github.com/aklinker1/miasma',
          },
          {
            type: 'link',
            name: 'documentation',
            to: 'https://aklinker1.github.io/miasma/',
          },
        ],
      },
      {
        type: 'folder',
        name: 'anime-skip',
        children: [
          {
            type: 'file',
            name: 'readme.md',
            content: 'GLHF!',
          },
          {
            type: 'link',
            name: 'GitHub',
            to: 'https://github.com/anime-skip',
          },
        ],
      },
    ],
  },
  {
    type: 'folder',
    name: 'history',
    children: [],
  },
  {
    type: 'link',
    name: 'github-profile',
    to: 'https://github.com/aklinker1',
  },
  {
    type: 'link',
    name: 'linkedin',
    to: 'https://www.linkedin.com/in/aaron-klinker',
  },
  {
    type: 'file',
    name: 'readme.md',
    content: 'GLHF!',
  },
];
