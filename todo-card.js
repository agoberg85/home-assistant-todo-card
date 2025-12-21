import {
  LitElement,
  html,
  css
} from 'https://cdn.skypack.dev/lit';

// Class-level constants for re-use
const DEFAULT_PRIORITY = '5';
const DEFAULT_ICON = 'mdi:checkbox-blank-outline';
const DEFAULT_CARD_BACKGROUND = 'var(--ha-card-background)';
const DEFAULT_CARD_COLOR = 'var(--ha-card-background)';
const DEFAULT_COMPLETED_COLOR = 'var(--success-color)';
const DEFAULT_ICON_BACKGROUND = 'rgba(128, 128, 128, 0.2)';
const DEFAULT_TEXT_COLOR = 'var(--text-primary-color)';
const DEFAULT_COMPLETED_TEXT_COLOR = 'var(--text-accent-color)';

class TodoListCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { state: true },
      _tasks: { state: true },
      _isAddAreaOpen: { state: true },
      _editedTaskId: { state: true },
      _expandedTaskId: { state: true },
      _newItemSummary: { state:true },
      _newItemDescription: { state: true },
      _newItemPriority: { state: true },
      _newItemIcon: { state: true },
      _newItemLink: { state: true },
      _newItemQuantity: { state: true },
      _newItemDueDate: { state: true },
      _editSummary: { state: true },
      _editDescription: { state: true },
      _editPriority: { state: true },
      _editIcon: { state: true },
      _editLink: { state: true },
      _editQuantity: { state: true },
      _editDueDate: { state: true },
      _isLoading: { state: true },
      _error: { state: true },
    };
  }

  static getConfigElement() {
    return document.createElement('todo-list-card-editor');
  }

  static getStubConfig() {
    const todoEntity = Object.keys(window.hass?.states || {}).find(e => e.startsWith('todo.')) || 'todo.my_list';
    return {
      type: 'custom:todo-list-card',
      entity: todoEntity,
      title: 'My List',
      mode: 'tasks',
      card_background: DEFAULT_CARD_BACKGROUND,
      card_color: DEFAULT_CARD_COLOR,
      completed_color: DEFAULT_COMPLETED_COLOR,
      icon_background: DEFAULT_ICON_BACKGROUND,
      text_color: DEFAULT_TEXT_COLOR,
      completed_text_color: DEFAULT_COMPLETED_TEXT_COLOR,
      show_priority: true,
      confirm_delete: true,
      auto_complete_parent: false,
    };
  }
  
  _generateSubtaskUid() {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async _updateTaskMetadata(task, newMetadata, skipFetch = false) {
    try {
      await this._hass.callService("todo", "update_item", {
        item: task.uid,
        description: JSON.stringify(newMetadata),
      }, {
        entity_id: this._config.entity
      });
      if (!skipFetch) {
        this.fetchTodoItems();
      }
    } catch (err) {
      console.error('Error updating task metadata:', err);
      this._error = `Failed to update sub-tasks: ${err.message}`;
      this.fetchTodoItems();
    }
  }

  async _handleAddSubtask(ev, task) {
    const input = this.shadowRoot.querySelector(`#subtask-input-${task.uid}`);
    if (!input) return;
    const summary = input.value.trim();
    if (!summary) return;
    const newSubtask = {
      uid: this._generateSubtaskUid(),
      summary: this._sanitizeText(summary),
      status: 'needs_action',
    };
    const metadata = task._cachedMetadata;
    const newSubtasks = [...(metadata.subtasks || []), newSubtask];
    const newMetadata = { ...metadata, subtasks: newSubtasks };
    await this._updateTaskMetadata(task, newMetadata);
    input.value = '';
  }

  async _handleSubtaskStatusUpdate(ev, task, subtaskUid) {
    ev.stopPropagation();
    const metadata = task._cachedMetadata;
    let allComplete = true;
    const newSubtasks = metadata.subtasks.map(sub => {
      let newStatus = sub.status;
      if (sub.uid === subtaskUid) {
        newStatus = sub.status === 'needs_action' ? 'completed' : 'needs_action';
      }
      if (newStatus === 'needs_action') {
        allComplete = false;
      }
      return { ...sub, status: newStatus };
    });

    const newMetadata = { ...metadata, subtasks: newSubtasks };
    await this._updateTaskMetadata(task, newMetadata, true);
    
    if (this._config.auto_complete_parent && task.status !== 'completed' && allComplete) {
        await this._handleStatusUpdate(ev, task);
    } else if (this._config.auto_complete_parent && task.status === 'completed' && !allComplete) {
        await this._handleStatusUpdate(ev, task);
    } else {
        await this.fetchTodoItems();
    }
  }

  async _handleDeleteSubtask(ev, task, subtaskUidToDelete) {
    ev.stopPropagation();
    const metadata = task._cachedMetadata;
    const newSubtasks = metadata.subtasks.filter(sub => sub.uid !== subtaskUidToDelete);
    const newMetadata = { ...metadata, subtasks: newSubtasks };
    await this._updateTaskMetadata(task, newMetadata);
  }

  _toggleExpand(taskUid) {
    this._expandedTaskId = this._expandedTaskId === taskUid ? null : taskUid;
    this._editedTaskId = null;
  }
  
  constructor() {
    super();
    this._tasks = []; this._isAddAreaOpen = false; this._editedTaskId = null; this._expandedTaskId = null; this._isLoading = false; this._error = null;
    this._resetNewItemInputs(); this._resetEditInputs();
  }
  
  _resetNewItemInputs() {
    this._newItemSummary = ''; this._newItemDescription = ''; this._newItemPriority = DEFAULT_PRIORITY; this._newItemIcon = DEFAULT_ICON; this._newItemLink = ''; this._newItemQuantity = ''; this._newItemDueDate = ''; this._newItemDueTime = '';
  }
  
  _resetEditInputs() {
    this._editSummary = ''; this._editDescription = ''; this._editPriority = DEFAULT_PRIORITY; this._editIcon = DEFAULT_ICON; this._editLink = ''; this._editQuantity = ''; this._editDueDate = ''; this._editDueTime = '';
  }
  
  setConfig(config) {
    if (!config.entity) { throw new Error("You need to define a todo entity"); }
    this._config = {
      mode: 'tasks', card_background: DEFAULT_CARD_BACKGROUND, card_color: DEFAULT_CARD_COLOR, completed_color: DEFAULT_COMPLETED_COLOR, icon_background: DEFAULT_ICON_BACKGROUND, text_color: DEFAULT_TEXT_COLOR, completed_text_color: DEFAULT_COMPLETED_TEXT_COLOR, show_priority: true, confirm_delete: true, sort_by: 'priority', sort_order: 'asc', auto_complete_parent: false, ...config
    };
  }
  
  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    if (!this._config?.entity || !oldHass) { this.fetchTodoItems(); return; }
    const oldEntity = oldHass.states[this._config.entity];
    const newEntity = hass.states[this._config.entity];
    if (!oldEntity || oldEntity.last_updated !== newEntity?.last_updated || oldEntity.attributes?.items !== newEntity?.attributes?.items) {
      this.fetchTodoItems();
    }
  }
  
  async fetchTodoItems() {
    if (!this._hass || !this._config.entity) return;
    this._isLoading = true; this._error = null;
    try {
      let items;
      try {
        items = await this._hass.callWS({ type: 'todo/item/list', entity_id: this._config.entity });
      } catch (err) {
        if (err.code === 'unknown_command') {
          items = await this._hass.callWS({ type: 'call_service', domain: 'todo', service: 'get_items', service_data: { entity_id: this._config.entity }, return_response: true });
          items = items.response[this._config.entity];
        } else throw err;
      }
      this._tasks = (items.items || []).map(task => ({ ...task, _cachedMetadata: this._parseTaskMetadata(task.description) }));
    } catch (err) {
      console.error('Error fetching todo items:', err);
      this._error = `Failed to load items: ${err.message}`; this._tasks = [];
    } finally { this._isLoading = false; }
  }
  
  _parseTaskMetadata(desc) {
    try {
      const data = JSON.parse(desc || '{}');
      return { description: this._sanitizeText(data.description ?? ''), priority: this._sanitizePriority(data.priority ?? DEFAULT_PRIORITY), icon: typeof data.icon === 'string' ? data.icon : DEFAULT_ICON, link: this._sanitizeUrl(data.link ?? ''), quantity: this._sanitizeText(data.quantity ?? ''), subtasks: Array.isArray(data.subtasks) ? data.subtasks : [] };
    } catch {
      return { description: '', priority: DEFAULT_PRIORITY, icon: DEFAULT_ICON, link: '', quantity: '', subtasks: [] };
    }
  }
  
  _sanitizePriority(val) { const num = parseInt(val); return isNaN(num) ? DEFAULT_PRIORITY : Math.max(1, Math.min(10, num)).toString(); }
  _sanitizeText(txt) { return typeof txt === 'string' ? txt.replace(/[<>"']/g, '') : ''; }
  _sanitizeUrl(url) { try { const parsed = new URL(url.startsWith('http') ? url : `https://${url}`); if (!['http:', 'https:'].includes(parsed.protocol)) { return ''; } return parsed.href; } catch { return ''; } }
  
  async _handleStatusUpdate(ev, task) {
    ev.stopPropagation();
    try { await this._hass.callService("todo", "update_item", { item: task.uid, status: task.status === "needs_action" ? "completed" : "needs_action" }, { entity_id: this._config.entity }); this.fetchTodoItems(); } catch (err) { console.error('Error updating status:', err); this._error = `Failed to update item: ${err.message}`; this.fetchTodoItems(); }
  }
  
  async _handleAddItem() {
    if (!this._newItemSummary.trim()) { this._error = "Item name cannot be empty"; return; }
    this._isAddAreaOpen = false; let metadata = {};
    if (this._newItemDescription.trim()) metadata.description = this._sanitizeText(this._newItemDescription.trim());
    if (this._config.mode === 'tasks') { metadata.priority = this._sanitizePriority(this._newItemPriority); metadata.icon = this._newItemIcon; } else if (this._config.mode === 'shopping') { if (this._newItemLink) metadata.link = this._sanitizeUrl(this._newItemLink); if (this._newItemQuantity) metadata.quantity = this._sanitizeText(this._newItemQuantity); }
    const serviceData = { item: this._sanitizeText(this._newItemSummary.trim()), description: JSON.stringify(metadata) };
    if (this._newItemDueDate.trim()) { if (this._newItemDueTime.trim()) { serviceData.due_datetime = `${this._newItemDueDate} ${this._newItemDueTime}:00`; } else { serviceData.due_date = this._newItemDueDate; } }
    try { await this._hass.callService("todo", "add_item", serviceData, { entity_id: this._config.entity }); this._resetNewItemInputs(); } catch (err) { console.error('Error adding item:', err); this._error = `Failed to add item: ${err.message}`; } finally { this.fetchTodoItems(); }
  }
  
  async _handleSaveEdit(task) {
    if (!this._editSummary.trim()) { this._error = "Item name cannot be empty"; return; }
    const originalEditedTaskId = this._editedTaskId; this._editedTaskId = null;
    const originalMetadata = task._cachedMetadata || {}; let metadata = { subtasks: originalMetadata.subtasks || [] };
    if (this._editDescription.trim()) metadata.description = this._sanitizeText(this._editDescription.trim());
    if (this._config.mode === 'tasks') { metadata.priority = this._sanitizePriority(this._editPriority); metadata.icon = this._editIcon; } else if (this._config.mode === 'shopping') { if (this._editLink) metadata.link = this._sanitizeUrl(this._editLink); if (this._editQuantity) metadata.quantity = this._sanitizeText(this._editQuantity); }
    const serviceData = { item: task.uid, rename: this._sanitizeText(this._editSummary.trim()), description: JSON.stringify(metadata) };
    if (this._editDueDate.trim()) { if (this._editDueTime.trim()) { serviceData.due_datetime = `${this._editDueDate} ${this._editDueTime}:00`; } else { serviceData.due_date = this._editDueDate; } } else { serviceData.due_date = null; }
    try { await this._hass.callService("todo", "update_item", serviceData, { entity_id: this._config.entity }); this._resetEditInputs(); } catch (err) { console.error('Error updating item:', err); this._error = `Failed to update item: ${err.message}`; this._editedTaskId = originalEditedTaskId; } finally { this.fetchTodoItems(); }
  }
  
  async _handleDeleteItem(ev, task) {
    ev.stopPropagation(); const shouldDelete = this._config.confirm_delete ? confirm(`Are you sure you want to delete "${task.summary}"?`) : true; if (!shouldDelete) return;
    this._editedTaskId = null; this._expandedTaskId = null;
    try { await this._hass.callService("todo", "remove_item", { item: [task.uid] }, { entity_id: this._config.entity }); this.fetchTodoItems(); } catch (err) { console.error('Error deleting item:', err); this._error = `Failed to delete item: ${err.message}`; }
  }
  
  async _handleClearCompleted() {
    const completedItems = this._tasks.filter(t => t.status === 'completed'); if (completedItems.length === 0) return;
    const shouldClear = confirm(`Are you sure you want to delete all ${completedItems.length} completed items?`); if (!shouldClear) return;
    const uidsToRemove = completedItems.map(t => t.uid);
    try { await this._hass.callService("todo", "remove_item", { item: uidsToRemove }, { entity_id: this._config.entity }); this.fetchTodoItems(); } catch (err) { console.error('Error clearing completed items:', err); this._error = `Failed to clear completed items: ${err.message}`; }
  }
  
  _handleOpenLink(ev, link) { ev.stopPropagation(); const sanitized = this._sanitizeUrl(link); if (sanitized) { window.open(sanitized, '_blank', 'noopener,noreferrer'); } }
  
  _toggleEditMode(taskUid) {
    if (this._editedTaskId === taskUid) { this._editedTaskId = null; this._resetEditInputs(); } else {
      const task = this._tasks.find(t => t.uid === taskUid);
      if (task) {
        this._editedTaskId = taskUid; this._expandedTaskId = null; this._editSummary = task.summary; const metadata = task._cachedMetadata || {};
        this._editDescription = metadata.description ?? ''; this._editPriority = metadata.priority ?? DEFAULT_PRIORITY; this._editIcon = metadata.icon ?? DEFAULT_ICON; this._editLink = metadata.link ?? ''; this._editQuantity = metadata.quantity ?? '';
        if (task.due) { try { const date = new Date(task.due); this._editDueDate = date.toISOString().split('T')[0]; const timeStr = task.due.split('T')[1]; if (timeStr && !timeStr.startsWith('00:00:00')) { const hours = String(date.getHours()).padStart(2, '0'); const minutes = String(date.getMinutes()).padStart(2, '0'); this._editDueTime = `${hours}:${minutes}`; } else { this._editDueTime = ''; } } catch (e) { console.error('Error parsing due date:', e); this._editDueDate = ''; this._editDueTime = ''; } } else { this._editDueDate = ''; this._editDueTime = ''; }
      }
    }
  }
  
  _handleKeyDown(ev, action) { if (ev.key === 'Enter') { ev.preventDefault(); action(); } else if (ev.key === 'Escape') { ev.preventDefault(); if (this._isAddAreaOpen) { this._isAddAreaOpen = false; this._resetNewItemInputs(); } else if (this._editedTaskId) { this._editedTaskId = null; this._resetEditInputs(); } else if (this._expandedTaskId) { this._expandedTaskId = null; } } }
  _getDueDateStatus(dueDateStr) { if (!dueDateStr) return null; const today = new Date(); const dueDate = new Date(dueDateStr); const todayStr = today.toISOString().split('T')[0]; const dueStr = dueDateStr.split('T')[0]; if (dueStr < todayStr) return 'overdue'; if (dueStr === todayStr) return 'due-today'; return null; }
  _getPriorityInfo(priority) { const prio = parseInt(priority, 10); if (isNaN(prio)) return null; if (prio <= 1) return { text: 'Urgent', color: 'var(--error-color)' }; if (prio <= 4) return { text: 'High', color: 'var(--error-color)' }; if (prio <= 7) return { text: 'Medium', color: 'var(--warning-color)' }; return { text: 'Low', color: 'var(--success-color)' }; }
  _formatDueDate(dueDateStr) { if (!dueDateStr) return null; try { const date = new Date(dueDateStr); const now = new Date(); const hasTime = dueDateStr.includes('T') && !dueDateStr.match(/T00:00:00/); const pad = (num) => String(num).padStart(2, '0'); const day = date.getDate(); const month = new Intl.DateTimeFormat(this._hass.locale?.language || 'en', { month: 'short' }).format(date).toLowerCase(); let result = `${day}.${month}`; if (date.getFullYear() !== now.getFullYear()) { result += `.${date.getFullYear()}`; } if (hasTime) { const hours = pad(date.getHours()); const minutes = pad(date.getMinutes()); result += `, ${hours}:${minutes}`; } return result; } catch (e) { console.error('Date formatting error:', e); return dueDateStr; } }
  
  render() {
    if (!this._hass || !this._config) return html``;
    const entityState = this._hass.states[this._config.entity];
    if (!entityState) { return html`<ha-card><div class="warning">Entity not found: ${this._config.entity}</div></ha-card>`; }
    const allTasks = Array.isArray(this._tasks) ? this._tasks : [];
    const sortFn = (a, b) => {
      const sortBy = this._config.sort_by || 'priority'; const sortOrder = this._config.sort_order || 'asc'; const direction = sortOrder === 'desc' ? -1 : 1; let valA, valB;
      switch (sortBy) { case 'duedate': valA = a.due ? new Date(a.due).getTime() : Infinity; valB = b.due ? new Date(b.due).getTime() : Infinity; break; case 'priority': valA = parseInt(a._cachedMetadata?.priority ?? DEFAULT_PRIORITY, 10); valB = parseInt(b._cachedMetadata?.priority ?? DEFAULT_PRIORITY, 10); break; case 'title': default: valA = a.summary?.toLowerCase() || ''; valB = b.summary?.toLowerCase() || ''; break; }
      if (valA < valB) return -1 * direction; if (valA > valB) return 1 * direction; return 0;
    };
    const activeItems = allTasks.filter(t => t.status === 'needs_action').sort(sortFn);
    const completedItems = allTasks.filter(t => t.status === 'completed').sort(sortFn);
    const isFrameless = this._config.card_background === 'none'; const headerPadding = isFrameless ? '6px 4px 12px 16px' : '6px 20px 12px 20px'; const contentPadding = isFrameless ? '0 4px 4px' : '0 12px 12px';
    let countText = this._config.mode === 'tasks' ? `${activeItems.length} tasks · ${completedItems.length} completed` : `${activeItems.length} items · ${completedItems.length} checked`;
    return html`<ha-card style="background: ${this._config.card_background};"><div class="card-header" style="padding: ${headerPadding};"><div class="header-text"><div class="name">${this._config.title ?? ''}</div><div class="header-count">${countText}</div></div><div class="header-buttons">${completedItems.length > 0 ? html`<ha-icon-button class="clear-button" @click="${this._handleClearCompleted}" title="Clear Completed Items"><ha-icon icon="mdi:broom"></ha-icon></ha-icon-button>` : ''}<ha-icon-button class="add-button" @click="${() => { this._isAddAreaOpen = !this._isAddAreaOpen; this._editedTaskId = null; this._resetEditInputs(); }}"><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button></div></div><div class="card-content" style="padding: ${contentPadding};">${this._error ? html`<div class="error-message" @click="${() => this._error = null}">${this._error}</div>` : ''}${this._isLoading ? html`<div class="loading">Loading...</div>` : ''}${this._isAddAreaOpen ? this._renderAddForm() : ''}${allTasks.length === 0 && !this._isAddAreaOpen && !this._isLoading ? html`<div class="empty-list">No items</div>` : ''}${activeItems.map(item => this._renderItem(item))}${completedItems.map(item => this._renderItem(item))}</div></ha-card>`;
  }
  
  _renderAddForm() { if (this._config.mode === 'tasks') return this._renderAddTaskForm(); if (this._config.mode === 'shopping') return this._renderAddShoppingItemForm(); return html``; }
  _renderEditForm(item) { if (this._config.mode === 'tasks') return this._renderEditTaskForm(item); if (this._config.mode === 'shopping') return this._renderEditShoppingItemForm(item); return html``; }
  _renderItem(item) { if (this._config.mode === 'tasks') return this._renderTask(item); if (this._config.mode === 'shopping') return this._renderShoppingItem(item); return html``; }
  
  _renderAddTaskForm() {
    return html`<div class="add-edit-area" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleAddItem())}"><h3>New Task</h3><ha-textfield label="Title" .value="${this._newItemSummary}" @input="${e => this._newItemSummary = e.target.value}"></ha-textfield><ha-textfield label="Description (optional)" .value="${this._newItemDescription}" @input="${e => this._newItemDescription = e.target.value}"></ha-textfield><div class="row"><ha-textfield label="Priority" type="number" min="1" max="10" .value="${this._newItemPriority}" @input="${e => this._newItemPriority = e.target.value}"></ha-textfield><ha-textfield label="Due Date" type="date" .value="${this._newItemDueDate}" @input="${e => this._newItemDueDate = e.target.value}"></ha-textfield><ha-textfield label="Time (optional)" type="time" .value="${this._newItemDueTime}" @input="${e => this._newItemDueTime = e.target.value}"></ha-textfield></div><ha-icon-picker label="Icon" .value="${this._newItemIcon}" @value-changed="${e => this._newItemIcon = e.detail.value}"></ha-icon-picker><div class="buttons"><mwc-button @click="${() => { this._isAddAreaOpen = false; this._resetNewItemInputs(); }}" class="btn btn-cancel">Cancel</mwc-button><mwc-button @click="${this._handleAddItem}" raised class="btn btn-add">Add</mwc-button></div></div>`;
  }
  _renderEditTaskForm(task) {
    return html`<div class="add-edit-area edit-area" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleSaveEdit(task))}"><h3>Edit Task</h3><ha-textfield label="Title" .value="${this._editSummary}" @input="${e => this._editSummary = e.target.value}"></ha-textfield><ha-textfield label="Description (optional)" .value="${this._editDescription}" @input="${e => this._editDescription = e.target.value}"></ha-textfield><div class="row"><ha-textfield label="Priority" type="number" min="1" max="10" .value="${this._editPriority}" @input="${e => this._editPriority = e.target.value}"></ha-textfield><ha-textfield label="Due Date" type="date" .value="${this._editDueDate}" @input="${e => this._editDueDate = e.target.value}"></ha-textfield><ha-textfield label="Time (optional)" type="time" .value="${this._editDueTime}" @input="${e => this._editDueTime = e.target.value}"></ha-textfield></div><ha-icon-picker label="Icon" .value="${this._editIcon}" @value-changed="${e => this._editIcon = e.detail.value}"></ha-icon-picker><div class="buttons"><mwc-button @click="${(e) => this._handleDeleteItem(e, task)}" class="btn btn-delete">Delete</mwc-button><div style="flex-grow: 1;"></div><mwc-button @click="${() => { this._editedTaskId = null; this._resetEditInputs(); }}" class="btn btn-cancel">Cancel</mwc-button><mwc-button @click="${() => this._handleSaveEdit(task)}" raised class="btn btn-add">Save</mwc-button></div></div>`;
  }
  _renderAddShoppingItemForm() {
    return html`<div class="add-edit-area" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleAddItem())}"><h3>New Shopping Item</h3><div class="row"><ha-textfield label="Item Name" .value="${this._newItemSummary}" @input="${e => this._newItemSummary = e.target.value}" style="flex-grow: 1;"></ha-textfield><ha-textfield label="Qty" type="number" min="1" .value="${this._newItemQuantity}" @input="${e => this._newItemQuantity = e.target.value}" style="width: 30%;"></ha-textfield></div><ha-textfield label="Description (optional)" .value="${this._newItemDescription}" @input="${e => this._newItemDescription = e.target.value}"></ha-textfield><ha-textfield label="Link (optional)" .value="${this._newItemLink}" @input="${e => this._newItemLink = e.target.value}"></ha-textfield><div class="buttons"><mwc-button @click="${() => { this._isAddAreaOpen = false; this._resetNewItemInputs(); }}" class="btn btn-cancel">Cancel</mwc-button><mwc-button @click="${this._handleAddItem}" raised class="btn btn-add">Add</mwc-button></div></div>`;
  }
  _renderEditShoppingItemForm(item) {
    return html`<div class="add-edit-area edit-area" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleSaveEdit(item))}"><h3>Edit Item</h3><div class="row"><ha-textfield label="Item Name" .value="${this._editSummary}" @input="${e => this._editSummary = e.target.value}" style="flex-grow: 1;"></ha-textfield><ha-textfield label="Qty" type="number" min="1" .value="${this._editQuantity}" @input="${e => this._editQuantity = e.target.value}" style="width: 30%;"></ha-textfield></div><ha-textfield label="Description (optional)" .value="${this._editDescription}" @input="${e => this._editDescription = e.target.value}"></ha-textfield><ha-textfield label="Link (optional)" .value="${this._editLink}" @input="${e => this._editLink = e.target.value}"></ha-textfield><div class="buttons"><mwc-button @click="${(e) => this._handleDeleteItem(e, item)}" class="btn btn-delete">Delete</mwc-button><div style="flex-grow: 1;"></div><mwc-button @click="${() => { this._editedTaskId = null; this._resetEditInputs(); }}" class="btn btn-cancel">Cancel</mwc-button><mwc-button @click="${() => this._handleSaveEdit(item)}" raised class="btn btn-add">Save</mwc-button></div></div>`;
  }
  
  _renderPriorityLabel(priority) {
    const priorityInfo = this._getPriorityInfo(priority); if (!priorityInfo) return '';
    return html`<span class="priority-label" style="background-color: ${priorityInfo.color};" title="Priority: ${priority}">${priorityInfo.text}</span>`;
  }

  _renderSubtasks(task) {
    const subtasks = task._cachedMetadata?.subtasks || [];
    return html`
      <div class="subtask-area" style="background-color: ${this._config.card_color};">
          <ul class="subtask-list">
              ${subtasks.map(sub => html`
                  <li class="subtask-item ${sub.status}">
                      <div class="checkbox" @click="${(e) => this._handleSubtaskStatusUpdate(e, task, sub.uid)}">
                          <ha-icon icon="${sub.status === 'completed' ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}"></ha-icon>
                      </div>
                      <span class="subtask-summary">${sub.summary}</span>
                      <ha-icon-button class="delete-subtask" @click="${(e) => this._handleDeleteSubtask(e, task, sub.uid)}">
                          <ha-icon icon="mdi:close"></ha-icon>
                      </ha-icon-button>
                  </li>
              `)}
          </ul>
          <div class="add-subtask-row">
              <ha-textfield id="subtask-input-${task.uid}" placeholder="Add new sub-item" @keydown="${(e) => { if (e.key === 'Enter') this._handleAddSubtask(e, task); }}"></ha-textfield>
              <mwc-button raised class="btn btn-add-subtask" @click="${(e) => this._handleAddSubtask(e, task)}"><ha-icon icon="mdi:plus"></ha-icon></mwc-button>
          </div>
          <div class="subtask-buttons">
              <div style="flex-grow: 1;"></div>
              <mwc-button @click="${(e) => { e.stopPropagation(); this._toggleEditMode(task.uid); }}" class="btn btn-edit">Edit Details</mwc-button>
          </div>
      </div>
    `;
  }
  
  _renderTask(task) {
    const isCompleted = task.status === 'completed'; const textColor = isCompleted ? this._config.completed_text_color : this._config.text_color; const metadata = task._cachedMetadata ?? {}; const description = metadata.description || null; const priority = metadata.priority || DEFAULT_PRIORITY; const icon = metadata.icon || 'mdi:hammer'; const dueDate = task.due || null; const dueDateStatus = this._getDueDateStatus(dueDate);
    const subtasks = metadata.subtasks || []; const completedSubtasks = subtasks.filter(s => s.status === 'completed').length; const totalSubtasks = subtasks.length; const hasDescription = !!description; const hasDueDate = !isCompleted && !!dueDate;
    return html`
      <div class="task-container">
        <div class="task-item ${isCompleted ? 'completed' : 'active'} ${dueDateStatus || ''}" @click="${() => this._toggleExpand(task.uid)}" style="background-color: ${isCompleted ? this._config.completed_color : this._config.card_color}; color: ${textColor};">
          <div class="icon" style="background-color: ${this._config.icon_background};"><ha-icon icon="${icon}"></ha-icon></div>
          <div class="task-text">
            <div class="summary">
              <span>${task.summary}</span>
              ${this._config.show_priority && !isCompleted ? this._renderPriorityLabel(priority) : ''}
              ${totalSubtasks > 0 && !isCompleted ? html`
                <div class="subtask-progress" title="${completedSubtasks} of ${totalSubtasks} completed">
                  <ha-icon icon="mdi:format-list-checks"></ha-icon>
                  <span>${completedSubtasks}/${totalSubtasks}</span>
                  <div class="progress-bar-background"><div class="progress-bar-foreground" style="width: ${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%;"></div></div>
                </div>
              ` : ''}
            </div>
            ${hasDescription || hasDueDate ? html`
              <div class="priority">
                ${hasDescription ? html`<span>${description}</span>` : ''}
                ${hasDescription && hasDueDate ? html`<span class="separator"> • </span>` : ''}
                ${hasDueDate ? html`<span class="due-date-wrapper"><ha-icon icon="mdi:clock-time-four"></ha-icon>${this._formatDueDate(dueDate)}</span>` : ''}
              </div>
            ` : ''}
          </div>
          <div class="checkbox" @click="${(e) => this._handleStatusUpdate(e, task)}"><ha-icon icon="${isCompleted ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}"></ha-icon></div>
        </div>
        ${this._expandedTaskId === task.uid ? this._renderSubtasks(task) : ''}
        ${this._editedTaskId === task.uid ? this._renderEditForm(task) : ''}
      </div>
    `;
  }

  _renderShoppingItem(item) {
    const isCompleted = item.status === 'completed'; const textColor = isCompleted ? this._config.completed_text_color : this._config.text_color; const metadata = item._cachedMetadata ?? {}; const description = metadata.description || null; const link = metadata.link || null; const quantity = metadata.quantity || null;
    const subtasks = metadata.subtasks || []; const completedSubtasks = subtasks.filter(s => s.status === 'completed').length; const totalSubtasks = subtasks.length;
    return html`
      <div class="task-container">
        <div class="task-item shopping-item ${isCompleted ? 'completed' : 'active'}" @click="${() => this._toggleExpand(item.uid)}" style="background-color: ${isCompleted ? this._config.completed_color : this._config.card_color}; color: ${textColor};">
          <div class="task-text">
            <div class="summary">
                <span>${item.summary}</span>
                ${quantity ? html`<span class="quantity">(x${quantity})</span>` : ''}
                ${totalSubtasks > 0 && !isCompleted ? html`
                    <div class="subtask-progress" title="${completedSubtasks} of ${totalSubtasks} completed">
                        <ha-icon icon="mdi:format-list-checks"></ha-icon>
                        <span>${completedSubtasks}/${totalSubtasks}</span>
                        <div class="progress-bar-background"><div class="progress-bar-foreground" style="width: ${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%;"></div></div>
                    </div>
                ` : ''}
            </div>
            ${description ? html`<div class="priority">${description}</div>` : ''}
          </div>
          ${link ? html`<ha-icon class="link-button" icon="mdi:open-in-new" @click="${(e) => this._handleOpenLink(e, link)}"></ha-icon>` : ''}
          <div class="checkbox" @click="${(e) => this._handleStatusUpdate(e, item)}"><ha-icon icon="${isCompleted ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}"></ha-icon></div>
        </div>
        ${this._expandedTaskId === item.uid ? this._renderSubtasks(item) : ''}
        ${this._editedTaskId === item.uid ? this._renderEditForm(item) : ''}
      </div>
    `;
  }
  
  static get styles() {
    return css`
      ha-card { display: flex; flex-direction: column; height: 100%; overflow: hidden; isolation: isolate;}
      .card-header { display: flex; justify-content: space-between; align-items: center; }
      .header-text { flex-grow: 1; }
      .card-header .name { font-size: 20px; font-weight: 500; }
      .header-count { font-size: 12px; color: var(--secondary-text-color); opacity: 0.9; }
      .header-buttons { display: flex; align-items: center; }
      .clear-button, .add-button { color: var(--secondary-text-color); }
      ha-icon {display:flex!important;}
      .btn {border-radius: 20px; padding: 4px 12px; pointer: cursor;}
      .btn-edit, .btn-add {background:var(--primary-color); color: var(--mdc-theme-on-secondary); }
      .btn-delete {background:var(--error-color); color: var(--text-primary-color); }
      .btn-cancel {background:var(--card-background-color);}
      .warning, .empty-list, .loading { padding: 16px; text-align: center; }
      .error-message { padding: 12px; margin: 0 12px 12px; background-color: var(--error-color); color: var(--text-primary-color); border-radius: var(--ha-card-border-radius, 12px); text-align: center; cursor: pointer; }
      .card-content { flex-grow: 1; overflow-y: auto; }
      .task-item { display: flex; align-items: center; padding: 4px; min-height: 58px; border-radius: var(--ha-card-border-radius, 12px); cursor: pointer; margin-top: 8px; position: relative; z-index: 1; }
      .summary { font-weight: 500; font-size: 16px; display: flex; align-items: center; flex-wrap: wrap; gap: 0 4px; }
      .priority-label { font-size: 11px; font-weight: 600; padding: 2px 6px; border-radius: 8px; margin-left: 4px; color: var(--text-primary-color); opacity: 0.9; flex-shrink: 0; }
      .task-item.overdue .due-date-wrapper { color: var(--error-color)!important; }
      .task-item.due-today .due-date-wrapper { color: var(--warning-color)!important; }
      .task-container:first-child .task-item { margin-top: 0; }
      .task-item.completed { opacity: 0.7; }
      .completed .summary > span:first-child { text-decoration: line-through; }
      .completed .priority { color: inherit; }
      .icon { display: flex; align-items: center; justify-content: center; width: 58px; height: 58px; border-radius: 50%; margin-right: 12px; flex-shrink: 0; }
      .task-text { flex-grow: 1; overflow: hidden; text-overflow: ellipsis; padding: 8px 0; }
      .quantity { font-weight: normal; opacity: 0.8; margin-left: 4px; flex-shrink: 0; }
      .priority { font-size: 14px; font-weight: 400; opacity: 0.7; display: flex; align-items: center; flex-wrap: wrap; }
      .priority .separator { margin: 0 3px; }
      .due-date-wrapper { display: inline-flex; align-items: center; }
      .due-date-wrapper ha-icon { --mdc-icon-size: 1.1em; margin-right: 4px; opacity: 0.9; }
      .checkbox { margin-left: 8px; margin-right: 8px; border-radius: 50%; padding: 4px; transition: background-color 0.2s; }
      .checkbox:hover { background-color: rgba(255, 255, 255, 0.1); }
      .add-edit-area { border-radius: var(--ha-card-border-radius, 12px); margin-bottom: 12px; animation: slide-down 0.3s ease-out; position: relative; z-index: 0; padding: 16px; }
      .edit-area { margin-top: -56px; padding-top: 66px; }
      .add-edit-area.edit-area { animation: slide-down-subtle 0.3s ease-out; }
      .add-edit-area h3 { margin: 0 0 16px; }
      .add-edit-area ha-textfield, .add-edit-area ha-icon-picker { display: block; width: 100%; margin-bottom: 8px; --mdc-text-field-fill-color: rgba(0,0,0,0.2); }
      .add-edit-area .row { display: flex; gap: 8px; align-items: flex-end; }
      .add-edit-area .buttons, .subtask-buttons { display: flex; justify-content: flex-end; margin-top: 16px; gap: 12px; }
      .shopping-item .task-text { padding-left: 20px; }
      .link-button { margin-left: auto; color: var(--secondary-text-color); }
      .subtask-progress { display: flex; align-items: center; font-size: 12px; margin-left: 8px; color: var(--secondary-text-color); background: rgba(128, 128, 128, 0.2); padding: 2px 6px; border-radius: 8px; flex-shrink: 0;}
      .subtask-progress ha-icon { --mdc-icon-size: 1.2em; margin-right: 4px; }
      .progress-bar-background { flex-grow: 1; height: 4px; background-color: rgba(128, 128, 128, 0.3); border-radius: 2px; margin-left: 6px; min-width: 30px; }
      .progress-bar-foreground { height: 100%; background-color: var(--secondary-text-color); border-radius: 2px; transition: width 0.3s ease; }
      .subtask-area { padding: 30px 12px 12px 12px; margin-top: -26px; border-bottom-left-radius: var(--ha-card-border-radius, 12px); border-bottom-right-radius: var(--ha-card-border-radius, 12px); animation: slide-down-subtle 0.3s ease-out; }
      .subtask-list { list-style: none; padding: 0; margin: 0 0 12px 0; }
      .subtask-item { display: flex; align-items: center; padding: 4px 0; }
      .subtask-item .checkbox { margin-left: 0; }
      .subtask-summary { flex-grow: 1; opacity: 0.9; }
      .subtask-item.completed .subtask-summary { text-decoration: line-through; opacity: 0.7; }
      .delete-subtask { --mdc-icon-button-size: 32px; color: var(--secondary-text-color); }
      .add-subtask-row { display: flex; gap: 8px; align-items: center; }
      .add-subtask-row ha-textfield { flex-grow: 1; --mdc-text-field-fill-color: rgba(0,0,0,0.2); }
      @keyframes slide-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes slide-down-subtle { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    `;
  }
}

class TodoListCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object }, // The fix is here
    };
  }

  setConfig(config) {
    this._config = config;
  }

  configChanged(newConfig) {
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }
    return html`
      <div class="card-config">
        <ha-entity-picker label="Entity" .hass=${this.hass} .value=${this._config.entity} .includeDomains=${['todo']} @value-changed=${this._entityChanged} allow-custom-entity></ha-entity-picker>
        <ha-textfield label="Title" .value=${this._config.title || ''} @input=${this._titleChanged}></ha-textfield>
        <div class="row">
            <ha-select label="Sort By" .value=${this._config.sort_by || 'priority'} @closed=${this._sortbyChanged} fixedMenuPosition naturalMenuWidth>
              <mwc-list-item value="priority">Priority</mwc-list-item>
              <mwc-list-item value="duedate">Due Date</mwc-list-item>
              <mwc-list-item value="title">Title</mwc-list-item>
            </ha-select>
            <ha-select label="Sort Order" .value=${this._config.sort_order || 'asc'} @closed=${this._sortorderChanged} fixedMenuPosition naturalMenuWidth>
              <mwc-list-item value="asc">Ascending</mwc-list-item>
              <mwc-list-item value="desc">Descending</mwc-list-item>
            </ha-select>
        </div>
        <ha-select label="Mode" .value=${this._config.mode || 'tasks'} @closed=${this._modeChanged} fixedMenuPosition naturalMenuWidth>
          <mwc-list-item value="tasks">Tasks</mwc-list-item>
          <mwc-list-item value="shopping">Shopping</mwc-list-item>
        </ha-select>
        <ha-textfield label="Card Background (CSS)" .value=${this._config.card_background || DEFAULT_CARD_BACKGROUND} .helper=${"Use any CSS background. Set to 'none' for no padding."} .helperPersistent=${true} @input=${this._cardBackgroundChanged}></ha-textfield>
        <ha-textfield label="Card Color (CSS)" .value=${this._config.card_color || DEFAULT_CARD_COLOR} @input=${this._cardColorChanged}></ha-textfield>
        <ha-textfield label="Completed Color (CSS)" .value=${this._config.completed_color || DEFAULT_COMPLETED_COLOR} @input=${this._completedColorChanged}></ha-textfield>
        <ha-textfield label="Icon Background (CSS)" .value=${this._config.icon_background || DEFAULT_ICON_BACKGROUND} @input=${this._iconBackgroundChanged}></ha-textfield>
        <ha-textfield label="Text Color (CSS)" .value=${this._config.text_color || DEFAULT_TEXT_COLOR} @input=${this._textColorChanged}></ha-textfield>
        <ha-textfield label="Completed Text Color (CSS)" .value=${this._config.completed_text_color || DEFAULT_COMPLETED_TEXT_COLOR} @input=${this._completedTextColorChanged}></ha-textfield>
        <ha-formfield label="Show Priority"><ha-switch .checked=${this._config.show_priority !== false} @change=${this._showPriorityChanged}></ha-switch></ha-formfield>
        <ha-formfield label="Confirm Before Delete"><ha-switch .checked=${this._config.confirm_delete !== false} @change=${this._confirmDeleteChanged}></ha-switch></ha-formfield>
        <ha-formfield label="Auto-complete parent task"><ha-switch .checked=${this._config.auto_complete_parent === true} @change=${this._autoCompleteChanged}></ha-switch></ha-formfield>
      </div>
    `;
  }
  _entityChanged(ev) { this.configChanged({ ...this._config, entity: ev.detail.value }); }
  _titleChanged(ev) { this.configChanged({ ...this._config, title: ev.target.value }); }
  _sortbyChanged(ev) { ev.stopPropagation(); if (!ev.target.value) return; this.configChanged({ ...this._config, sort_by: ev.target.value }); }
  _sortorderChanged(ev) { ev.stopPropagation(); if (!ev.target.value) return; this.configChanged({ ...this._config, sort_order: ev.target.value }); }
  _modeChanged(ev) { ev.stopPropagation(); if (!ev.target.value) return; this.configChanged({ ...this._config, mode: ev.target.value }); }
  _cardBackgroundChanged(ev) { this.configChanged({ ...this._config, card_background: ev.target.value }); }
  _cardColorChanged(ev) { this.configChanged({ ...this._config, card_color: ev.target.value }); }
  _completedColorChanged(ev) { this.configChanged({ ...this._config, completed_color: ev.target.value }); }
  _iconBackgroundChanged(ev) { this.configChanged({ ...this._config, icon_background: ev.target.value }); }
  _textColorChanged(ev) { this.configChanged({ ...this._config, text_color: ev.target.value }); }
  _completedTextColorChanged(ev) { this.configChanged({ ...this._config, completed_text_color: ev.target.value }); }
  _showPriorityChanged(ev) { this.configChanged({ ...this._config, show_priority: ev.target.checked }); }
  _confirmDeleteChanged(ev) { this.configChanged({ ...this._config, confirm_delete: ev.target.checked }); }
  _autoCompleteChanged(ev) { this.configChanged({ ...this._config, auto_complete_parent: ev.target.checked }); }
  static get styles() {
    return css`.card-config { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; } .row { display: flex; gap: 16px; } .row > * { flex: 1; } ha-formfield { display: flex; align-items: center; padding: 8px 0; }`;
  }
}

customElements.define('todo-list-card', TodoListCard);
customElements.define('todo-list-card-editor', TodoListCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "todo-list-card",
  name: "Todo List Card",
  preview: true,
  description: "A customizable card for managing todo lists with tasks and shopping modes."
});