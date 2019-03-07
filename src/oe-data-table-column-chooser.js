/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-icon/iron-icon.js";

/**
 * `oe-data-table-column-chooser`
 *  is used in `oe-data-table` component for displayig a column data.
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTableColumnChooser extends OECommonMixin(PolymerElement) {

  static get is() { return 'oe-data-table-column-chooser'; }

  static get template() {
    return html`
        <style include="iron-flex iron-flex-alignment">
          .column-list {
            @apply --layout;
            @apply --layout-horizontal;
          }
    
          paper-menu {
            min-width: 150px;
            height: calc(100% - 64px);
          }
    
          .swap-icon {
            @apply --layout;
            @apply --layout-self-center;
          }
    
        </style>
  
        <paper-dialog id="dialog">
          <h2>Select Columns</h2>
          <paper-dialog-scrollable>
            <div class="column-list">
              <div>
                <h4> Visible Columns </h4>
                <paper-listbox on-dragover="__handleDragOver" on-drop="__handleDrop">
                  <template is="dom-repeat" items="[[columns]]" as="column" filter="_getVisibleColumns" observe="hidden">
                    <paper-item draggable=true on-dragstart="__handleDragStart"> [[column.label]] </paper-item>
                  </template>
                </paper-listbox>
              </div>
              <iron-icon class="swap-icon" icon="icons:swap-horiz"> </iron-icon>
              <div>
                <h4> Hidden Columns </h4>
                <paper-listbox on-dragover="__handleDragOver" on-drop="__handleDrop" hidden-columns>
                  <template is="dom-repeat" items="[[columns]]" as="column" filter="_getHiddenColumns" observe="hidden">
                    <paper-item draggable=true on-dragstart="__handleDragStart"> [[column.label]] </paper-item>
                  </template>
                </paper-listbox>
              </div>
            </div>
          </paper-dialog-scrollable>
          <div class="buttons">
            <paper-button raised dialog-dismiss>Close</paper-button>
          </div>
        </paper-dialog>
    `;
  }

  static get properties() {
    return {
      /**
       * Array of column configurations
       */
      columns: {
        type: Array,
        notify: true
      }
    };
  }

  /**
   * Opens the dialog
   */
  open() {
    this.$.dialog.open();
  }

  /**
   * Closes the dialog
   */
  close() {
    this.$.dialog.close();
  }

  /**
   * Checks if a column is hidden
   * @param {Object} column column configuration
   * @return {boolean} flag denoting the column is hidden
   */
  _getHiddenColumns(column) {
    return column.hidden;
  }
  /**
   * Checks if a column is visible
   * @param {Object} column column configuration
   * @return {boolean} flag denoting the column is not hidden
   */
  _getVisibleColumns(column) {
    return !column.hidden;
  }


  __handleDragStart(event) {
    this.set('_itemBeingDragged', event.model.column);
  }

  __handleDragOver(event) {
    event.preventDefault();
  }

  __handleDrop(event) {
    var index = this.columns.indexOf(this._itemBeingDragged);
    this.set('columns.' + index + '.hidden', event.currentTarget.hasAttribute('hidden-columns'));
  }

}

window.customElements.define(OeDataTableColumnChooser.is, OeDataTableColumnChooser);