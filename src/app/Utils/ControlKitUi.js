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
                    .addCheckbox(this.props, 'brickTile')
                    .addCheckbox(this.props, 'wave')
                    .addCheckbox(this.props, 'splitEgg')
                    .addCheckbox(this.props, 'transparency')
                    .addColor(this.props,'color',{colorMode:'rgb'})
                    .addColor(this.props, 'color2', {colorMode: 'rgb'})

    }

    onChange() {
        this.emit("change")
    }

}