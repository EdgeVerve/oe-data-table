/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "oe-i18n-msg/oe-i18n-msg.js";
import "./oe-data-table-filter.js";

/**
 * `oe-data-table-header-cell`
 *  is used in `oe-data-table` component for displayig column headers. A column can be sorted by clicking on the title.
 *  Hovering over this component shows a filter icon which opens filter dialog for choosing values to filter.
 *  
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTableHeaderCell extends OECommonMixin(PolymerElement) {

  static get is() { return 'oe-data-table-header-cell'; }

  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment">
        :host {
          position: relative;
          user-select: none;
          -webkit-user-select: none;
        }

        #dialog {
          margin: 0;
          min-block-size: fit-content;
          min-width: 250px;
          border-radius: 2px;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
        }
        .search-div {
          bottom: 3px;
          width: 100%;
          height: 20px;
        }
        paper-input {
          width: 100%;
  
          --paper-input-container: {
            padding: 0;
          }
          --paper-input-container-input: {
            font-size: 13px;
          }
          --paper-input-container-label: {
            font-size: 12px;
            line-height: 28px;
            color: var(--primary-dark-color);
            text-align: left;
          }
        }
        .pointer {
          cursor: pointer;
        }

        #cell {
          cursor: pointer;
          width: 100%;
        }

        iron-icon {
          color: rgba(0, 0, 0, 0.87);

          --iron-icon-height: 16px;
          --iron-icon-width: 16px;
        }

        .header-title {
          vertical-align: bottom;
        }

        .header-title.sorted {
          color: rgba(0, 0, 0, 0.87);
        }

        .sort-icon {
          margin: 0px 4px;
        }

        .filter-icon {
          right: 10px;
          padding: 2px;
          display: none;
          cursor: pointer;
          position: absolute;
          border-radius: 4px;
          background: rgba(238, 238, 238, 0.4);
        }

        :host(:hover)  .filter-icon:not([hidden]) {
          display: initial;
        }

        #resize-handler {
          height: 100%;
          width: 10px;
          position: absolute;
          right: 0;
        }

        :host(:hover) #resize-handler {
          cursor: col-resize;
        }

        .cell-align-center{
          @apply --layout-center-center;
        }
        .cell-align-left .header-content{
          @apply --layout-horizontal-reverse;
        }
        .cell-align-right{
          @apply --layout-end-justified;
        }
        .pointer {
          cursor: pointer;
        }
        

    </style>
    <div id="cell" class$="[[_computeCellAlignment(column)]] layout [[_computelayout()]] center">
      <div class="header-content layout horizontal center pointer" style$="[[_computeCellStyle(column)]]" on-tap="_updateSortOrder">
        <iron-icon class="sort-icon" icon="[[_sortIcon]]" hidden$=[[!_hasSort]]></iron-icon>
        <span class$="header-title [[_sortClass]]">
          <oe-i18n-msg msgid=[[_computeColumnLabel(column)]]></oe-i18n-msg> 
          <paper-tooltip id="header-tooltip-[[_computeColumnLabel(column)]]"  offset="0" position="bottom">  <oe-i18n-msg msgid=[[column.tooltip]]>[[column.tooltip]]</oe-i18n-msg> </paper-tooltip>
        </span>
      </div>
      <template is="dom-if" if="[[enableInlineFilter]]">
      <template is="dom-if" if="[[showColumnSearch(column)]]">				
          <div class="search-div">
            <paper-input id="searchStringInput"  label="Search [[column.label]]" no-label-float value={{filterValue}} ></paper-input>    
          </div>

      </template>
    </template>

    </div>
   
    <template is="dom-if" if="[[!enableInlineFilter]]">
    <iron-icon hidden$=[[_disableFilter(column)]] class="filter-icon" icon="icons:filter-list" on-tap="openFilter"></iron-icon>
    <paper-dialog id="dialog" on-iron-overlay-opened="_positionFilterDialog">
      <oe-data-table-filter id="filterEl" is-server-data=[[isServerData]] column=[[column]] height="[[dialogHeight]]" items=[[items]]></oe-data-table-filter>
    </paper-dialog>
    </template>
   

    <div id="resize-handler" on-mousedown="_handleResize"></div>
    `;
  }

  static get properties() {
    return {
      /**
       * The definition of the column of the current cell.
       *
       * @type {{key: string, label: string, type: string, uiType : string, sort: string}}
       */
      column: {
        type: Object,
        notify: true
      },

      colIndex: {
        type: Number
      },

      items: {
        type: Array
      },
      isServerData: {
        type: Boolean
      },
      filterValue: {
				type: String,
				notify: true,
        observer: 'inlineSearchCriteria'
			},
      tableHeight: {
        type: String
      },
      dialogHeight: {
        type: String
      }
    };

    /**
     * Fired when the sort of the column is changed.
     * 
     * @event apply-criteria
     */
    /**
     * Fired when the column width is changed via mouse drag
     * 
     * @event change-column-width
     */
    /**
     * Fired when the cell is value is changed.
     * 
     * @event oe-data-table-cell-value-changed
     */

  }

  connectedCallback() {
    super.connectedCallback();
    this.cell = this.$.cell;
    this.__setSortDetails();
    this.addEventListener('close-filter-dialog',this.closeFilter.bind(this));
  }
  _computelayout(){
    var result='horizontal';
    if(this.enableInlineFilter){
      result = 'vertical';
    }
   return result;
  }
  inlineSearchCriteria(value){
    this.searchText = value;
      this._itemsChanged();
      this._items = this._filterItems(this._items, this.searchText);
      this.set('column.selectedItems', this._items);
      this.fire('apply-criteria');
  }
  _itemsChanged(change) { // eslint-disable-line no-unused-vars
    if (this.items && this.items.length) {
      var uniqueData = [];
      this.items.forEach(function (d) {
        var val = d[this.column.key || this.column.field]
        if(val === undefined && this.column.key){
          val = OEUtils.deepValue(d,this.column.key);
       }
        if (uniqueData.indexOf(val) == -1) {
          //if(searchText && val.toString().toLowerCase().indexOf(searchText) == -1) return;
          uniqueData.push(val);
        }
      }.bind(this));
      this.set('_items', uniqueData.length ? uniqueData : []);
    }
  }

  _filterItems(items, searchText) {
    var search = searchText.toLowerCase();
    return search.length ? items.filter(function (item) {
      return item.toString().toLowerCase().indexOf(search) > -1;
    }) : items;
  }
  showColumnSearch(column) {
    if (column && !column.clearSearch && !column.hideSearch)
      return true;
    return false;
  }


  /**
   * Computes label based on 'label' or 'key' property of column
   * @param {Object} column column configuration
   * @return {string} column label 
   */
  _computeColumnLabel(column) {
    return column.label || column.key;
  }

  /**
   * Handles updating the sort
   * @param {Event} event tap event
   */
  _updateSortOrder(event) { // eslint-disable-line no-unused-vars

    if (this.column.disableSort) return;

    var sortOrders = ['asc', 'desc', null];
    var firstToSortIdx = sortOrders.indexOf(this.column.firstToSort);
    if (firstToSortIdx != 0) {
      sortOrders.splice(firstToSortIdx, 1);
      sortOrders.unshift(this.column.firstToSort);
    }
    var sort = (sortOrders.indexOf(this.column.sort) + 1) % 3;
    this.set('column.sort', sortOrders[sort]);

    this.__setSortDetails();
    var sortBy = {};
    sortBy[this.column.key] = sortOrders[sort];
    this.fire('apply-criteria', { sortColumn: sortBy });
  }

  /**
   * Updates _sortIcon , _sortClass and _hasSort based on column.sort value.
   */
  __setSortDetails(){
    switch (this.column.sort) {
      case "asc":
        this.set('_sortIcon', "arrow-downward");
        this.set('_hasSort', true);
        this.set('_sortClass', "sorted");
        break;
      case "desc":
        this.set('_sortIcon', "arrow-upward");
        this.set('_hasSort', true);
        this.set('_sortClass', "sorted");
        break;
      default:
        this.set('_sortIcon', "");
        this.set('_hasSort', false);
        this.set('_sortClass', "");
    }
  }

  /**
   * Handles resizing the column width
   * @param {Event} event Mousedown event
   */
  _handleResize(event) {
    var pressed = true;
    var startX = event.pageX;
    var startWidth = this.offsetWidth;
    var threshHold = 0,
      THRESH_HOLD = 5;

    var mouseMove = function (ev1) {
      if (pressed && threshHold == THRESH_HOLD) {
        this.fire('change-column-width', {
          column: this.column,
          width: startWidth + (ev1.pageX - startX)
        });
        threshHold = 0;
      }
      threshHold++;
    };

    var mouseUp = function (ev2) { // eslint-disable-line no-unused-vars
      pressed = false;
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };

    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('mousemove', mouseMove.bind(this));

  }

  /**
   * Opens the filter dialog
   * @param {Event} evt tap event
   */
  openFilter(evt) { // eslint-disable-line no-unused-vars
    this.root.querySelector('#dialog').open();
    //this.root.querySelector('#filterEl')._updateListSize();
    //this.root.querySelector('#dialog')._renderOpened();
  }

  /**
   * Closes the filter dialog
   * @param {Event} evt tap event
   */
  closeFilter(evt) { // eslint-disable-line no-unused-vars
    this.root.querySelector('#dialog').close();
  }
  /**
   * Positions the filter to appear below the header cell
   * @param {Event} event overlay-opened event
   */
  _positionFilterDialog(event) { // eslint-disable-line no-unused-vars
    this.async(function () {
      var filterDialog = this.root.querySelector('#dialog');
      var offset = this.getBoundingClientRect();
      filterDialog.set('horizontalAlign', ((offset.left + filterDialog.offsetWidth) < window.innerWidth) ?
        'left' : 'right');
      filterDialog.set('verticalAlign','top');
      if(this.tableHeight !== "0px"){
        filterDialog.style['max-height'] = (parseInt(this.tableHeight.match(/\d+/)[0]) + this.getBoundingClientRect().height) + 'px';
      }
      this.set('dialogHeight',filterDialog.style['max-height']);
      filterDialog.position();
    });
  }

  /**
   * Checks to diabled filter on column
   * @param {Object} column column configuration
   * @return {boolean} flag denoting to disable filter
   */
  _disableFilter(column) {
    if(column.type === 'object'){
      return true;
    }
    else{
      return column.disableFilter;
     }
  }

  /**
   * Computes the cell class based on type.
   * @param {Object} column column configuration
   * @return {string} class name based on column type
   */
  _computeCellAlignment(column) {
    var cssClass = 'cell-align-left';
    if (column.alignment) {
      cssClass = 'cell-align-' + column.alignment;
    } else {
      cssClass = ['number', 'decimal'].indexOf(column.type || column.uitype) > -1 ? 'cell-align-right' : 'cell-align-left';
    }
    return cssClass;
  }
  _computeCellStyle(column){
    if(column.hideSearch){
      return "position: relative; top: -10px;";
    }
  }

}

window.customElements.define(OeDataTableHeaderCell.is, OeDataTableHeaderCell);