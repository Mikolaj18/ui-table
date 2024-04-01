import type { Meta, StoryObj } from '@storybook/react';
import TagsTableItem from "../components/TagsTableItem/TagsTableItem.tsx";
import "../index.css";

type TagsTableItemProps = {
    name: string,
    count: number,
}

const meta = {
    title: 'TagsTableItem',
    component: TagsTableItem,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof TagsTableItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = (args: TagsTableItemProps) => <TagsTableItem {...args} />;

Default.args = {
    name: "Test",
    count: 100,
};
