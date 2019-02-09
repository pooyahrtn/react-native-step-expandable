# REACT-NATIVE-STEP-EXPANDABLE
![](appVideo.gif)

# Installation

`npm i react-native-step-expandable`

# Example

```javascript
import Expandable from 'react-native-step-expandable';
const HourPickerHeight = 260;
const ConfirmButtonHeight = 70;


onHourSelect = (value) => {
    // this will expand second element in <Expandable /> items
    this.expandNext(1)
}

render(){
    return(
        <Expandable
            HeaderView={
                <View>
                    ...
                </View>
            }
            expandNext={(ref) => this.expandNext = ref}
            containerStyle={styles.container}
            items={[
                {
                    height: HourPickerHeight,
                    view: (
                        <View>
                            <View style={styles.seperator} />
                            <HourPicker
                                selectedAMorPM={this.state.selectedAmPm}
                                selectedHour={this.state.selectedHour}
                                onHourSelect={this.onHourSelect}
                                onAmPmSelect={this.onAmPmSelect}
                            />
                        </View>
                    )
                },
                {
                    height: ConfirmButtonHeight,
                    view: (
                        <TouchableOpacity style={styles.confirmButton}>
                            <Text style={{ color: BACKGROUND_COLOR, fontWeight: 'bold' }}>Confirm</Text>
                        </TouchableOpacity>
                    )
                }
            ]}
        />
    );
}
```


# Props 

|       Name        |       Input       |       Required        |       description     |
| ----------------- |:-----------------:|:---------------------:| ---------------------:|
|HeaderView         |View               |Optional               |Renders on top of the container|
|containerStyle     |StyleSheet         |Optional               |Style of the container|
|expandNext         |(ref: (index) => void) => void|Required         |Used to capture View's expand method|
|items              |[{view: View, height: number}]|Required         |Items to expand   |

# How to?
* First put items in <Expandable/> items property.<br>
You should pass view and it's height. (if you are not sure about the size, under estimate the height).
* Save <Expandable/> expand method as shown.
* To expand next step, call saved <Expandable/> expand method's ref, with index of the step.<br>
For example to expand first step, you should call this.expandNext(0)