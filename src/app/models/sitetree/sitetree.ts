import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import HandymanIcon from '@mui/icons-material/Handyman';

interface SitemapEntry {
  url: string;
  displayText: string;
  icon: React.ElementType;
}

export const sitetree: Array<SitemapEntry> = [
  {
    url: '/',
    displayText: 'Home',
    icon: HomeIcon,
  },
  {
    url: '/about/resume',
    displayText: 'Resume',
    icon: DescriptionIcon,
  },
  {
    url: '/blog',
    displayText: 'Blog',
    icon: ArticleIcon,
  },
  {
    url: '/tools',
    displayText: 'Tools',
    icon: HandymanIcon,
  },
];
