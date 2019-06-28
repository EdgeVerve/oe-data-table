/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "@polymer/paper-tooltip/paper-tooltip.js";
var OEUtils = window.OEUtils || {};

/**
 * # oe-data-table-cell
 *  `<oe-data-table-cell>` is used in `oe-data-table` component for displayig a cell data. A cell content can be edited if enabled.
 *  Custom rendering of cell content is also taken care by this component.
 *  
 * 
 * @customElement
 * @polymer
 * @appliesMixin OECommonMixin
 */
class OeDataTableCell extends OECommonMixin(PolymerElement) {

  static get is() { return 'oe-data-table-cell'; }

  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment">
      a,
      .cell-content {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
      }
      .edit-ctrl {
        @apply --edit-control;
      }

    </style>
    <template is="dom-if" if="[[_hideDefaultValue(_inEdit,_hasCustomRenderer)]]">
      <template is="dom-if" if="[[column.href]]" restamp="true">
        <a href="[[_buildHref(column.href, row.*)]]" style$="[[_computeCellAlignment(column)]]"> [[_displayValue]] </a>
      </template>
      <template is="dom-if" if="[[!column.href]]" restamp="true">
        <span class="cell-content" hidden$="[[column.externalEl]]" style$="[[_computeCellAlignment(column)]]">  [[_displayValue]] </span>
      </template>
    </template>
    <template is="dom-if" if="[[_hasCustomRenderer]]" restamp="true">
      <span class="cell-content" id="custom-container">  </span>
    </template>
    <div hidden$="{{!column.externalEl}}" id="createNewEl"></div>
    <div hidden$="{{!_inEdit}}" id="injectionPoint" class="edit-ctrl"></div>
    <template is="dom-if" if="[[column.valueAsTooltip]]" restamp="true">
      <paper-tooltip  offset$="[[_getOffset(isFirstRow)]]" position="top" id="[[column.label]]">  [[_displayValue]]  </paper-tooltip>  
    </template>
    `;
  }

  static get properties() {
    return {
      /**
       * The definition of the column of the current cell.
       *
       * @type {{key: string, label: string, type : string, uiType: string, sort: string, readOnly: boolean}}
       */
      column: {
        type: Object
      },
      /**
       * Disable editing field (equivalent to column.readOnly)
       */
      readOnly: {
        type: Boolean,
        value: false
      },
      /**
       * row object.
       */
      row: {
        type: Object,
        notify: true
      },

      /**
       * Index of the current `row` in the `_items` array
       */
      key: {
        type: Number
      },

      _inEdit: {
        type: Boolean,
        value: false
      },

      _element: {
        type: Object
      },

      _hasCustomRenderer: {
        type: Boolean,
        value: false
      },

      /**
       * task number indicating an Async task that notify `iron-list` to update its content
       */
      _notifyResizeAsyncTask: {
        type: Number
      },

      /**
       * task number indicating an Async task that builds and renders the custom renderer element
       */
      _customRenderAsyncTask: {
        type: Number
      },

      /**
       *  value to be shown in the cell
       */
      _displayValue: {
        type: Object
      },

      columnTemplate: {
        type: Object
      },

      /**
       * Flag denoting cell to be present in first row of the data-table
       */
      isFirstRow: {
        type: Boolean,
        value: false
      }
    };

    /**
     * Fired when the custom renderer is used to render the cell.
     * 
     * @event oe-cell-rendered
     */
    /**
     * Fired when the cell is tapped to make it editable.
     * 
     * @event set-active-cell
     */
    /**
     * Fired when the cell is value is changed.
     * 
     * @event oe-data-table-cell-value-changed
     */

  }

  static get observers() {
    return ['_buildCustomRenderer(row.*, column)',
      '_buildCustomRenderer(columnTemplate)',
      '_computeCellData(row.*, column)',
      '_buildNewElement(row, column)',
    ];
  }

  constructor() {
    super();
    this.addEventListener('tap', this._handleCellTap.bind(this));
  }

  /**
   * On row data change re-renders or updates the binding of the rendered content.
   * @param {Object} rowChange change data on row
   */
  _buildCustomRenderer(rowChange) {
    this.set('_hasCustomRenderer', Boolean(this.row && this.column && (this.column.renderer || this.columnTemplate)));


    if (this._hasCustomRenderer) {
        var container;
        if (this.column.renderer) {
          if (this.column.renderer == this._lastRenderedRenderer) {
            this._customElement.notifyPath(rowChange.path, rowChange.value);

            // notify the iron-list to update its content
            this.cancelAsync(this._notifyResizeAsyncTask);
            this._notifyResizeAsyncTask = this.async(function () {
              this.fire('iron-resize');
            });

          } else {
            this.cancelAsync(this._customRenderAsyncTask);
            this._customRenderAsyncTask = this.async(function () {
              var domBind = document.createElement('dom-bind'),
                renderer = this.column.renderer;
              var doc = this.ownerDocument,
                ele = doc.createElement('div'),
                container = this.shadowRoot.querySelector('#custom-container');
              domBind.set('row', this.row);
              domBind.set('column', this.column);
              domBind.addEventListener('row-changed', function (event) {
                this.async(function () {
                  var change = event.detail;
                  //change.path && this.notifyPath('items.' + this.key + '.' + change.path.substr(change.path.lastIndexOf('.')), change.value);
                  if (change.path && this._customElement == event.target) this.notifyPath(change.path,
                    change.value);
                });
              }.bind(this));

              this.set('_customElement', domBind);

              if (typeof renderer === 'string') {
                if (renderer.trim().indexOf('function') === 0) {
                  var renderFunction = new Function('return ' + renderer)();
                  ele.innerHTML = renderFunction.call(this, this.column, this.row);
                } else {
                  var customFn;
                  if (window.OEUtils && window.OEUtils.renderFunctions) {
                    customFn = window.OEUtils.renderFunctions[renderer];
                  }
                  if (customFn && (typeof customFn === 'function')) {
                    ele.innerHTML = customFn.call(this, this.column, this.row);
                  } else {
                    ele.innerHTML = renderer;
                  }
                }
              } else if (typeof renderer === 'function') {
                ele.innerHTML = renderer.call(this, this.column, this.row);
              } else {
                console.warn('The column renderer should be a string or a function');
              }

              var temp = document.createElement('template');
              temp.content.appendChild(ele);
              domBind.appendChild(temp);
              container.innerHTML = '';
              container.appendChild(domBind);

              this.set('_lastRenderedRenderer', renderer);
              this.fire('oe-cell-rendered', this.clientHeight);
            }, 300);
          }
        } else {
          this.cancelAsync(this._customRenderAsyncTask);
          this._customRenderAsyncTask = this.async(function () {
            container = this.shadowRoot.querySelector('#custom-container');
            if(!container){
              return;
            }
            container.innerHTML = '';
            container.appendChild(this.columnTemplate.root);
            this.fire('oe-cell-rendered', this.clientHeight);
          }, 300);
        }
    }
  }

  /**
   * Computes the display content for cell.
   * @param {Object} rowPath change data on row
   * @param {Object} column column configuration
   * @return {null} if column doesn't have a 'key' or 'field' display value is not computed.
   */
  _computeCellData(rowPath, column) {
    var key = column.key || column.field;
    if (!key) {
      return null;
    }
    var cellValue = this._deepValue(this.row, key);
    var options = column.editorAttributes;
   
    var formatterFn;
    if (column.formatter) {
      formatterFn = column.formatter;
    } else if (column.type && OEUtils.TypeMappings[column.type] && OEUtils.TypeMappings[column.type].formatter) {
      formatterFn = OEUtils.TypeMappings[column.type].formatter;
    }
    if (formatterFn) {
      if (typeof formatterFn === 'string') {
        formatterFn = new Function('return ' + formatterFn)();
      }
      cellValue = formatterFn.call(this, cellValue, options);
    }
    if (cellValue instanceof Promise) {
      cellValue.then(function (data) {
        var valueToDisplay = data[options.displayproperty];
        this.set('_displayValue', valueToDisplay);
      }.bind(this)).catch(function (error) {
        this.set('_displayValue', null);
        this.fire('oe-show-error', error);
      }.bind(this));
    } else {
      this.set('_displayValue', cellValue);
    }
  }

  /**
   * On tap sets the cell as active cell
   * @param {Event} event tap event
   */
  _handleCellTap(event) {
    if (!this.column.readOnly && !this.readOnly) {
      event.stopPropagation();
      this.fire('set-active-cell', {
        element: this
      });
    }
  }

  /**
   * Creates a new element and focuses it to edit the value.
   */
  enterEditMode() {

    if (this._inEdit ||
      this._hasCustomRenderer ||
      this.column.readOnly ||
      this.readOnly ||
      this.column.href ||
      this.column.readOnly || this.column.valueGetter) {
      return;
    }

    if (!this._element) {
      this._createElement(true);
    }
    if (this._element && this._element.set) {
      this.set('_inEdit', true);
      var path = this.column.key || this.column.field;
      var cellValue = this._deepValue(this.row, path);
      this._element.set('invalid', false);
      this._element.set('value', cellValue);
      this.async(function () {
        this._element.focus();
      });
    }
  }

  /**
   * Exits edit mode by resetting to display value.
   * If the inline element had content it is set on row.
   */
  exitEditMode() {
    if (this._element) {
      var key = this.column.key || this.column.field;
      var rowPath = 'row.' + key;
      if (this._element.invalid) {
        this.fire('oe-show-error', this._element.error);
        this.set('_inEdit', false);
        return;
      }
      this.set(rowPath, this._element.value);
      this.fire('oe-data-table-cell-value-changed', {
        row: this.row,
        column: this.column
      });
      this._computeCellData(rowPath, this.column);
    }
    this.set('_inEdit', false);
  }
  _buildNewElement() {
    if (this.column.externalEl) {
      this._createElement(false);
    }
  }

  _extractDropdownAndAddToBody(elem) {
    // Due to stacking context, the iron-list content always keeps its position at top, results in incorrect positioning of iron-dropdown content
    // [https://github.com/PolymerElements/iron-list/issues/158]
    // Hence taking out the iron-dropdown, if available and append it to body for positioning its content properly.
    // For making oe-combo and oe-typeahead to work.
    var dropdown = elem.shadowRoot && elem.shadowRoot.querySelector('iron-dropdown');
    if (dropdown) { 
      this._dropDown = dropdown;
      document.body.appendChild(dropdown);
      } 
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('combo-dropdown-attached', function (event) {
    var  dropdown  =  event.detail;
    if  (dropdown) {
      this._dropDown  =  dropdown;
      document.body.appendChild(dropdown);
    }
    });
  }

  disconnectedCallback(){
    super.disconnectedCallback();
    if(this._dropDown){
    document.body.removeChild(this._dropDown);
  }
}

  /**
   * Dynamically creates a element based on column.uitype.
   * Sets the editorAttributes on the element and appends it inside the cell.
   * Attaches event listener for change and keydown
   */
  _createElement(isInEditMode) {
    var column = this.column;
    var typeMapping = OEUtils.TypeMappings[column.type || column.uitype];
    var uitype = column.uiType || (typeMapping && typeMapping.uiType);
    var editorAttributes = column.editorAttributes;
    if (!uitype) {
      return;
    }
    var elem = document.createElement(uitype);
    if (elem.set) {
      if (typeMapping.attributes) {
        typeMapping.attributes.forEach(function (attr) {
          elem.set(attr.name, attr.value);
        });
      }
      if (editorAttributes) {
        Object.keys(editorAttributes).forEach(function (prop) {
          elem.set(prop, editorAttributes[prop]);
        });
      }
      elem.set('noLabelFloat', true);
      // Prevent the opening of dialog or dropdown for oe-date/oe-datetime component as focus change resets the cell back to read state.
      if (uitype === 'oe-date' || uitype === 'oe-datetime') {
        elem.set('hideIcon', true);
      }
    }
    this.set('_element', elem);
    if(isInEditMode)
    this.$.injectionPoint.appendChild(this._element);
    else {
      var show = true;
      if (this.column.showCell != undefined) {

        if (typeof this.column.showCell === 'function') {
          show = this.column.showCell.call(this, this.column, this.row);
        }

        if (typeof this.column.showCell === 'boolean') {
          show = this.column.showCell;
        }
      }

      if (show && this.$['createNewEl'].childElementCount === 0) {
        this.$['createNewEl'].appendChild(this._element);
      }
      else if (show === false && this.$['createNewEl'].childElementCount === 1) {
        this.$['createNewEl'].removeChild(this.$['createNewEl'].childNodes[0]);
      }
    }
    //this._element.addEventListener('change', this._handleValueChange.bind(this));

    this._element.addEventListener('keydown', this._handleActionKeyPress.bind(this));
    this.async(function () {
      this._extractDropdownAndAddToBody(elem);
    });
  }

  /**
   * On change event update row value
   * @param {Event} e change event
   */
  _handleValueChange(e) {
    if (this._element === e.currentTarget) {
      var key = this.column.key || this.column.field;
      this.set('row.' + key, e.currentTarget.value);
      this.set('_inEdit', false);
      this.fire('oe-data-table-cell-value-changed', {
        row: this.row,
        column: this.column
      });
    }
  }

  /**
   * Checks if the default value needs to be hidden.
   * @param {boolean} _inEdit Flag for edit mode.
   * @param {boolean} _hasCustomRenderer Flag for custom renderer.
   * @return {boolean} Flag to hide the default value.
   */
  _hideDefaultValue(_inEdit, _hasCustomRenderer) {
    return !_inEdit && !_hasCustomRenderer;
  }

  /**
   * Builds href by replacing `:prop` with row data 'prop' value
   * @param {string} href href parameter for cell
   * @return {string} modified href value
   */
  _buildHref(href) {
    if (href) {
      return href.split('/').map(function (path) {
        return path.charAt(0) == ':' ? this.row[path.substr(1)] : path;
      }.bind(this)).join('/');
    }
    return null;
  }

  /**
   * Handles keypress to set the editted value on row or tab to next cell.
   * @param {Event} event keypress event
   */
  _handleActionKeyPress(event) {
    if (event.keyCode == 13) {
      this.exitEditMode();
    } else if (event.keyCode == 9) {
      this.exitEditMode();
      // if tab is pressed move to the next element
      this.async(function () {
        var elementToNavigate = event.shiftKey ? this.previousElementSibling : this.nextElementSibling;
        if (elementToNavigate && elementToNavigate.tagName === 'OE-DATA-TABLE-CELL') {
          event.preventDefault();
          this.fire('set-active-cell', {
            element: elementToNavigate
          });
        }
      });
    }
  }

  /**
   * Computes cell style to habe right align for numbers and left align by default.
   * The alignment can be fixed from column.alignment configuration.
   * @param {Object} column column config.
   * @return {string} style string for text-align
   */
  _computeCellAlignment(column) {
    var style = null;
    var rowHeight = this.computedStyleMap().get('min-height').value;
    if(rowHeight != 48){
      this.fire('row-height-changed',rowHeight+1);
    }
    if (column.alignment) {
      style = 'text-align:' + column.alignment;
    } else {
      style = ['number', 'decimal'].indexOf(column.type || column.uitype) > -1 ? 'text-align: right' : null;
    }
    return style;
  }

  /**
   * Computes the padding for tooltip,so that first row tooltip doesn't overlap the header row.
   * @param {boolean} isFirstRow flag denoting cell is in first row of the data-table
   * @return {number} offset value.
   */
  _getOffset(isFirstRow) {
    return isFirstRow ? -20 : 0;
  }

}

window.customElements.define(OeDataTableCell.is, OeDataTableCell);