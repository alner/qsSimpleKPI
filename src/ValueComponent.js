import React, {Component} from 'react';
import senseDragDropSupport from './senseDragDropSupport';

const QLIK_COMP_TOOLBAR_HEIGHT = 44; // additional selections panel height

class ValueComponent extends Component {
  render(){
    let { valueStyles } = this.props;
    return (
        <div className="value" style={valueStyles}>
        {this.props.children}
        </div>
      );
  }
};

let DragDropSpec = {
  placeClassName: 'value',
  accept: {
    libraryitem: (dragInfo) => {
      // accept visualization only
      return (dragInfo.info
        && dragInfo.info.item
        && dragInfo.info.item.visualization)
        || (dragInfo.item && dragInfo.item.visualization); //dragInfo.info && dragInfo.info.item && dragInfo.info.item.visualization;
    }
  },
  onInitStateHandler: function(){
    // init component state
    this.state = {
      isObjectInjected: false,
      itemid: this.props.embeddedItem, // item id
      object: null // injected sense object
    };
  },

  onDropLibraryItemHandler: function (item) {
    this.removeObject();
    this.setState({itemid: item.item.id, isObjectInjected: false});

    let measureIndex = this.props.measureIndex;
    let backendApi = this.props.services.QlikComponent
      && this.props.services.QlikComponent.backendApi;

    backendApi.getProperties().then((reply) => {
      let qMeasures = reply.qHyperCubeDef.qMeasures;
      if(measureIndex < qMeasures.length) {
        qMeasures[measureIndex].qDef.embeddedItem = item.item.id;
        backendApi.setProperties(reply);
      }
    });
  },

  onInjectObjectHandler: function(placeElement){
    //if(this.props.embeddedItem && this.state.isObjectInjected)
    if(!this.props.embeddedItem) // manual property deletion
      return this.removeObject();

    if(this.state.itemid && this.state.isObjectInjected)
      return;

    this.removeObject();
    let self = this;
    let itemid = this.state.itemid;// || this.props.embeddedItem;
    let qlik = this.props.services.Qlik;
    //let height = $(placeElement).height();
    if(itemid && itemid.trim().length > 0) {
      React.unmountComponentAtNode(placeElement);
      qlik.currApp().getObject(placeElement, itemid).then((object) => {
        //let newHeight = height - QLIK_COMP_TOOLBAR_HEIGHT;
        self.onObjectInvalidated = function(){
          if(object.layout.qSelectionInfo.qInSelections) {
            // add extra space at top for selection toolbar
            $(placeElement).css('margin-top', `${QLIK_COMP_TOOLBAR_HEIGHT}px`);
          } else {
            $(placeElement).css('margin-top', '0px');
            qlik.resize(itemid);
          }
        };
        object.Validated.bind(this.onObjectInvalidated);

        //$(placeElement).height(height);
        let width = $(placeElement).width();
        let height = $(placeElement).height();
        this.setState({itemid: itemid, object: object,  isObjectInjected: true});
        this.width =  width;
        this.height = height;
        qlik.resize(itemid);
      });
    }
  },

  onRepaintObjectHandler: function(placeElement){
    if(this.state.object) {
      let topMargin = 0;
      if(this.state.object.layout 
      && this.state.object.layout.qSelectionInfo.qInSelections) {
        // add extra space at top for selection toolbar
        topMargin = QLIK_COMP_TOOLBAR_HEIGHT;
      }
      let kpisRows = this.props.kpisRows;
      let mainContainerElement = this.props.mainContainerElement;
      let mainContainerHeight =  Math.floor(
        (mainContainerElement.clientHeight * 0.9
        || $(mainContainerElement).height()) / kpisRows);
      let placeElementHeight = $(placeElement).height();
      let placeElementWidth = $(placeElement).width();
      let newHeight = mainContainerHeight - topMargin;
      if(newHeight > 0
      && (newHeight < placeElementHeight || newHeight > placeElementHeight)) {
        $(placeElement).height(newHeight);
        //this.setState({height: newHeight});
        this.height = newHeight;
        this.props.services.Qlik.resize(this.state.itemid);
      } else
      if(placeElementWidth > this.width // this.state.width
      || placeElementWidth < this.width) {
        // this.setState({width: placeElementWidth});
        if(Math.abs(placeElementWidth - this.width) > 5)
          this.props.services.Qlik.resize(this.state.itemid);

        this.width = placeElementWidth;
      }
    }
  },

  onRemoveObjectHandler: function(placeElement) {
    if(this.state.object) {
      if(this.onObjectInvalidated) {
        this.state.object.Validated.unbind(this.onObjectInvalidated);
        this.onObjectInvalidated = null;
      }
      this.state.object.close();
      this.state.object = null;
      $(placeElement).empty();
      $(placeElement).height('auto');
      React.render(<span>{this.props.children}</span>, placeElement);
      this.setState({itemid: null, object: null, isObjectInjected: false});
    }
  }
};

export default senseDragDropSupport(DragDropSpec)(ValueComponent);
