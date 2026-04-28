import React from 'react'
import { Container, Content, Footer, FooterTab, Button, Icon, Title, Header } from 'native-base';
import { LineChart, PieChart, Grid, AreaChart, BarChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { form }  from '../../assets/styles/index'

export default class index extends React.PureComponent{

    constructor(){
        super()
        this.state = {
            footerAvtive :0
        }

        this.setActiveFooter = this.setActiveFooter.bind(this)
    }

    setActiveFooter = (footerAvtive) => () =>{
        this.setState({ footerAvtive })
    }

    getChart1() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
 
        return (
            <LineChart
                style={{ height: 500 }}
                data={ data }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid/>
            </LineChart>
        )
    }

    getChart2() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
 
        return (
            <AreaChart
                style={{ height: 500 }}
                data={ data }
                contentInset={{ top: 30, bottom: 30 }}
                curve={ shape.curveNatural }
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            >
                <Grid/>
            </AreaChart>
        )
    }

    getChart3() {
        const fill = 'rgb(134, 65, 244)'
        const data   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ]
 
        return (
            <BarChart
                style={{ height: 500 }}
                data={ data }
                svg={{ fill }}
                contentInset={{ top: 30, bottom: 30 }}
            >
                <Grid/>
            </BarChart>
        )
    }

    getChart4() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
 
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
 
        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))
 
        return (
            <PieChart
                style={ { height: 500 } }
                data={ pieData }
            />
        )
    }

    render() {
        
        return (
            <Container>
                <Header style={ form.formContainer }>
                    <Title style={ form.formTitle2 }>Insec-HI</Title>
                </Header>

                <Content style={{ margin: 10, alignContent:'center' }}>
                    {
                        this.state.footerAvtive === 0?
                        this.getChart1()
                        :null
                        
                    }
                    {
                        this.state.footerAvtive === 1?
                        this.getChart2()
                        :null
                        
                    }
                    {
                        this.state.footerAvtive === 2?
                        this.getChart3()
                        :null
                        
                    }
                    {
                        this.state.footerAvtive === 3?
                        this.getChart4()
                        :null
                        
                    }
                </Content>
                    <Footer >
                    <FooterTab style={ form.formContainer }>
                        <Button vertical 
                        style={ form.formContainer }
                        active = { this.state.footerAvtive === 0 }
                        onPress ={ this.setActiveFooter(0)  }
                        >
                            <Icon name= 'md-analytics' />
                        </Button>
                        <Button vertical
                            style={ form.formContainer }
                            active = { this.state.footerAvtive === 1 }
                            onPress ={ this.setActiveFooter(1) }
                        >
                            <Icon name= 'md-stats' />
                        </Button>
                        <Button vertical
                            style={ form.formContainer }
                            active = { this.state.footerAvtive === 2 }
                            onPress ={ this.setActiveFooter(2) }
                        >
                            <Icon name= 'md-heart' />
                        </Button>
                        <Button vertical
                            style={ form.formContainer }
                            active = { this.state.footerAvtive === 3 }
                            onPress ={ this.setActiveFooter(3) }
                        >
                            <Icon name= 'md-apps' />
                        </Button>
                    </FooterTab>
                    </Footer>
            </Container>
        )}
}