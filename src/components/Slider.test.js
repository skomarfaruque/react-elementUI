
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RangeSlider from './Slider';
import Interest from './Interest';
import createStore from '../store';
const store = createStore();
configure({adapter: new Adapter()});
describe('<RangeSlider />', () => {
    let wrapper;
    beforeEach( ()=> {
        wrapper = shallow(<RangeSlider store={store} />).dive()
    })
    it('Must have interest component',  () => {
        expect(wrapper.find(Interest)).toHaveLength(1);
    })
    it('Must have Interest select',  () => {
        expect(wrapper.find(Interest).dive().find("select")).toHaveLength(1);
    })
    it('Interest Select must have 101 including `--please select--` options',  () => {
        expect(wrapper.find(Interest).dive().find("option")).toHaveLength(101);
    })
    it('Calculate result',  () => {
        wrapper.setProps({ slidedVal: 1 });
        wrapper.setState({ interestVal: 10 });
        wrapper.find('.show-result').simulate('click');
        expect(wrapper.state('result')).toEqual(11);
    })
})