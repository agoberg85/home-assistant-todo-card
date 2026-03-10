# Todo List Card

A custom Home Assistant dashboard card for managing standard Todo entities. It supports subtasks, different modes for tasks or shopping lists, and various styling options.

## Support development

Buy me a coffee: https://buymeacoffee.com/mysmarthomeblog

Subscribe to Youtube channel: https://www.youtube.com/@My_Smart_Home

## Features

- **Two Operation Modes:** Manage tasks with Priorities, Due Dates, and Icons; or Shopping lists with Quantities and Links.
- **Subtasks:** Create nested subtasks for any item directly on the card.
- **Visual Editor:** Fully supports the Home Assistant visual card editor.
- **Sorting & Filtering:** Sort by Priority, Due Date, or Title. Filter by active, completed, or overdue status.
- **Custom Styling:** Configure background colors, text colors, and transparency directly from the card config.
- **Metadata Storage:** Subtasks and extra details are stored safely within the standard Todo item's description field as JSON.

## Installation

### HACS (Recommended)

1. Go to the HACS page in your Home Assistant instance.
2. Click the three-dot menu in the top right.
3. Select "Custom repositories".
4. In the "Repository" field, paste the URL of this repository.
5. For "Category", select "Dashboard".
6. Click "Add".
7. The `todo-card` will now appear in the HACS Frontend list. Click "Download".
8. Refresh your browser.

### Manual Installation

1. Download the `todo-card.js` file to the `www` directory in your Home Assistant `config` folder.
2. In your Lovelace dashboard, go to "Manage Resources" and add a new resource:
   - URL: `/local/todo-card.js`
   - Resource Type: `JavaScript Module`

## Configuration

This card supports the visual editor. Simply add a "Custom: Todo List Card" to your dashboard and configure it using the UI.

### Main Options

| Name | Type | Required? | Description | Default |
| :--- | :--- | :--- | :--- | :--- |
| `type` | string | **Required** | `custom:todo-list-card` | |
| `entity` | string | **Required** | The todo entity to manage (e.g., `todo.shopping_list`). | |
| `title` | string | Optional | A custom title for the card. | |
| `mode` | string | Optional | The mode of the card. (`tasks`, `shopping`) | `'tasks'` |
| `sort_by` | string | Optional | Field to sort the items by. (`priority`, `duedate`, `title`) | `'priority'` |
| `sort_order` | string | Optional | Sort direction. (`asc`, `desc`) | `'asc'` |
| `card_background` | string | Optional | CSS color for the card background. Set to `none` to remove padding. | `var(--ha-card-background)` |
| `card_color` | string | Optional | CSS color for individual item or section backgrounds. | `var(--ha-card-background)` |
| `completed_color` | string | Optional | CSS background color for completed items. | `var(--success-color)` |
| `icon_background` | string | Optional | CSS background color behind the item icon. | `rgba(128, 128, 128, 0.2)` |
| `text_color` | string | Optional | CSS color for standard text. | `var(--text-primary-color)` |
| `completed_text_color`| string | Optional | CSS color for text of completed items. | `var(--text-accent-color)` |
| `show_priority` | boolean | Optional | If `true`, priority badges are visible in tasks mode. | `true` |
| `confirm_delete` | boolean | Optional | If `true`, a confirmation dialog appears before deleting an item. | `true` |
| `auto_complete_parent`| boolean | Optional | If `true`, parent task completes automatically when all subtasks are done. | `false` |
| `show_filter_menu` | boolean | Optional | Show the active/completed/overdue filter dropdown in the header. | `true` |
| `show_search_button` | boolean | Optional | Enable the search functionality and icon. | `true` |
| `show_clear_button` | boolean | Optional | Enable the clear completed items button. | `true` |
| `quick_add` | boolean | Optional | If `true`, simplifies the add item input to a single rapid-add line. | `false` |