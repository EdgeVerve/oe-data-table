import { PolymerElement,html } from "@polymer/polymer/polymer-element";
import "@polymer/iron-flex-layout/iron-flex-layout-classes";
import { OECommonMixin } from 'oe-mixins/oe-common-mixin';
import "@polymer/iron-flex-layout/iron-flex-layout";
import "oe-info/oe-info";

class LiteralView extends OECommonMixin(PolymerElement){
    static get template(){
        return html`
        <style include="iron-flex iron-flex-alignment">
            :host {
                margin: 10px;
            }
    
            .form-header {
                padding: 16px;
            }
    
            #fields {
                padding: 16px;
                width:50%;
            }
    
        </style>
        <div class="content layout vertical">
            <div class="evform layout vertical">
            <div class="form-header layout horizontal center">
                <h2 class="flex">Literal</h2>
            </div>
    
            <div id="fields" class="layout horizontal wrap justified">
                <oe-info value="[[literal.key]]" label="Key"></oe-info>
                <oe-info value="[[literal.value]]" label="Value"></oe-info>
            </div>
            </div>
        </div>
        `;
    }

    static get properties(){
        return {
            literal: {
                type: 'object',
                notify: true,
                value: function () {
                  return {}
                }
              }
        }
    }

    static get is(){
        return "literal-view";
    }

    constructor(){
        super();
        this.modelAlias = "literal";
    }

}

window.customElements.define("literal-view",LiteralView);

export default LiteralView;