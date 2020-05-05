/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import { OETemplatizeMixin } from "oe-mixins/oe-templatize-mixin.js";

import "@polymer/iron-list/iron-list.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icons/editor-icons.js";
import "@polymer/paper-material/paper-material.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-progress/paper-progress.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/iron-collapse/iron-collapse.js";

import "oe-utils/oe-utils.js";
import "oe-i18n-msg/oe-i18n-msg.js";
import "oe-ui-forms/lazy-component.js";
import "oe-ui-forms/meta-polymer.js";

import { OEDataTableMixin } from "./src/oe-data-table-mixin.js";
import "./src/oe-data-table-header-cell.js";
import "./src/oe-data-table-column-customizer.js";
import "./src/oe-data-table-pagination-panel.js";
import "./src/oe-data-table-header.js";
import "./src/oe-data-table-row.js";
import "./src/oe-data-table-row-style.js";

var OEUtils = window.OEUtils || {};
var IronList = window.customElements.get('iron-list');

class CustomIronList extends IronList {
  static get is() { return 'custom-iron-list'; }

  static get template(){
    return html`
    ${super.template}
    `;
  }
  connectedCallback(){
    super.connectedCallback();
    this.addEventListener('iron-overlay-opened', this._menuOpened.bind(this));
    this.addEventListener('iron-overlay-closed', this._menuClosed.bind(this));
  }
  disconnectedCallback(){
    super.disconnectedCallback();
    this.removeEventListener('iron-overlay-opened', this._menuOpened.bind(this));
    this.removeEventListener('iron-overlay-closed', this._menuClosed.bind(this));
  }
   /**
     * Start - fix for iron menu or other dropdowns going behind te ironlist
    **/
   _menuOpened(e) {
    var row = this.getParentById(e.target, 'row-list');
    row.style.zIndex = 102;
  }
  _menuClosed(e) {
    var row = this.getParentById(e.target, 'row-list');
    row.style.zIndex = '';
  }
  getParentById(element, id) {
    var me = this;
    if (!id) {
      return element.parentElement;
    }
    if (element.parentElement.id === id || element.parentElement.tagName.toLowerCase() === 'custom-iron-list') {
      return element;
    } else {
      return me.getParentById(element.parentElement, id);
    }
  }

}
window.customElements.define(CustomIronList.is, CustomIronList);

/**
 * ### oe-data-table
 * 
 * `<oe-data-table>` is a component for displaying data in tabular format. It is a Polymer component styled with Material Design Data Table Standards.
 * It can be used to add, edit and delete data in a model which has a `embedded`/`hasMany` relation.
 * Also to display the entries in a model
 * 
 * The data to be shown is set to `items` and columns to show is set to `columns`.
 * 
 * ### Defining Columns
 * 
 * The column(s) to show in the table can be configured using the `columns` property.
 * The `columns` property takes an array of objects which can have the following properties.
 * 
 * Column | property | Description
 * -------|---------|-------------
 * `key` | The key of the row to get data from.
 * `label` | The string to be shown in column header.
 * `tooltip` | The string to be shown in column header as a tooltip.
 * `valueAsTooltip`| Boolean flag to show value of a column as a tooltip on hover. Useful when the values are large and are hidden due to column width
 * `type` | The type of the content that is shown in the column. For example date, timestamp, number, string.
 * `uitype` | (Deprecated. use type) The type of the content that is shown in the column. For example date, timestamp.
 * `uiType` | The input control that has to be used for inline editing.
 * `readOnly` | Boolean flag denoting whether the column is non editable in inline mode , by default it is false.
 * `width` | Width of the column in `px`.
 * `minWidth` | Min Width of the column in `px`, by default grid level min width will be taken.
 * `sort` |  Sort order of the current column. Takes either `asc` or `desc`.
 * `alignment` | Alignment of the cell content , can have `left`,`right` or `center` .
 * `firstToSort` | Whether to sort first by desc or asc, by default it is asc.
 * `formatter` | A custom formatting function which returns the value to show in the cell.
 * `renderer` | A custom rendering function which returns the element to show in the cell.
 * `href` | Takes an express styled path and shows the cell content as a `hyperlink` with the provided path. For example, href="/models/customer/:id".
 * `cellClass` | Class to apply on data table cell.
 * `cellClassRules` | Object having class name to be applied as key and an expression to evaluate as value.
 * `valueGetter` | A custom getter function which returns a value for the property specified in the `key`.
 * `hidden` | Column will be hidden if it is set to true.
 * `autoFit` | table height should be set by user when this property is true.
 * 
 * ### Styling
 * 
 * `<oe-data-table>` provides the following custom properties and mixins for styling:
 * 
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--oe-data-table` | Mixin to be applied to whole table | {}
 * `--oe-data-table-header` | Mixin to be applied to the table header  | {}
 * `--oe-data-table-row` | Mixin to be applied to the table row | {}
 * `--oe-data-table-row-hover` | Mixin to be applied to the table row on hover | {}
 * `--oe-data-table-row-focus` | Mixin to be applied to the row on focus | {}
 * `--oe-data-table-header-title` | Mixin to be applied to the table header title  | {}
 * `--oe-data-table-row-first` | Mixin to be applied to the first row of the table | {}
 * `--oe-data-table-row-last` | Mixin to be applied to the last row of the table | {}
 * `--oe-data-table-selection-cell-content` | Mixiin to be applied to the selection cell content if provided | {}
 * `--oe-data-table-data` | Mixin to be applied to table-data class to set min-height | {}
 * `--oe-data-table-selection-checkbox` | Mixin to be applied to table selection checkbox | {}
 * `--edit-control` | Mixin applied to set the height of edit cell | {}
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 * @demo demo/index.html
 */
class OeDataTable extends OEDataTableMixin(OECommonMixin(PolymerElement)) {

  static get is() { return 'oe-data-table'; }

  static get template() {
    return html`
      <style include="iron-flex iron-flex-alignment oe-data-table-row-style">
        :host {
          width: 100%;
          display: block;

          --row-width: initial;
        }

        paper-material {
          color: var(--primary-text-color);
          @apply --oe-data-table;
        }

        .data-table {
          height:100%;
        }

        #table-header {
          font-size: 12px;
          height: 55px;
          color: rgba(0, 0, 0, 0.54);
          font-weight: 700;
          font-style: normal;
          overflow-x: hidden;
          border-bottom: 1px solid #ededed;
          background: #FFF;
          @apply --oe-data-table-column-header;
          @apply --layout;
        }

        paper-progress {
          position: absolute;
          width: 100%;
        }

        .table-body {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.87);
          font-weight: 400;
          font-style: normal;
          height:100%;
          @apply --layout-vertical;
        }

        .table-body.reverse {
          @apply --layout-vertical-reverse;
        }

        custom-iron-list {
          height: 100%;
          overflow: auto;
          --iron-list-items-container: {
            width: var(--row-width);
          }
        }

        .selection-cell {
          position: relative;

          @apply --layout;
          @apply --layout-center;
        }

        .selection-checkbox {
          padding: 0 24px;
          @apply --oe-data-table-selection-checkbox;
        }

        paper-checkbox.selection-checkbox {
          --paper-checkbox-label-spacing: 0;
          --paper-checkbox-checked-color: var(--secondary-color);
        }

        oe-data-table-row.first-of-type {
          @apply --oe-data-table-row-first;
        }

        oe-data-table-row.last-of-type {
          @apply --oe-data-table-row-last;
        }
        oe-data-table-row {
          border-bottom: 1px solid #ededed;
          background: #FFF;
          @apply --oe-data-table-row;
        }
        oe-data-table-row:focus {
          @apply --oe-data-table-row-focus;
      }
     
     
      oe-data-table-row:hover {
          background: #eee;
          @apply --oe-data-table-row-hover;
      }
        .form-content {
          height: 100%;
        }

        .summary-row {
          background: #f5f5f5;
        }

        #summary-row-content {
          overflow-x: hidden;

          @apply --layout;
        }

        .summary-cell {
          height: 56px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.87);
        }

        .selection-cell.summary-cell {
          min-width: 66px;
        }

        .summary-cell-content {
          width: 100%;
        }

        .empty-state{
          height: 100%;
          min-height:48px;
        }
        #action-dialog {
          margin: 0;
          min-block-size: fit-content;
          min-width: 150px;
          border-radius: 2px;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
        
        }
      </style>
      <paper-material class="data-table">
        <iron-selector selected="[[_mainView]]" class="data-table" attr-for-selected="view">

        <iron-collapse view="grid" class="data-table" opened=[[_showPanel(_mainView,'grid')]]>
            <div class="data-table layout vertical">
            <template is="dom-if" if="[[!hideHeader]]">
              <oe-data-table-header selected-length="[[selectedItems.length]]" 
                    label="[[label]]" disabled=[[disabled]] disable-add=[[disableAdd]] 
                    disable-edit=[[disableEdit]] disable-config-editor=[[disableConfigEditor]] 
                    disable-delete=[[disableDelete]] config-code=[[configCode]] toolbar-actions=[[toolbarActions]]
                    menu-actions=[[menuActions]]></oe-data-table-header>
            </template>

            <div id="table-header" style$="margin-right: [[_scrollBarWidth]]px;" hidden=[[hideColumnHeader]]>
              <template is="dom-if" if="[[!disableSelection]]">
                <div class="selection-cell">
                  <paper-checkbox class="selection-checkbox" checked=[[_selectedAll]] disabled$=[[!multiSelection]] on-change="_toggleSelectAll"></paper-checkbox>
                </div>
              </template>
              <template is="dom-repeat" items="{{columns}}" as="column" filter="_getVisibleColumns" observe="hidden">
                <oe-data-table-header-cell table-height="[[_computeHeightFilter(__tableHeight)]]" enable-inline-filter="[[enableInlineFilter]]" col-index=[[index]] class="table-data" items=[[items]] column={{column}} is-server-data=[[isServerData]] has-pagination=[[_hasPagination]]
                style$="[[_computeCellWidth(column.*,column)]]"></oe-data-table-header-cell>
              </template>
                <template is="dom-if" if=[[rowActions.length]]>
                <template is="dom-if" if=[[!rowActionAsMenu]]>
                  <div class="table-data" style$="flex: [[__rowActionWidth]]"></div>
                </template>
                <template is="dom-if" if=[[rowActionAsMenu]]>
                <div class="table-data" style="flex: 0 0 48px"></div>
              </template>
              </template>
            </div>

            <div style$="min-height:[[__tableHeight]];" class$="table-body flex [[_computeTableBodyClass(aggregatorAlignTop)]]">

              <template is="dom-if" if=[[_loadingData]]>
                <paper-progress indeterminate></paper-progress>
              </template>

              <template is="dom-if" if=[[_items.length]] restamp=true>
               
                  <custom-iron-list index-as="rowIndex" id="row-list" items="{{_items}}" as="row" max-physical-count="[[_maxDomElement]]" on-scroll="_scrollHandler" on-iron-resize="_updateRowWidth">
                    <template>
                      <oe-data-table-row class$="[[computePosition(rowIndex,_items)]]" on-dblclick="_handleDblClick" is-accordian-open=[[_visibleAccordian(rowIndex)]] row-action-as-menu=[[rowActionAsMenu]] accordian-element=[[accordianElement]] show-accordian=[[showAccordian]] 
                      columns=[[columns]] selection-cell-content=[[selectionCellContent]] row=[[row]] row-index=[[rowIndex]] table-host=[[tableHost]]
                      tab-index="0" selected=[[_getSelectionState(row,_computeSelection)]] disable-selection=[[disableSelection]] row-actions=[[rowActions]]
                      row-action-width=[[__rowActionWidth]] read-only=[[__isCellReadOnly]] min-col-width=[[minColWidth]] column-templates=[[columnTemplates]] auto-fit=[[autoFit]]></oe-data-table-row>
                    </template>
                  </custom-iron-list>
               
              </template>
             
              <template is="dom-if" if=[[!_items.length]] restamp=true>
                <div class="empty-state layout horizontal center-center">
                  <label>[[emptyStateMessage]]</label>
                </div>
              </template>

              <template is="dom-if" if="[[_hasAggregator(columns.*)]]">
                <div class="summary-row">
                  <div id="summary-row-content" style$="margin-right: [[_scrollBarWidth]]px;">
                    <template is="dom-if" if="[[!disableSelection]]">
                      <div class="selection-cell summary-cell"> </div>
                    </template>
                    <template is="dom-repeat" items="{{columns}}" as="column">
                      <oe-data-table-summary-cell class="summary-cell table-data" style$="[[_computeCellWidth(column.*,column)]]">
                        <div class="summary-cell-content" style$="[[_computeCellAlignment(column)]]"> [[_computeSummary(column,_items.*)]] </div>
                      </oe-data-table-summary-cell>
                    </template>
                  </div>
                </div>
              </template>
            </div>

            <template is="dom-if" if="[[_showPaginationPanel]]">
              <oe-data-table-pagination-panel page-size="{{pageSize}}" rows-per-page-items="[[rowsPerPageItems]]" current-page={{currentPage}} items-length=[[_items.length]] row-count=[[rowCount]]></oe-data-table-pagination-panel>
            </template>
          </div>
          </iron-collapse>

          <template is="dom-if" if="[[_showPanel(_mainView,'customize')]]">
            <iron-collapse view="customize" opened=[[_showPanel(_mainView,'customize')]]>
              <oe-data-table-column-customizer columns="{{columns}}" title="{{label}}" on-close-column-customizer="_showGridView"></oe-data-table-column-customizer>
            </iron-collapse>
          </template>

          <iron-collapse view="form" opened=[[_showPanel(_mainView,'form')]]>
            <div class="form-content">
              <paper-icon-button icon="icons:arrow-back" on-tap="_showGridView" hidden=[[!hideFormBackButton]]></paper-icon-button>
              <lazy-component id="form-component" url=[[dataTableFormUrl]] model=[[modelToEdit]] emit-on-save=[[emitOnSave]]></lazy-component>
            </div>
          </iron-collapse>
        </iron-selector> 
        <paper-dialog id="action-dialog" on-iron-overlay-opened="_positionMenuDialog">
        <paper-listbox style="padding:0px;margin: 5px 0px;">
        <template is="dom-repeat" items=[[rowMenuActions]] as="action">
            <paper-item hidden$="[[_computeDivMenuHidden(action,selectedRow)]]" on-tap="_rowMenuActionClicked">[[action.title]]</paper-item>
        </template>
       </paper-listbox>
        </paper-dialog>
      </paper-material>
      <slot></slot>
      `;
  }

  static get properties() {
    return {
      /**
       * Setting to `true` hides the header
       */
      hideHeader: {
        type: Boolean,
        value: false
      },
      /**
       * Setting to true enable user to set height of table
       */
      autoFit: {
        type: Boolean,
        value: false
      },
      rowMenuActions: {
        type:Array,
        value: function () {
          return [];
        }
      },
      accordianElement: {
        type:String,
        notify:true
    },
      /**
       * Setting to true hides the column headers
       */
      hideColumnHeader: {
        type: Boolean,
        value: false
      },

      /**
       * Disable all table header actions
       */
      disabled: {
        type: Boolean,
        value: false
      },

      /**
       * Disable adding new records
       */
      disableAdd: {
        type: Boolean,
        value: false
      },
      /**
       * Disable editing records
       */
      disableEdit: {
        type: Boolean,
        value: false
      },
      /**
       * Disable deleting records
       */
      disableDelete: {
        type: Boolean,
        value: false
      },
      /**
       * Disable editing column  configuration.
       */
      disableConfigEditor: {
        type: Boolean,
        value: false
      },

      /**
       * Array of page numbers that has to be shown in Rows per page dropdown
       */
      rowsPerPageItems: {
        type: Array,
        value: [5, 10, 15, 25, 50, 100, 200, 500, 1000]
      },

      /**
       * Minimum width that every column should accommodate. Can be overridden in column level.
       */
      minColWidth: {
        type: Number,
        value: 125
      },

      /**
       * The page to show when a row is added/edited. For example "/components/customer-default.html"
       */
      editorFormUrl: {
        type: String
      },

      /**
       * Event to emit on save . Passed to the lazy-component.
       */
      emitOnSave: {
        type: String
      },

      /**
       * Empty state message displayed
       */
      emptyStateMessage: {
        type: String,
        value: "No records found"
      },

      _modelBeingUpdated: {
        type: Object
      },

      /**
       * When the grid is showing a list of models which needs to be saved by calling save api, then recordHandling needs to be `remote` which is default mode, if it is used for showing embedded/hasMany relations , then the recordHandling needs to be `local`/`localex` respectively.
       */
      recordHandling: {
        type: String,
        value: 'remote'
      },

      _activeCell: {
        type: Object,
        value: function () {
          return null;
        }
      },

      /**
       * Default Object to set on the form when a new entry is to be added.
       */
      defaultRecord: {
        type: Object
      },


      /**
       * Array of actions to be displayed as icons on the header
       * Actions should be of format
       * {
       *    icon: 'icons:alarm',
       *    title: 'Notify Users',
       *    action: 'alarm'
       * }
       * These will appear as icons on the header with a tooltip specified by 'title'
       * On clicking on the icon an event will be raised with 'oe-data-table-action-' + the action provided.
       * In the case of example 'oe-data-table-action-alarm'
       * 
       */
      toolbarActions: {
        type: Array
      },

      /**
       * Array of actions to be displayed on menu of the header
       * The format and working is similar to toolbarActions , The difference being that these will appear
       * When the Menu icons is clicked and displays with icon and title.
       */
      menuActions: {
        type: Array,
        value: function () {
          return [];
        }
      },

      /**
       *  setting `selectionCellContent` with an object will display an circular overlay with configured content above the selection checkbox.
       *  The overlay will be hidden when that cell is hovered. This object can have the following properties
       *  `content` - The property of the row object whose first character that has to be displayed
       *  `image` - The property of the row object which contains the URL of the image to be displayed
       *
       *  The object can be provided with either `content` or `image`. If both the properties are provided, image will take precedence.
       *  @type {{ content : string, image: string }}
       */
      selectionCellContent: {
        type: Object
      },

      /**
       *  A grid config object. Takes an object with columns and editorFormUrl. Setting this property sets the columns property and editorFormUrl property if provided
       *
       *  @type {{ columns : array, editorFormUrl: string }}
       */
      config: {
        type: Object,
        observer: '_configChanged'
      },

      /**
       * Config code related to entry in GridConfig Model to fetch configuration for the data-table
       */
      configCode: {
        type: String,
        value: '',
        observer: '_configCodeChanged'
      },

      /**
       *  Setting to `true` shows the aggregator row between column header and table body.
       */
      aggregatorAlignTop: {
        type: Boolean
      },
      rowActionAsMenu: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       *  Array of action objects that to be shown in each row.
       */
      rowActions: {
        type: Array
      },

      /**
       * The definition of the columns to show in the header of the grid.
       *
       * @type {{key: string, label: string, uitype: string, sort: string}}
       */
      columns: {
        type: Array,
        value: function () {
          return [];
        },
        notify: true,
        observer: '_organizeData'
      },

      /**
       * Array of objects to show in the grid. Each object in the array will be shown as each row.
       */
      items: {
        type: Array,
        notify: true
      },

      /**
       * Number of rows that has to be displayed in each page
       */
      pageSize: {
        type: Number,
        value: 5,
        observer: '_pageSizeChanged'
      },

      /**
       * An array containing the list of selected items.
       */
      selectedItems: {
        type: Array,
        notify: true,
        readOnly: true,
        value: function () {
          return [];
        }
      },

      /**
       * Setting to false disabled row selection and checkbox column on the grid
       */
      disableSelection: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * Settting to true enables selecting multiple items. 
       * The `disableSelection` attribute has to be false in order to `multiSeletion` to work.
       */
      multiSelection: {
        type: Boolean,
        value: false
      },

      /**
       * Startin page number on load
       */
      currentPage: {
        type: Object,
        value: 1,
        notify: true
      },

      /**
       *  REST url where data has to fetch from data
       */
      restUrl:{
        type:String,
        observer: '_organizeData'
      },

      /**
       *  If `restUrl` is provided , total row count will be fetched and stored in this variable
       */
      rowCount: {
        type: Number,
        notify: true
      },

      _hasPagination: {
        type: Boolean
      },

      /**
       * Name of the model to get columns to show
       */
      model: {
        type: String
      },

      _pageSize: {
        type: Number
      },

      /**
       * `dataController` is  a function which does custom data processing for pagination and provide data.
       *  @type {{ Function }}
       */
      dataController: {
        type: Function,
        observer: '_organizeData'
      },

      /**
       *  Flag indicating that data is loading
       */
      _loadingData: {
        type: Boolean
      },

      /**
       *  Property determining the type of pagination on the client side.
       *  "scroll" - support infinite scrolling for pagination , 
       *  "page" - show distinct records per page.
       */
      paginationType: {
        type: String
      },

      /**
       * Label to appear on heading
       */
      label: {
        type: String
      },
      showAccordian:{
        type:Boolean,
        value:false
      },
      actionOffset:{
        type: Object
      },
      selectedRow: {
        type: Object
      },
      /**
     *  Setting to `true` shows the inline filter, otherwise oe-data-table-filter is used
     */
    enableInlineFilter: {
      type: Boolean,
      value: false,
      notify: true,
      observer: 'onUpdateInlineFilter'
    }
    };
  }

  static get observers() {
    return [
      '_updateRowWidth(_items.*)',
      '_keyHandlers(disabled,_items.length)',
      '_showPagination(dataController)',
      '_showPagination(paginationType)',
      '_computeGridHeight(pageSize,_items.length,autofit)',

      '_itemsChanged(items.*)',
      '_organizeData(currentPage)',
      '_computeRowActionWidth(rowActions.length)',
      '_computeCellReadOnly(disabled,disableEdit)'
    ];
  }

  /* LIFE-CYCLE METHODS START */

  constructor() {
    super();
    var self = this;
    let listenersList = {
      'change-column-width': '_changeColumnWidth',
      'set-active-cell': '_setActiveCell',
      'customize-view': '_applyColumnCustomization',
      'oe-cell-rendered': '_updateIronList',
      'toggle-select-all': '_toggleSelectAll',
      'refresh-render': '_refreshRender',
      'show-column-customizer': '_showCustomizeView',
      'toggle-row-selection': '_toggleRowSelection',
      'apply-criteria': '_refreshRender',
      'oe-data-table-cell-value-changed': '_organizeData',
      'expanded-view': '_rowAccoridianclicked'
    };

    Object.keys(listenersList).forEach(function (eventName) {
      let listnenerName = listenersList[eventName];
      if (typeof self[listnenerName] === "function") {
        self.addEventListener(eventName, self[listnenerName].bind(self));
      }
    });

    if (!this.ctor) {
      this.columnTemplates = this.querySelectorAll('template[column-key]');
      this._columnInfoContent = this.querySelectorAll('oe-data-table-column');

      //Get column info from child elements
      if (this._columnInfoContent && this._columnInfoContent.length > 0) {
        var columns = [],
          attributesToSkip = ['class', 'id'];
        [].forEach.call(this._columnInfoContent, function (columnDInfo) {
          var attributes = columnDInfo.attributes;
          var column = {};
          for (var j = 0, al = attributes.length; j < al; j++) {
            var attribute = attributes[j];
            if (attributesToSkip.indexOf(attribute.name) == -1) {
              column[self.kebabCaseToCamelCase(attribute.name)] = attribute.value;
            }
          }
          column.disabled = columnDInfo.hasAttribute('disabled');
          column.readOnly = columnDInfo.hasAttribute('read-only');
          column.hidden = columnDInfo.hasAttribute('hidden');
          column.valueAsTooltip = columnDInfo.hasAttribute('value-as-tooltip');
          columns.push(column);
        });
        this.set('columns', columns);
      }
    }
    this.fire('oe-data-table-ready');
  }

  connectedCallback() {
    super.connectedCallback();
    //Initialize default values
    this.__visibleAccordians = {};  //Object map of rowIndex -> Should the accordion element be shown  
    this._showGridView();
    this.set('_selectionState', new WeakMap()); // eslint-disable-line no-undef
    this.refCodeMap = {};
    this.listDataMap = {};
    this.maxRowHeight = 49;  //iron-list height for row 48px + 1px for border bottom
    this.addEventListener('row-menu-action-clicked',function(event){
      this.root.querySelector('#action-dialog').positionTarget = event.detail.target;
      this.root.querySelector('#action-dialog').open();
      //this.root.querySelector('#action-dialog')._renderOpened();
      this.set('rowMenuActions',event.detail.data);
      this.set('selectedRow',event.detail.currentRow);
      this.set('actionOffset',event.detail.target.getBoundingClientRect());
    })
    this.addEventListener('row-height-changed',function(event){
      this.maxRowHeight = event.detail;
      this._computeGridHeight(this.pageSize,this._items.length,this.autoFit);

    });
    this.set('tableHost',this.getRootNode().host);
    if(!this.paginationType){
      this.set('paginationType',(this.restUrl || this.dataController)?"page":"scroll");
    }

    //If model name is provided without columns compute refCodeMap and listDataMap
    if (this.model && this.columns.length === 0) {
      this.async(function () {
        OEUtils.getModelDefinition(this.model, function (err, modelDefinition) {
          if (err) {
            return;
          }
          var properties = modelDefinition.properties;
          var refCodeModelPromisesMap = new Map();
          var refCodeModelDataMap = new Map();

          properties && Object.keys(properties).forEach(prop => {
            var refCodeType = properties[prop].refcodetype;
            if (refCodeType) {
              refCodeModelPromisesMap.set(prop, this._getRefCodeModel(refCodeType));
            }
          });

          Promise.all(refCodeModelPromisesMap.values()).then(modelMap => {
            var entries = refCodeModelPromisesMap.entries();
            modelMap.forEach(model => {
              var prop = entries.next().value[0];
              refCodeModelDataMap.set(prop, this._getRefCodes(model.resturl));
            });
            return Promise.all(refCodeModelDataMap.values());
          }).then(resultMap => {
            var entries = refCodeModelDataMap.entries();
            resultMap.forEach(result => {
              var propertyName = entries.next().value[0];
              this.refCodeMap[propertyName] = {};
              this.listDataMap[propertyName] = [];
              result && Object.keys(result).forEach(res => {
                var code = result[res].code;
                var desc = result[res].description;
                this.refCodeMap[propertyName][code] = desc;
                this.listDataMap[propertyName].push({
                  code: code,
                  description: desc
                });
              });
            });
            this.set('columns', this._getColumnsFromModelDef(modelDefinition));
          }).catch(error => { });
        }.bind(this));
      });
    }
    this._keyHandlers();
    this.addEventListener('expanded-view',function(){
      var iron = this.shadowRoot.querySelector('#row-list');
      iron._render();
    }.bind(this));
  }
  computePosition(index,items){
    if(index === (items.length-1)){
      return 'last-of-type';
    }
    else if(index === 0){
      return 'first-of-type';
    }
    return '';
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('tap', this._resetActiveCell.bind(this));
  }
  _rowAccoridianclicked(event){
    var rowInd = event.detail;
    var isAccordianVisible = this.__visibleAccordians[rowInd];
    this.set('__visibleAccordians.' + rowInd, !isAccordianVisible);

  }
  _visibleAccordian(rowIndex){
    return !!this.__visibleAccordians[rowIndex];
  }
  onUpdateInlineFilter() {
    if (this.enableInlineFilter) {
      this.$["table-header"].classList.add("table-header-style");
    }
  }

  /* LIFE-CYCLE METHODS END */

  /* ROW-SELECTION METHODS START */


  /**
   * Selects a record
   * @param {Object} item record to select
   */
  selectItem(item) {
    this._selectionState.set(item, true);
    this.set('_computeSelection', !this._computeSelection);
    if (!this.multiSelection) {
      this.selectedItems.length && this.deselectItem(this.selectedItems[0]);
    }
    this.async(function () {
      var items = this[this.computedItems];
      if (this.selectedItems.indexOf(item) === -1) this.push('selectedItems', item);
      if (items.length == this.selectedItems.length) {
        this.set('_selectedAll', true);
      }
    });
  }
 
  /**
   * Deselects a record
   * @param {Object} item record to deselect
   */
  deselectItem(item) {
    this._selectionState.delete(item);
    this.set('_computeSelection', !this._computeSelection);
    this.async(function () {
      var items = this[this.computedItems];
      if (this.selectedItems.indexOf(item) !== -1) this.splice('selectedItems', this.selectedItems.indexOf(
        item), 1);
      if (items.length != this.selectedItems.length) {
        this.set('_selectedAll', false);
      }
    });
  }

  /**
   * Toggles selection of a row
   * @param {Object} item record to toggle selection
   */
  toggleSelection(item) {
    this._selectionState.get(item) ? this.deselectItem(item) : this.selectItem(item);
  }

  /**
   * Toggles selection of all items in the data-table
   * @param {Event} evt change event from select-all checkbox
   */
  _toggleSelectAll(evt) {
    var items = this.dataController ? this._items : this.items;
    if (evt.currentTarget.checked) {
      items.forEach(function (item) {
        this.selectItem(item);
      }.bind(this));
    } else {
      this.selectedItems.forEach(function (item) {
        this.deselectItem(item);
      }.bind(this));
    }
  }

  /**
   * Toggles selection of a record.
   * @param {Event} event event containing row data.
   */
  _toggleRowSelection(event) {
    this.toggleSelection(event.detail);
  }
  
  /**
   * Checks if a item is selected
   * @param {Object} item item to check
   * @return {boolean} selected value.
   */
  _getSelectionState(item) {
    return this._selectionState.get(item) ? !this.showAccordian : false;
  }

  _positionMenuDialog(event) { // eslint-disable-line no-unused-vars
    this.async(function () {
      var filterDialog = this.root.querySelector('#action-dialog');
      var offset = this.actionOffset;
      filterDialog.set('horizontalAlign', ((offset.left + filterDialog.offsetWidth) < window.innerWidth) ?
        'left' : 'right');
      filterDialog.position();
    });
  }
  _rowMenuActionClicked(event){
    this.selectedRow._rowActionClicked(event);
    this.root.querySelector('#action-dialog').close();
  }
  /* ROW-SELECTION METHODS END */

  /* MAIN-DISPLAY METHODS START */


  /**
   * Changes view to show grid
   */
  _showGridView() {
    this.set('_mainView', "grid");
  }

  /**
   * Changes view to show column customizer
   */
  _showCustomizeView() {
    this.set('_mainView', "customize");
  }

  /**
   * Changes view to show form
   */
  _showFormView() {
    this.set('_mainView', "form");
  }

  /**
   * 
   * @param {string} selectedView selected view name 
   * @param {string} curView current view name
   * @return {boolean} retrurns true if both parameters are equal.
   */
  _showPanel(selectedView, curView) {
    return selectedView === curView;
  }


  /* MAIN-DISPLAY METHODS END */

  /* PROCESS-DATA METHODS START */


  /**
   * Checks if a dataController/restUrl/items is provided.
   *  1)If a dataController is present it will be called with currentpage,pagesize,filtersort and callback function to get the data for the page.
   *  2)If restUrl is present uses a defaultController to fetch data from server through Ajax call
   *  3)Expects 'Items' to be provided to apply sort/filter and paginate them.
   * 
   * 
   * @param {CustomEvent} event custom event to render
   */
  _organizeData(event) {
    if (!this.columns || this.columns.length == 0) {
      return;
    }
    if (this.dataController || this.restUrl) {
      var dataController = this.dataController || this.__defaultController;
      this.set('isServerData', (!this.dataController && this.restUrl));
      this.filterSort = this.filterSort || {
        filter: {},
        sort: []
      };

      if (event && event.detail) {
        var payload = event.detail;

        if (payload.filterColumn) {
          this.filterSort.filter[payload.filterColumn.key] = payload.filterColumn.value;
        }
        if (event.detail.sortColumn) {
          this.filterSort.sort = this.columns.filter(function (col) {
            return col.sort;
          }).map(function (col) {
            return "" + col.key + " " + col.sort.toUpperCase();
          });
        }
      }

      dataController.call(this, this.currentPage, this.pageSize, this.filterSort, function (err, data,
        isLastPage) {
        if (err) {
          this.fire('oe-show-error', err);
        } else {
          this._addCustomColumns(data);
          this.set('_items', data);
        }
      }.bind(this));
    } else if (this.items) {
      this.set('isServerData', false);
      if (this.paginationType === "page") {
        this._processData(this.items, function (processedData) {
          var startIndex = (this.currentPage - 1) * this.pageSize;
          var pageItems = processedData.slice(startIndex, startIndex + this.pageSize);
          if (startIndex > processedData.length) {
            this.set('currentPage', Math.ceil(processedData.length / this.pageSize));
            return;
          }
          this.set('_items', pageItems);
          this.set('rowCount', processedData.length);
        }.bind(this));
      } else {
        this._processData(this.items, function (processedData) {
          this.set('_items', processedData);
        }.bind(this));
      }
    }
  }

  /**
   * Process the data by applying sort and then filter on them.
   * 
   * @param {Array} data list of items
   * @param {function} cb callback function
   */
  _processData(data, cb) {
    var self = this;
    self._sort(data, function (err, sortedData) {
      if (err) {
        return;
      }
      self._filter(sortedData, function (err, filteredData) {
        if (err) {
          return;
        }
        cb(filteredData);
      });
    });

  }

  /**
   * Process the data by filtering them based on the columns.
   * 
   * @param {Array} items list of items
   * @param {function} done callback function
   */
  _filter(items, done) {
    var self = this;
    var filters = {},
      filterExists = false,
      filteredData;
    this.columns.forEach(function (col) {
      filters[col.key || col.field] = {
        selectedItems: col.selectedItems
      };
      if (col.selectedItems && col.selectedItems.length && !self.enableInlineFilter) filterExists = true;
      if (col.selectedItems && self.enableInlineFilter) filterExists = true;
    });

    filteredData = filterExists ? items.filter(function (d) {
      var isValid = true;
      filters && Object.keys(filters).forEach(function (key) {
        var filter = filters[key];
        if (filter.selectedItems && ((!self.enableInlineFilter && filter.selectedItems.length) || (self.enableInlineFilter) )) {
          isValid = isValid && filter.selectedItems.indexOf(d[key]) != -1;
        }
      });
      return isValid;
    }.bind(this)) : items;

    done(null, filteredData);

  }

  /**
   * Process the data by sorting them based on the 'sort' on column.
   * 
   * @param {Array} items list of items
   * @param {function} done callback function
   */
  _sort(items, done) {
    var sortOrder = {},
      colsToSort, data;
    this.columns.forEach(function (col) {
      if (col.sort) {
        var sort = col.sort.toLowerCase();
        sortOrder[col.key] = {
          order: sort == 'asc' ? 1 : (sort == 'desc' ? -1 : 0),
          type: col.type || col.uitype
        };
      }
    });
    var sortFn = function (a, b, type) {
      var val;
      switch (type) {
        case 'number':
          val = a - b;
          break;

        case 'string':
          val = a && a.localeCompare(b);
          break;

        case 'date':
          val = a && b && (new Date(a) - new Date(b));
          break;

        default:
          break;
      }

      return val;
    };
    colsToSort = Object.keys(sortOrder);
    data = colsToSort.length ? items.concat().sort(function (a, b) {
      var x = colsToSort.map(function (scol) {
        return sortFn(a[scol], b[scol], sortOrder[scol].type) * sortOrder[scol].order;
      }).join('||');
      return eval(x);
    }) : items;
    done(null, data);
  }

  /**
   * Computes additional properties into items when 
   * columns are configured with 'valueGetter'.
   * 
   * @param {Array} items list of items
   */
  _addCustomColumns(items) {
    if (items && items.length) {
      var valueGetter = {},
        keys;
      this.columns.forEach(function (column) {
        if (column.valueGetter) {
          var getter = column.valueGetter,
            getterFn;
          if (typeof getter === 'string') {
            if (getter.trim().indexOf('function') === 0) {
              var customGetter = new Function('return ' + getter)();
              getterFn = new Function('var row = this, getter = ' + customGetter + ';return getter(row)');
            } else {
              getterFn = new Function('var row = this; return ' + getter);
            }
          } else if (typeof getter === 'function') {
            getterFn = new Function('var row = this, getter = ' + getter + ';return getter(row)');
          } else {
            console.warn('The valueGetter of a column should be a string function or string');
            return;
          }
          valueGetter[column.key] = getterFn;
        }
      });

      keys = Object.keys(valueGetter);

      if (keys.length > 0) {
        items.forEach(function (item) {
          keys.forEach(function (key) {
            if (!item.hasOwnProperty(key)) {
              Object.defineProperty(item, key, {
                get: valueGetter[key]
              });
            }
          });
        });
      }
    }
  }


  /* PROCESS-DATA METHODS END */

  /* COLUMN-AGGREGATION METHODS START */


  
  /**
   * Executes the aggregation on the items based on aggregation in column
   * Returns the aggregated result or null
   * 
   * @param {Object} column column configuration
   * @param {Object} _itemsChange change data on _items
   * @return {number|string} aggregated output
   */
  _computeSummary(column, _itemsChange) { // eslint-disable-line no-unused-vars
    var aggregator = column.aggregator;
    var result;
    if (aggregator && this._items && this._items.length > 0) {
      var key = column.key || column.field;
      switch (aggregator) {
        case 'sum':
          result = this._items.reduce(function (a, b) {
            var param = Number(b[key]);
            return a + (isNaN(param) ? 0 : param);
          }, 0);
          break;
        case 'average':
          result = this._items.reduce(function (a, b) {
            var param = Number(b[key]);
            return a + (isNaN(param) ? 0 : param);
          }, 0) / this._items.length;
          break;
        case 'count':
          return this._items.length;
        default:
          if (typeof aggregator === 'function') {
            result = aggregator.call(this, this._items);
          } else if (typeof aggregator === 'string') {
            if (aggregator.trim().indexOf('function') === 0) {
              var aggregatorFunction = new Function('return ' + aggregator)();
              result = aggregatorFunction.call(this, this._items);
            } else {
              console.warn(
                'The column aggregator should be a string or a function or a function as a string'
              );
            }
          } else {
            console.warn('The column aggregator should be a string or a function');
          }
          break;
      }

      if (result) {
        var options = column.editorAttributes;
        if (column.formatter) {
          return column.formatter.call(this, result, options);
        } else if (column.type && OEUtils.TypeMappings[column.type] && OEUtils.TypeMappings[column.type].formatter) {
          var formatterFn = OEUtils.TypeMappings[column.type].formatter;
          return formatterFn(result, options);
        } else {
          return result;
        }
      }
    }

    return null;
  }

  /**
   * Checks if any of the column is configured with aggregator
   * 
   * @param {Array} columns column configuration array
   * @return {boolean} flag denoting if aggregation exists
   */
  _hasAggregator(columns) { // eslint-disable-line no-unused-vars
    return this.columns && this.columns.length > 0 && this.columns.some(function (column) {
      return column.aggregator !== undefined;
    });
  }

  /**
   * Computes a class name for table
   * @param {boolean} aggregatorAlignTop flag to place aggregator row above table rows
   * @return {string} class name
   */
  _computeTableBodyClass(aggregatorAlignTop) {
    return aggregatorAlignTop ? 'reverse' : '';
  }


  /* COLUMN-AGGREGATION METHODS END */
  /**
   * Converts string from snake case to CamelCase.
   * @param {string} str string to convert
   * @return {string} converted string
   */
  kebabCaseToCamelCase(str) {
    return str.replace(/-([a-z])/g, function (group) {
      return group[1].toUpperCase();
    });
  }

  /**
   * Attaches/Detaches event listeners based on 'disabled' flag and '_items' array length
   */
  _keyHandlers() {
    if (!this._items || this._items.length == 0) {
      return;
    }
    this.async(function () {
      var container = this.shadowRoot.querySelector('#row-list');
      if (!container) {
        return;
      }
      if (this.disabled) {
        this._addEventListenerToNode(container, 'keydown', this._keyDownListener.bind(this));
      } else {
        this._removeEventListenerFromNode(container, 'keydown', this._keyDownListener);
      }
    },1000);
  }

  /**
   * Toggles selection of next/prev row based on up/down arrow key press
   * @param {KeyDownEvent} e key down event
   */
  _keyDownListener(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (this.selectedItems.length !== 1) {
      return;
    }
    if (e.keyCode === 40 || e.keyCode === 38) {
      var selectedIndex = this._items.indexOf(this.selectedItems[0]);
      if (e.keyCode === 40) {
        //down arrow
        if (selectedIndex + 1 === this._items.length) {
          return;
        }
        selectedIndex++;
      } else if (e.keyCode === 38) {
        //up arrow
        if (selectedIndex === 0) {
          return;
        }
        selectedIndex--;
      }
      this.toggleSelection(this._items[selectedIndex]);
    }

  }

  /**
   * Computes `__rowActionWidth` property to send to each row
   * @param {number} rowActions length of row actions
   */
  _computeRowActionWidth(rowActions) {
    
    this.set('__rowActionWidth', '0 0 ' + (rowActions * 48) + 'px');

  }
  /**
   * Computes `__isCellReadOnly` property to send to each cell
   * @param {boolean} disabled flag to disable data-table
   * @param {boolean} disableEdit flag to disabled editing
   */
  _computeCellReadOnly(disabled, disableEdit) {
    this.set('__isCellReadOnly', disabled || disableEdit);
  }

  /**
   * Checks if Infinite scroll using 'iron-list' is to be used
   * @param {string} paginationType pagination type of data-table
   * @return {boolean} flag to enable infinite scroll mode
   */
  _showInfinteScroll(paginationType) {
    return paginationType === "scroll";
  }

  _getVisibleColumns(column) {
    return !(column.hidden === true || column.hidden === 'true');
  }

  /**
   * Computes text alignment style based on column.type
   * 
   * @param {Object} column column configuration
   * @return {string} style attribute for the cell
   */
  _computeCellAlignment(column) {
    return ['number', 'decimal'].indexOf(column.type || column.uitype) > -1 ? 'text-align: right' :
      null;
  }
  _computeDivMenuHidden(action, rowEle) {
    var row = rowEle.row;
    return (typeof action.isHiddenFunction) == "function" ? action.isHiddenFunction(row) : false;
}
  /**
   * Observer on 'items' to notify '_items' on data changed.
   * 
   * @param {Object} change change data on 'items'
   */
  _itemsChanged(change) {
    if (change.path === 'items.splices') {
      change.value.indexSplices.forEach(function (splice) {
        var addedObjects = [];
        for (var i = 0; i < splice.addedCount; i++) {
          var index = splice.index + i;
          addedObjects.push(splice.object[index]);
        }
        this._addCustomColumns(addedObjects);
      }.bind(this));
      this.cancelAsync(this._itemsSpliceAsyncTask);
      this._itemsSpliceAsyncTask = this.async(function () {
        this._organizeData();
        if (this.items == this._items) {
          this.notifyPath('_' + change.path, change.value);
        }
      }, 300);
    } else {
      if (change.path === 'items') {
        this._addCustomColumns(this.items);
      }
      this._organizeData();
      if (this.items == this._items) {
        this.notifyPath('_' + change.path, change.value);
      }
    }

  }

  /**
   * Observer on pageSize to compute currentPage when page size is modified.
   * 
   * @param {number} pageSize new page size
   * @param {number} oldSize old page size
   */
  _pageSizeChanged(pageSize, oldSize) { // eslint-disable-line no-unused-vars
    /* When page size changes, we make sure the current top record is 
    in the view for new page-size. */
    var cPage = this.currentPage || 1;
    var nPage = cPage;
    if (pageSize && oldSize) {
      var firstVisibleIndex = (cPage - 1) * oldSize + 1;
      nPage = Math.ceil(firstVisibleIndex / pageSize);
    }
    if (nPage != cPage) {
      /*Current Page observer will call _organizeData */
      this.set('currentPage', nPage);
    } else {
      /* If we are on same page, call _organizeData explicitly */
      this._organizeData();
    }
  }

  /**
   * Computes Cell width style properties
   * @param {Object} columnDelta change data of column
   * @param {Object} column column definition.
   * @return {string} style information for cell width
   */
  _computeCellWidth(columnDelta, column) {
    var style = "flex : " + (column.width ? ('0 0 ' + column.width + 'px') : '1') + ";";
    var minWidth = column.minWidth || this.minColWidth;
    style += "min-width : " + (minWidth ? (minWidth + "px") : "initial") + ";";
    return style;
  }

  _handleDblClick(e){
    this.fire("row-double-clicked",e.model.row);
  }
  /**
   * Computes to show pagination-panel
   * @param {Object} change change data
   */
  _showPagination(change) {
    this.set('_showPaginationPanel', !!(this.dataController || this.restUrl || this.paginationType === "page"));
  }

  /**
   * Updates the column width based on event detail
   * @param {CustomEvent} event event containing width information
   */
  _changeColumnWidth(event) {
    var index = this.columns.indexOf(event.detail.column);
    this.set('columns.' + index + '.width', event.detail.width);
    this._updateRowWidth();
  }

  /**
   * Updates the row width of iron-list after computing the scroll bar width.
   */
  _updateRowWidth() {
    var rowList = this.shadowRoot.querySelector('#row-list');
    this.async(function () {
      if (rowList) {
        this.set('_scrollBarWidth', rowList.offsetWidth - rowList.clientWidth);
        var style = {
          '--row-width': this.$['table-header'].scrollWidth + 'px'
        };
        this.updateStyles(style);
      }
    }, 100);
  }

  /**
   * Sets the active cell that is being edited
   * @param {Event} event event with cell data.
   */
  _setActiveCell(event) {
    this._resetActiveCell();
    var elementToSet = event.detail.element;
    if (elementToSet && !this.disableEdit) {
      elementToSet.enterEditMode();
    }
    this.set('_activeCell', elementToSet);
  }

  /**
   * Removes the active cell if exists after calling 'exitEditMode' on the cell
   * 
   */
  _resetActiveCell() { // eslint-disable-line no-unused-vars
    var activeCell = this._activeCell;
    if (activeCell) {
      activeCell.exitEditMode();
      this.set('_activeCell', null);
    }
  }

  /**
   * Apply the customization on the columns
   * @param {event} event event containing the columns detail.
   */
  _applyColumnCustomization(event) {
    this.set('columns', event.detail);
    this._showGridView();
  }

  /**
   * Updates the height of each row in iron-list to set maxRowHeight.
   * @param {CustomEvent} e event containing row height
   */
  _updateIronList(e) {
    if (e.detail > this.maxRowHeight) {
      this.maxRowHeight = e.detail;
      this.debounce('rowHeight', function(){
        this._computeGridHeight(this.pageSize,this._items.length,this.autoFit);
      }.bind(this), 300);
    }
  }

  /**
   * Updates iron-list to compute height using 'notifyResize'.
   */
  updateRowHeight() {
    var rowList = this.shadowRoot.querySelector('#row-list');
    if (rowList) {
      rowList.notifyResize();
    }
  }

  /**
   * Re renders the content of data-table.
   * @param {Event} event event with filter/sort information
   */
  _refreshRender(event) {
    this.set('_items', []);
    this.async(function () {
      this._organizeData(event);
    });
  }

  _getColumnsFromModelDef(modelDef) {
    var columns = [];
    modelDef.properties && Object.keys(modelDef.properties).forEach(function (prop) {
      // ignore fields starting with underscore.
      if (prop.charAt(0) !== '_' && prop.toLowerCase().indexOf('scope') === -1) {
        var property = modelDef.properties[prop];
        var type = OEUtils.TypeMappings[property.type] || 'string';
        var col = {
          key: prop,
          label: OEUtils.camelCaseToLabel(prop),
          type: property.type,
          uiType: type.uiType
        };
        if (property.refcodetype) {
          var codeMap = this.refCodeMap[prop];
          if (codeMap) {
            col.uiType = 'oe-combo';
            col.editorAttributes = {
              valueproperty: 'code',
              displayproperty: 'description',
              listdata: this.listDataMap[prop]
            };
            col.formatter = (function (codeMap) {
              return function (value, options) {
                return codeMap[value];
              };
            })(codeMap);
          }
        }
        columns.push(col);
      }
    }.bind(this));
    return columns;
  }

  /**
   * Observer called when config object is changed.
   * @param {Object} newCfg new configuration for data-table.
   * @param {Object} oldCfg old configuration of data-table
   */
  _configChanged(newCfg, oldCfg) {
    if (this.config) {
      if (!this.editorFormUrl || (oldCfg && this.editorFormUrl === oldCfg.editorFormUrl)) {
        this.set('editorFormUrl', this.config.editorFormUrl);
      }
      if (!this.label || (oldCfg && this.label === oldCfg.label)) {
        this.set('label', this.config.label);
      }
      if (!this.columns || this.columns.length === 0 || (oldCfg && this.columns === oldCfg.columns)) {
        this.set('columns', this.config.columns);
      }
    }
  }


  /**
   * Handler for scroll event on rows to keep summary row in sync
   * @param {Event} event scroll event
   */
  _scrollHandler(event) {
    var rowList = event.target;
    var summaryRow = this.shadowRoot.querySelector('#summary-row-content');
    this.$['table-header'].scrollLeft = rowList.scrollLeft;
    if (summaryRow) {
      summaryRow.scrollLeft = rowList.scrollLeft;
    }
  }

  /**
   * Computes and sets the table height
   * @param {number} pageSize page size of data-table
   * @param {number} itemsToShow length of items to display
   *  @param {boolean} autoFit to check height set by user or not.
   */
  _computeGridHeight(pageSize, itemsToShow, autoFit) {
    if(this.pageSize < 0){
      this.set('__tableHeight', "auto");
      this.updateRowHeight();
      return;
    }
    this.async(function () {
      var size,height;
      //this.maxRowHeight = 48;
     
      this.set('_maxDomElement', size * 2);
      var rowList = this.shadowRoot.querySelector("#row-list");
      var hasScroll = false;
      if (rowList) {
        hasScroll = this.shadowRoot.querySelector("#row-list").scrollWidth > this.shadowRoot.querySelector("#row-list").clientWidth;
      }
      height = this.maxRowHeight + (hasScroll ? 16 : 0);
      if(!this.autoFit){
        size = ((itemsToShow > 5 && itemsToShow < pageSize) ? itemsToShow : pageSize);
        height = size * this.maxRowHeight + (hasScroll ? 16 : 0);
     }
      
      this.set('__tableHeight', height+"px");
      this.updateRowHeight();
    }, 0);
  }
  _computeHeightFilter(height){
    return this.autoFit ? "0px" : height;
  }
  /**
   * Fetches refcode from server.
   * @param {string} url url to fetch data
   * @return {Promise} a promise that gets resolved based on server response.
   */
  _getRefCodes(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

  /**
   * Fetches refCode for model.
   * @param {string} modelName model name to get ref codes .
   * @return {Promise} a promise that gets resolved based on server response.
   */
  _getRefCodeModel(modelName) {
    return new Promise((resolve, reject) => {
      OEUtils.getModelDefinition(modelName, function (err, model) {
        if (err) {
          return reject(err);
        }
        resolve(model);
      });
    });
  }
}

window.customElements.define(OeDataTable.is, OETemplatizeMixin(OeDataTable));