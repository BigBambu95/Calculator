import React from 'react';

import Screen from '../screen';
import Keyboard from '../keyboard';

const modes = {
    IDLE: 'idle',
    WRITING: 'writing',
    CALCULATION: 'calculation',
    EQUAL: 'equal'
}

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            prevValue: 0,
            currentValue: '0',
            expression: '',
            calculation: '',
            mode: 'idle',
            lastClicked: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.clear = this.clear.bind(this);
        this.action = this.action.bind(this);
        this.equal = this.equal.bind(this);
        this.decimal = this.decimal.bind(this);
        this.minus = this.minus.bind(this);
    }

    handleClick(value) {
        const { currentValue, prevValue, mode } = this.state;

        switch(mode) {
            case modes.IDLE:
                if(value === '0') return false;

                return this.setState({ 
                    currentValue: value,
                    expression: this.state.expression + value,
                    mode: modes.WRITING,
                    lastClicked: value  
                });

            case modes.EQUAL:
                if(value === '0') return false;
                this.clear();

                return this.setState({ 
                    currentValue: value,
                    mode: modes.WRITING
                });
            
            case modes.WRITING:
                if(currentValue === prevValue) {
                    return this.setState({
                        currentValue: value,
                        expression: this.state.expression + value,
                        lastClicked: value  
                    });
                } else {
                    return this.setState({
                        currentValue: currentValue + value,
                        expression: this.state.expression + value,
                        lastClicked: value  
                    });
                }
            
        }

    }

    decimal() {
        const { currentValue, mode, expression } = this.state;

        if(!currentValue.split('').includes('.')) {

            if(mode === modes.IDLE) {
                return this.setState({
                    currentValue: currentValue + '.',
                    mode: modes.WRITING,
                    expression: expression + '.'
                });
            } else {
                return this.setState({
                    currentValue: currentValue + '.',
                    expression: expression + '.'
                })
            }

        } 
    }

    clear() {
        return this.setState({
            prevValue: 0,
            currentValue: '0',
            expression: '',
            calculation: '',
            mode: modes.IDLE,
            lastClicked: 'clear'
        });
    }

    minus() {
        const { expression, currentValue, lastClicked, calculation } = this.state;
        if(lastClicked === '-') return false;

        if(calculation === '') {
            return this.setState({
                lastClicked: '-',
                calculation: '-',
                expression: expression + '-',
                prevValue: currentValue
            });
        } else {
            return this.setState({
                lastClicked: '-',
                expression: expression + '-',
            });
        }
    }

    action(sign) {
        const { currentValue, expression, mode, calculation, lastClicked } = this.state;
        const regExp = /(\/|\*|\+)/;
        const newExpression = expression.slice(0, expression.length - 1) + sign;

        if(mode === modes.WRITING) {
            if(calculation !== '' ) {
                if(lastClicked === '-') {
                    return this.setState({
                        calculation: sign,
                        expression: expression.slice(0, expression.length - 2) + sign,
                        lastClicked: sign,
                        prevValue: currentValue,
                    });
                } else if(regExp.test(lastClicked)) {
                    return this.setState({
                        calculation: sign,
                        expression: newExpression,
                        lastClicked: sign,
                        prevValue: currentValue,
                    }); 
                } else {
                    return this.setState({
                        calculation: sign,
                        expression: expression + sign,
                        lastClicked: sign,
                        prevValue: currentValue,
                    }); 
                }

            } else {
                return this.setState({
                    calculation: sign,
                    expression: expression + sign,
                    prevValue: currentValue,
                    lastClicked: sign
                });
            }
        }
    

        if(mode === modes.EQUAL) {
            return this.setState({
                calculation: sign,
                expression: currentValue + sign,
                prevValue: currentValue,
                mode: modes.WRITING,
                lastClicked: sign
            });
        }
 
        this.setState({
            calculation: sign,
            expression: expression + sign,
            prevValue: currentValue,
            lastClicked: sign
        });

    }

    equal() {
        if(this.state.lastClicked === '=') return false;

        this.setState({
            currentValue: eval(this.state.expression),
            mode: modes.EQUAL,
            lastClicked: '='
        })
    }

    render() {
        const { currentValue, expression } = this.state;

        return(
            <div className="calculator">
                <Screen value={currentValue} expression={expression} />
                <Keyboard 
                    handleClick={this.handleClick}
                    decimal={this.decimal} 
                    minus={this.minus}
                    clear={this.clear} 
                    action={this.action} 
                    equal={this.equal} 
                />
            </div>
        )
    }

}

export default App;