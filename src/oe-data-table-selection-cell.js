/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/image-icons.js";

/**
 * `oe-data-table-selection-cell`
 *  Selection cell used in oe-data-table.
 * 
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * CSS Variable | Description | Default
 * ----------------|-------------|----------
 * `--oe-data-table-selection-cell-content` | Mixin applied on the cell content | {}
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTableSelectionCell extends OECommonMixin(PolymerElement) {

    static get is() { return 'oe-data-table-selection-cell'; }

    static get template() {
        return html`
    <style include="iron-flex">
      .selection-checkbox {
        padding: 0 24px;
      }
  
      paper-checkbox.selection-checkbox {
        --paper-checkbox-label-spacing: 0;
        --paper-checkbox-checked-color: var(--secondary-color);
      }
  
      .selection-cell-content {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 32px;
        height: 32px;
        margin: auto;
        color: #fff;
        margin-left: 16px;
        border-radius: 50%;
        position: absolute;
        background-size: cover;
        background-position: center center;
  
        @apply --layout;
        @apply --layout-center;
        @apply --layout-center-justified;
        @apply --oe-data-table-selection-cell-content;
      }
  
      :host:hover .selection-cell-content,
      .selection-cell-content[selected] {
        display: none;
      }
    </style>
    <paper-checkbox class="selection-checkbox" on-change="_toggleSelection" on-keydown="_goToCell" on-tap="_checkboxTapped" checked=[[selected]]></paper-checkbox>
    <template is="dom-if" if="[[selectionCellContent]]">
      <div class="selection-cell-content" selected$=[[selected]] style$="[[_computeSelectionCellContentStyle(row,selectionCellContent)]];">
        <template is="dom-if" if="[[_enableSelectionCellContent(row, selectionCellContent)]]">
          <div> [[_getFirstLetter(row,selectionCellContent.content)]] </div>
        </template>
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
             * Flag denoting if the item is selected
             */
            selected: {
                type: Boolean
            }
        };
        /**
         * Fired when the tab key pressed after selection
         * 
         * @event set-active-cell
         */
        /**
         * Fired when the selection is changed
         * 
         * @event toggle-selection
         */
    }

    /**
     * Gets the uppercase of first letter of property value.
     * @param {Object} row record object
     * @param {string} prop property name to get data
     * @return {string} first character of the data.
     */
    _getFirstLetter(row, prop) {
        var value = row[prop];
        return typeof value == 'string' ? value.charAt(0).toUpperCase() : null;
    }

    /**
     * Checks to use 'content' property instead of 'image' of selectionCellContent.
     * @param {Object} row record object
     * @param {Object} selectionCellContent Selection cell content customization object
     * @return {boolean} flag denoting to use 'content' property instead of 'image' of selectionCellContent
     */
    _enableSelectionCellContent(row, selectionCellContent) {
        var imageExists = selectionCellContent.image && row[selectionCellContent.image];
        return selectionCellContent.content && !imageExists;
    }

    /**
     * Computes style of the selection cell.
     * @param {Object} row record object
     * @param {Object} selectionCellContent Selection cell content customization object
     * @return {string} style value to set background image or color.
     */
    _computeSelectionCellContentStyle(row, selectionCellContent) {
        var colors = ['#f55a6d', '#f5a623', '#009688', '#8b572a'];
        var URL = row[selectionCellContent.image];
        var style = '';
        if (URL) {
            style = 'background-image: url("' + URL + '")';
        } else {
            var firstChar = row[selectionCellContent.content].toUpperCase();
            style = 'background:' + colors[firstChar.charCodeAt(0) % colors.length];
        }
        return style;
    }

    _toggleSelection() {
        this.fire('toggle-row-selection', this.row);
    }

    /**
     * On press of tab key set the next cell as active cell.
     * @param {KeyDownEvent} event key down event
     */
    _goToCell(event) {
        if (event.keyCode == 9) {
            var cellElement = null;
            var currentRow = this.getRootNode().host;
            if (event.shiftKey) {
                //Focus on last cell of previous row
                var previousRow = currentRow.previousElementSibling;
                if (previousRow.tagName.toLowerCase() === "oe-data-table-row") {
                    var cells = previousRow.shadowRoot.querySelectorAll('oe-data-table-cell');
                    cellElement = cells[cells.length - 1];
                }
            } else {
                //Focus on first cell of current row
                cellElement = currentRow.shadowRoot.querySelector('oe-data-table-cell');
            }

            if (cellElement) {
                event.preventDefault();
                this.fire('set-active-cell', {
                    element: cellElement
                });
            }
        }
    }

    _checkboxTapped(event) {
        event.stopPropagation();
    }

}

window.customElements.define(OeDataTableSelectionCell.is, OeDataTableSelectionCell);