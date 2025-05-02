import { TableColumn } from "../../components/table";

export const educationData = [
    {
        school: 'George Mason University',
        city: 'Fairfax, VA',
        graduationYear: '2009',
        honors: 'Cum Laude',
    },
    {
        school: 'Lord Fairfax Community College',
        city: 'Middletown, VA',
        graduationYear: '2007',
        honors: ''
    }
];

export const educationColumns: TableColumn[] = [
    { displayText: 'School', key: 'school' },
    { displayText: 'City', key: 'city' },
    { displayText: 'Graduation Year', key: 'graduationYear' },
    { displayText: 'Honors', key: 'honors' }
];
