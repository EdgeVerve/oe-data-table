/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-bind';
import '@polymer/iron-demo-helpers/demo-pages-shared-styles';
import { OECommonMixin } from "oe-mixins/oe-common-mixin.js";
import '../../oe-data-table.js';

class DemoAccordian extends OECommonMixin(PolymerElement){
    static get template() {
        return html`
        <style is="custom-style">
            .background-color {
                background-color: #dadada;
            }

            .magnified {
                position: relative;
                height: 1000px;
            }

        </style>
        <div id="demo-accordian" class=" background-color" style="height: 100%;">
            <div>
                <img id="cheque_image" on-load="imgFun" src="https://www.oecloud.io/images/logo.png" style="display: inline-block; width: 30%; margin: 20px;"
                />
            </div>
            <div>Account : {{data.account}}</div>

        </div>
        `;
    }

    static get properties() {
        return {
            data: {
                type: Object,
                notify: true,
                observer: 'dataChanged'

            },
            degrees: {
                type: Number,
                value: 0,
                notify: true
            }
        }
    }

    static get is() {
        return "demo-accordian";
    }
    dataChanged(e) {
        console.log(this.data);
    }
    imgFun(){
        this.fire('expanded-view');
    }
   
}

window.customElements.define(DemoAccordian.is, DemoAccordian);

export default DemoAccordian;