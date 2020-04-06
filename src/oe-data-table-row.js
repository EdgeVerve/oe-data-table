/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import { OETemplatizeMixin } from "oe-mixins/oe-templatize-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
import "./oe-data-table-cell.js";
import "./oe-data-table-selection-cell.js";
import "./oe-data-table-row-style.js";
/**
 * `oe-data-table-row`
 *  Row component for each record in the oe-data-table. 
 *  Internally uses 'oe-data-table-selection-cell' and 'oe-data-table-cell' to generate cells
 * 
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * CSS Variable | Description | Default
 * ----------------|-------------|----------
 * `--oe-data-table-row` | Mixin to be applied to the table row | {}
 * `--oe-data-table-row-selected` | Mixiin to be applied to the table row when selected | {}
 * `--oe-data-table-row-hover` | Mixin to be applied to the table row on hover | {}
 * `--oe-data-table-data` | Mixin to be applied to the table cell | {}
 * `--oe-data-table-row-focus` | Mixin to be applied to the row on focus | {}
 * `--oe-data-table-column-first` | Mixin to be applied to the first column | {}
 * `--oe-data-table-column-last` | Mixin to be applied to the last column | {}
 * `--oe-data-table-row-action` | Mixin applied to the row action icon buttons | {}
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTableRow extends OETemplatizeMixin(OECommonMixin(PolymerElement)) {

    static get is() { return 'oe-data-table-row'; }

    static get template() {
        return html`
        <style include="iron-flex oe-data-table-row-style">

            .selection-cell {
                position: relative;
        
                @apply --layout;
                @apply --layout-center;
            }
            .table-rowfocus {
                @apply --oe-data-table-row-focus;
            }
            .table-row {
                border-bottom: 1px solid #ededed;
                background: #FFF;
                @apply --layout;
                @apply --oe-data-table-row;
            }
        
            .table-row.selected {
                background: #f5f5f5;
                @apply --oe-data-table-row-selected;
            }
        
            .table-row:hover {
                background: #eee;
                @apply --oe-data-table-row-hover;
            }
        
            .row-actions {
                @apply --layout-horizontal;
                @apply --layout-center;
            }
        
            .row-action {
                opacity: 0;
                @apply --oe-data-table-row-action;
            }
        
            .table-row:hover .row-action {
              opacity: 1;
            }
			
			      .table-row:focus .row-action {
              opacity: 1;
            }
			
			      .row-action:focus {
              opacity: 1;
            }
      
            .row-action:focus ~ .row-action {
              opacity: 1;
            }

            .row {
                cursor:pointer;
            }
              .margin-right-45 {
                margin-right: 20px;
              }
        
        </style>
        <div class$="table-row [[_computeClassforRow(selected)]]" tabindex$="[[tabIndex]]">      
          <template is="dom-if" if="[[!disableSelection]]">
            <div class="selection-cell">
              <oe-data-table-selection-cell selection-cell-content=[[selectionCellContent]] row=[[row]] selected=[[selected]]></oe-data-table-selection-cell>
            </div>
          </template>
          <template is="dom-repeat" items="[[columns]]" as="column" filter="_getVisibleColumns" observe="hidden">
            <oe-data-table-cell is-first-row=[[_isFirstRow(rowIndex)]] read-only=[[readOnly]] key=[[key]] row={{row}} column=[[column]] class$="table-data [[_computeCellClass(row.*,column)]]" column-template=[[_getValidTemplate(row.*,row,column)]] style$="[[_computeCellWidth(column.*,column)]]"></oe-data-table-cell> 
          </template>
          <template is="dom-if" if=[[showAccordian]]>
            <div class="row-actions row" style="flex: 0 0 48px">
              <iron-icon id="paperExpand" icon$="{{getIcon(isAccordianOpen)}}" row$="[[row]]" rowIndex$="[[rowIndex]]" on-tap="_toggleAccordian"></iron-icon>
            </div>
          </template>
            <template is="dom-if" if=[[rowActions.length]]>
                <div class="row-actions" style$="flex: [[rowActionWidth]]">
                    <template is="dom-repeat" items=[[rowActions]] as="action">
                        <div>
                            <paper-icon-button hidden$="[[_computeDivHidden(action,row)]]" class="row-action" row=[[row]] rowIndex$=[[rowIndex]] icon="[[action.icon]]" on-tap="_rowActionClicked"></paper-icon-button>
                            <paper-tooltip position="left">
                                <oe-i18n-msg msgid="[[action.title]]"></oe-i18n-msg>
                            </paper-tooltip>
                        </div>
                    </template>
                </div>
            </template>           
        </div>  
      <template is="dom-if" if=[[showAccordian]]>
      <div id="accordianContainer" hidden$="[[!isAccordianOpen]]" visible$=[[__computeVisibleEl(rowIndex,isAccordianOpen)]]>
      </div>      
      </template>
    `;
    }

    static get properties() {
        return {
            /**
             * Selection cell content customization object
             * {
             *    content:'The property of the row object whose first character that has to be displayed',
             *    image:'The property of the row object which contains the URL of the image to be displayed'
             * }
             * The object can be provided with either `content` or `image`. If both the properties are provided, image will take precedence.
             */
            selectionCellContent: {
                type: Object
            },

            /**
             * Record data
             */
            row: {
                type: Object
            },
            /**
             * Index of the current row.
             */
            rowIndex: {
                type: Number
            },
            tabIndex: {
                type: Number
            },
            /**
             * Flag denoting if the item is selected
             */
            selected: {
                type: Boolean
            },
            /**
             * Flag to disable selection of records
             */
            disableSelection: {
                type: Boolean,
                reflectToAttribute: true
            },
            /**
             * Array of row actions passed from data-table
             */
            rowActions: {
                type: Array,
                value: function () {
                    return [];
                }
            },
            /**
             * Style value passed from oe-data-table
             */
            rowActionWidth: {
                type: String
            },
            /**
             * Flag to make the cells read-only
             */
            readOnly: {
                type: Boolean,
                value: false
            },
            /**
             * Minimum column width specified by oe-data-table
             * This will be overridden if a column specifies its own min width.
             */
            minColWidth: {
                type: Number
            },
            isAccordianOpen: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true,
                value: false
            },
            /**
             * List of templates passed from oe-data-table
             */
            columnTemplates: {
                type: Array
            },


            tableHost: {
                type: Object
            },
            expandedRow: {
                type: Number,
                notify: true
            },
            accordianEle: {
                type: Object

            }

        };
        /**
         * Fired when the row is clicked.
         * 
         * @event oe-data-table-row-clicked
         */
        /**
         * Fired when the selection is changed.
         * 
         * @event toggle-selection
         */
        /**
         * Fired when the a row action is clicked.
         * 
         * @event oe-data-table-row-action
         */
        /**
         * Fired when the a row action containing a formUrl is clicked.
         * 
         * @event oe-data-table-row-form-load
         */
    }

    constructor() {
        super();
        this.addEventListener('tap', this._rowClicked.bind(this));
    }

    /**
     * Computes the class for table row
     * @param {boolean} selected selected flag
     * @return {string} class to denote the row is selected.
     */
    _computeClassforRow(selected) {
        return selected ? 'selected' : '';
    }

    /**
     * Click handler
     * @param {Event} event click event on row click
     */
    _rowClicked(event) {
        this.fire('oe-data-table-row-clicked', event);
        if (!this.disableSelection) {
            this.fire('toggle-row-selection', this.row);
        }
    }

    /**
     * Checks if the row is the first row of the table.
     * @param {number} rowIndex Index of current row.
     * @return {boolean} flag denoting first row
     */
    _isFirstRow(rowIndex) {
        return (rowIndex === 0);
    }

    /**
    * Computes class applied to each cell
    * @param {Object} rowChange change information on row data
    * @param {Object} column column information
    * @return {string} class string
    */
    _computeCellClass(rowChange, column) {
        var classesToApply = [],
            row = rowChange.base,
            value = row[column.key]; // eslint-disable-line no-unused-vars
        if (column.cellClass) {
            classesToApply.push(column.cellClass);
        }
        if (column.cellClassRules) {
            Object.keys(column.cellClassRules).forEach(function (className) {
                if (eval(column.cellClassRules[className])) {
                    classesToApply.push(className);
                }
            });
        }
        return classesToApply.join(' ');
    }

    /**
     * Returns a stamped template
     * @param {Object} rowdelta change data of row
     * @param {Object} row current row recrod
     * @param {Object} column column definition
     * @return {HTMLTemplate} template instance stamped with row and column
     */
    _getValidTemplate(rowdelta, row, column) {
        if (!this.columnTemplates || !this.columnTemplates.length) {
            return null;
        }
        var template = [].find.call(this.columnTemplates, function (temp) {
            return temp.getAttribute('column-key') === column.key;
        });
        if (template) {
            var tempClass = this.__customTemplatize(null, template.cloneNode(true), {
                methodHost: this.tableHost,
                instanceProps: {
                    row: true,
                    column: true
                }
            });
            var itemNode = new tempClass({
                row: this.row,
                column: this.column
            });
            return itemNode;
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
    _computeDivHidden(action, row) {
        return (typeof action.isHiddenFunction) == "function" ? action.isHiddenFunction(row) : false;
    }

    /**
     * Handles row action clicked event.
     * @param {Event} event click event
     */
    _rowActionClicked(event) {
        event.stopPropagation();
        var model = event.model;
        this.fire('oe-data-table-row-action', {
            action: model.action,
            row: this.row,
            rowIndex: this.rowIndex
        });

        var actionObj = model.action;
        if (actionObj.action) {
            var eventName = 'oe-data-table-row-action-' + actionObj.action;
            this.fire(eventName, {
                action: actionObj,
                row: this.row,
                rowIndex: this.rowIndex
            });
        }

        if (actionObj.formUrl) {
            this.fire('oe-data-table-row-form-load', {
                url: actionObj.formUrl,
                model: this.row
            });
        }
    }

    _getVisibleColumns(column) {
        return !(column.hidden === true || column.hidden === 'true');
    }
    _toggleAccordian(e) {
        var self = this;
        if (!this.accordianEle) {
            this.accordianEle = document.createElement(self.accordianElement);
            self.shadowRoot.querySelector('#accordianContainer').appendChild(this.accordianEle);

        }
        this.isAccordianOpen = !this.isAccordianOpen;
        if (this.isAccordianOpen && typeof this.accordianEle.set === 'function') {
            this.accordianEle.set('data', self.row);
        }

        this.fire('expanded-view', this.rowIndex);
    }
    __computeVisibleEl(rowIndex, isAccordianOpen) {
        this.async(function () {
            var container = this.shadowRoot.querySelector('#accordianContainer');
            var isVisible = isAccordianOpen;
            var accordianEl = this.accordianEle;                               //Find correct accordion Element for the rowIndex

            if (isVisible && accordianEl && !container.contains(accordianEl)) {              //If container doesn’t have related accordion append it
                container.appendChild(accordianEl);
            }
            container.children && [].forEach.call(container.children, function (el) {
                el.hidden = !isVisible || el !== accordianEl;                                 //Hide all children if not visible or if they are not correct accordion Element
            });
        }.bind(this));
    }

    getIcon() {
        return !this.isAccordianOpen ? "expand-more" : "expand-less";
    }
}

window.customElements.define(OeDataTableRow.is, OeDataTableRow);