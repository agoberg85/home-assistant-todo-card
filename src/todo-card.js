import {
  LitElement,
  html,
  css
} from 'lit';

// Class-level constants for re-use
const DEFAULT_PRIORITY = 'medium';
const DEFAULT_ICON = 'mdi:checkbox-blank-outline';
const DEFAULT_TASK_ICON = 'mdi:hammer';
const DEFAULT_CARD_BACKGROUND = 'var(--ha-card-background)';
const DEFAULT_CARD_COLOR = 'var(--ha-card-background)';
const DEFAULT_COMPLETED_COLOR = 'var(--success-color)';
const DEFAULT_ICON_BACKGROUND = 'rgba(128, 128, 128, 0.2)';
const DEFAULT_TEXT_COLOR = 'var(--text-primary-color)';
const DEFAULT_COMPLETED_TEXT_COLOR = 'var(--text-accent-color)';
const DEFAULT_LANGUAGE = 'auto';
const PRIORITY_OPTIONS = [
  { value: 'urgent', labelKey: 'priorityUrgent', color: 'var(--error-color)', rank: 0 },
  { value: 'high', labelKey: 'priorityHigh', color: 'var(--error-color)', rank: 1 },
  { value: 'medium', labelKey: 'priorityMedium', color: 'var(--warning-color)', rank: 2 },
  { value: 'low', labelKey: 'priorityLow', color: 'var(--success-color)', rank: 3 },
];
const PRIORITY_INFO = Object.fromEntries(PRIORITY_OPTIONS.map(option => [option.value, option]));
const LEGACY_PRIORITY_LABELS = {
  '1': 'urgent',
  '2': 'high',
  '3': 'high',
  '4': 'high',
  '5': 'medium',
  '6': 'medium',
  '7': 'medium',
  '8': 'low',
  '9': 'low',
  '10': 'low',
};
const FALLBACK_TRANSLATIONS = {
  active: 'Active',
  add: 'Add',
  addItem: 'Add item...',
  addNewTask: 'Add new task...',
  addSubItem: 'Add new sub-item',
  ascending: 'Ascending',
  autoCompleteParentTask: 'Auto-complete parent task',
  cancel: 'Cancel',
  cardBackgroundCss: 'Card Background (CSS)',
  cardColorCss: 'Card Color (CSS)',
  clearCompletedItems: 'Clear Completed Items',
  completed: 'Completed',
  completedColorCss: 'Completed Color (CSS)',
  completedItemsChecked: '{active} items · {completed} checked',
  completedTasks: '{active} tasks · {completed} completed',
  completedTextColorCss: 'Completed Text Color (CSS)',
  confirmBeforeDelete: 'Confirm Before Delete',
  confirmClearCompleted: 'Are you sure you want to delete all {count} completed items?',
  confirmDeleteItem: 'Are you sure you want to delete "{item}"?',
  descriptionOptional: 'Description (optional)',
  descending: 'Descending',
  dueDate: 'Due Date',
  editDetails: 'Edit Details',
  editItem: 'Edit Item',
  editTask: 'Edit Task',
  enableQuickAdd: 'Enable Quick Add (Rapid Entry)',
  entity: 'Entity',
  failedToAddItem: 'Failed to add item: {message}',
  failedToClearCompleted: 'Failed to clear completed items: {message}',
  failedToLoadItems: 'Failed to load items: {message}',
  failedToUpdateItem: 'Failed to update item: {message}',
  failedToUpdateSubtasks: 'Failed to update sub-tasks: {message}',
  high: 'High',
  icon: 'Icon',
  iconBackgroundCss: 'Icon Background (CSS)',
  itemName: 'Item Name',
  itemNameCannotBeEmpty: 'Item name cannot be empty',
  language: 'Language',
  languageAuto: 'Auto (Home Assistant)',
  languageDe: 'German',
  languageEn: 'English',
  languageNo: 'Norwegian',
  linkOptional: 'Link (optional)',
  loading: 'Loading...',
  low: 'Low',
  mode: 'Mode',
  newShoppingItem: 'New Shopping Item',
  newTask: 'New Task',
  noItems: 'No items',
  overdue: 'Overdue',
  priority: 'Priority',
  priorityHigh: 'High',
  priorityLow: 'Low',
  priorityMedium: 'Medium',
  priorityUrgent: 'Urgent',
  qty: 'Qty',
  resultsFound: '{count} results found',
  save: 'Save',
  searchItems: 'Search items...',
  shopping: 'Shopping',
  showClearButton: 'Show Clear Button',
  showFilterMenu: 'Show Filter Menu',
  showIcon: 'Show Icon',
  showPriority: 'Show Priority',
  showSearchButton: 'Show Search Button',
  showTagHeadings: 'Group by Tags',
  sortBy: 'Sort By',
  sortOrder: 'Sort Order',
  sortPriorityTitle: 'Priority: {priority}',
  status: 'Status',
  tag: 'Tag',
  tagOrder: 'Tag order',
  tagOrderHelp: 'Comma-separated. Listed tags appear first; other tags remain alphabetical.',
  tags: 'Tags',
  tagsOptional: 'Tags (comma separated)',
  untagged: 'Untagged',
  checkboxPosition: 'Checkbox Position',
  checkboxPositionLeft: 'Left',
  checkboxPositionRight: 'Right',
  tasks: 'Tasks',
  textColorCss: 'Text Color (CSS)',
  timeOptional: 'Time (optional)',
  title: 'Title',
  useAnyCssBackground: "Use any CSS background. Set to 'none' for no padding.",
  defaultTaskIcon: 'Default Task Icon',
  delete: 'Delete',
};
const BUILTIN_TRANSLATIONS = {
  en: FALLBACK_TRANSLATIONS,
  no: {
    active: 'Aktive',
    add: 'Legg til',
    addItem: 'Legg til vare...',
    addNewTask: 'Legg til ny oppgave...',
    addSubItem: 'Legg til deloppgave',
    ascending: 'Stigende',
    autoCompleteParentTask: 'Fullfør foreldreoppgave automatisk',
    cancel: 'Avbryt',
    cardBackgroundCss: 'Kortbakgrunn (CSS)',
    cardColorCss: 'Kortfarge (CSS)',
    clearCompletedItems: 'Slett fullførte elementer',
    completed: 'Fullført',
    completedColorCss: 'Farge for fullført (CSS)',
    completedItemsChecked: '{active} varer · {completed} avhukede',
    completedTasks: '{active} oppgaver · {completed} fullført',
    completedTextColorCss: 'Tekstfarge for fullfort (CSS)',
    confirmBeforeDelete: 'Bekreft før sletting',
    confirmClearCompleted: 'Er du sikker pa at du vil slette alle {count} fullforte elementer?',
    confirmDeleteItem: 'Er du sikker pa at du vil slette "{item}"?',
    defaultTaskIcon: 'Standardikon for oppgaver',
    delete: 'Slett',
    descriptionOptional: 'Beskrivelse (valgfritt)',
    descending: 'Synkende',
    dueDate: 'Forfallsdato',
    editDetails: 'Rediger detaljer',
    editItem: 'Rediger vare',
    editTask: 'Rediger oppgave',
    enableQuickAdd: 'Aktiver hurtiglegging',
    entity: 'Entitet',
    failedToAddItem: 'Kunne ikke legge til element: {message}',
    failedToClearCompleted: 'Kunne ikke slette fullforte elementer: {message}',
    failedToLoadItems: 'Kunne ikke laste elementer: {message}',
    failedToUpdateItem: 'Kunne ikke oppdatere element: {message}',
    failedToUpdateSubtasks: 'Kunne ikke oppdatere deloppgaver: {message}',
    icon: 'Ikon',
    iconBackgroundCss: 'Ikonbakgrunn (CSS)',
    itemName: 'Navn',
    itemNameCannotBeEmpty: 'Navnet kan ikke vare tomt',
    language: 'Språk',
    languageAuto: 'Automatisk (Home Assistant)',
    languageDe: 'Tysk',
    languageEn: 'Engelsk',
    languageNo: 'Norsk',
    linkOptional: 'Lenke (valgfritt)',
    loading: 'Laster...',
    mode: 'Modus',
    newShoppingItem: 'Ny vare',
    newTask: 'Ny oppgave',
    noItems: 'Ingen elementer',
    overdue: 'Forfalt',
    priority: 'Prioritet',
    priorityHigh: 'Høy',
    priorityLow: 'Lav',
    priorityMedium: 'Medium',
    priorityUrgent: 'Haster',
    qty: 'Antall',
    resultsFound: '{count} treff funnet',
    save: 'Lagre',
    searchItems: 'Søk i elementer...',
    shopping: 'Handling',
    showClearButton: 'Vis knapp for sletting',
    showFilterMenu: 'Vis filtermeny',
    showIcon: 'Vis ikon',
    showPriority: 'Vis prioritet',
    showSearchButton: 'Vis søkeknapp',
    showTagHeadings: 'Grupper etter tagg',
    sortBy: 'Sorter etter',
    sortOrder: 'Sorteringsrekkefolge',
    sortPriorityTitle: 'Prioritet: {priority}',
    status: 'Status',
    tag: 'Tagg',
    tagOrder: 'Rekkefølge på tagger',
    tagOrderHelp: 'Kommaseparert. Oppførte tagger vises først; andre tagger sorteres alfabetisk.',
    tags: 'Tagger',
    tagsOptional: 'Tagger',
    untagged: 'Uten tagg',
    checkboxPosition: 'Plassering av avkryssing',
    checkboxPositionLeft: 'Venstre',
    checkboxPositionRight: 'Høyre',
    tasks: 'Oppgaver',
    textColorCss: 'Tekstfarge (CSS)',
    timeOptional: 'Tid (valgfritt)',
    title: 'Tittel',
    useAnyCssBackground: "Bruk valgfri CSS-bakgrunn. Sett til 'none' for ingen padding."
  },
  de: {
    active: 'Aktiv',
    add: 'Hinzufugen',
    addItem: 'Element hinzufugen...',
    addNewTask: 'Neue Aufgabe hinzufugen...',
    addSubItem: 'Teilaufgabe hinzufugen',
    ascending: 'Aufsteigend',
    autoCompleteParentTask: 'Ubergeordnete Aufgabe automatisch abschliessen',
    cancel: 'Abbrechen',
    cardBackgroundCss: 'Kartenhintergrund (CSS)',
    cardColorCss: 'Kartenfarbe (CSS)',
    clearCompletedItems: 'Erledigte Elemente loschen',
    completed: 'Erledigt',
    completedColorCss: 'Farbe fur erledigt (CSS)',
    completedItemsChecked: '{active} Elemente · {completed} abgehakt',
    completedTasks: '{active} Aufgaben · {completed} erledigt',
    completedTextColorCss: 'Textfarbe fur erledigt (CSS)',
    confirmBeforeDelete: 'Loschen bestatigen',
    confirmClearCompleted: 'Mochtest du wirklich alle {count} erledigten Elemente loschen?',
    confirmDeleteItem: 'Mochtest du "{item}" wirklich loschen?',
    defaultTaskIcon: 'Standard-Aufgabensymbol',
    delete: 'Loschen',
    descriptionOptional: 'Beschreibung (optional)',
    descending: 'Absteigend',
    dueDate: 'Falligkeitsdatum',
    editDetails: 'Details bearbeiten',
    editItem: 'Element bearbeiten',
    editTask: 'Aufgabe bearbeiten',
    enableQuickAdd: 'Schnelles Hinzufugen aktivieren',
    entity: 'Entitat',
    failedToAddItem: 'Element konnte nicht hinzugefugt werden: {message}',
    failedToClearCompleted: 'Erledigte Elemente konnten nicht geloscht werden: {message}',
    failedToLoadItems: 'Elemente konnten nicht geladen werden: {message}',
    failedToUpdateItem: 'Element konnte nicht aktualisiert werden: {message}',
    failedToUpdateSubtasks: 'Teilaufgaben konnten nicht aktualisiert werden: {message}',
    icon: 'Symbol',
    iconBackgroundCss: 'Symbolhintergrund (CSS)',
    itemName: 'Name',
    itemNameCannotBeEmpty: 'Der Name darf nicht leer sein',
    language: 'Sprache',
    languageAuto: 'Automatisch (Home Assistant)',
    languageDe: 'Deutsch',
    languageEn: 'Englisch',
    languageNo: 'Norwegisch',
    linkOptional: 'Link (optional)',
    loading: 'Ladt...',
    mode: 'Modus',
    newShoppingItem: 'Neues Einkaufs-Element',
    newTask: 'Neue Aufgabe',
    noItems: 'Keine Elemente',
    overdue: 'Uberfallig',
    priority: 'Prioritat',
    priorityHigh: 'Hoch',
    priorityLow: 'Niedrig',
    priorityMedium: 'Mittel',
    priorityUrgent: 'Dringend',
    qty: 'Menge',
    resultsFound: '{count} Treffer gefunden',
    save: 'Speichern',
    searchItems: 'Elemente durchsuchen...',
    shopping: 'Einkauf',
    showClearButton: 'Schaltflache zum Loschen anzeigen',
    showFilterMenu: 'Filtermenu anzeigen',
    showIcon: 'Symbol anzeigen',
    showPriority: 'Prioritat anzeigen',
    showSearchButton: 'Suchschaltflache anzeigen',
    showTagHeadings: 'Nach Tags / Kategorie gruppieren',
    sortBy: 'Sortieren nach',
    sortOrder: 'Sortierreihenfolge',
    sortPriorityTitle: 'Prioritat: {priority}',
    status: 'Status',
    tag: 'Tag',
    tagOrder: 'Tag-Reihenfolge',
    tagOrderHelp: 'Kommagetrennt. Aufgelistete Tags erscheinen zuerst; andere bleiben alphabetisch.',
    tags: 'Tags / Kategorie',
    tagsOptional: 'Tags / Kategorie (kommagetrennt)',
    untagged: 'Ohne Tag',
    checkboxPosition: 'Checkbox-Position',
    checkboxPositionLeft: 'Links',
    checkboxPositionRight: 'Rechts',
    tasks: 'Aufgaben',
    textColorCss: 'Textfarbe (CSS)',
    timeOptional: 'Zeit (optional)',
    title: 'Titel',
    useAnyCssBackground: "Beliebigen CSS-Hintergrund verwenden. Fur keinen Innenabstand auf 'none' setzen."
  }
};
const TRANSLATIONS_PATH = new URL('./translations/', import.meta.url);

function interpolateTemplate(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}

class TodoListCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { state: true },
      _tasks: { state: true },
      _isAddAreaOpen: { state: true },

      // Filter & Search states
      _isFilterOpen: { state: true },
      _isSearchOpen: { state: true },
      _searchQuery: { state: true },
      _filters: { state: true },

      _editedTaskId: { state: true },
      _expandedTaskId: { state: true },

      _isLoading: { state: true },
      _error: { state: true },
      _translations: { state: true },
      _activeLanguage: { state: true },
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
      default_task_icon: DEFAULT_TASK_ICON,
      language: DEFAULT_LANGUAGE,
      show_icon: true,
      show_priority: true,
      show_tag_headings: false,
      tag_order: [],
      checkbox_position: 'right',
      confirm_delete: true,
      show_filter_menu: true,
      show_search_button: true,
      show_clear_button: true,
      quick_add: false,
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
        this._queuePostMutationRefresh();
      }
    } catch (err) {
      console.error('Error updating task metadata:', err);
      this._error = this._t('failedToUpdateSubtasks', { message: err.message });
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
    this._tasks = [];
    this._isAddAreaOpen = false;
    this._editedTaskId = null;
    this._expandedTaskId = null;
    this._isLoading = false;
    this._error = null;
    this._isFilterOpen = false;
    this._isSearchOpen = false;
    this._searchQuery = '';
    this._translations = FALLBACK_TRANSLATIONS;
    this._activeLanguage = 'en';
    this._postMutationRefreshTimeout = null;
    this._searchInputTimeout = null;
    this._fetchRequestId = 0;
    // Default filters (will be overwritten by loadFilters if saved data exists)
    this._filters = { active: true, overdue: true, completed: true, tags: {} }
    this._resetNewItemInputs();
    this._resetEditInputs();
    this._boundClickListener = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._boundClickListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._boundClickListener);
    this._clearPostMutationRefresh();
    this._clearSearchInputTimeout();
    this._fetchRequestId++;
  }

  updated(changedProperties) {
    if (changedProperties.has('_isFilterOpen')) {
      this.style.zIndex = this._isFilterOpen ? '20' : '';
    }
  }

  _handleOutsideClick(e) {
    if (this._isFilterOpen) {
      this._isFilterOpen = false;
    }
  }

  _resetNewItemInputs() {
    this._newItemSummary = ''; this._newItemDescription = ''; this._newItemPriority = DEFAULT_PRIORITY; this._newItemIcon = this._getDefaultItemIcon(); this._newItemLink = ''; this._newItemQuantity = ''; this._newItemDueDate = ''; this._newItemDueTime = ''; this._newItemTags = '';
  }

  _resetEditInputs() {
    this._editSummary = ''; this._editDescription = ''; this._editPriority = DEFAULT_PRIORITY; this._editIcon = this._getDefaultItemIcon(); this._editLink = ''; this._editQuantity = ''; this._editDueDate = ''; this._editDueTime = ''; this._editTags = '';
  }

  _clearPostMutationRefresh() {
    if (this._postMutationRefreshTimeout) {
      clearTimeout(this._postMutationRefreshTimeout);
      this._postMutationRefreshTimeout = null;
    }
  }


  _queuePostMutationRefresh(delay = 1200) {
    this._clearPostMutationRefresh();
    this._postMutationRefreshTimeout = setTimeout(() => {
      this._postMutationRefreshTimeout = null;
      this.fetchTodoItems();
    }, delay);
  }

  _clearSearchInputTimeout() {
    if (this._searchInputTimeout) {
      clearTimeout(this._searchInputTimeout);
      this._searchInputTimeout = null;
    }
  }

  _setDraftValue(property, value, shouldUpdate = false) {
    this[property] = value;
    if (shouldUpdate) {
      this.requestUpdate();
    }
  }

  _handleSearchInput(ev) {
    const value = ev.target.value;
    this._clearSearchInputTimeout();
    this._searchInputTimeout = setTimeout(() => {
      this._searchInputTimeout = null;
      this._searchQuery = value;
    }, 180);
  }

  setConfig(config) {
    if (!config.entity) { throw new Error("You need to define a todo entity"); }
    this._config = {
      mode: 'tasks',
      card_background: DEFAULT_CARD_BACKGROUND,
      card_color: DEFAULT_CARD_COLOR,
      completed_color: DEFAULT_COMPLETED_COLOR,
      icon_background: DEFAULT_ICON_BACKGROUND,
      text_color: DEFAULT_TEXT_COLOR,
      completed_text_color: DEFAULT_COMPLETED_TEXT_COLOR,
      default_task_icon: DEFAULT_TASK_ICON,
      language: DEFAULT_LANGUAGE,
      show_icon: true,
      show_priority: true,
      show_tag_headings: false,
      tag_order: [],
      checkbox_position: 'right',
      confirm_delete: true,
      sort_by: 'priority',
      sort_order: 'asc',
      auto_complete_parent: false,
      show_search_button: true,
      show_clear_button: true,
      quick_add: false,
      ...config
    };
    this._loadTranslations();
    // Load persistent filters
    this._loadFilters();
  }

  _loadFilters() {
    if (!this._config?.entity) return;
    const key = `todo-list-card-filters-${this._config.entity}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        this._filters = { active: true, overdue: true, completed: true, tags: {}, ...JSON.parse(stored) };
      } catch (e) {
        console.warn("Failed to parse stored filters, resetting to default");
        this._filters = { active: true, overdue: true, completed: true, tags: {} };
      }
    }
  }

  _saveFilters() {
    if (!this._config?.entity) return;
    const key = `todo-list-card-filters-${this._config.entity}`;
    localStorage.setItem(key, JSON.stringify(this._filters));
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    const nextLanguage = this._getResolvedLanguage();
    if (nextLanguage !== this._activeLanguage) {
      this._loadTranslations();
    }
    if (!this._config?.entity || !oldHass) { this.fetchTodoItems(); return; }
    const oldEntity = oldHass.states[this._config.entity];
    const newEntity = hass.states[this._config.entity];
    if (!oldEntity || oldEntity.last_updated !== newEntity?.last_updated || oldEntity.attributes?.items !== newEntity?.attributes?.items) {
      this._clearPostMutationRefresh();
      this.fetchTodoItems();
    }
  }

  _getDefaultTaskIcon() {
    return this._config?.default_task_icon || DEFAULT_TASK_ICON;
  }

  _getDefaultItemIcon() {
    return this._getDefaultTaskIcon();
  }

  _getItemIcon(metadata) {
    if (this._config?.show_icon === false) return '';
    const icon = metadata?.icon;
    return typeof icon === 'string' && icon.trim() ? icon.trim() : this._getDefaultItemIcon();
  }

  _getResolvedLanguage() {
    const configuredLanguage = this._config?.language || DEFAULT_LANGUAGE;
    if (configuredLanguage !== DEFAULT_LANGUAGE) {
      return configuredLanguage;
    }
    const hassLanguage = this._hass?.locale?.language || 'en';
    if (hassLanguage.startsWith('de')) return 'de';
    if (hassLanguage.startsWith('no') || hassLanguage.startsWith('nb') || hassLanguage.startsWith('nn')) return 'no';
    return 'en';
  }

  async _loadTranslations() {
    const nextLanguage = this._getResolvedLanguage();
    this._activeLanguage = nextLanguage;
    const builtinTranslations = BUILTIN_TRANSLATIONS[nextLanguage] || FALLBACK_TRANSLATIONS;
    if (nextLanguage === 'en') {
      this._translations = builtinTranslations;
      return;
    }
    try {
      const response = await fetch(new URL(`${nextLanguage}.json`, TRANSLATIONS_PATH));
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const translations = await response.json();
      this._translations = { ...builtinTranslations, ...translations };
    } catch (err) {
      this._translations = builtinTranslations;
    }
  }

  _t(key, values) {
    return interpolateTemplate(this._translations?.[key] || FALLBACK_TRANSLATIONS[key] || key, values);
  }

  async fetchTodoItems() {
    if (!this._hass || !this._config.entity) return;

    const requestId = ++this._fetchRequestId;
    const entityId = this._config.entity;

    if (!this._tasks || this._tasks.length === 0) {
      this._isLoading = true;
    }

    this._error = null;
    try {
      let items;
      try {
        items = await this._hass.callWS({ type: 'todo/item/list', entity_id: entityId });
      } catch (err) {
        if (err.code === 'unknown_command') {
          items = await this._hass.callWS({ type: 'call_service', domain: 'todo', service: 'get_items', service_data: { entity_id: entityId }, return_response: true });
          items = items.response[entityId];
        } else {
          throw err;
        }
      }
      if (requestId !== this._fetchRequestId) return;
      this._tasks = (items.items || []).map(task => ({ ...task, _cachedMetadata: this._parseTaskMetadata(task.description) }));
    } catch (err) {
      if (requestId !== this._fetchRequestId) return;
      console.error('Error fetching todo items:', err);
      this._error = this._t('failedToLoadItems', { message: err.message });
    } finally {
      if (requestId === this._fetchRequestId) {
        this._isLoading = false;
      }
    }
  }

  _parseTaskMetadata(desc) {
    try {
      const data = JSON.parse(desc || '{}');
      return { description: this._sanitizeText(data.description ?? ''), priority: this._sanitizePriority(data.priority ?? DEFAULT_PRIORITY), icon: typeof data.icon === 'string' ? data.icon : '', link: this._sanitizeUrl(data.link ?? ''), quantity: this._sanitizeText(data.quantity ?? ''), tags: this._sanitizeTags(data.tags ?? data.tag ?? data.category ?? []), subtasks: Array.isArray(data.subtasks) ? data.subtasks : [] };
    } catch {
      return { description: '', priority: DEFAULT_PRIORITY, icon: '', link: '', quantity: '', tags: [], subtasks: [] };
    }
  }

  _sanitizePriority(val) {
    const normalized = String(val ?? '').toLowerCase();
    if (normalized in PRIORITY_INFO) return normalized;
    const num = parseInt(val, 10);
    if (isNaN(num)) return DEFAULT_PRIORITY;
    return LEGACY_PRIORITY_LABELS[Math.max(1, Math.min(10, num)).toString()] || DEFAULT_PRIORITY;
  }

  _getPriorityRank(priority) {
    return PRIORITY_INFO[this._sanitizePriority(priority)]?.rank ?? PRIORITY_INFO[DEFAULT_PRIORITY].rank;
  }
  _sanitizeText(txt) { return typeof txt === 'string' ? txt.replace(/[<>"']/g, '') : ''; }
  _sanitizeTags(value) {
    const rawTags = Array.isArray(value) ? value : String(value || '').split(',');
    return [...new Set(rawTags.map(tag => this._sanitizeText(String(tag).trim())).filter(Boolean))];
  }
  _formatTags(tags) { return this._sanitizeTags(tags).join(', '); }
  _getPrimaryTag(item) { return item._cachedMetadata?.tags?.[0] || this._t('untagged'); }
  _getAvailableTags(items = this._tasks) {
    return [...new Set((items || []).flatMap(item => item._cachedMetadata?.tags || []))].sort((a, b) => a.localeCompare(b));
  }
  _toggleTagInInput(value, tag) {
    const tags = this._sanitizeTags(value);
    const nextTags = tags.includes(tag) ? tags.filter(existingTag => existingTag !== tag) : [...tags, tag];
    return this._formatTags(nextTags);
  }
  _isTagAllowed(tags) {
    const availableTags = this._getAvailableTags();
    if (!availableTags.length) return true;
    const tagFilters = this._filters.tags || {};
    const itemTags = tags?.length ? tags : [this._t('untagged')];
    return itemTags.some(tag => tagFilters[tag] !== false);
  }
  _sanitizeUrl(url) { try { const parsed = new URL(url.startsWith('http') ? url : `https://${url}`); if (!['http:', 'https:'].includes(parsed.protocol)) { return ''; } return parsed.href; } catch { return ''; } }

  async _handleStatusUpdate(ev, task) {
    ev.stopPropagation();
    try { await this._hass.callService("todo", "update_item", { item: task.uid, status: task.status === "needs_action" ? "completed" : "needs_action" }, { entity_id: this._config.entity }); this._queuePostMutationRefresh(); } catch (err) { console.error('Error updating status:', err); this._error = this._t('failedToUpdateItem', { message: err.message }); this.fetchTodoItems(); }
  }

  async _handleAddItem() {
    if (!this._newItemSummary.trim()) { this._error = this._t('itemNameCannotBeEmpty'); return; }
    let metadata = {};
    if (this._newItemDescription.trim()) metadata.description = this._sanitizeText(this._newItemDescription.trim());
    const newTags = this._sanitizeTags(this._newItemTags);
    if (newTags.length) metadata.tags = newTags;

    // Config mode handling for metadata
    if (this._config.mode === 'tasks') {
      metadata.priority = this._sanitizePriority(this._newItemPriority);
      metadata.icon = this._newItemIcon;
    } else if (this._config.mode === 'shopping') {
      if (this._newItemLink) metadata.link = this._sanitizeUrl(this._newItemLink);
      if (this._newItemQuantity) metadata.quantity = this._sanitizeText(this._newItemQuantity);
      if (this._newItemIcon) metadata.icon = this._newItemIcon;
    }

    const serviceData = { item: this._sanitizeText(this._newItemSummary.trim()), description: JSON.stringify(metadata) };
    if (this._newItemDueDate.trim()) { if (this._newItemDueTime.trim()) { serviceData.due_datetime = `${this._newItemDueDate} ${this._newItemDueTime}:00`; } else { serviceData.due_date = this._newItemDueDate; } }
    try { 
      await this._hass.callService("todo", "add_item", serviceData, { entity_id: this._config.entity }); 
      this._resetNewItemInputs(); 
      if (this._config.quick_add) {
        setTimeout(() => {
          const addArea = this.shadowRoot.querySelector('.add-edit-area');
          if (addArea) {
            const titleInput = addArea.querySelector('input');
            if (titleInput) {
              titleInput.value = '';
              titleInput.focus();
            }
          }
        }, 50);
      } else {
        this._isAddAreaOpen = false;
      }
    } catch (err) { console.error('Error adding item:', err); this._error = this._t('failedToAddItem', { message: err.message }); this.fetchTodoItems(); return; }
    this._queuePostMutationRefresh();
  }

  async _handleSaveEdit(task) {
    if (!this._editSummary.trim()) { this._error = this._t('itemNameCannotBeEmpty'); return; }
    const originalEditedTaskId = this._editedTaskId; this._editedTaskId = null;
    const originalMetadata = task._cachedMetadata || {}; let metadata = { subtasks: originalMetadata.subtasks || [] };
    if (this._editDescription.trim()) metadata.description = this._sanitizeText(this._editDescription.trim());
    const editTags = this._sanitizeTags(this._editTags);
    if (editTags.length) metadata.tags = editTags;

    // Config mode handling for metadata
    if (this._config.mode === 'tasks') {
      metadata.priority = this._sanitizePriority(this._editPriority);
      metadata.icon = this._editIcon;
    } else if (this._config.mode === 'shopping') {
      if (this._editLink) metadata.link = this._sanitizeUrl(this._editLink);
      if (this._editQuantity) metadata.quantity = this._sanitizeText(this._editQuantity);
      if (this._editIcon) metadata.icon = this._editIcon;
    }

    const serviceData = { item: task.uid, rename: this._sanitizeText(this._editSummary.trim()), description: JSON.stringify(metadata) };
    if (this._editDueDate.trim()) { if (this._editDueTime.trim()) { serviceData.due_datetime = `${this._editDueDate} ${this._editDueTime}:00`; } else { serviceData.due_date = this._editDueDate; } } else { serviceData.due_date = null; }
    try { await this._hass.callService("todo", "update_item", serviceData, { entity_id: this._config.entity }); this._resetEditInputs(); this._queuePostMutationRefresh(); } catch (err) { console.error('Error updating item:', err); this._error = this._t('failedToUpdateItem', { message: err.message }); this._editedTaskId = originalEditedTaskId; this.fetchTodoItems(); }
  }

  async _handleDeleteItem(ev, task) {
    ev.stopPropagation(); const shouldDelete = this._config.confirm_delete ? confirm(this._t('confirmDeleteItem', { item: task.summary })) : true; if (!shouldDelete) return;
    this._editedTaskId = null; this._expandedTaskId = null;
    try { await this._hass.callService("todo", "remove_item", { item: [task.uid] }, { entity_id: this._config.entity }); this._queuePostMutationRefresh(); } catch (err) { console.error('Error deleting item:', err); this._error = `Failed to delete item: ${err.message}`; this.fetchTodoItems(); }
  }

  async _handleClearCompleted() {
    const completedItems = this._tasks.filter(t => t.status === 'completed'); if (completedItems.length === 0) return;
    const shouldClear = confirm(this._t('confirmClearCompleted', { count: completedItems.length })); if (!shouldClear) return;
    const uidsToRemove = completedItems.map(t => t.uid);
    try { await this._hass.callService("todo", "remove_item", { item: uidsToRemove }, { entity_id: this._config.entity }); this._queuePostMutationRefresh(); } catch (err) { console.error('Error clearing completed items:', err); this._error = this._t('failedToClearCompleted', { message: err.message }); this.fetchTodoItems(); }
  }

  _handleOpenLink(ev, link) { ev.stopPropagation(); const sanitized = this._sanitizeUrl(link); if (sanitized) { window.open(sanitized, '_blank', 'noopener,noreferrer'); } }

  _toggleEditMode(taskUid) {
    if (this._editedTaskId === taskUid) { this._editedTaskId = null; this._resetEditInputs(); } else {
      const task = this._tasks.find(t => t.uid === taskUid);
      if (task) {
        this._editedTaskId = taskUid; this._expandedTaskId = null; this._editSummary = task.summary; const metadata = task._cachedMetadata || {};
        this._editDescription = metadata.description ?? ''; this._editPriority = metadata.priority ?? DEFAULT_PRIORITY; this._editIcon = this._getItemIcon(metadata); this._editLink = metadata.link ?? ''; this._editQuantity = metadata.quantity ?? ''; this._editTags = this._formatTags(metadata.tags);
        if (task.due) { try { const date = new Date(task.due); this._editDueDate = date.toISOString().split('T')[0]; const timeStr = task.due.split('T')[1]; if (timeStr && !timeStr.startsWith('00:00:00')) { const hours = String(date.getHours()).padStart(2, '0'); const minutes = String(date.getMinutes()).padStart(2, '0'); this._editDueTime = `${hours}:${minutes}`; } else { this._editDueTime = ''; } } catch (e) { console.error('Error parsing due date:', e); this._editDueDate = ''; this._editDueTime = ''; } } else { this._editDueDate = ''; this._editDueTime = ''; }
      }
    }
  }

  _handleKeyDown(ev, action) {
    if (ev.isComposing) return;
    if (ev.key === 'Enter' && ev.target.tagName !== 'TEXTAREA') {
      ev.preventDefault();
      action();
    } else if (ev.key === 'Escape') {
      ev.preventDefault();
      if (this._isAddAreaOpen) {
        this._isAddAreaOpen = false;
        this._resetNewItemInputs();
      } else if (this._editedTaskId) {
        this._editedTaskId = null;
        this._resetEditInputs();
      } else if (this._expandedTaskId) {
        this._expandedTaskId = null;
      }
    }
  }
  _getDueDateStatus(dueDateStr) { if (!dueDateStr) return null; const today = new Date(); const dueDate = new Date(dueDateStr); const todayStr = today.toISOString().split('T')[0]; const dueStr = dueDateStr.split('T')[0]; if (dueStr < todayStr) return 'overdue'; if (dueStr === todayStr) return 'due-today'; return null; }
  _getPriorityInfo(priority) {
    const option = PRIORITY_INFO[this._sanitizePriority(priority)];
    if (!option) return null;
    return { text: this._t(option.labelKey), color: option.color };
  }
  _formatDueDate(dueDateStr) { if (!dueDateStr) return null; try { const date = new Date(dueDateStr); const now = new Date(); const hasTime = dueDateStr.includes('T') && !dueDateStr.match(/T00:00:00/); const pad = (num) => String(num).padStart(2, '0'); const day = date.getDate(); const month = new Intl.DateTimeFormat(this._hass.locale?.language || 'en', { month: 'short' }).format(date).toLowerCase(); let result = `${day}.${month}`; if (date.getFullYear() !== now.getFullYear()) { result += `.${date.getFullYear()}`; } if (hasTime) { const hours = pad(date.getHours()); const minutes = pad(date.getMinutes()); result += `, ${hours}:${minutes}`; } return result; } catch (e) { console.error('Date formatting error:', e); return dueDateStr; } }

  _toggleFilter(type) {
    this._filters = { ...this._filters, [type]: !this._filters[type] };
    this._saveFilters();
  }

  _toggleTagFilter(tag) {
    const tags = { ...(this._filters.tags || {}) };
    tags[tag] = tags[tag] === false;
    this._filters = { ...this._filters, tags };
    this._saveFilters();
  }

  _renderGroupedItems(items) {
    const groups = new Map();
    items.forEach(item => {
      const tag = this._getPrimaryTag(item);
      if (!groups.has(tag)) groups.set(tag, []);
      groups.get(tag).push(item);
    });
    const untaggedLabel = this._t("untagged");
    const locale = this._hass?.locale?.language || undefined;
    const configuredOrder = Array.isArray(this._config.tag_order) ? this._config.tag_order : [];
    const tagRanks = new Map();
    configuredOrder.forEach(tag => {
      const normalizedTag = String(tag || "").trim().toLocaleLowerCase(locale);
      if (normalizedTag && !tagRanks.has(normalizedTag)) {
        tagRanks.set(normalizedTag, tagRanks.size);
      }
    });
    const sortedGroups = [...groups.entries()].sort(([tagA], [tagB]) => {
      const aIsUntagged = tagA === untaggedLabel;
      const bIsUntagged = tagB === untaggedLabel;
      if (aIsUntagged && !bIsUntagged) return 1;
      if (!aIsUntagged && bIsUntagged) return -1;

      const rankA = tagRanks.get(tagA.toLocaleLowerCase(locale));
      const rankB = tagRanks.get(tagB.toLocaleLowerCase(locale));
      if (rankA !== undefined && rankB !== undefined) return rankA - rankB;
      if (rankA !== undefined) return -1;
      if (rankB !== undefined) return 1;
      return tagA.localeCompare(tagB, locale, { sensitivity: "base" });
    });
    return sortedGroups.map(([tag, groupItems]) => html`
      <section class="tag-group">
        <div class="tag-heading">
          <span>${tag}</span>
          <span>${groupItems.length}</span>
        </div>
        ${groupItems.map(item => this._renderItem(item))}
      </section>
    `);
  }

  _toggleSearch() {
    this._isSearchOpen = !this._isSearchOpen;
    if (!this._isSearchOpen) {
      this._clearSearchInputTimeout();
      this._searchQuery = '';
    } else {
      // Focus attempt after render
      setTimeout(() => {
        const field = this.shadowRoot.querySelector('#search-input');
        if (field) field.focus();
      }, 100);
    }
  }

  render() {
    if (!this._hass || !this._config) return html``;
    const entityState = this._hass.states[this._config.entity];
    if (!entityState) { return html`<ha-card><div class="warning">${this._t('entity')}: ${this._config.entity}</div></ha-card>`; }

    let allTasks = Array.isArray(this._tasks) ? this._tasks : [];

    // Filter Logic & Search Logic
    if (this._config.show_filter_menu || this._searchQuery) {
      allTasks = allTasks.filter(task => {
        // Search Filtering
        if (this._searchQuery) {
          const metadata = task._cachedMetadata || {};
          const searchable = [task.summary, metadata.description, ...(metadata.tags || [])].join(' ').toLowerCase();
          if (!searchable.includes(this._searchQuery.toLowerCase())) {
            return false;
          }
        }

        // Status Filtering
        const isCompleted = task.status === 'completed';
        const overdueStatus = !isCompleted ? this._getDueDateStatus(task.due) : null;
        const isOverdue = overdueStatus === 'overdue';
        const isActive = !isCompleted && !isOverdue;

        if (isCompleted && !this._filters.completed) return false;
        if (isOverdue && !this._filters.overdue) return false;
        if (isActive && !this._filters.active) return false;
        if (!this._isTagAllowed(task._cachedMetadata?.tags || [])) return false;
        return true;
      });
    }

    const sortFn = (a, b) => {
      const sortBy = this._config.sort_by || 'priority'; const sortOrder = this._config.sort_order || 'asc'; const direction = sortOrder === 'desc' ? -1 : 1; let valA, valB;
      switch (sortBy) { case 'duedate': valA = a.due ? new Date(a.due).getTime() : Infinity; valB = b.due ? new Date(b.due).getTime() : Infinity; break; case 'priority': valA = this._getPriorityRank(a._cachedMetadata?.priority ?? DEFAULT_PRIORITY); valB = this._getPriorityRank(b._cachedMetadata?.priority ?? DEFAULT_PRIORITY); break; case 'tag': valA = this._getPrimaryTag(a).toLowerCase(); valB = this._getPrimaryTag(b).toLowerCase(); break; case 'title': default: valA = a.summary?.toLowerCase() || ''; valB = b.summary?.toLowerCase() || ''; break; }
      if (valA < valB) return -1 * direction; if (valA > valB) return 1 * direction; return 0;
    };

    const activeItems = allTasks.filter(t => t.status === 'needs_action').sort(sortFn);
    const completedItems = allTasks.filter(t => t.status === 'completed').sort(sortFn);
    const visibleItems = [...activeItems, ...completedItems];
    const availableTags = this._getAvailableTags();

    const isFrameless = this._config.card_background === 'none'; const headerPadding = isFrameless ? '6px 4px 12px 16px' : '6px 20px 12px 20px'; const contentPadding = isFrameless ? '0 4px 4px' : '0 12px 12px';
    let countText = this._config.mode === 'tasks'
      ? this._t('completedTasks', { active: activeItems.length, completed: completedItems.length })
      : this._t('completedItemsChecked', { active: activeItems.length, completed: completedItems.length });
    if (this._searchQuery) { countText = this._t('resultsFound', { count: activeItems.length + completedItems.length }); }

    return html`
      <ha-card style="background: ${this._config.card_background};">
        <div class="card-header" style="padding: ${headerPadding};">
          <div class="header-text">
            <div class="name">${this._config.title ?? ''}</div>
            <div class="header-count">${countText}</div>
          </div>
          <div class="header-buttons">
            ${this._config.show_search_button !== false ? html`
            <ha-icon-button class="search-button" @click="${this._toggleSearch}">
                <ha-icon icon="mdi:magnify"></ha-icon>
            </ha-icon-button>
            ` : ''}

            ${this._config.show_clear_button !== false && completedItems.length > 0 && !this._searchQuery ? html`
            <ha-icon-button class="clear-button" @click="${this._handleClearCompleted}" title="${this._t('clearCompletedItems')}"><ha-icon icon="mdi:broom"></ha-icon></ha-icon-button>
            ` : ''}

            ${this._config.show_filter_menu !== false ? html`
            <div class="filter-menu-container">
                <ha-icon-button class="filter-button" @click="${(e) => { e.stopPropagation(); this._isFilterOpen = !this._isFilterOpen; }}">
                    <ha-icon icon="mdi:filter-variant"></ha-icon>
                </ha-icon-button>
                ${this._isFilterOpen ? html`
                <div class="filter-dropdown" @click="${(e) => e.stopPropagation()}">
                    <div class="filter-section-title">${this._t('status')}</div>
                    <div class="filter-option" @click="${() => this._toggleFilter('active')}">
                        <ha-icon icon="${this._filters.active ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}"></ha-icon>
                        <span>${this._t('active')}</span>
                    </div>
                    <div class="filter-option" @click="${() => this._toggleFilter('overdue')}">
                        <ha-icon icon="${this._filters.overdue ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}"></ha-icon>
                        <span>${this._t('overdue')}</span>
                    </div>
                    <div class="filter-option" @click="${() => this._toggleFilter('completed')}">
                        <ha-icon icon="${this._filters.completed ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}"></ha-icon>
                        <span>${this._t('completed')}</span>
                    </div>
                    ${availableTags.length ? html`
                      <div class="filter-divider"></div>
                      <div class="filter-section-title">${this._t('tags')}</div>
                      ${availableTags.map(tag => html`
                        <div class="filter-option" @click="${() => this._toggleTagFilter(tag)}">
                          <ha-icon icon="${this._filters.tags?.[tag] === false ? 'mdi:checkbox-blank-outline' : 'mdi:checkbox-marked'}"></ha-icon>
                          <span>${tag}</span>
                        </div>
                      `)}
                    ` : ''}
                </div>
                ` : ''}
            </div>
            ` : ''}
            <ha-icon-button class="add-button" @click="${() => { this._isAddAreaOpen = !this._isAddAreaOpen; this._editedTaskId = null; this._resetEditInputs(); }}"><ha-icon icon="${this._isAddAreaOpen ? 'mdi:minus' : 'mdi:plus'}"></ha-icon></ha-icon-button>
          </div>
        </div>
        
        ${this._isSearchOpen ? html`
        <div class="search-bar-container">
            <ha-input 
                id="search-input"
                placeholder="${this._t('searchItems')}" 
                .value="${this._searchQuery}" 
                @input="${this._handleSearchInput}"
                iconTrailing
            >
                <ha-icon slot="trailingIcon" icon="mdi:close" @click="${() => { this._clearSearchInputTimeout(); this._searchQuery = ''; this._isSearchOpen = false; }}" style="cursor: pointer;"></ha-icon>
            </ha-input>
        </div>
        ` : ''}

        <div class="card-content" style="padding: ${contentPadding};">
          ${this._error ? html`<div class="error-message" @click="${() => this._error = null}">${this._error}</div>` : ''}
          ${this._isLoading ? html`<div class="loading">${this._t('loading')}</div>` : ''}
          ${this._isAddAreaOpen ? this._renderAddForm() : ''}
          ${allTasks.length === 0 && !this._isAddAreaOpen && !this._isLoading ? html`<div class="empty-list">${this._t('noItems')}</div>` : ''}
          ${this._config.show_tag_headings ? this._renderGroupedItems(visibleItems) : html`${activeItems.map(item => this._renderItem(item))}${completedItems.map(item => this._renderItem(item))}`}
        </div>
      </ha-card>
    `;
  }

  _renderAddForm() { if (this._config.mode === 'tasks') return this._renderAddTaskForm(); if (this._config.mode === 'shopping') return this._renderAddShoppingItemForm(); return html``; }
  _renderEditForm(item) { if (this._config.mode === 'tasks') return this._renderEditTaskForm(item); if (this._config.mode === 'shopping') return this._renderEditShoppingItemForm(item); return html``; }
  _renderItem(item) { if (this._config.mode === 'tasks') return this._renderTask(item); if (this._config.mode === 'shopping') return this._renderShoppingItem(item); return html``; }

  _renderPrioritySelect(value, handler) {
    const selectedPriority = this._sanitizePriority(value);
    return html`
      <label class="select-field">
        <span class="select-label">${this._t('priority')}</span>
        <select @change=${handler}>
          ${PRIORITY_OPTIONS.map(option => html`
            <option value=${option.value} ?selected=${selectedPriority === option.value}>${this._t(option.labelKey)}</option>
          `)}
        </select>
      </label>
    `;
  }

  _renderNativeField({ label, value = '', onInput, type = 'text', placeholder = '', min = undefined, max = undefined }) {
    return html`
      <label class="custom-field">
        <span class="field-label">${label}</span>
        <input
          type=${type}
          .value=${value}
          placeholder=${placeholder}
          min=${min ?? ''}
          max=${max ?? ''}
          @input=${onInput}
        />
      </label>
    `;
  }

  _renderNativeTextarea({ label, value = '', onInput, rows = 3, placeholder = '' }) {
    return html`
      <label class="custom-field">
        <span class="field-label">${label}</span>
        <textarea .value=${value} rows=${rows} placeholder=${placeholder} @input=${onInput}></textarea>
      </label>
    `;
  }

  _renderTagField(value, onInput, onTagSelect) {
    const availableTags = this._getAvailableTags();
    const selectedTags = this._sanitizeTags(value);
    return html`
      <div class="tag-field">
        ${this._renderNativeField({ label: this._t('tagsOptional'), value, onInput })}
        ${availableTags.length ? html`
          <div class="tag-suggestions">
            ${availableTags.map(tag => html`
              <button
                type="button"
                class="tag-suggestion ${selectedTags.includes(tag) ? 'selected' : ''}"
                @click=${(e) => { e.preventDefault(); e.stopPropagation(); onTagSelect(tag); }}
              >#${tag}</button>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderAddTaskForm() {
    if (this._config.quick_add) {
      return html`<div class="add-edit-area rapid-add" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleAddItem())}">
          ${this._renderNativeField({ label: this._t('addNewTask'), value: this._newItemSummary, onInput: e => this._setDraftValue('_newItemSummary', e.target.value) })}
          <mwc-button @click="${this._handleAddItem}" raised class="btn btn-add">${this._t('add')}</mwc-button>
      </div>`;
    }
    return html`<div class="add-edit-area" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleAddItem())}"><h3>${this._t('newTask')}</h3>${this._renderNativeField({ label: this._t('title'), value: this._newItemSummary, onInput: e => this._setDraftValue('_newItemSummary', e.target.value) })}${this._renderNativeTextarea({ label: this._t('descriptionOptional'), value: this._newItemDescription, onInput: e => this._setDraftValue('_newItemDescription', e.target.value), rows: 3 })}${this._renderTagField(this._newItemTags, e => this._setDraftValue('_newItemTags', e.target.value), tag => this._setDraftValue('_newItemTags', this._toggleTagInInput(this._newItemTags, tag), true))}<div class="row row-2">${this._renderPrioritySelect(this._newItemPriority, e => this._setDraftValue('_newItemPriority', e.target.value))}<div class="icon-picker-field"><span class="field-label">${this._t('icon')}</span><ha-icon-picker class="themed-icon-picker" .value="${this._newItemIcon}" @value-changed="${e => this._setDraftValue('_newItemIcon', e.detail.value)}"></ha-icon-picker></div></div><div class="row row-2">${this._renderNativeField({ label: this._t('dueDate'), value: this._newItemDueDate, onInput: e => this._setDraftValue('_newItemDueDate', e.target.value), type: 'date' })}${this._renderNativeField({ label: this._t('timeOptional'), value: this._newItemDueTime, onInput: e => this._setDraftValue('_newItemDueTime', e.target.value), type: 'time' })}</div><div class="buttons"><mwc-button @click="${() => { this._isAddAreaOpen = false; this._resetNewItemInputs(); }}" class="btn btn-cancel">${this._t('cancel')}</mwc-button><mwc-button @click="${this._handleAddItem}" raised class="btn btn-add">${this._t('add')}</mwc-button></div></div>`;
  }
  _renderEditTaskForm(task) {
    return html`<div class="add-edit-area edit-area" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleSaveEdit(task))}"><h3>${this._t('editTask')}</h3>${this._renderNativeField({ label: this._t('title'), value: this._editSummary, onInput: e => this._setDraftValue('_editSummary', e.target.value) })}${this._renderNativeTextarea({ label: this._t('descriptionOptional'), value: this._editDescription, onInput: e => this._setDraftValue('_editDescription', e.target.value), rows: 3 })}${this._renderTagField(this._editTags, e => this._setDraftValue('_editTags', e.target.value), tag => this._setDraftValue('_editTags', this._toggleTagInInput(this._editTags, tag), true))}<div class="row row-2">${this._renderPrioritySelect(this._editPriority, e => this._setDraftValue('_editPriority', e.target.value))}<div class="icon-picker-field"><span class="field-label">${this._t('icon')}</span><ha-icon-picker class="themed-icon-picker" .value="${this._editIcon}" @value-changed="${e => this._setDraftValue('_editIcon', e.detail.value)}"></ha-icon-picker></div></div><div class="row row-2">${this._renderNativeField({ label: this._t('dueDate'), value: this._editDueDate, onInput: e => this._setDraftValue('_editDueDate', e.target.value), type: 'date' })}${this._renderNativeField({ label: this._t('timeOptional'), value: this._editDueTime, onInput: e => this._setDraftValue('_editDueTime', e.target.value), type: 'time' })}</div><div class="buttons"><mwc-button @click="${(e) => this._handleDeleteItem(e, task)}" class="btn btn-delete">${this._t('delete')}</mwc-button><div style="flex-grow: 1;"></div><mwc-button @click="${() => { this._editedTaskId = null; this._resetEditInputs(); }}" class="btn btn-cancel">${this._t('cancel')}</mwc-button><mwc-button @click="${() => this._handleSaveEdit(task)}" raised class="btn btn-add">${this._t('save')}</mwc-button></div></div>`;
  }
  _renderAddShoppingItemForm() {
    if (this._config.quick_add) {
      return html`
      <div class="add-edit-area rapid-add" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleAddItem())}">
          ${this._renderNativeField({ label: this._t('addItem'), value: this._newItemSummary, onInput: e => this._setDraftValue('_newItemSummary', e.target.value) })}
          <mwc-button @click="${this._handleAddItem}" raised class="btn btn-add">${this._t('add')}</mwc-button>
      </div>`;
    }
    return html`
    <div class="add-edit-area" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleAddItem())}">
        <h3>${this._t('newShoppingItem')}</h3>
        <div class="row row-2">
            ${this._renderNativeField({ label: this._t('itemName'), value: this._newItemSummary, onInput: e => this._setDraftValue('_newItemSummary', e.target.value) })}
            ${this._renderNativeField({ label: this._t('qty'), value: this._newItemQuantity, onInput: e => this._setDraftValue('_newItemQuantity', e.target.value), type: 'number', min: '1' })}
        </div>
        ${this._renderNativeTextarea({ label: this._t('descriptionOptional'), value: this._newItemDescription, onInput: e => this._setDraftValue('_newItemDescription', e.target.value), rows: 3 })}
        ${this._renderTagField(this._newItemTags, e => this._setDraftValue('_newItemTags', e.target.value), tag => this._setDraftValue('_newItemTags', this._toggleTagInInput(this._newItemTags, tag), true))}
        ${this._renderNativeField({ label: this._t('linkOptional'), value: this._newItemLink, onInput: e => this._setDraftValue('_newItemLink', e.target.value) })}
        <div class="icon-picker-field"><span class="field-label">${this._t('icon')}</span><ha-icon-picker class="themed-icon-picker" .value="${this._newItemIcon}" @value-changed="${e => this._setDraftValue('_newItemIcon', e.detail.value)}"></ha-icon-picker></div>
        <div class="buttons">
            <mwc-button @click="${() => { this._isAddAreaOpen = false; this._resetNewItemInputs(); }}" class="btn btn-cancel">${this._t('cancel')}</mwc-button>
            <mwc-button @click="${this._handleAddItem}" raised class="btn btn-add">${this._t('add')}</mwc-button>
        </div>
    </div>`;
  }
  _renderEditShoppingItemForm(item) {
    return html`
    <div class="add-edit-area edit-area" style="background-color: ${this._config.card_color};" @keydown="${(e) => this._handleKeyDown(e, () => this._handleSaveEdit(item))}">
        <h3>${this._t('editItem')}</h3>
        <div class="row row-2">
            ${this._renderNativeField({ label: this._t('itemName'), value: this._editSummary, onInput: e => this._setDraftValue('_editSummary', e.target.value) })}
            ${this._renderNativeField({ label: this._t('qty'), value: this._editQuantity, onInput: e => this._setDraftValue('_editQuantity', e.target.value), type: 'number', min: '1' })}
        </div>
        ${this._renderNativeTextarea({ label: this._t('descriptionOptional'), value: this._editDescription, onInput: e => this._setDraftValue('_editDescription', e.target.value), rows: 3 })}
        ${this._renderTagField(this._editTags, e => this._setDraftValue('_editTags', e.target.value), tag => this._setDraftValue('_editTags', this._toggleTagInInput(this._editTags, tag), true))}
        ${this._renderNativeField({ label: this._t('linkOptional'), value: this._editLink, onInput: e => this._setDraftValue('_editLink', e.target.value) })}
        <div class="icon-picker-field"><span class="field-label">${this._t('icon')}</span><ha-icon-picker class="themed-icon-picker" .value="${this._editIcon}" @value-changed="${e => this._setDraftValue('_editIcon', e.detail.value)}"></ha-icon-picker></div>
        <div class="buttons">
            <mwc-button @click="${(e) => this._handleDeleteItem(e, item)}" class="btn btn-delete">${this._t('delete')}</mwc-button>
            <div style="flex-grow: 1;"></div>
            <mwc-button @click="${() => { this._editedTaskId = null; this._resetEditInputs(); }}" class="btn btn-cancel">${this._t('cancel')}</mwc-button>
            <mwc-button @click="${() => this._handleSaveEdit(item)}" raised class="btn btn-add">${this._t('save')}</mwc-button>
        </div>
    </div>`;
  }

  _renderPriorityLabel(priority) {
    const priorityInfo = this._getPriorityInfo(priority); if (!priorityInfo) return '';
    return html`<span class="priority-label" style="background-color: ${priorityInfo.color};" title="${this._t('sortPriorityTitle', { priority: priorityInfo.text })}">${priorityInfo.text}</span>`;
  }

  _renderTagChips(tags = []) {
    const cleanTags = this._sanitizeTags(tags);
    return cleanTags.map(tag => html`<span class="tag-chip">#${tag}</span>`);
  }

  _renderCheckbox(item) {
    const isCompleted = item.status === 'completed';
    return html`<div class="checkbox" @click="${(e) => this._handleStatusUpdate(e, item)}"><ha-icon icon="${isCompleted ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'}"></ha-icon></div>`;
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
              <ha-input id="subtask-input-${task.uid}" placeholder="${this._t('addSubItem')}" @keydown="${(e) => { if (e.key === 'Enter') this._handleAddSubtask(e, task); }}"></ha-input>
              <mwc-button raised class="btn btn-add-subtask" @click="${(e) => this._handleAddSubtask(e, task)}"><ha-icon icon="mdi:plus"></ha-icon></mwc-button>
          </div>
          <div class="subtask-buttons">
              <div style="flex-grow: 1;"></div>
              <mwc-button @click="${(e) => { e.stopPropagation(); this._toggleEditMode(task.uid); }}" class="btn btn-edit">${this._t('editDetails')}</mwc-button>
          </div>
      </div>
    `;
  }

  _renderTask(task) {
    const isCompleted = task.status === 'completed';
    const textColor = isCompleted ? this._config.completed_text_color : this._config.text_color;
    const metadata = task._cachedMetadata ?? {};
    const description = metadata.description || null;
    const priority = metadata.priority || DEFAULT_PRIORITY;
    const tags = metadata.tags || [];
    const icon = this._getItemIcon(metadata);
    const dueDate = task.due || null;
    const dueDateStatus = this._getDueDateStatus(dueDate);
    const subtasks = metadata.subtasks || [];
    const completedSubtasks = subtasks.filter(s => s.status === 'completed').length;
    const totalSubtasks = subtasks.length;
    const hasDueDate = !isCompleted && !!dueDate;
    const checkboxLeft = !icon && this._config.checkbox_position === 'left';
    const hasMeta = hasDueDate || (this._config.show_priority && !isCompleted) || tags.length || (totalSubtasks > 0 && !isCompleted);

    return html`
      <div class="task-container">
        <div class="task-item ${isCompleted ? 'completed' : 'active'} ${dueDateStatus || ''} ${icon ? 'has-icon' : 'no-icon'} ${checkboxLeft ? 'checkbox-left' : 'checkbox-right'}" @click="${() => this._toggleExpand(task.uid)}" style="background-color: ${isCompleted ? this._config.completed_color : this._config.card_color}; color: ${textColor};">
          ${checkboxLeft ? this._renderCheckbox(task) : ''}
          ${icon ? html`<div class="icon" style="background-color: ${this._config.icon_background};"><ha-icon icon="${icon}"></ha-icon></div>` : ''}
          <div class="task-text">
            <div class="summary"><span>${task.summary}</span></div>
            ${description ? html`<div class="description">${description}</div>` : ''}
            ${hasMeta ? html`
              <div class="task-meta">
                ${hasDueDate ? html`<span class="due-date-wrapper"><ha-icon icon="mdi:calendar-clock"></ha-icon>${this._formatDueDate(dueDate)}</span>` : ''}
                ${this._config.show_priority && !isCompleted ? this._renderPriorityLabel(priority) : ''}
                ${this._renderTagChips(tags)}
                ${totalSubtasks > 0 && !isCompleted ? html`
                  <span class="subtask-progress" title="${completedSubtasks} of ${totalSubtasks} completed">
                    <ha-icon icon="mdi:format-list-checks"></ha-icon>
                    <span>${completedSubtasks}/${totalSubtasks}</span>
                    <span class="progress-bar-background"><span class="progress-bar-foreground" style="width: ${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%;"></span></span>
                  </span>
                ` : ''}
              </div>
            ` : ''}
          </div>
          ${checkboxLeft ? '' : this._renderCheckbox(task)}
        </div>
        ${this._expandedTaskId === task.uid ? this._renderSubtasks(task) : ''}
        ${this._editedTaskId === task.uid ? this._renderEditForm(task) : ''}
      </div>
    `;
  }

  _renderShoppingItem(item) {
    const isCompleted = item.status === 'completed';
    const textColor = isCompleted ? this._config.completed_text_color : this._config.text_color;
    const metadata = item._cachedMetadata ?? {};
    const description = metadata.description || null;
    const link = metadata.link || null;
    const quantity = metadata.quantity || null;
    const tags = metadata.tags || [];
    const subtasks = metadata.subtasks || [];
    const completedSubtasks = subtasks.filter(s => s.status === 'completed').length;
    const totalSubtasks = subtasks.length;
    const icon = this._getItemIcon(metadata);
    const checkboxLeft = !icon && this._config.checkbox_position === 'left';
    const hasMeta = quantity || tags.length || (totalSubtasks > 0 && !isCompleted);

    return html`
      <div class="task-container">
        <div class="task-item shopping-item ${isCompleted ? 'completed' : 'active'} ${icon ? 'has-icon' : 'no-icon'} ${checkboxLeft ? 'checkbox-left' : 'checkbox-right'}" @click="${() => this._toggleExpand(item.uid)}" style="background-color: ${isCompleted ? this._config.completed_color : this._config.card_color}; color: ${textColor};">
          ${checkboxLeft ? this._renderCheckbox(item) : ''}
          ${icon ? html`<div class="icon" style="background-color: ${this._config.icon_background};"><ha-icon icon="${icon}"></ha-icon></div>` : ''}
          <div class="task-text">
            <div class="summary"><span>${item.summary}</span></div>
            ${description ? html`<div class="description">${description}</div>` : ''}
            ${hasMeta ? html`
              <div class="task-meta">
                ${quantity ? html`<span class="quantity">x${quantity}</span>` : ''}
                ${this._renderTagChips(tags)}
                ${totalSubtasks > 0 && !isCompleted ? html`
                  <span class="subtask-progress" title="${completedSubtasks} of ${totalSubtasks} completed">
                    <ha-icon icon="mdi:format-list-checks"></ha-icon>
                    <span>${completedSubtasks}/${totalSubtasks}</span>
                    <span class="progress-bar-background"><span class="progress-bar-foreground" style="width: ${totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0}%;"></span></span>
                  </span>
                ` : ''}
              </div>
            ` : ''}
          </div>
          ${link ? html`<ha-icon class="link-button" icon="mdi:open-in-new" @click="${(e) => this._handleOpenLink(e, link)}"></ha-icon>` : ''}
          ${checkboxLeft ? '' : this._renderCheckbox(item)}
        </div>
        ${this._expandedTaskId === item.uid ? this._renderSubtasks(item) : ''}
        ${this._editedTaskId === item.uid ? this._renderEditForm(item) : ''}
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative; /* Allows z-index to work */
        --todo-card-field-background: var(--ha-color-form-background, var(--secondary-background-color, var(--ha-card-background, var(--card-background-color))));
      }
      ha-card { 
        display: flex; 
        flex-direction: column; 
        overflow: visible; /* Allows dropdown to extend outside */
        /* isolation: isolate; REMOVED to allow stacking interactions with siblings */
      }
      .card-header { display: flex; justify-content: space-between; align-items: center; }
      .header-text { flex-grow: 1; }
      .card-header .name { font-size: 20px; font-weight: 500; }
      .header-count { font-size: 12px; color: var(--secondary-text-color); opacity: 0.9; }
      .header-buttons { display: flex; align-items: center; gap: 4px; }
      .clear-button, .add-button, .filter-button, .search-button { color: var(--secondary-text-color); }
      ha-icon {display:flex!important;}
      .btn {border-radius: 20px; padding: 4px 12px; cursor: pointer;}
      .btn-edit, .btn-add {background:var(--primary-color); color: var(--mdc-theme-on-secondary); }
      .btn-delete {background:var(--error-color); color: var(--mdc-theme-on-secondary); }
      .btn-cancel {background:var(--card-background-color);}
      .warning, .empty-list, .loading { padding: 16px; text-align: center; }
      .error-message { padding: 12px; margin: 0 12px 12px; background-color: var(--error-color); color: var(--text-primary-color); border-radius: var(--ha-card-border-radius, 12px); text-align: center; cursor: pointer; }
      .card-content { flex-grow: 1; overflow: visible; }
      .task-item { display: flex; align-items: center; padding: 8px 10px; min-height: 58px; border-radius: var(--ha-card-border-radius, 12px); cursor: pointer; margin-top: 8px; position: relative; z-index: 1; gap: 10px; }
      .task-item.no-icon { padding-left: 16px; }
      .task-item.no-icon.checkbox-left { padding-left: 16px; }
      .summary { font-weight: 500; font-size: 16px; line-height: 1.25; display: flex; align-items: center; min-width: 0; }
      .summary span { overflow-wrap: anywhere; }
      .description { font-size: 13px; line-height: 1.3; opacity: 0.74; margin-top: 3px; overflow-wrap: anywhere; }
      .task-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-top: 8px; font-size: 12px; line-height: 1.2; color: var(--secondary-text-color); }
      .priority-label, .tag-chip, .quantity { display: inline-flex; align-items: center; min-height: 18px; font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 8px; color: var(--text-primary-color); opacity: 0.9; flex-shrink: 0; }
      .tag-chip { background: rgba(128, 128, 128, 0.18); color: var(--primary-text-color); }
      .task-item.overdue .due-date-wrapper { color: var(--error-color)!important; }
      .task-item.due-today .due-date-wrapper { color: var(--warning-color)!important; }
      .task-container:first-child .task-item { margin-top: 0; }
      .task-item.completed { opacity: 0.7; }
      .completed .summary > span:first-child { text-decoration: line-through; }
      .completed .task-meta { color: inherit; }
      .completed .tag-chip, .completed .quantity { background: rgba(0, 0, 0, 0.2); color: inherit; opacity: 0.75; }
      .icon { display: flex; align-items: center; justify-content: center; width: 58px; height: 58px; border-radius: 50%; border: 1px solid rgba(250, 251, 252, 0.06); flex-shrink: 0; }
      .task-text { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; padding: 0; }
      .quantity { background: rgba(128, 128, 128, 0.18); color: var(--primary-text-color); }
      .priority { font-size: 14px; font-weight: 400; opacity: 0.7; display: flex; align-items: center; flex-wrap: wrap; }
      .priority .separator { margin: 0 3px; }
      .due-date-wrapper { display: inline-flex; align-items: center; gap: 4px; }
      .due-date-wrapper ha-icon { --mdc-icon-size: 1.1em; opacity: 0.9; }
      .checkbox { border-radius: 50%; padding: 4px; transition: background-color 0.2s; flex-shrink: 0; }
      .checkbox:hover { background-color: rgba(255, 255, 255, 0.1); }
      .add-edit-area { border-radius: var(--ha-card-border-radius, 12px); margin-bottom: 12px; animation: slide-down 0.3s ease-out; position: relative; z-index: 0; padding: 16px; }
      .add-edit-area.rapid-add { display: flex; flex-direction: row; align-items: center; padding: 8px 16px; justify-content: space-between; gap: 8px; }
      .add-edit-area.rapid-add .custom-field { flex-grow: 1; margin-bottom: 0; }
      .add-edit-area.rapid-add .btn-add { margin-top: 0; flex-shrink: 0; }
      .edit-area { margin-top: -56px; padding-top: 66px; }
      .add-edit-area.edit-area { animation: slide-down-subtle 0.3s ease-out; }
      .add-edit-area h3 { margin: 0 0 16px; }
      .add-edit-area .custom-field,
      .add-edit-area .select-field,
      .add-edit-area .icon-picker-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        margin-bottom: 8px;
      }
      .tag-field { margin-bottom: 8px; }
      .tag-field .custom-field { margin-bottom: 0; }
      .tag-suggestions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
      .tag-suggestion { border: 1px solid var(--divider-color); border-radius: 8px; background: rgba(128, 128, 128, 0.14); color: var(--primary-text-color); padding: 4px 8px; font: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
      .tag-suggestion.selected { border-color: var(--primary-color); color: var(--primary-color); background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.12); }
      .tag-suggestion:hover { background: rgba(128, 128, 128, 0.22); }
      .add-edit-area .field-label,
      .add-edit-area .select-label {
        color: var(--secondary-text-color);
        font-size: 12px;
      }
      .add-edit-area .custom-field input,
      .add-edit-area .custom-field textarea,
      .add-edit-area .select-field select {
        width: 100%;
        box-sizing: border-box;
        min-height: 56px;
        padding: 14px 16px;
        border-radius: 12px;
        border: 1px solid var(--divider-color);
        background: var(--todo-card-field-background);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 16px;
        line-height: 1.35;
        -webkit-text-size-adjust: 100%;
        -webkit-appearance: none;
        appearance: none;
      }
      .add-edit-area .custom-field textarea {
        min-height: 96px;
        resize: vertical;
      }
      .add-edit-area .custom-field input:focus,
      .add-edit-area .custom-field textarea:focus,
      .add-edit-area .select-field select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 1px var(--primary-color);
      }
      .add-edit-area .themed-icon-picker {
        display: block;
        width: 100%;
        min-height: 56px;
        border-radius: 12px;
        background: var(--todo-card-field-background);
        --mdc-text-field-fill-color: var(--todo-card-field-background);
        --mdc-shape-small: 12px;
        --mdc-shape-medium: 12px;
        --mdc-theme-primary: var(--primary-color);
        --ha-icon-picker-container-border-radius: 12px;
      }
      .add-edit-area .row { display: flex; gap: 8px; align-items: flex-end; }
      .add-edit-area .row.row-2 > * { flex: 1; }
      .add-edit-area .buttons, .subtask-buttons { display: flex; justify-content: flex-end; margin-top: 16px; gap: 12px; }
      .link-button { color: var(--secondary-text-color); flex-shrink: 0; }
      .subtask-progress { display: inline-flex; align-items: center; font-size: 12px; color: var(--secondary-text-color); background: rgba(128, 128, 128, 0.2); padding: 2px 6px; border-radius: 8px; flex-shrink: 0;}
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
      .add-subtask-row ha-input { flex-grow: 1; --mdc-text-field-fill-color: rgba(0,0,0,0.2); }
      
      /* Search Bar Styles */
      .search-bar-container { padding: 0 16px 30px 16px; animation: slide-down-subtle 0.2s ease-out; }
      .search-bar-container ha-input { width: 100%; }
      .search-bar-container ha-input,
      .add-subtask-row ha-input {
        --mdc-typography-subtitle1-font-size: 16px;
        --mdc-typography-body1-font-size: 16px;
        --paper-input-container-input-font-size: 16px;
      }

      @media (hover: none) and (pointer: coarse) {
        .add-edit-area,
        .add-edit-area.edit-area,
        .subtask-area,
        .search-bar-container {
          animation: none;
        }

      }

      /* Filter Menu Styles */
      .filter-menu-container { position: relative; }
      .filter-dropdown { 
        position: absolute; 
        top: 100%; 
        right: 0; 
        z-index: 100; 
        background: var(--ha-card-background, var(--card-background-color, white)); 
        box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12);
        border-radius: 4px; 
        padding: 8px 0; 
        min-width: 150px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      }
      .filter-option { 
        display: flex; 
        align-items: center; 
        padding: 8px 16px; 
        cursor: pointer; 
        transition: background-color 0.1s; 
      }
      .filter-option:hover { background-color: rgba(128,128,128,0.1); }
      .filter-section-title { padding: 6px 16px 4px; font-size: 11px; font-weight: 700; line-height: 1.2; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0; }
      .filter-option ha-icon { margin-right: 12px; --mdc-icon-size: 20px; color: var(--primary-color); }
      .filter-option span { font-size: 14px; color: var(--primary-text-color); }
      .filter-divider { height: 1px; background: var(--divider-color, rgba(128,128,128,0.24)); margin: 6px 0; }
      .tag-group { margin-top: 14px; }
      .tag-group:first-of-type { margin-top: 0; }
      .tag-heading { display: flex; align-items: center; gap: 6px; padding: 4px 4px 2px; font-size: 15px; font-weight: 700; color: var(--primary-text-color); }
      .tag-heading span:last-child { font-size: 12px; font-weight: 600; color: var(--secondary-text-color); }
      .tag-heading + .task-container .task-item { margin-top: 6px; }

      @keyframes slide-down { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slide-down-subtle { from { opacity: 0; } to { opacity: 1; } }
    `;
  }
}

class TodoListCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _translations: { state: true },
      _activeLanguage: { state: true },
    };
  }

  constructor() {
    super();
    this._translations = FALLBACK_TRANSLATIONS;
    this._activeLanguage = 'en';
  }

  setConfig(config) {
    this._config = {
      default_task_icon: DEFAULT_TASK_ICON,
      language: DEFAULT_LANGUAGE,
      show_tag_headings: false,
      tag_order: [],
      checkbox_position: 'right',
      ...config,
    };
    this._loadTranslations();
  }

  updated(changedProperties) {
    if (changedProperties.has('hass')) {
      const nextLanguage = this._getResolvedLanguage();
      if (nextLanguage !== this._activeLanguage) {
        this._loadTranslations();
      }
    }
  }

  configChanged(newConfig) {
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _getResolvedLanguage() {
    const configuredLanguage = this._config?.language || DEFAULT_LANGUAGE;
    if (configuredLanguage !== DEFAULT_LANGUAGE) {
      return configuredLanguage;
    }
    const hassLanguage = this.hass?.locale?.language || 'en';
    if (hassLanguage.startsWith('de')) return 'de';
    if (hassLanguage.startsWith('no') || hassLanguage.startsWith('nb') || hassLanguage.startsWith('nn')) return 'no';
    return 'en';
  }

  async _loadTranslations() {
    const nextLanguage = this._getResolvedLanguage();
    this._activeLanguage = nextLanguage;
    const builtinTranslations = BUILTIN_TRANSLATIONS[nextLanguage] || FALLBACK_TRANSLATIONS;
    if (nextLanguage === 'en') {
      this._translations = builtinTranslations;
      return;
    }
    try {
      const response = await fetch(new URL(`${nextLanguage}.json`, TRANSLATIONS_PATH));
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const translations = await response.json();
      this._translations = { ...builtinTranslations, ...translations };
    } catch (err) {
      this._translations = builtinTranslations;
    }
  }

  _t(key, values) {
    return interpolateTemplate(this._translations?.[key] || FALLBACK_TRANSLATIONS[key] || key, values);
  }

  _renderEditorField({ label, value = '', onInput, type = 'text', helper = '', placeholder = '' }) {
    return html`
      <label class="custom-field">
        <span class="field-label">${label}</span>
        <input type=${type} .value=${value} placeholder=${placeholder} @input=${onInput} />
        ${helper ? html`<span class="field-helper">${helper}</span>` : ''}
      </label>
    `;
  }

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }
    return html`
      <div class="card-config">
        <ha-entity-picker label="${this._t('entity')}" .hass=${this.hass} .value=${this._config.entity} .includeDomains=${['todo']} @value-changed=${this._entityChanged} allow-custom-entity></ha-entity-picker>
        ${this._renderEditorField({ label: this._t('title'), value: this._config.title || '', onInput: this._titleChanged })}
        <div class="row">
            <label class="select-field">
              <span class="select-label">${this._t('sortBy')}</span>
              <select .value=${this._config.sort_by || 'priority'} @change=${this._sortbyChanged}>
                <option value="priority">${this._t('priority')}</option>
                <option value="duedate">${this._t('dueDate')}</option>
                <option value="tag">${this._t('tag')}</option>
                <option value="title">${this._t('title')}</option>
              </select>
            </label>
            <label class="select-field">
              <span class="select-label">${this._t('sortOrder')}</span>
              <select .value=${this._config.sort_order || 'asc'} @change=${this._sortorderChanged}>
                <option value="asc">${this._t('ascending')}</option>
                <option value="desc">${this._t('descending')}</option>
              </select>
            </label>
        </div>
        <label class="select-field">
          <span class="select-label">${this._t('mode')}</span>
          <select .value=${this._config.mode || 'tasks'} @change=${this._modeChanged}>
            <option value="tasks">${this._t('tasks')}</option>
            <option value="shopping">${this._t('shopping')}</option>
          </select>
        </label>
        ${this._renderEditorField({ label: this._t('cardBackgroundCss'), value: this._config.card_background || DEFAULT_CARD_BACKGROUND, onInput: this._cardBackgroundChanged, helper: this._t('useAnyCssBackground') })}
        ${this._renderEditorField({ label: this._t('cardColorCss'), value: this._config.card_color || DEFAULT_CARD_COLOR, onInput: this._cardColorChanged })}
        ${this._renderEditorField({ label: this._t('completedColorCss'), value: this._config.completed_color || DEFAULT_COMPLETED_COLOR, onInput: this._completedColorChanged })}
        ${this._renderEditorField({ label: this._t('iconBackgroundCss'), value: this._config.icon_background || DEFAULT_ICON_BACKGROUND, onInput: this._iconBackgroundChanged })}
        ${this._renderEditorField({ label: this._t('textColorCss'), value: this._config.text_color || DEFAULT_TEXT_COLOR, onInput: this._textColorChanged })}
        ${this._renderEditorField({ label: this._t('completedTextColorCss'), value: this._config.completed_text_color || DEFAULT_COMPLETED_TEXT_COLOR, onInput: this._completedTextColorChanged })}
        <div class="icon-picker-field"><span class="field-label">${this._t('defaultTaskIcon')}</span><ha-icon-picker class="themed-icon-picker" .value="${this._config.default_task_icon || DEFAULT_TASK_ICON}" @value-changed=${this._defaultTaskIconChanged}></ha-icon-picker></div>
        <label class="select-field">
          <span class="select-label">${this._t('language')}</span>
          <select .value=${this._config.language || DEFAULT_LANGUAGE} @change=${this._languageChanged}>
            <option value="auto">${this._t('languageAuto')}</option>
            <option value="en">${this._t('languageEn')}</option>
            <option value="no">${this._t('languageNo')}</option>
            <option value="de">${this._t('languageDe')}</option>
          </select>
        </label>
        <ha-formfield label="${this._t('showIcon')}"><ha-switch .checked=${this._config.show_icon !== false} @change=${this._showIconChanged}></ha-switch></ha-formfield>
        ${this._config.show_icon === false ? html`
          <label class="select-field">
            <span class="select-label">${this._t('checkboxPosition')}</span>
            <select .value=${this._config.checkbox_position || 'right'} @change=${this._checkboxPositionChanged}>
              <option value="right">${this._t('checkboxPositionRight')}</option>
              <option value="left">${this._t('checkboxPositionLeft')}</option>
            </select>
          </label>
        ` : ''}
        <ha-formfield label="${this._t('showPriority')}"><ha-switch .checked=${this._config.show_priority !== false} @change=${this._showPriorityChanged}></ha-switch></ha-formfield>
        <ha-formfield label="${this._t('showTagHeadings')}"><ha-switch .checked=${this._config.show_tag_headings === true} @change=${this._showTagHeadingsChanged}></ha-switch></ha-formfield>
        ${this._config.show_tag_headings ? html`
          <label class="custom-field">
            <span class="field-label">${this._t('tagOrder')}</span>
            <input .value=${(this._config.tag_order || []).join(', ')} @change=${this._tagOrderChanged} />
            <span class="field-helper">${this._t('tagOrderHelp')}</span>
          </label>
        ` : ''}
        <ha-formfield label="${this._t('confirmBeforeDelete')}"><ha-switch .checked=${this._config.confirm_delete !== false} @change=${this._confirmDeleteChanged}></ha-switch></ha-formfield>
        <ha-formfield label="${this._t('autoCompleteParentTask')}"><ha-switch .checked=${this._config.auto_complete_parent === true} @change=${this._autoCompleteChanged}></ha-switch></ha-formfield>
        <ha-formfield label="${this._t('showFilterMenu')}"><ha-switch .checked=${this._config.show_filter_menu !== false} @change=${this._showFilterMenuChanged}></ha-switch></ha-formfield>
        <ha-formfield label="${this._t('showSearchButton')}"><ha-switch .checked=${this._config.show_search_button !== false} @change=${this._showSearchButtonChanged}></ha-switch></ha-formfield>
        <ha-formfield label="${this._t('showClearButton')}"><ha-switch .checked=${this._config.show_clear_button !== false} @change=${this._showClearButtonChanged}></ha-switch></ha-formfield>
        <ha-formfield label="${this._t('enableQuickAdd')}"><ha-switch .checked=${this._config.quick_add === true} @change=${this._quickAddChanged}></ha-switch></ha-formfield>
      </div>
    `;
  }
  _entityChanged(ev) { this.configChanged({ ...this._config, entity: ev.detail.value }); }
  _titleChanged(ev) { this.configChanged({ ...this._config, title: ev.target.value }); }
  _sortbyChanged(ev) { if (!ev.target.value) return; this.configChanged({ ...this._config, sort_by: ev.target.value }); }
  _sortorderChanged(ev) { if (!ev.target.value) return; this.configChanged({ ...this._config, sort_order: ev.target.value }); }
  _modeChanged(ev) { if (!ev.target.value) return; this.configChanged({ ...this._config, mode: ev.target.value }); }
  _cardBackgroundChanged(ev) { this.configChanged({ ...this._config, card_background: ev.target.value }); }
  _cardColorChanged(ev) { this.configChanged({ ...this._config, card_color: ev.target.value }); }
  _completedColorChanged(ev) { this.configChanged({ ...this._config, completed_color: ev.target.value }); }
  _iconBackgroundChanged(ev) { this.configChanged({ ...this._config, icon_background: ev.target.value }); }
  _textColorChanged(ev) { this.configChanged({ ...this._config, text_color: ev.target.value }); }
  _completedTextColorChanged(ev) { this.configChanged({ ...this._config, completed_text_color: ev.target.value }); }
  _defaultTaskIconChanged(ev) { this.configChanged({ ...this._config, default_task_icon: ev.detail.value || DEFAULT_TASK_ICON }); }
  _languageChanged(ev) { this.configChanged({ ...this._config, language: ev.target.value || DEFAULT_LANGUAGE }); }
  _showIconChanged(ev) { this.configChanged({ ...this._config, show_icon: ev.target.checked }); }
  _checkboxPositionChanged(ev) { if (!ev.target.value) return; this.configChanged({ ...this._config, checkbox_position: ev.target.value }); }
  _showPriorityChanged(ev) { this.configChanged({ ...this._config, show_priority: ev.target.checked }); }
  _showTagHeadingsChanged(ev) { this.configChanged({ ...this._config, show_tag_headings: ev.target.checked }); }
  _tagOrderChanged(ev) {
    const tagOrder = [...new Set(ev.target.value.split(',').map(tag => tag.trim()).filter(Boolean))];
    this.configChanged({ ...this._config, tag_order: tagOrder });
  }
  _confirmDeleteChanged(ev) { this.configChanged({ ...this._config, confirm_delete: ev.target.checked }); }
  _autoCompleteChanged(ev) { this.configChanged({ ...this._config, auto_complete_parent: ev.target.checked }); }
  _showFilterMenuChanged(ev) { this.configChanged({ ...this._config, show_filter_menu: ev.target.checked }); }
  _showSearchButtonChanged(ev) { this.configChanged({ ...this._config, show_search_button: ev.target.checked }); }
  _showClearButtonChanged(ev) { this.configChanged({ ...this._config, show_clear_button: ev.target.checked }); }
  _quickAddChanged(ev) { this.configChanged({ ...this._config, quick_add: ev.target.checked }); }
  static get styles() {
    return css`
      :host { --todo-card-field-background: var(--ha-color-form-background, var(--secondary-background-color, var(--ha-card-background, var(--card-background-color)))); }
      .card-config { display: flex; flex-direction: column; gap: 16px; padding: 16px 0; }
      .row { display: flex; gap: 16px; }
      .row > * { flex: 1; }
      ha-formfield { display: flex; align-items: center; padding: 8px 0; }
      .custom-field,
      .select-field,
      .icon-picker-field { display: flex; flex-direction: column; gap: 6px; width: 100%; }
      .field-label,
      .select-label { color: var(--secondary-text-color); font-size: 12px; }
      .custom-field input,
      .select-field select {
        width: 100%;
        box-sizing: border-box;
        min-height: 56px;
        padding: 14px 16px;
        border-radius: 12px;
        border: 1px solid var(--divider-color);
        background: var(--todo-card-field-background);
        color: var(--primary-text-color);
        font: inherit;
      }
      .custom-field input:focus,
      .select-field select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 1px var(--primary-color);
      }
      .field-helper {
        color: var(--secondary-text-color);
        font-size: 12px;
        line-height: 1.4;
      }
      .themed-icon-picker {
        display: block;
        width: 100%;
        min-height: 56px;
        border-radius: 12px;
        background: var(--todo-card-field-background);
        --mdc-text-field-fill-color: var(--todo-card-field-background);
        --mdc-shape-small: 12px;
        --mdc-shape-medium: 12px;
        --mdc-theme-primary: var(--primary-color);
        --ha-icon-picker-container-border-radius: 12px;
      }
    `;
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
