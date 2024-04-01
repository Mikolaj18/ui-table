import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TApiResponse} from "../../types.ts";

export const tagsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.stackexchange.com/',
    }),
    tagTypes: ['Tags'],
    endpoints: (builder) => ({
        getTags: builder.query<TApiResponse, void>({
            query: () => ({
                url: '/2.3/tags?site=stackoverflow',
            }),
        }),
    }),
});

export const {useGetTagsQuery} = tagsApi;