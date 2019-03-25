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

            .table-row {
                min-height: 48px;
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
                display: none;
                @apply --oe-data-table-row-action;
            }
        
            .table-row:hover .row-action {
                display: inline-block;
            }
            .hookClass {
                display: none;
              }
        
        
              .expanded {
                display: block;
                /* height: 300px; */
                /* overflow-y: auto; */
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
            <div class="row-actions" style="flex: 0 0 48px">
              <iron-icon id$="paper-expand-[[rowIndex]]" icon="icons:expand-more" row$="[[row]]" selected$="[[selected]]" rowIndex$="[[rowIndex]]"
                on-tap="_rowAccordianClicked"></iron-icon>
            </div>
          </template>
            <template is="dom-if" if=[[rowActions.length]]>
                <div class="row-actions" style$="flex: [[rowActionWidth]]">
                    <template is="dom-repeat" items=[[rowActions]] as="action">
                    <div hidden$="[[_computeDivHidden(action,row)]]">
                    <paper-icon-button class="row-action" row$=[[row]] rowIndex$=[[rowIndex]] icon="[[action.icon]]" on-tap="_rowActionClicked"></paper-icon-button>
                            <paper-tooltip position="left"> [[action.title]] </paper-tooltip>
                        </div>
                    </template>
                </div>
            </template>           
        </div>       
      <div id$="expandedView-[[rowIndex]]" class="hookClass">
      </div>       
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
            /**
             * List of templates passed from oe-data-table
             */
            columnTemplates: {
                type: Array
            },


            tableHost:{
                type:Object
            },
            accordianUrls: {
              type: Array,
              notify: true
             
            },
            expandedRow: {
              type: Number,
              notify: true
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
        this.fire('toggle-row-selection', this.row);
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
                row:this.row,
                column:this.column
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
    _computeDivHidden(action,row) {
        return (typeof action.isHiddenFunction)=="function" ? action.isHiddenFunction(row): false;
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
    _accordianUrlsChanged() {
        debugger
        if (typeof (this.accordianUrls) === "string") {
          try {
            var urls = JSON.parse(this.accordianUrls);
            this.accordianUrls = urls;
          } catch (err) {
            return;
          }
        }
        if (this.accordianUrls && this.accordianUrls.length > 0) {
          for (var i = 0; i < this.accordianUrls.length; i++)
            import(this.accordianUrls[i]);
        }
      }
      onUpdateInlineFilter() {
        if (this.enableInlineFilter) {
          this.$["table-header"].classList.add("table-header-style");
        }
      }
      _createExpandedView(e) {
    
        var self = this;
       
        if (self.root.querySelector('#expandedView-' + self.expandedRow) && !self.root.querySelector('#expanded-hook-' + self.expandedRow)) {
          var elem = document.createElement(self.accordianElement);
          elem.id = 'expanded-hook-' + self.expandedRow;
          //elem.set('data', self.items[self.expandedRow]);
          elem.set('data', self.row);
          self.root.querySelector('#expandedView-' + self.expandedRow).appendChild(elem);
        }
        else if (self.root.querySelector('#expandedView-' + self.expandedRow) && self.root.querySelector('#expanded-hook-' + self.expandedRow)) {
          var elem = self.root.querySelector('#expanded-hook-' + self.expandedRow);
          elem.style.visibility = "visible";
          elem.set('data', {});
         //elem.set('data', self.items[self.expandedRow]);
          elem.set('data', self.row);
        }
      }
      _rowAccordianClicked(e) {
        var rowIndex = Number(e.currentTarget.getAttribute('rowIndex'));
        this.expandedRow = rowIndex;
    
        if (e.currentTarget.icon === "icons:expand-more") {
    
          this.root.querySelector('#expandedView-' + this.expandedRow).classList.remove("expanded");
          this.root.querySelector('#expandedView-' + this.expandedRow).classList.add("expanded");
          this.root.querySelector("#paper-expand-" + rowIndex).setAttribute('icon', 'icons:expand-less');
    
          this._createExpandedView(e);
        }
        else {
    
          this.root.querySelector('#expandedView-' + this.expandedRow).classList.remove("expanded");
          this.root.querySelector('#expandedView-' + this.expandedRow).classList.add("hookClass");
          this.root.querySelector("#paper-expand-" + rowIndex).setAttribute('icon', 'icons:expand-more');
          var expandedHook = this.root.querySelector("#expanded-hook-" + rowIndex);
          if (expandedHook) {
            expandedHook.style.visibility = "hidden";
          }
          // expandedHook.parentNode.removeChild(expandedHook);
    
        }
        this.fire('expanded-view',e);
      }
      
}

window.customElements.define(OeDataTableRow.is, OeDataTableRow);