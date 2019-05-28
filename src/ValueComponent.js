import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import senseDragDropSupport from './senseDragDropSupport';

class ValueComponent extends Component {
  render(){
    let { valueStyles } = this.props;

    return (
      <div title={this.props.children[1].props.children} className="value" style={valueStyles}>
        {this.props.children}
      </div>
    );
  }
}

let DragDropSpec = {
  placeClassName: 'value',
  accept: {
    libraryitem: (dragInfo) => {
      // accept visualization only
      return (dragInfo.info
        && dragInfo.info.item
        && dragInfo.info.item.visualization)
        || (dragInfo.item && dragInfo.item.visualization);
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
    this.setState({ itemid: item.item.id, isObjectInjected: false });

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
    if (!this.props.embeddedItem) {
      // manual property deletion
      return this.removeObject();
    }

    let isInEditMode = this.props.services.State.isInEditMode();
    if (this.state.itemid
      && this.state.isObjectInjected
      && this.state.isNoInteraction === isInEditMode) {
      return;
    }

    this.removeObject();
    let self = this;
    let itemid = this.state.itemid;
    let qlik = this.props.services.Qlik;
    //let height = $(placeElement).height();
    if(itemid && itemid.trim().length > 0) {
      self.setState({
        isObjectInjected: false,
        isNoInteraction: isInEditMode,
        object: null,
        itemid: ""
      });
      qlik.currApp().getObject(placeElement, itemid, { noInteraction: isInEditMode }).then((object) => {
        let width = $(placeElement).width();
        let height = $(placeElement).height();
        this.setState({ itemid: itemid, object: object, isObjectInjected: true });
        this.width = width;
        this.height = height;
        qlik.resize(itemid);
      });
    }
  },

  onRepaintObjectHandler: function(placeElement){
    if(this.state.object) {
      let kpisRows = this.props.kpisRows;
      let mainContainerElement = this.props.mainContainerElement;
      let mainContainerHeight = Math.floor(
        (mainContainerElement.clientHeight * 0.9
        || $(mainContainerElement).height()) / kpisRows);
      let placeElementHeight = $(placeElement).height();
      let placeElementWidth = $(placeElement).width();
      if(mainContainerHeight > 0
      && (mainContainerHeight !== Math.round(placeElementHeight))) {
        $(placeElement).height(mainContainerHeight);
        this.height = mainContainerHeight;
        this.props.services.Qlik.resize(this.state.itemid);
      } else
      if(Math.round(placeElementWidth) !== this.width) {
        if(Math.abs(placeElementWidth - this.width) > 5)
          this.props.services.Qlik.resize(this.state.itemid);

        this.width = placeElementWidth;
      }
    }
  },

  onRemoveObjectHandler: function(placeElement) {
    if(this.state.object) {
      this.state.object.close();
      this.state.object = null;
      $(placeElement).empty();
      $(placeElement).height('auto');
      ReactDOM.render(<span>{this.props.children}</span>, placeElement);
      this.setState({ itemid: null, object: null, isObjectInjected: false });
    }
  }
};

export default senseDragDropSupport(DragDropSpec)(ValueComponent);
