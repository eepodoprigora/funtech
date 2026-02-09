import { CommonPageProps } from '@/shared/model';
import { tp } from '@shared/lib/formatting';

export const getCommonPageProps = async (): Promise<CommonPageProps> => {
    return {
        headerData: {
            logo: {
                src: '/static/images/svg/logo.svg',
                alt: 'DiveSea logo',
            },
            links: [
                { name: 'Discover', href: '/discover' },
                { name: 'creators', href: '/creators' },
                { name: 'Sell', href: '/sell' },
                { name: 'stats', href: '/stats' },
            ],
            logoText: 'DiveSea'
        },
        footerData: {
            logo: {
                src: '/static/images/svg/logo-white.svg',
                alt: 'DiveSea logo',
            },
            logoText: 'DiveSea',
            links: [
                { name: tp('Privacy Policy'), href: '/privacy' },
                { name: tp('Term & Conditions'), href: '/terms' },
                { name: tp('About Us'), href: '/about' },
                { name: tp('Contact'), href: '/contact' },
            ],
            rights: tp('© 2023'),
            rightsAdditional: tp('DiveSea All Rights Reserved.')
        },
    };
};
