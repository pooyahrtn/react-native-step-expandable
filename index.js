import React from 'react';
import { Animated, View, SafeAreaView } from 'react-native';

type Item = {
    view: any,
    height: number
}
type Props = {
    background: any,
    items: [Item],
    expandNext: (ref: () => void) => void,
    containerStyle: any,
    HeaderView: any
}
export default class Expandable extends React.Component<Props>{

    constructor(props) {
        super(props);
        this.props.expandNext(this.expandNext);
        this.opacityAnimatedValues = this.props.items.map(item => new Animated.Value(0));
    }

    getSumHeight = (from) => {
        return this.props.items.slice(from).map(item => item.height).reduce((acc, cur) => acc + cur, 0);
    }
    animatedTransition = new Animated.Value(this.getSumHeight(0));

    state = {
        expandedItem: 0
    }

    expandNext = (index) => {
        if (index === this.state.expandedItem) {
            this.setState((prevState) => ({
                expandedItem: prevState.expandedItem + 1
            }), () => {
                this._expand();
            });
        }
    }

    _expand = () => {
        Animated.sequence([
            Animated.timing(this.animatedTransition, {
                toValue: this.getSumHeight(this.state.expandedItem),
                useNativeDriver: true
            }),
            Animated.timing(this.opacityAnimatedValues[this.state.expandedItem - 1], {
                toValue: 1,
                useNativeDriver: true
            })
        ]).start();
    }

    render() {
        const { HeaderView } = this.props;

        return (
            <Animated.View style={{ transform: [{ translateY: this.animatedTransition }] }}>
                <SafeAreaView style={this.props.containerStyle}>
                    {HeaderView}
                    {
                        this.props.items.map((item, index) => {
                            return (
                                <Animated.View key={String(index)} style={{ opacity: this.opacityAnimatedValues[index] }}>
                                    {item.view}
                                </Animated.View>
                            )
                        })
                    }
                </SafeAreaView>

            </Animated.View>
        );
    }

}