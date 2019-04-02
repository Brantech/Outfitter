import React from 'react';
import './Closet.css';
import { Grid, Card, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { Palettes } from './Themes';
import { ExpandMore } from '@material-ui/icons';

//region Styling

/** Main theme for the web application */
const mainTheme = Palettes.Default;

const style = (theme) => {
    return ({
        card: {
            display: "flex",
            flexDirection: "column",
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

    });
};

//endregion

var container;

let tab = "";
class Category extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: (new Date()).getTime(),
            theme: props.theme,
            open: false
        }
        
        this.style = style(props.theme);
    }

    handleChange() {
        if(tab === this.state.id) {
            tab = "";
            this.setState({open: false})
        } else {
            tab = this.state.id;
            this.setState({open: true});
        }

        container.setState(container.state);
    }

    render() {

        var cleanHeader = {
            backgroundColor: this.props.theme.palette.secondary.lighter,
            borderBottom: "1px solid white",
            borderRight: "1px solid white",
            flex: "0",
        }

        var dirtyHeader = {
            backgroundColor: this.props.theme.palette.secondary.lighter,
            borderBottom: "1px solid white",
            flex: "0",
        }

        var items = [];

        for(var i = 0; i < 10; i++) {
            items.push(<Item/>);
        }

        return (
            <ExpansionPanel 
                style={{flex: this.state.open && tab === this.state.id ? "1" : "", margin: 0, display: "flex", flexDirection: "column"}}
                expanded={this.state.open && tab === this.state.id} 
                onChange={() => this.handleChange()}
                >
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <p>{this.props.catName}</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{flex: "1", padding: "0"}}>
                    <Grid container style={{flexDirection: "column", overflowX: "none"}}>
                        <Grid item xs={12} style={cleanHeader}>
                            <p style={{textAlign: "center", color: "white"}}>Clean</p>
                        </Grid>
                        <Grid item xs={12} style={{backgroundColor: this.props.theme.palette.secondary.lighter, flex: "1", borderRight: "1px solid white", overflowY: "auto", overflowX: "hidden"}}>
                            <Grid container spacing={16} justify={"center"} style={{padding: "16px", boxSizing: "border-box"}}>
                                {items}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container style={{flexDirection: "column", overflowX: "none"}}>
                        <Grid item xs={12} style={dirtyHeader}>
                            <p style={{textAlign: "center", color: "white"}}>Dirty</p>
                        </Grid>
                        <Grid item xs={12} style={{backgroundColor: this.props.theme.palette.secondary.lighter, flex: "1", overflowY: "auto", overflowX: "hidden"}}>
                            <Grid container spacing={16} justify={"center"} style={{padding: "16px", boxSizing: "border-box"}}>
                                {items}
                            </Grid>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

class Item extends React.Component {
    render() {
        return (
            <Grid item xs={8} md={6} lg={4} xl={3}>
                <Card style={{height: "150px"}}/>
            </Grid>
        )
    }
}

export class ClosetPage extends React.Component {

    constructor(props) {
        super(props);
        container = this;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.state = {
            width: 0, height: 0,
            theme: props.theme,
            expanded: "",
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

    handleChange(panel) {
        if(this.state.expanded === panel) {
            this.setState({expanded: ""})
        } else {
            this.setState({expanded: panel});
        }
    }

    render() {
        this.style = style(this.props.theme);

        var cats = [];
        cats.push(<Category catName="Shirts" theme={this.props.theme}/>)
        cats.push(<Category catName="Pants" theme={this.props.theme}/>)

        return (
            <Grid item xs={10} style={{minHeight: "90%", position: "relative"}}>
                <Card style={this.style.card} elevation={5}>
                    {cats}
                </Card>
            </Grid>
        )
    }
}