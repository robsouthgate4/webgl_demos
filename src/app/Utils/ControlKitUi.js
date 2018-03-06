import ControlKit from "controlkit"
import EventEmitter from "eventemitter3"

export default class ControlKitUi extends EventEmitter{

    constructor(props) {
        super()
        this.props = props

        this.controlKit = new ControlKit();

        this.controlKit
            .addPanel({label: 'Settings', align: 'right'})
                .addGroup()
                    .addSubGroup()
                    .addSlider(this.props,'wind','windRange')
                    .addSlider(this.props,'speed','speedRange')
                    .addColor(this.props,'color',{colorMode:'rgb'})
                        .addFunctionPlotter(this.props,'func');

    }

    onChange() {
        this.emit("change")
    }

}