import React, {Component} from 'react';

function IsRectEqual(r1, r2) {
  return r1.left === r2.left
    && r1.top === r2.top
    && r1.right === r2.right
    && r1.bottom === r2.bottom;
}

// used in the DragDropSupport below
function start(drag) {
  // drag.info.type: "libraryitem", "gridcell",...?
  let type = drag.info.type;
  //console.log('dnd start', this.accept[type]);
  let shouldAccept = this.accept[type] &&
   'function' == typeof this.accept[type] ? this.accept[type].call(this, drag) : this.accept[type];

  //console.log('dnd should accept', shouldAccept);
  if(shouldAccept) {
    // Accept object with the following spec:
    // prio : 1,
    // targetRect : rect,
    // drawRect : rect,
    // cellRect : rect,
    // drop : dropFn(splitCell, sheet)
    drag.registerDropRect(this);
    this.setupDragDropRect && this.setupDragDropRect();
  }
}

function end() {
  //console.log('end drag drop');
}

/**
* @params spec - sense drag and drop specification object:
* accept: {} - accept object. see DEFAULT_SPEC below
* placeClassName - the element class name where sense object should be injected
* onInitStateHandler() - init state handler
* onDropGridCellHandler(item) - grid cell drop handler
* onDropLibraryItemHandler(item) - libraryitem drop handler
* onInjectObjectHandler(placeElement, itemid) - inject visual object here
* onRemoveObjectHandler() - remove object here
* onRepaintObject() - repaint object handler
*/
const DEFAULT_SPEC = {
  accept: {
    libraryitem: () => { return true; },
    gridcell: () => { return true; }
  }
};

export default function DragDropSupport(spec = DEFAULT_SPEC) {
  return function AddDragDropSupport(DecorateComponent) {
    const displayName =
     DecorateComponent.displayName ||
     DecorateComponent.name ||
     'Component';

    class DragDropContainer extends Component {
      constructor(props) {
        super(props);
        // qlik services: DragDropService?
        this.qlikDragDropService = props.services.DragDropService;
        this.DecoratedComponent = DecorateComponent;
        this.displayName = `DragDropContainer > ${displayName}`;

        // accept only objects of specified type
        this.accept = spec.accept;

        // drop handlers
        let dropGridCellHandler = spec.onDropGridCellHandler
          || function (item) {
            console.log(item);
          };

        let dropLibraryItemHandler = spec.onDropLibraryItemHandler
          || function (item) {
            console.log(item);
          };

        this.drop = {
          gridcell: dropGridCellHandler.bind(this), // DecorateComponent
          libraryitem: dropLibraryItemHandler.bind(this) // DecorateComponent
        };

        // priority
        this.prio = 1;
        // start, end ... methods for DnD support
        this.start = start.bind(this);
        this.end = end.bind(this);

        spec.onInitStateHandler && spec.onInitStateHandler.call(this);
      }

      componentDidMount() {
        if(this.qlikDragDropService) {
          this.setupDragDropRect();
          this.qlikDragDropService.registerDropTarget(this);
        }
        if(this.props.isShow) // if already resized ...
          this.injectObject();
      }

      componentWillUnmount() {
        this.removeObject();
        if(this.qlikDragDropService) {
          this.qlikDragDropService.unregisterDropTarget(this);
        }

        this.targetRect = null;
        this.drawRect = null;
        this.cellRect = null;
      }

      componentDidUpdate() {
        if(this.props.isShow) {
          // if already resized ...
          this.injectObject();
          this.repaintObject();
        }
      }

      render() {
        const DecoratedComponent = this.DecoratedComponent;
        return <DecoratedComponent {...this.props} />;
      }

      // Drag and drop support methods and props
      // "libraryitem", "gridcell",...?
      getRect(){
        //console.log(this.child);
        let element = React.findDOMNode(this); //ReactDOM.findDOMNode(this);
        let br = element.getBoundingClientRect();
        //console.warn('можно передавать параметр в spec, ссылку на контейнер');
        let $parent = $(element).parent();
        //console.log('parent', $parent);
        //React.findDOMNode(this.refs.child).getBoundingClientRect();
        return {
          left: br.left - $parent.scrollLeft(),
          top: br.top - $parent.scrollTop(),
          right: (br.right - $parent.scrollLeft()) || (br.left - $parent.scrollLeft() + br.width),
          bottom: (br.bottom - $parent.scrollTop()) || (br.top - $parent.scrollTop() + br.height)
        }
      }

      setupDragDropRect() {
        // see render
        let r = this.getRect();

        this.targetRect = r;
        this.drawRect = r;
        this.cellRect = r;
      }

      getPlaceholderElement() {
        let element = React.findDOMNode(this);
        let placeholder = element.getElementsByClassName(this.placeClassName || "placeholder")[0];
        if(!placeholder) placeholder = element;
        return element;
      }

      injectObject(){
        let placeElement = this.getPlaceholderElement();
        spec.onInjectObjectHandler
          && spec.onInjectObjectHandler.call(this, placeElement);
      }

      repaintObject(){
        let r = this.getRect();
        if(this.cellRect && !IsRectEqual(this.cellRect, r)) {
          this.setupDragDropRect();
        }
        let placeElement = this.getPlaceholderElement();
        spec.onRepaintObjectHandler && spec.onRepaintObjectHandler.call(this, placeElement);
      }

      removeObject(){
        let placeElement = this.getPlaceholderElement();
        spec.onRemoveObjectHandler && spec.onRemoveObjectHandler.call(this, placeElement);
      }
    }

    // assign sense dnd support method
    //assign(DragDropContainer.prototype, spec);

    return DragDropContainer;
  }
}
