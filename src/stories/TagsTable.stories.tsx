import type { Meta, StoryObj } from '@storybook/react';
import "../index.css";
import TagsTable from "../components/TagsTable/TagsTable.tsx";
import {Provider} from "react-redux";
import {store} from "../store/store.ts";

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

export const Default: Story = {};
