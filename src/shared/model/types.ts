export type CommonPageProps = {
    headerData: HeaderConfig;
    footerData: FooterConfig;
};

export type ImageShape = {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
    title?: string;
};


export type LinkItem = { name: string; href: string; };


export type FooterConfig = {
    logo: ImageShape;
    logoText?: string | null;
    links?: LinkItem[] | null;
    rights?: string | null;
    rightsAdditional?: string | null
};

export type HeaderConfig = {
    logo: ImageShape;
    logoText?: string | null;
    links?: LinkItem[] | null;
};

