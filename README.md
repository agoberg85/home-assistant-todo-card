# Todo List Card

A custom Home Assistant dashboard card for managing standard Todo entities. It supports subtasks, different modes for tasks or shopping lists, and various styling options.

![Card Preview](images/screenshot.png)

## Features

*   **Two Operation Modes:**
    *   **Tasks:** Manage tasks with Priorities (Low to Urgent), Due Dates/Times, and custom Icons.
    *   **Shopping:** Manage lists with Quantities and clickable Links.
*   **Subtasks:** Create nested subtasks for any item.
*   **Visual Editor:** Fully supports the Home Assistant visual card editor.
*   **Sorting:** Sort by Priority, Due Date, or Title (Ascending/Descending).
*   **Custom Styling:** Configure background colors, text colors, and transparency directly from the card config without extra card-mod code.
*   **Metadata Storage:** Subtasks and extra details are stored safely within the standard Todo item's description field as JSON.

## Installation

### Option 1: HACS (Custom Repository)

1.  Go to **HACS** > **Frontend**.
2.  Click the **3 dots** in the top right corner and select **Custom repositories**.
3.  Paste the URL of this repository into the **Repository** field.
4.  Select **Dashboard** as the **Category**.
5.  Click **Add**.
6.  Click on the new "Todo List Card" card in the list and click **Download**.
7.  Refresh your browser.

### Option 2: Manual Installation

1.  Download `todo-card.js` (or whatever you named the file) to your `<config>/www/` folder.
2.  Add the resource to your Dashboard configuration:
    ```yaml
    resources:
      - url: /local/todo-card.js
        type: module
    ```

## Configuration

This card supports the visual editor. Simply add a "Custom: Todo List Card" to your dashboard and configure it using the UI.

### YAML Configuration

If you prefer YAML, here are the available options:

```yaml
type: custom:todo-list-card
entity: todo.my_list
title: My Tasks
mode: tasks
sort_by: priority
sort_order: asc
show_priority: true
auto_complete_parent: false
confirm_delete: true
```