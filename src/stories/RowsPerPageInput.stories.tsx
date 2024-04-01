import type { Meta, StoryObj } from '@storybook/react';
import RowsPerPageInput from "../components/RowsPerPageInput/RowsPerPageInput.tsx";
import React from "react";

type RowsPerPageInputProps = {
    setItemsPerPage:  React.Dispatch<React.SetStateAction<number>>,
    setPage:  React.Dispatch<React.SetStateAction<number>>,
}

const meta = {
    title: 'RowsPerPageInput',
    component: RowsPerPageInput,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof RowsPerPageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = (args: RowsPerPageInputProps) => <RowsPerPageInput {...args} />;

Default.args = {
    setItemsPerPage: () => {},
    setPage: () => {},
};