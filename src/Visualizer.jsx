import React, { Component } from 'react';
import TextLoop from "react-text-loop";
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './Visualizer.css'

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'main',
            rendering: false,
            algorithms: [],
            currentAlgorithm: null,
            goFunction: () => { },
            resetFunction: () => { },
            setAlgorithm: () => { },
            sortingClicked: false,
            pathClicked: false,
            aicount: 0
        };
        this.getFunctions = this.getFunctions.bind(this);
        this.changeRenderingState = this.changeRenderingState.bind(this);
    }

    changeRenderingState(rendering) {
        this.setState({ rendering: rendering });
    }


    getFunctions(go, reset, setAlgo, algorithms) {
        this.state.goFunction = go;
        this.state.resetFunction = reset;
        this.state.setAlgorithm = setAlgo;
        this.state.algorithms = algorithms;
        this.setState({ algorithms: algorithms });
    }

    render() {
        let renderObj = null;
        if (this.state.mode === 'pathfinding') {
            renderObj = <PathFindingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
        }
        else if (this.state.mode === 'sorting') {
            renderObj = <SortingVisualizer setVisualizerRendering={this.changeRenderingState} getFunctions={this.getFunctions} />;
        }
        else {
            renderObj =
                <div className="welbotron">

                    <div className="container welc">

                        <h1 className='welcome'>Hello, algorithms.
                            <p className="quote">
                                <TextLoop interval={3800} springConfig={{ stiffness: 200, damping: 20 }} adjustingSpeed={300} >
                                    <p className="quoteText">"An algorithm must be seen to be believed."</p>
                                    <p className="quoteText">"Algorithms are central objects of study in Computer Science."</p>
                                    <p className="quoteText">"Algorithms are apprehensible magics."</p>
                                    <p className="quoteText">"An algorithm is like a recipe."</p>
                                </TextLoop>
                            </p>

                            <p className="lead">This website might help you understand algorithms better by visualizing them.</p>
                            <p className="secondline lead">Click on one of the categories below to visualize algorithms.</p>

                        </h1>
                        <a href='#' className='mainpage-b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'pathfinding' });
                                this.setState({ currentAlgorithm: null, pathClicked: true });
                            }
                        }}>
                            <span></span>
                            PATH FINDING
                        </a>
                        <a href='#' className='mainpage-b' onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting', currentAlgorithm: null, sortingClicked: true });
                            }
                        }}>
                            <span></span>
                            SORTING
                        </a>
                    </div>
                </div>
        }
        let invisibleOrNot = '';
        if (this.state.mode === 'main') invisibleOrNot = ' invisible';
        let algorithms = this.state.algorithms;
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'main' });
                            }
                        }}
                        type="button" className="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Main</button>

                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'pathfinding', currentAlgorithm: null, pathClicked: true });
                                this.state.setAlgorithm(-1);
                            }
                        }}
                        type="button" className="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Pathfinding</button>

                    <button
                        onClick={() => {
                            if (!this.state.rendering) {
                                this.setState({ mode: 'sorting', currentAlgorithm: null, sortingClicked: true });
                                this.state.setAlgorithm(-1);
                            }
                        }}
                        type="button" className="btn btn-dark navbtn"
                        disabled={this.state.rendering}
                    >Sorting</button>

                    <div className={"dropdown" + invisibleOrNot}>
                        <button className="btn btn-secondary dropdown-toggle navbtn" type="button" id="algorithmsDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.rendering}>
                            {this.state.currentAlgorithm == null ? 'Algorithms' : this.state.currentAlgorithm}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="algorithmsDropdown">
                            {algorithms.map((algorithm, algoId) => {
                                return (
                                    <button key={algoId} type="button" className="dropdown-item" onClick={() => {
                                        this.state.setAlgorithm(algoId);
                                        this.setState({ currentAlgorithm: this.state.algorithms[algoId] });
                                    }}>{algorithm}</button>
                                );
                            })}
                        </div>
                    </div>

                    <div className={"dropdown" + invisibleOrNot}>
                        <button className="btn btn-light dropdown-toggle navbtn" type="button" id="actionsDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" disabled={this.state.rendering}>
                            Actions
                        </button>
                        <div className="dropdown-menu" aria-labelledby="actionsDropdown">
                            <button type="button" className="dropdown-item" onClick={() => this.state.goFunction()} data-bs-toggle={this.state.currentAlgorithm === null ? "modal" : ""} data-bs-target="#setAlgoModal" disabled={this.state.mode === "ai" && this.state.currentAlgorithm === "Minimax"}>Go!</button>
                            <button type="button" className="dropdown-item" onClick={() => this.state.resetFunction()}>Reset</button>
                        </div>
                    </div>

                    <a href="https://github.com/JasonFengGit" style={{ marginLeft: "32%" }}>
                        <img className="githubimg" src="https://github.com/JasonFengGit/Visualizer/raw/master/src/Github_icon.png" width="40px" height="40px" style={{ opacity: "0.7 !important"}} alt="Github Icon"></img>
                    </a>
                </nav>

                <div className="modal fade" id="setAlgoModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">No Algorithm Selected</h5>
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body-alert">
                                <p>Please select an algorithm first.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="modal fade" id="pathIntroModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content intro">

                            <div className="modal-header">
                                <h5 className="modal-title">Pathfinding</h5>
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body intro">
                                <p>
                                    Pathfinding is generally the process of finding a route between two points. It is closely related to the shortest path problem in graph theory,
                                    which examines how to identify the "best" paths valued by different criteria (Ex. distance, cost, time consumption).
                                </p>
                                <p>Pathfinding is also similar to Searching in some circumstances. For instance, we can use [breadth-first search] to find the shortest path in a grid world.</p>
                                <p>
                                    In our scenario, the paths are valued by the number of cells they passed from START:
                                    <div className="simg" style={{width: "20px", height: "20px"}}></div>
                                    to the TARGET:
                                    <div className="fimg" style={{width: "20px", height: "20px"}}></div>
                                    .
                                </p>
                                <p>You may drag the START and TARGET icons to change their positions, and click on the blank nodes to add Walls.</p>

                                <p>Now please choose a sorting algorithm and visualize it!</p>
                                <p className='tips'>(after choosing an algorithm, click on the [Actions] button.)</p><br />
                                <p className='tips'>Note: there could be multiple "best" paths, so paths generated by different algorithms may not be consistent.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="modal fade" id="sortingIntroModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content intro">

                            <div className="modal-header">
                                <h5 className="modal-title">Sorting</h5>
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body intro">
                                <p>Sorting is a process of arranging an ordered sequence. It is a common operation in many applications.</p>
                                <p>Common uses of sorted sequences are:
                                    <div className='uses-list'>
                                        <p>·lookup or search efficiently</p>
                                        <p>·merge sequences efficiently</p>
                                        <p>·process data in a defined order</p>
                                    </div>
                                Now please choose a sorting algorithm and visualize it!
                                </p>
                                <p className='tips'>(after choosing an algorithm, click on the [Actions] button.)</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The AI Intro Modal is removed as per user request */}
                {/*
                <div className="modal fade" id="aiIntroModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content intro">

                            <div className="modal-header">
                                <h5 className="modal-title">Artificial Intelligence</h5>
                                <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body intro">
                                <p>
                                    Artificial intelligence (AI) is intelligence demonstrated by machines.
                                    Leading textbooks define the field as the study of "intelligent agents":
                                    any device that perceives its environment and takes actions that maximize its
                                    chance of successfully achieving its goals.
                                </p>
                                <p>
                                    In this category, you will experience with powerful AI algorithms
                                    based on fundamental ideas. Please try to understand those ideas behind through the visualizations,
                                    and I would try my best to demonstrate those principles.
                                </p>
                                <p> Now please choose an algorithm and begin your journey!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-dark" data-bs-dismiss="modal" style={{ width: '100px' }}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
                */}

                <div>
                    {renderObj}
                </div>
            </>
        )
    }
}
