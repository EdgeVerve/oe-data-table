import '@polymer/iron-demo-helpers/demo-snippet';
import { dom } from "@polymer/polymer/lib/legacy/polymer.dom.js";


var demoSnippetClass = window.customElements.get('demo-snippet');
customElements.define('custom-demo-snippet', class extends demoSnippetClass{
    _updateMarkdown(){
      var template = this.getEffectiveChildren()[0]; // gets the first element
      
        if (!template) {
          this._markdown = '';
          return;
        }
    
        var snippet = this.$.marked.unindent(template.innerHTML); // Hack: In safari + shady dom, sometime we get an empty 'class' attribute.
        // if we do, delete it.
        snippet = snippet.replace(/ class=""/g, ''); // Boolean properties are displayed as checked="", so remove the ="" bit.
    
        snippet = snippet.replace(/=""/g, '');
        this._markdown = '```\n' + snippet + '\n' + '```'; // Stamp the template.
      
        if (!template.hasAttribute('is')) {
          // Don't need to listen for more changes (since stamping the template
          // will trigger an observeNodes)
          dom(this.$.content).unobserveNodes(this._observer);
          this._observer = null;
          //dom(this).appendChild(document.importNode(template.content, true));
        }
    }
  });  