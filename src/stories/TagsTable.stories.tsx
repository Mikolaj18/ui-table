import type { Meta, StoryObj } from '@storybook/react';
import "../index.css";
import TagsTable from "../components/TagsTable/TagsTable.tsx";
import {Provider} from "react-redux";
import {store} from "../store/store.ts";
import { http, HttpResponse, delay } from 'msw';
import {useEffect} from "react";
import {mockData} from "../data.ts";


const meta = {
    title: 'TagsTable',
    component: TagsTable,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <Provider store={store}>
                    <Story />
            </Provider>
        ),
    ],

} satisfies Meta<typeof TagsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

Success.decorators = [
    (Story) => {
        useEffect(() => {
            return () => window.location.reload();
        }, []);

        return <Story />;
    },
];

Success.parameters = {
    msw: {
        handlers: [
            http.get('https://api.stackexchange.com/2.3/tags?site=stackoverflow', () => {
                return HttpResponse.json(mockData);
            }),
        ],
    },
};

export const Loading: Story = {};

Loading.decorators = [
    (Story) => {
        useEffect(() => {
            return () => window.location.reload();
        }, []);

        return <Story />;
    },
];

Loading.parameters = {
    msw: {
        handlers: [
            http.get('https://api.stackexchange.com/2.3/tags?site=stackoverflow', async () => {
                await delay(5000);
                return HttpResponse.json(mockData);
            }),
        ],
    },
};

export const Error: Story = {};

Error.decorators = [
    (Story) => {
        useEffect(() => {
            return () => window.location.reload();
        }, []);

        return <Story />;
    },
];

Error.parameters = {
    msw: {
        handlers: [
            http.get('https://api.stackexchange.com/2.3/tags?site=stackoverflow', () => {
                return new HttpResponse(null, {
                    status: 500,
                })
            }),
        ],
    },
};
