import ControlKit from "controlkit"
import EventEmitter from "eventemitter3"

export default class ControlKitUi extends EventEmitter{

    constructor(props) {
        super()
        this.props = props

        this.controlKit = new ControlKit();

        this.controlKit
            .addPanel()
            .addGroup()
            .addSubGroup()
            .addColor(this.props,'color',{colorMode:'rgb', onChange: this.onChange.bind(this)})

    }

    onChange() {
        this.emit("change")
    }

}