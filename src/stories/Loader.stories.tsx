import type { Meta, StoryObj } from '@storybook/react';
import "../index.css";
import Loader from "../components/Loader/Loader.tsx";

const meta = {
    title: 'Loader',
    component: Loader,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
