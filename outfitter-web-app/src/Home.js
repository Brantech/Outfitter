import React from 'react';
import './Home.css';
import { Grid, CardContent, Card, IconButton } from '@material-ui/core';
import {Group, Assignment, Style, Whatshot, ArrowForward, ArrowBack} from '@material-ui/icons'
import TouchRipple from '@material-ui/core/ButtonBase'
import testOutfit from './images/testOutfit.jfif'
import { Palettes } from './Themes';

//region Styling

/** Main theme for the web application */
const mainTheme = Palettes.Default;

const style = (theme) => {
    return ({
        card: {
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: theme.palette.secondary.light,
        },

        title: {
            fontSize: "3em",
            cursor: "default",
            color: mainTheme.palette.primary.light
        },

        back: {
            backgroundColor: mainTheme.palette.primary.main,
            color: mainTheme.palette.secondary.main,
        },

        fieldText: {
            style: {
                color: "black"
            }
        },

        buttons: {
            height: "100%", 
            width: "100%",
            cursor: "pointer",
            display: "flex", 
            flexDirection: "column",
        },
    });
};

const breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
}

class Outfit extends React.Component {
    render() {
        var container = {
            height: "100%", 
            width: "100%", 
            display: "flex", 
            justifyContent: "center",
            alignContent: "center"
        }

        return (
            <Grid item xs={12} md={6} xl={3}>
                <Card style={container}>
                    <img src={testOutfit} style={{userSelect: "none"}} draggable="false"/>
                </Card>
            </Grid>
        )
    }
}

export class HomePage extends React.Component {


    constructor(props) {
        super(props);

        this.page = 0;
        this.leftArrow = this.leftArrow.bind(this);
        this.rightArrow = this.rightArrow.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            width: 0, height: 0,
            showLeftArrow: false,
            showRightArrow: true,
            theme: props.theme,
        }

        this.style = style(props.theme);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    leftArrow() {
        if(this.page != 0) {
            this.page--;
        }
    
        if(this.page === 0) {
            this.setState({showLeftArrow: false});
        }
    }

    rightArrow() {
        this.page++;
        if(this.page === 1) {
            this.setState({showLeftArrow: true});
        }
    }

    getOutfits() {
        var ret = []

        var items = 1;
        if(this.state.width >= breakpoints.md) {
            items = 2;
        }
        if(this.state.width >= breakpoints.xl) {
            items = 4;
        }

        for(var i = 0; i < items; i++) {
            ret.push(<Outfit/>);
        }

        return ret
    }

    render() {
        this.style = style(this.props.theme);

        var leftArrowStyle = {
            backgroundColor: this.props.theme.palette.primary.main,
            color: this.props.theme.palette.highlight.main,
            marginRight: "24px",
            visibility: this.state.showLeftArrow ? "visible" : "hidden"
        }

        var rightArrowStyle = {
            backgroundColor: this.props.theme.palette.primary.main, 
            color: this.props.theme.palette.primary.contrastText,
            marginLeft: "24px",
            visibility: this.state.showRightArrow ? "visible" : "hidden"
        }

        return (
            <Grid item xs={8} style={{minHeight: "70%", position: "relative"}}>
                <Card style={this.style.card} elevation={5}>
                    <CardContent className="contentContainer">

                        <Card className="outfits" elevation={5}>
                            <CardContent className="outfitContainer">
                                <p className="title">Community Outfits</p>
                                <div style={{display: "flex", flex: "1", alignItems: "center"}}>
                                    <IconButton onClick={this.leftArrow} style={leftArrowStyle}>
                                        <ArrowBack/>
                                    </IconButton>
                                    <Grid container style={{height: "100%"}} spacing={16}>
                                        {this.getOutfits()}
                                    </Grid>
                                    <IconButton onClick={this.rightArrow} style={rightArrowStyle}>
                                        <ArrowForward/>
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>

                        <Grid container style={{height: "50%", paddingTop: "16px"}} spacing={16}>
                            <Grid item xs={6} md={3}>
                                <Card style={this.style.buttons} elevation={5}>
                                    <TouchRipple style={this.style.buttons}>
                                        <Group style={{fontSize: "4em"}}/>
                                        <p style={{margin: "0"}}>Community</p>
                                    </TouchRipple>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Card style={this.style.buttons} elevation={5}>
                                    <TouchRipple style={this.style.buttons}>
                                        <Assignment style={{fontSize: "4em"}}/>
                                        <p style={{margin: "0"}}>Survey</p>
                                    </TouchRipple>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Card style={this.style.buttons} elevation={5}>
                                    <TouchRipple style={this.style.buttons}>
                                        <Style style={{fontSize: "4em"}}/>
                                        <p style={{margin: "0"}}>Closet</p>
                                    </TouchRipple>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Card style={this.style.buttons} elevation={5}>
                                    <TouchRipple style={this.style.buttons}>
                                        <Whatshot style={{fontSize: "4em"}}/>
                                        <p style={{margin: "0"}}>Suggestions</p>
                                    </TouchRipple>
                                </Card>
                            </Grid>
                        </Grid>
                        
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}