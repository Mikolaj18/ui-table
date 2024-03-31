type TExternalLinks = {
    type: string,
    link: string,
}

type TCollective = {
    tags: string,
    external_links: TExternalLinks[],
    description: string,
    link: string,
    name: string,
    slug: string,
}

export type TTagItem = {
    has_synonyms: boolean,
    is_moderator_only: boolean,
    is_required: boolean,
    count: number,
    name: string,
    collectives?: TCollective[],
}

export type TApiResponse = {
    items: TTagItem[],
    has_more: boolean,
    quota_max: number,
    quota_remaining: number,
}